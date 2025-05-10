export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  enrollmentDate: string;
  grade?: string;
  profileImage?: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  age: string;
  course: string;
  grade?: string;
}

export type CourseFilter = string | 'all';