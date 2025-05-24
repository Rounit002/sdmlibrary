import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronRight, Users, Building, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const HostelDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hostelBranches, setHostelBranches] = useState<any[]>([]);
  const [hostelStudents, setHostelStudents] = useState<any[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fetchData = async () => {
    try {
      const branchesResponse = await api.getHostelBranches();
      const studentsResponse = await api.getHostelStudents();

      setHostelBranches(branchesResponse || []);
      setHostelStudents(studentsResponse || []);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to load hostel dashboard data');
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate, user?.role]);

  const recentStudents = hostelStudents
    .slice()
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex h-screen bg-gray">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Hostel Dashboard</h1>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Link to="/hostel" className="block">
                <StatCard
                  title="Total Branches"
                  value={hostelBranches.length}
                  icon={<Building className="h-6 w-6 text-green-500" />}
                  iconBgColor="bg-green-100"
                  arrowIcon={<ChevronRight className="h-5 w-5 text-green-400" />}
                />
              </Link>
              <Link to="/hostel" className="block">
                <StatCard
                  title="Total Students"
                  value={hostelStudents.length}
                  icon={<Users className="h-6 w-6 text-purple-500" />}
                  iconBgColor="bg-purple-100"
                  arrowIcon={<ChevronRight className="h-5 w-5 text-purple-400" />}
                />
              </Link>
            </div>

            {/* Branches Section */}
            <h2 className="text-2xl font-semibold mb-4">Branches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {hostelBranches.map((branch: any) => (
                <Link key={branch.id} to={`/hostel/branches/${branch.id}/students`} className="block">
                  <StatCard
                    title={branch.name}
                    value={branch.studentCount || 0}
                    icon={<Building className="h-6 w-6 text-green-500" />}
                    iconBgColor="bg-green-100"
                    arrowIcon={<ChevronRight className="h-5 w-5 text-green-400" />}
                  />
                </Link>
              ))}
              {hostelBranches.length === 0 && (
                <p className="text-gray-500">No branches found.</p>
              )}
            </div>

            {/* Recently Added Students Section */}
            <h2 className="text-2xl font-semibold mb-4">Recently Added Students</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Branch</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Added On</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student: any) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{student.name || 'N/A'}</td>
                      <td className="px-6 py-4">{student.phoneNumber || 'N/A'}</td>
                      <td className="px-6 py-4">{student.branchName || 'N/A'}</td>
                      <td className="px-6 py-4">
                        {student.createdAt
                          ? new Date(student.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/hostel/students/${student.id}`}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <Eye size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {recentStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDashboard;