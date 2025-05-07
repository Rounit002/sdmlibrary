import React, { useState } from 'react';

interface Branch {
  id: string;
  name: string;
}

interface StudentData {
  name: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  aadharNumber?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  aadharImageUrl?: string;
  branchId: string;
  religion?: string;
  foodPreference?: string;
  gender?: string;
  fee?: number;
  registrationNumber?: string;
  roomNumber?: string;
}

interface HostelStudentFormProps {
  branches: Branch[];
  onSubmit: (studentData: StudentData) => void;
  initialData?: StudentData;
}

const HostelStudentForm: React.FC<HostelStudentFormProps> = ({ branches, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<StudentData>({
    name: initialData?.name || '',
    address: initialData?.address || '',
    fatherName: initialData?.fatherName || '',
    motherName: initialData?.motherName || '',
    aadharNumber: initialData?.aadharNumber || '',
    phoneNumber: initialData?.phoneNumber || '',
    profileImageUrl: initialData?.profileImageUrl || '',
    aadharImageUrl: initialData?.aadharImageUrl || '',
    branchId: initialData?.branchId || '',
    religion: initialData?.religion || '',
    foodPreference: initialData?.foodPreference || '',
    gender: initialData?.gender || '',
    fee: initialData?.fee || 0,
    registrationNumber: initialData?.registrationNumber || '',
    roomNumber: initialData?.roomNumber || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fee' || name === 'branchId' ? Number(value) || value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="branchId" className="block text-sm font-medium text-gray-700">Branch</label>
          <select
            id="branchId"
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father’s Name</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother’s Name</label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">Aadhar Number</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="religion" className="block text-sm font-medium text-gray-700">Religion</label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="foodPreference" className="block text-sm font-medium text-gray-700">Food Preference</label>
          <input
            type="text"
            id="foodPreference"
            name="foodPreference"
            value={formData.foodPreference}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Fee</label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
      >
        {initialData ? 'Update Student' : 'Add Student'}
      </button>
    </div>
  );
};

export default HostelStudentForm;