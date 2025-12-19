
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 sm:p-10 hover:shadow-xl hover:border-blue-300 transition-all duration-200" style={{ minHeight: '220px', paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
        <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 flex-1 leading-tight">{project.name}</h3>
        <span className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap shrink-0 ${getStatusColor(project.status)}`} style={{ padding: '8px 16px', fontSize: '15px' }}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p 
        className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '3.5rem'
        }}
      >
        {project.description || 'No description provided'}
      </p>

      {/* Due Date */}
      <div className="flex items-center mb-4 sm:mb-6 text-sm sm:text-base">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={overdue ? 'text-red-600 font-semibold' : 'text-gray-600'}>
          Due: {formatDateForDisplay(project.due_date)}
          {overdue && ' ⚠️ Overdue'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 sm:pt-5 border-t border-gray-200" style={{ paddingTop: '12px' }}>
        <button
          onClick={() => onEdit(project)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 sm:px-5 py-3 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200 shadow-sm"
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 sm:px-5 py-3 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200 shadow-sm"
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;