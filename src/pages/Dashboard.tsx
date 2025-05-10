import React, { useState } from 'react';
import StudentList from '../components/students/StudentList';
import StudentFilters from '../components/students/StudentFilters';
import AddStudentForm from '../components/students/AddStudentForm';
import { GraduationCap, Users, Plus } from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  showAddForm?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showAddForm = false }) => {
  const { students } = useStudents();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAddFormOpen, setIsAddFormOpen] = useState(showAddForm);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <GraduationCap size={24} className="text-blue-600" />
            </div>
            <div className="ml-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Student Management Dashboard</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage and monitor your students from a single dashboard.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="flex items-center">
              <Users size={20} className="text-gray-500 mr-1.5" />
              <span className="text-gray-500 mr-1.5">Total Students:</span>
              <span className="font-medium">{students.length}</span>
            </div>
            {currentUser ? (
              <button
                onClick={() => setIsAddFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Plus size={16} className="mr-2" />
                Add New Student
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Add Students
              </button>
            )}
          </div>
        </div>
      </div>

      <StudentFilters />
      <StudentList />
      <AddStudentForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} />
    </div>
  );
};

export default Dashboard