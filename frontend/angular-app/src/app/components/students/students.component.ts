import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Student } from "../../models/types";

@Component({
  selector: "app-students",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow border-0">
      <div
        class="card-header bg-white d-flex justify-content-between align-items-center"
      >
        <h4 class="mb-0 text-primary">Student Management</h4>
        <input
          type="text"
          class="form-control w-25"
          placeholder="Search by name..."
          [(ngModel)]="searchTerm"
        />
      </div>
      <div class="card-body">
        <div class="row mb-4 bg-light p-3 rounded">
          <h5>{{ selectedStudent.studentId ? "Edit" : "Add" }} Student</h5>
          <div class="col-md-3">
            <input
              [(ngModel)]="selectedStudent.fullName"
              class="form-control"
              placeholder="Full Name"
            />
          </div>
          <div class="col-md-3">
            <input
              [(ngModel)]="selectedStudent.email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="col-md-2">
            <input
              type="date"
              [(ngModel)]="selectedStudent.dateOfBirth"
              class="form-control"
            />
          </div>
          <div class="col-md-2">
            <input
              [(ngModel)]="selectedStudent.contactNumber"
              class="form-control"
              placeholder="Phone"
            />
          </div>
          <div class="col-md-2">
            <button (click)="save()" class="btn btn-success w-100">Save</button>
          </div>
        </div>

        <table class="table table-hover">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of filteredStudents()">
              <td>{{ s.studentId }}</td>
              <td>{{ s.fullName }}</td>
              <td>{{ s.email }}</td>
              <td>{{ s.dateOfBirth | date }}</td>
              <td>{{ s.contactNumber }}</td>
              <td>
                <button
                  (click)="edit(s)"
                  class="btn btn-sm btn-info me-2 text-white"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  (click)="delete(s.studentId!)"
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
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  searchTerm: string = "";
  selectedStudent: Student = this.reset();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getStudents().subscribe((res) => (this.students = res));
  }

  reset() {
    return { fullName: "", email: "", dateOfBirth: "", contactNumber: "" };
  }

  filteredStudents() {
    return this.students.filter((s) =>
      s.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  save() {
    this.api.saveStudent(this.selectedStudent).subscribe(() => {
      this.load();
      this.selectedStudent = this.reset();
    });
  }

  edit(s: Student) {
    this.selectedStudent = { ...s, dateOfBirth: s.dateOfBirth.split("T")[0] };
  }

  delete(id: number) {
    if (confirm("Delete student?"))
      this.api.deleteStudent(id).subscribe(() => this.load());
  }
}
