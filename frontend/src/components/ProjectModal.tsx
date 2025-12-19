// import { useState, useEffect } from 'react';
// import type { Project, CreateProjectData } from '../types/project.types';

// interface ProjectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: CreateProjectData) => Promise<void>;
//   project?: Project | null;
//   mode: 'create' | 'edit';
// }

// const ProjectModal: React.FC<ProjectModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   project,
//   mode
// }) => {
//   const [formData, setFormData] = useState<CreateProjectData>({
//     name: '',
//     description: '',
//     status: 'Pending',
//     due_date: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Populate form when editing
//   useEffect(() => {
//     if (mode === 'edit' && project) {
//       setFormData({
//         name: project.name,
//         description: project.description || '',
//         status: project.status,
//         due_date: project.due_date.split('T')[0] // Format date for input
//       });
//     } else {
//       // Reset form for create mode
//       setFormData({
//         name: '',
//         description: '',
//         status: 'Pending',
//         due_date: ''
//       });
//     }
//     setError(null);
//   }, [mode, project, isOpen]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     // Validation
//     if (!formData.name.trim()) {
//       setError('Project name is required');
//       return;
//     }

//     if (!formData.due_date) {
//       setError('Due date is required');
//       return;
//     }

//     setLoading(true);
//     try {
//       await onSubmit(formData);
//       onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {mode === 'create' ? 'Create New Project' : 'Edit Project'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
//             disabled={loading}
//           >
//             ×
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6">
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           {/* Project Name */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//               Project Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter project name"
//               disabled={loading}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter project description"
//               rows={3}
//               disabled={loading}
//             />
//           </div>

//           {/* Status */}
//           <div className="mb-4">
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <select
//               id="status"
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Pending' | 'In Progress' | 'Completed' })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           {/* Due Date */}
//           <div className="mb-6">
//             <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
//               Due Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               id="due_date"
//               value={formData.due_date}
//               onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//               required
//             />
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium disabled:bg-blue-300"
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProjectModal;

import { useState, useEffect } from 'react';
import type { Project, CreateProjectData } from '../types/project.types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectData) => Promise<void>;
  project?: Project | null;
  mode: 'create' | 'edit';
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  project,
  mode
}) => {
  const [formData, setFormData] = useState<CreateProjectData>({
    name: '',
    description: '',
    status: 'Pending',
    due_date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (mode === 'edit' && project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        status: project.status,
        due_date: project.due_date.split('T')[0] // Format date for input
      });
    } else {
      // Reset form for create mode
      setFormData({
        name: '',
        description: '',
        status: 'Pending',
        due_date: ''
      });
    }
    setError(null);
  }, [mode, project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Project name is required');
      return;
    }

    if (!formData.due_date) {
      setError('Due date is required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? '✨ Create New Project' : '✏️ Edit Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none font-light hover:rotate-90 transition-transform duration-200"
            disabled={loading}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Project Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Website Redesign"
              disabled={loading}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe your project..."
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Pending' | 'In Progress' | 'Completed' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              disabled={loading}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🚀 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="mb-6">
            <label htmlFor="due_date" className="block text-sm font-semibold text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="due_date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium shadow-sm transition-colors disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;