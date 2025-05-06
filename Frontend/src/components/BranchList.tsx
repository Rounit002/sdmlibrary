import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BranchListProps {
  branches: any[];
}

const BranchList: React.FC<BranchListProps> = ({ branches }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(`/hostel/branches/${branch.id}/students`)}
        >
          <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
          <p className="text-gray-600">Students: {branch.studentCount}</p>
        </div>
      ))}
    </div>
  );
};

export default BranchList;