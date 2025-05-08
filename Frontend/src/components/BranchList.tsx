import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Edit, Trash2 } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  studentCount: number;
}

interface BranchListProps {
  branches: Branch[];
  onUpdateBranch: (id: string, name: string) => void;
  onDeleteBranch: (id: string) => void;
}

const BranchList: React.FC<BranchListProps> = ({ branches, onUpdateBranch, onDeleteBranch }) => {
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setEditName(branch.name);
  };

  const handleSave = () => {
    if (editingBranch) {
      onUpdateBranch(editingBranch.id, editName);
      setEditingBranch(null);
    }
  };

  const handleCancel = () => {
    setEditingBranch(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {branches.map((branch) => (
        <div key={branch.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          {editingBranch?.id === branch.id ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-indigo-600" />
                <Link
                  to={`/hostel/branches/${branch.id}/students`}
                  className="text-lg font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {branch.name}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">{branch.studentCount} students</span>
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(branch)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDeleteBranch(branch.id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                  disabled={branch.studentCount > 0}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BranchList;