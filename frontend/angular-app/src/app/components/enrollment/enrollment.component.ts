import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Student, Course } from "../../models/types";

@Component({
  selector: "app-enrollment",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow border-0 mx-auto" style="max-width: 600px;">
      <div class="card-header bg-primary text-white">
        <h4>Course Enrollment</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label>Select Student</label>
          <select class="form-select" [(ngModel)]="studentId">
            <option *ngFor="let s of students" [value]="s.studentId">{{
              s.fullName
            }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label>Select Course</label>
          <select class="form-select" [(ngModel)]="courseId">
            <option *ngFor="let c of courses" [value]="c.courseId"
              >{{ c.courseName }} ({{ c.fee }})</option
            >
          </select>
        </div>
        <button (click)="enroll()" class="btn btn-primary w-100 py-2 shadow">
          Confirm Enrollment
        </button>
      </div>
    </div>
  `,
})
export class EnrollmentComponent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];
  studentId: number = 0;
  courseId: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getStudents().subscribe((res) => (this.students = res));
    this.api.getCourses().subscribe((res) => (this.courses = res));
  }

  enroll() {
    if (!this.studentId || !this.courseId) return alert("Select both");
    this.api
      .enroll({
        studentId: Number(this.studentId),
        courseId: Number(this.courseId),
      })
      .subscribe(() => alert("Enrollment Successful!"));
  }
}
