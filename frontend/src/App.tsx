
import { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import type { Project, CreateProjectData } from './types/project.types';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject
} from './services/api';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Handle create project
  const handleCreateProject = async (data: CreateProjectData) => {
    await createProject(data);
    await loadProjects();
  };

  // Handle update project
  const handleUpdateProject = async (data: CreateProjectData) => {
    if (!selectedProject) return;
    await updateProject(selectedProject.id, data);
    await loadProjects();
  };

  // Handle delete project
  const handleDeleteProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        await loadProjects();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete project');
      }
    }
  };

  // Open modal for creating
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (project: Project) => {
    setModalMode('edit');
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Filter projects based on search and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate status counts
  const statusCounts = {
    pending: projects.filter(p => p.status === 'Pending').length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 min-h-32 sm:min-h-22">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl sm:text-2xl" style={{ paddingLeft: '20px' }}>🐘</span>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Hasthiya Project Tracker</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-600" style={{ paddingLeft: '20px' }}>Manage and track your projects efficiently</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md font-medium flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0 w-full sm:w-auto"
              style={{ marginRight: '32px', padding: '10px 20px', fontSize: '18px' }}
            >
              <svg style={{ width: '10px', height: '10px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
        </div>
      </header>

      <br></br>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-10" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 min-h-20 sm:min-h-20" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" style={{ left: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-4 h-10 sm:h-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 h-10 sm:h-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shrink-0"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-white rounded-lg border-2 border-dashed border-gray-300 px-4">
                <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">No projects found</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">Get started by creating your first project.</p>
                <button
                  onClick={openCreateModal}
                  className="mt-4 sm:mt-6 inline-flex items-center px-5 py-3 sm:px-4 sm:py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Project
                </button>
              </div>
            ) : (
              <>
                {/* Projects Count and Status Summary */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3" style={{ marginTop: '32px' }}>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Showing <span className="font-semibold">{filteredProjects.length}</span> of <span className="font-semibold">{projects.length}</span> projects
                  </p>
                  <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm">
                    <span className="whitespace-nowrap flex items-center justify-center bg-yellow-400 text-yellow-900 font-semibold border border-yellow-500" style={{ width: '80px', height: '55px', flexDirection: 'column', fontSize: '11px', borderRadius: '10px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{statusCounts.pending}</span>
                      <span>Pending</span>
                    </span>
                    <span className="whitespace-nowrap flex items-center justify-center bg-blue-400 text-blue-900 font-semibold border border-blue-500" style={{ width: '80px', height: '55px', flexDirection: 'column', fontSize: '11px', borderRadius: '10px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{statusCounts.inProgress}</span>
                      <span style={{ fontSize: '9px' }}>In Progress</span>
                    </span>
                    <span className="whitespace-nowrap flex items-center justify-center bg-green-400 text-green-900 font-semibold border border-green-500" style={{ width: '80px', height: '55px', flexDirection: 'column', fontSize: '11px', borderRadius: '10px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{statusCounts.completed}</span>
                      <span>Completed</span>
                    </span>
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 ml-4 sm:ml-8 lg:ml-12" style={{ marginTop: '32px' }}>
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={openEditModal}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === 'create' ? handleCreateProject : handleUpdateProject}
        project={selectedProject}
        mode={modalMode}
      />
    </div>
  );
}

export default App;


