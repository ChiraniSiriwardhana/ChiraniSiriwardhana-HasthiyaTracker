// import React from 'react';
// import type { Project } from '../types/project.types';
// import { formatDateForDisplay, getStatusColor, isOverdue } from '../utils/helpers';

// interface ProjectCardProps {
//   project: Project;
//   onEdit: (project: Project) => void;
//   onDelete: (id: number) => void;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
//   const overdue = isOverdue(project.due_date, project.status);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-xl font-semibold text-gray-800 flex-1">{project.name}</h3>
//         <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
//           {project.status}
//         </span>
//       </div>

//       {/* Description */}
//       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//         {project.description || 'No description provided'}
//       </p>

//       {/* Due Date */}
//       <div className="flex items-center mb-4">
//         <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <span className={`text-sm ${overdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
//           Due: {formatDateForDisplay(project.due_date)}
//           {overdue && ' (Overdue)'}
//         </span>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2 pt-4 border-t border-gray-200">
//         <button
//           onClick={() => onEdit(project)}
//           className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(project.id)}
//           className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

import React from 'react';
import type { Project } from '../types/project.types';
import { formatDateForDisplay, getStatusColor, isOverdue } from '../utils/helpers';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const overdue = isOverdue(project.due_date, project.status);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
        <h3 className="text-base sm:text-xl font-semibold text-gray-900 flex-1 leading-tight">{project.name}</h3>
        <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium border whitespace-nowrap flex-shrink-0 ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p 
        className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.5rem'
        }}
      >
        {project.description || 'No description provided'}
      </p>

      {/* Due Date */}
      <div className="flex items-center mb-3 sm:mb-4 text-xs sm:text-sm">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={overdue ? 'text-red-600 font-semibold' : 'text-gray-600'}>
          Due: {formatDateForDisplay(project.due_date)}
          {overdue && ' ⚠️ Overdue'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 sm:pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(project)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;