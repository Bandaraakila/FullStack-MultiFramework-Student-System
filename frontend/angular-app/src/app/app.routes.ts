import { Routes } from "@angular/router";
import { StudentsComponent } from "./components/students/students.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { EnrollmentComponent } from "./components/enrollment/enrollment.component";

export const routes: Routes = [
  { path: "students", component: StudentsComponent },
  { path: "courses", component: CoursesComponent },
  { path: "enroll", component: EnrollmentComponent },
  { path: "", redirectTo: "/students", pathMatch: "full" },
];
