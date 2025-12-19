export interface Project {
  id?: number;
  name: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
  created_at?: Date;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  due_date?: string;
}