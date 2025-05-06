import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import HostelStudentForm from '../components/HostelStudentForm';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EditHostelStudent = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: student, isLoading: studentLoading, error: studentError } = useQuery({
    queryKey: ['hostelStudent', id],
    queryFn: () => api.getHostelStudent(id!),
    enabled: !!id,
  });

  const { data: branches, isLoading: branchesLoading, error: branchesError } = useQuery({
    queryKey: ['hostelBranches'],
    queryFn: () => api.getHostelBranches(),
  });

  const updateStudentMutation = useMutation({
    mutationFn: (studentData: any) => api.updateHostelStudent(id!, studentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostelStudent', id] });
      queryClient.invalidateQueries({ queryKey: ['hostelBranches'] });
      toast.success('Student updated successfully');
      navigate(`/hostel/students/${id}`);
    },
    onError: () => {
      toast.error('Failed to update student');
    },
  });

  if (studentLoading || branchesLoading) return <div className="p-6">Loading...</div>;
  if (studentError) return <div className="p-6">Error: {(studentError as Error).message}</div>;
  if (branchesError) return <div className="p-6">Error: {(branchesError as Error).message}</div>;
  if (!student) return <div className="p-6">Student not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Hostel Student</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <HostelStudentForm
          branches={branches || []}
          onSubmit={updateStudentMutation.mutate}
          initialData={student}
        />
      </div>
    </div>
  );
};

export default EditHostelStudent;