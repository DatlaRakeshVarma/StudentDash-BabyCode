import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, CourseFilter } from '../types/student';
import { fetchStudents } from '../services/mockStudentApi';

interface StudentContextType {
  students: Student[];
  filteredStudents: Student[];
  isLoading: boolean;
  error: string | null;
  courseFilter: CourseFilter;
  setCourseFilter: (course: CourseFilter) => void;
  refreshStudents: () => Promise<void>;
  addStudentToList: (student: Student) => void;
}

const StudentContext = createContext<StudentContextType>({
  students: [],
  filteredStudents: [],
  isLoading: false,
  error: null,
  courseFilter: 'all',
  setCourseFilter: () => {},
  refreshStudents: async () => {},
  addStudentToList: () => {}
});

export const useStudents = () => useContext(StudentContext);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('all');

  // Initial fetch of students
  useEffect(() => {
    refreshStudents();
  }, []);

  // Filter students whenever the students array or courseFilter changes
  useEffect(() => {
    setFilteredStudents(
      courseFilter === 'all' 
        ? students 
        : students.filter(student => student.course === courseFilter)
    );
  }, [students, courseFilter]);

  const refreshStudents = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addStudentToList = (student: Student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const value = {
    students,
    filteredStudents,
    isLoading,
    error,
    courseFilter,
    setCourseFilter,
    refreshStudents,
    addStudentToList
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};