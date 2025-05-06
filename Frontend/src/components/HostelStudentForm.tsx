import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface HostelStudentFormProps {
  branches: any[];
  onSubmit: (studentData: any) => void;
  initialData?: any;
}

const HostelStudentForm: React.FC<HostelStudentFormProps> = ({ branches, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [fatherName, setFatherName] = useState(initialData?.fatherName || '');
  const [motherName, setMotherName] = useState(initialData?.motherName || '');
  const [aadharNumber, setAadharNumber] = useState(initialData?.aadharNumber || '');
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || '');
  const [branchId, setBranchId] = useState(initialData?.branchId || '');
  const [profileImageUrl, setProfileImageUrl] = useState(initialData?.profileImageUrl || '');
  const [aadharImageUrl, setAadharImageUrl] = useState(initialData?.aadharImageUrl || '');
  const [religion, setReligion] = useState(initialData?.religion || '');
  const [foodPreference, setFoodPreference] = useState(initialData?.foodPreference || '');
  const [gender, setGender] = useState(initialData?.gender || '');
  const [fee, setFee] = useState(initialData?.fee || '');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (file: File, setUrl: (url: string) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.uploadImage(formData);
      if (!response.imageUrl) throw new Error('No image URL returned');
      setUrl(response.imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error('Name is required');
      return;
    }
    if (!branchId) {
      toast.error('Branch is required');
      return;
    }
    const studentData = {
      branchId,
      name,
      address,
      fatherName,
      motherName,
      aadharNumber,
      phoneNumber,
      profileImageUrl,
      aadharImageUrl,
      religion,
      foodPreference,
      gender,
      fee: fee ? parseFloat(fee) : 0.0,
    };
    onSubmit(studentData);
    if (!initialData) {
      setName('');
      setAddress('');
      setFatherName('');
      setMotherName('');
      setAadharNumber('');
      setPhoneNumber('');
      setBranchId('');
      setProfileImageUrl('');
      setAadharImageUrl('');
      setReligion('');
      setFoodPreference('');
      setGender('');
      setFee('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
          <input
            type="text"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fee (in INR)</label>
          <input
            type="number"
            step="0.01"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
          <input
            type="text"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Preference</label>
          <select
            value={foodPreference}
            onChange={(e) => setFoodPreference(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          >
            <option value="">Select</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 transition-colors"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, setProfileImageUrl);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer"
          />
          {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="mt-2 w-20 h-20 object-cover rounded-md" />}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Image</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, setAadharImageUrl);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer"
          />
          {aadharImageUrl && <img src={aadharImageUrl} alt="Aadhar" className="mt-2 w-20 h-20 object-cover rounded-md" />}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={uploading}
          className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-400"
        >
          {uploading ? 'Uploading...' : initialData ? 'Update Student' : 'Add Student'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HostelStudentForm;