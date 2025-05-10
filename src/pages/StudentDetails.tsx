import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Mail, Calendar, User, GraduationCap } from 'lucide-react';
import { useStudents } from '../context/StudentContext';

const StudentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useStudents();
  
  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Student not found</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-6">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                {student.name.charAt(0)}
              </div>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <div className="mt-1 flex items-center text-gray-500">
                <Mail size={16} className="mr-2" />
                {student.email}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-700">
                <Book size={20} className="mr-2 text-blue-600" />
                <span className="font-medium">Course</span>
              </div>
              <p className="mt-2 text-gray-900">{student.course}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-700">
                <User size={20} className="mr-2 text-blue-600" />
                <span className="font-medium">Age</span>
              </div>
              <p className="mt-2 text-gray-900">{student.age} years old</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-700">
                <Calendar size={20} className="mr-2 text-blue-600" />
                <span className="font-medium">Enrollment Date</span>
              </div>
              <p className="mt-2 text-gray-900">{student.enrollmentDate}</p>
            </div>

            {student.grade && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <GraduationCap size={20} className="mr-2 text-blue-600" />
                  <span className="font-medium">Grade</span>
                </div>
                <p className="mt-2 text-gray-900">{student.grade}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails