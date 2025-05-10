import { Student } from '../types/student';

// Sample student data
const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    age: 22,
    course: 'Computer Science',
    enrollmentDate: '2023-09-01',
    grade: 'A',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Sophia Williams',
    email: 'sophia.williams@example.com',
    age: 21,
    course: 'Data Science',
    enrollmentDate: '2023-08-15',
    grade: 'B+',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    age: 23,
    course: 'Web Development',
    enrollmentDate: '2023-09-05',
    grade: 'A-',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'Olivia Garcia',
    email: 'olivia.garcia@example.com',
    age: 20,
    course: 'Artificial Intelligence',
    enrollmentDate: '2023-08-20',
    grade: 'A-',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Noah Martinez',
    email: 'noah.martinez@example.com',
    age: 22,
    course: 'Cybersecurity',
    enrollmentDate: '2023-09-10',
    grade: 'B',
    profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '6',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    age: 21,
    course: 'Data Science',
    enrollmentDate: '2023-08-25',
    grade: 'B-',
    profileImage: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    age: 24,
    course: 'Mobile Development',
    enrollmentDate: '2023-09-15',
    grade: 'A',
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '8',
    name: 'Isabella Taylor',
    email: 'isabella.taylor@example.com',
    age: 23,
    course: 'Cloud Computing',
    enrollmentDate: '2023-09-20',
    grade: 'B+',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '9',
    name: 'Lucas Anderson',
    email: 'lucas.anderson@example.com',
    age: 25,
    course: 'DevOps',
    enrollmentDate: '2023-09-25',
    grade: 'A-',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Available courses for filtering
export const availableCourses = [
  'Computer Science',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'Cloud Computing',
  'DevOps'
];

let customCourses: string[] = [];

export const addCustomCourse = (course: string) => {
  if (!availableCourses.includes(course) && !customCourses.includes(course)) {
    customCourses.push(course);
  }
};

export const getAllCourses = () => [...availableCourses, ...customCourses];

// Simulate API call to fetch students
export const fetchStudents = (): Promise<Student[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleStudents);
    }, 800);
  });
};

// Simulate API call to add a new student
export const addStudent = (student: Omit<Student, 'id' | 'enrollmentDate'>): Promise<Student> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!availableCourses.includes(student.course)) {
        addCustomCourse(student.course);
      }
      
      const newStudent: Student = {
        ...student,
        id: Math.random().toString(36).substring(2, 11),
        enrollmentDate: new Date().toISOString().split('T')[0],
        profileImage: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`
      };
      sampleStudents.push(newStudent);
      resolve(newStudent);
    }, 800);
  });
};

// Simulate API call to filter students by course
export const filterStudentsByCourse = (course: string): Promise<Student[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (course === 'all') {
        resolve(sampleStudents);
      } else {
        const filteredStudents = sampleStudents.filter(
          (student) => student.course === course
        );
        resolve(filteredStudents);
      }
    }, 400);
  });
};
