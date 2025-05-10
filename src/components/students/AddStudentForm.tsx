import React, { useState } from 'react';
import { UserPlus, AlertCircle, Plus, X } from 'lucide-react';
import { useStudents } from '../../context/StudentContext';
import { useAuth } from '../../context/AuthContext';
import { Student, StudentFormData } from '../../types/student';
import { addStudent, availableCourses } from '../../services/mockStudentApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface AddStudentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ isOpen, onClose }) => {
  const { addStudentToList } = useStudents();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomCourse, setShowCustomCourse] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    age: '',
    course: '',
    grade: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  if (!currentUser) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Authentication required</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Please <button onClick={() => navigate('/login')} className="font-medium underline">log in</button> to add new students.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 16 || age > 100) {
        newErrors.age = 'Age must be between 16 and 100';
      }
    }
    
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof StudentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleCustomCourse = () => {
    setShowCustomCourse(!showCustomCourse);
    if (!showCustomCourse) {
      setFormData(prev => ({ ...prev, course: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newStudent = await addStudent({
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        course: formData.course,
        grade: formData.grade
      });
      
      addStudentToList(newStudent);
      onClose();
      toast.success('Student added successfully!');
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        age: '',
        course: '',
        grade: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-10 flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full m-4 z-20">
        <div className="bg-white">
          <div className="px-4 pt-5 pb-4 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <UserPlus size={20} className="mr-2 text-blue-600" />
                  Add New Student
                </h3>
                <div className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.name ? 'border-red-300' : ''
                            }`}
                            placeholder="John Doe"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.email ? 'border-red-300' : ''
                            }`}
                            placeholder="john.doe@example.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                          Age
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="age"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.age ? 'border-red-300' : ''
                            }`}
                            min="16"
                            max="100"
                            placeholder="21"
                          />
                          {errors.age && (
                            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                          Course
                        </label>
                        <div className="mt-1 space-y-2">
                          {!showCustomCourse ? (
                            <>
                              <select
                                name="course"
                                id="course"
                                value={formData.course}
                                onChange={handleChange}
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  errors.course ? 'border-red-300' : ''
                                }`}
                              >
                                <option value="">Select a course</option>
                                {availableCourses.map((course) => (
                                  <option key={course} value={course}>
                                    {course}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={toggleCustomCourse}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                              >
                                <Plus size={16} className="mr-1" />
                                Add Custom Course
                              </button>
                            </>
                          ) : (
                            <div className="space-y-2">
                              <input
                                type="text"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                placeholder="Enter custom course name"
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  errors.course ? 'border-red-300' : ''
                                }`}
                              />
                              <button
                                type="button"
                                onClick={toggleCustomCourse}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700"
                              >
                                <X size={16} className="mr-1" />
                                Cancel Custom Course
                              </button>
                            </div>
                          )}
                          {errors.course && (
                            <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                          Grade
                        </label>
                        <div className="mt-1">
                          <select
                            name="grade"
                            id="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select a grade</option>
                            {grades.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200 ${
                          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Adding...
                          </>
                        ) : (
                          'Add Student'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;