// Format date to YYYY-MM-DD for input fields
export const formatDateForInput = (date: string): string => {
  return new Date(date).toISOString().split('T')[0];
};

// Format date for display
export const formatDateForDisplay = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get status color for badges
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Completed':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

// Check if date is overdue
export const isOverdue = (dueDate: string, status: string): boolean => {
  if (status === 'Completed') return false;
  return new Date(dueDate) < new Date();
};