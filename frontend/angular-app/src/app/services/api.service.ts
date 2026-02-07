import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { Student, Course, Enrollment } from "../models/types";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private dotnetUrl = "https://localhost:7154/api";
  private springUrl = "http://localhost:8081/api";

  constructor(private http: HttpClient) {}

  private getDotnetHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("dotnet_token")}`,
      }),
    };
  }

  private getSpringHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("spring_token")}`,
      }),
    };
  }

  loginAll(): Observable<any> {
    const loginData = { username: "admin", password: "password123" };
    return forkJoin({
      dotnet: this.http.post(`${this.dotnetUrl}/Auth/login`, loginData),
      spring: this.http.post(`${this.springUrl}/auth/login`, loginData),
    }).pipe(
      map((res: any) => {
        localStorage.setItem("dotnet_token", res.dotnet.token);
        localStorage.setItem("spring_token", res.spring.token);
        return res;
      }),
    );
  }

  // Students (Dotnet)
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.dotnetUrl}/Students`,
      this.getDotnetHeaders(),
    );
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(
      `${this.dotnetUrl}/Students/${id}`,
      this.getDotnetHeaders(),
    );
  }

  saveStudent(student: Student): Observable<any> {
    if (student.studentId) {
      return this.http.put(
        `${this.dotnetUrl}/Students/${student.studentId}`,
        student,
        this.getDotnetHeaders(),
      );
    }
    return this.http.post(
      `${this.dotnetUrl}/Students`,
      student,
      this.getDotnetHeaders(),
    );
  }

  // Courses (Spring Boot)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.springUrl}/courses`,
      this.getSpringHeaders(),
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(
      `${this.springUrl}/courses/${id}`,
      this.getSpringHeaders(),
    );
  }

  saveCourse(course: Course): Observable<any> {
    if (course.courseId) {
      return this.http.put(
        `${this.springUrl}/courses/${course.courseId}`,
        course,
        this.getSpringHeaders(),
      );
    }
    return this.http.post(
      `${this.springUrl}/courses`,
      course,
      this.getSpringHeaders(),
    );
  }

  enroll(enrollment: Enrollment): Observable<any> {
    return this.http.post(
      `${this.dotnetUrl}/Students/enroll`,
      enrollment,
      this.getDotnetHeaders(),
    );
  }
}
