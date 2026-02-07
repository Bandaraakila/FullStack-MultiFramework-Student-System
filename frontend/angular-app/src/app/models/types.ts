export interface Student {
  studentId?: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  contactNumber: string;
}

export interface Course {
  courseId: number;
  courseName: string;
  description: string;
  duration: string;
  fee: number;
}

export interface Enrollment {
  studentId: number;
  courseId: number;
}
