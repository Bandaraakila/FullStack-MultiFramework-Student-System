import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Course } from "../../models/types";

@Component({
  selector: "app-courses",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow border-0">
      <div
        class="card-header bg-white d-flex justify-content-between align-items-center"
      >
        <h4 class="mb-0 text-success">Course Management</h4>
        <input
          type="text"
          class="form-control w-25"
          placeholder="Search course..."
          [(ngModel)]="searchTerm"
        />
      </div>
      <div class="card-body">
        <div class="row mb-4 bg-light p-3 rounded">
          <h5>{{ selectedCourse.courseId ? "Edit" : "Add" }} Course</h5>
          <div class="col-md-3 mb-2">
            <input
              [(ngModel)]="selectedCourse.courseName"
              class="form-control"
              placeholder="Course Name"
            />
          </div>
          <div class="col-md-3 mb-2">
            <input
              [(ngModel)]="selectedCourse.description"
              class="form-control"
              placeholder="Description"
            />
          </div>
          <div class="col-md-2 mb-2">
            <input
              [(ngModel)]="selectedCourse.duration"
              class="form-control"
              placeholder="Duration (e.g. 6 Months)"
            />
          </div>
          <div class="col-md-2 mb-2">
            <input
              type="number"
              [(ngModel)]="selectedCourse.fee"
              class="form-control"
              placeholder="Fee"
            />
          </div>
          <div class="col-md-2">
            <button (click)="save()" class="btn btn-success w-100">
              Save Course
            </button>
          </div>
        </div>

        <table class="table table-hover">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Fee (LKR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of filteredCourses()">
              <td>{{ c.courseId }}</td>
              <td class="fw-bold">{{ c.courseName }}</td>
              <td>{{ c.description }}</td>
              <td>{{ c.duration }}</td>
              <td>{{ c.fee | number }}</td>
              <td>
                <button
                  (click)="edit(c)"
                  class="btn btn-sm btn-info me-2 text-white"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  (click)="delete(c.courseId!)"
                  class="btn btn-sm btn-danger"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  searchTerm: string = "";
  selectedCourse: any = this.reset();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getCourses().subscribe({
      next: (res) => (this.courses = res),
      error: () => alert("Failed to load courses. Check Spring Boot API."),
    });
  }

  reset() {
    return { courseName: "", description: "", duration: "", fee: 0 };
  }

  filteredCourses() {
    return this.courses.filter((c) =>
      c.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  save() {
    if (!this.selectedCourse.courseName || this.selectedCourse.fee <= 0)
      return alert("Invalid data");
    this.api.saveCourse(this.selectedCourse).subscribe(() => {
      this.load();
      this.selectedCourse = this.reset();
    });
  }

  edit(c: Course) {
    this.selectedCourse = { ...c };
  }

  delete(id: number) {
    if (confirm("Delete this course?")) {
      this.api.deleteCourse(id).subscribe(() => this.load());
    }
  }
}
