import React from 'react';
import { useStudents } from '../../context/StudentContext';
import { Filter, RefreshCw } from 'lucide-react';
import { availableCourses } from '../../services/mockStudentApi';

const StudentFilters: React.FC = () => {
  const { courseFilter, setCourseFilter, refreshStudents, isLoading } = useStudents();

  const handleCourseChange = (course: string) => {
    setCourseFilter(course);
  };

  const handleRefresh = () => {
    refreshStudents();
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <Filter size={20} className="text-blue-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={`inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <RefreshCw size={16} className={`mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <div className="mt-4">
        <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Course
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCourseChange('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
              courseFilter === 'all'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            All Courses
          </button>
          
          {availableCourses.map((course) => (
            <button
              key={course}
              onClick={() => handleCourseChange(course)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                courseFilter === course
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {course}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentFilters;