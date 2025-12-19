export interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
  created_at: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  due_date?: string;
}