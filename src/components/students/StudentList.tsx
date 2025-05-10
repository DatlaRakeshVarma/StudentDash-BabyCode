import React from 'react';
import { Mail, Book, CalendarDays, BookOpen } from 'lucide-react';
import { useStudents } from '../../context/StudentContext';
import { Student } from '../../types/student';
import { useNavigate } from 'react-router-dom';

const StudentItem: React.FC<{ student: Student }> = ({ student }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/students/${student.id}`)}
    >
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {student.profileImage ? (
              <img 
                src={student.profileImage} 
                alt={student.name} 
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {student.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{student.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Mail size={14} className="mr-1" />
                {student.email}
              </div>
            </div>
          </div>
          {student.grade && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              student.grade.startsWith('A') 
                ? 'bg-green-100 text-green-800' 
                : student.grade.startsWith('B') 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              Grade: {student.grade}
            </span>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center text-sm text-gray-500">
            <Book size={16} className="mr-1.5 text-blue-500" />
            <span className="font-medium text-gray-900">Course:</span>
            <span className="ml-1">{student.course}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDays size={16} className="mr-1.5 text-blue-500" />
            <span className="font-medium text-gray-900">Enrolled:</span>
            <span className="ml-1">{student.enrollmentDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen size={16} className="mr-1.5 text-blue-500" />
            <span className="font-medium text-gray-900">Age:</span>
            <span className="ml-1">{student.age} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentList: React.FC = () => {
  const { filteredStudents, isLoading, error } = useStudents();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-blue-100 h-12 w-12 flex items-center justify-center mb-3">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </div>
          <p className="text-blue-600 font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading students</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (filteredStudents.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No students found</h3>
        <p className="mt-1 text-sm text-gray-500">Try changing your search filters or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredStudents.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentList