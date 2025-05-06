import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { ArrowLeft } from 'lucide-react';
import SDMLibLogo from './SDMLibLogo.jpg'; // Import the image

const HostelStudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: student, isLoading, error } = useQuery({
    queryKey: ['hostelStudent', id],
    queryFn: () => api.getHostelStudent(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-6 animate-pulse">Loading student details...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading student: {(error as Error).message}
      </div>
    );
  }

  if (!student) {
    return <div className="p-6">Student not found.</div>;
  }

  const feeNumber = Number(student.fee ?? 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Full-width Image Section */}

      {/* Back Button and Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/hostel/students/${id}/edit`)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition-colors"
          >
            Print
          </button>
        </div>
      </div>

      {/* Student Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Images */}
        <div className="w-full">
        <img
          src={SDMLibLogo}
          alt="SDM Boy's Hostel Banner"
          className="w-full h-auto object-cover"
        />
      </div>
        <div className="flex space-x-4">
          {student.profileImageUrl && (
            <img
              src={student.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />
          )}
          {student.aadharImageUrl && (
            <img
              src={student.aadharImageUrl}
              alt="Aadhar"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Name', value: student.name || 'N/A' },
            { label: 'Address', value: student.address || 'N/A' },
            { label: 'Father’s Name', value: student.fatherName || 'N/A' },
            { label: 'Mother’s Name', value: student.motherName || 'N/A' },
            { label: 'Aadhar Number', value: student.aadharNumber || 'N/A' },
            { label: 'Phone Number', value: student.phoneNumber || 'N/A' },
            { label: 'Branch', value: student.branchName || 'N/A' },
            { label: 'Fee', value: `₹${feeNumber.toFixed(2)}` },
            { label: 'Religion', value: student.religion || 'N/A' },
            { label: 'Food Preference', value: student.foodPreference || 'N/A' },
            { label: 'Gender', value: student.gender || 'N/A' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">{item.label}</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelStudentDetails;