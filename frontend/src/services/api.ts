import type { Project, CreateProjectData, UpdateProjectData } from '../types/project.types';

const API_BASE_URL = 'http://localhost:5000/api';

// Generic API response interface
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  const result: ApiResponse<Project[]> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.message || 'Failed to fetch projects');
  }
  
  return result.data;
};

// Fetch single project
export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  const result: ApiResponse<Project> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.message || 'Failed to fetch project');
  }
  
  return result.data;
};

// Create new project
export const createProject = async (projectData: CreateProjectData): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  
  const result: ApiResponse<Project> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to create project');
  }
  
  return result.data!;
};

// Update project
export const updateProject = async (
  id: number,
  projectData: UpdateProjectData
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  
  const result: ApiResponse<null> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to update project');
  }
};

// Delete project
export const deleteProject = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
  
  const result: ApiResponse<null> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete project');
  }
};