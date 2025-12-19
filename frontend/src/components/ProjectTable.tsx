import React from 'react';
import type { Project } from '../types/project.types';
import { formatDateForDisplay, getStatusColor, isOverdue } from '../utils/helpers';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th scope="col" className="px-6 py-5 text-left text-sm font-semibold text-gray-700" style={{ padding: '20px 24px' }}>
                Name
              </th>
              <th scope="col" className="px-6 py-5 text-left text-sm font-semibold text-gray-700" style={{ padding: '20px 24px' }}>
                Description
              </th>
              <th scope="col" className="px-6 py-5 text-left text-sm font-semibold text-gray-700" style={{ padding: '20px 24px' }}>
                Status
              </th>
              <th scope="col" className="px-6 py-5 text-left text-sm font-semibold text-gray-700" style={{ padding: '20px 24px' }}>
                Due Date
              </th>
              <th scope="col" className="px-6 py-5 text-left text-sm font-semibold text-gray-700" style={{ padding: '20px 24px' }}>
                Created At
              </th>
              <th scope="col" className="px-6 py-5 text-center text-sm font-semibold text-gray-700" style={{ padding: '20px 24px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {projects.map((project) => {
              const overdue = isOverdue(project.due_date, project.status);
              return (
                <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap" style={{ padding: '20px 24px' }}>
                    <div className="flex items-center">
                      <div className="shrink-0 h-8 w-8 flex items-center justify-center rounded bg-blue-100 text-blue-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5" style={{ padding: '20px 24px' }}>
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {project.description || 'No description'}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap" style={{ padding: '20px 24px' }}>
                    <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-md border ${getStatusColor(project.status)}`}>
                      {project.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap" style={{ padding: '20px 24px' }}>
                    <div className={`text-sm ${overdue ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                      {formatDateForDisplay(project.due_date)}
                      {overdue && <span className="ml-1.5">⚠️</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap" style={{ padding: '20px 24px' }}>
                    <div className="text-sm text-gray-700">
                      {formatDateForDisplay(project.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center" style={{ padding: '20px 24px' }}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(project)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors"
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onEdit(project)}
                        className="text-gray-600 hover:text-gray-800 p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(project.id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
