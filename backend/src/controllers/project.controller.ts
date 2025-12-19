import { Request, Response } from 'express';
import pool from '../config/database';
import { CreateProjectRequest, UpdateProjectRequest } from '../types/project.types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Get all projects
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};

// Get single project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch project' });
  }
};

// Create new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, due_date }: CreateProjectRequest = req.body;

    // Validation
    if (!name || !due_date) {
      res.status(400).json({ 
        success: false, 
        message: 'Project name and due date are required' 
      });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO projects (name, description, status, due_date) VALUES (?, ?, ?, ?)',
      [name, description || null, status || 'Pending', due_date]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { id: result.insertId, name, description, status, due_date }
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates: UpdateProjectRequest = req.body;

    // Build dynamic update query based on provided fields
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push('description = ?');
      values.push(updates.description);
    }
    if (updates.status !== undefined) {
      fields.push('status = ?');
      values.push(updates.status);
    }
    if (updates.due_date !== undefined) {
      fields.push('due_date = ?');
      values.push(updates.due_date);
    }

    if (fields.length === 0) {
      res.status(400).json({ success: false, message: 'No fields to update' });
      return;
    }

    values.push(id);
    const query = `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await pool.query<ResultSetHeader>(query, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({ 
      success: true, 
      message: 'Project updated successfully' 
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM projects WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({ 
      success: true, 
      message: 'Project deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
};