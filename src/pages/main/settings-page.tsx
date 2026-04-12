import { useState } from 'react';
import { clsx } from 'clsx';

type TabType = 'integrations' | 'users';

interface Project {
  id: string;
  name: string;
  icon: string;
  status: 'completed' | 'pending' | 'in-progress' | 'warning';
}

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Frontend Redesign',
    icon: '👍',
    status: 'in-progress'
  },
  {
    id: '2',
    name: 'Task Group 3',
    icon: '✓',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Front end redesign',
    icon: '⏱',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Project 5',
    icon: '🔗',
    status: 'warning'
  }
];

function getStatusColor(status: Project['status']) {
  switch (status) {
    case 'completed':
      return 'text-green-400';
    case 'pending':
      return 'text-slate-400';
    case 'in-progress':
      return 'text-green-400';
    case 'warning':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
}

function getStatusIcon(project: Project) {
  const baseClasses = 'text-2xl';
  const colorClass = getStatusColor(project.status);

  // Map status to appropriate icon
  if (project.status === 'completed') {
    return <span className={clsx(baseClasses, colorClass)}>✓</span>;
  }
  if (project.status === 'pending') {
    return <span className={clsx(baseClasses, colorClass)}>⏱</span>;
  }
  if (project.status === 'in-progress') {
    return <span className={clsx(baseClasses, colorClass)}>👍</span>;
  }
  if (project.status === 'warning') {
    return <span className={clsx(baseClasses, colorClass)}>🔗</span>;
  }
  return null;
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('integrations');

  return (
    <main className='w-full h-dvh bg-slate-800 text-foreground overflow-y-auto'>
      <div className='w-full flex flex-col gap-8 p-8'>
        {/* Page Header */}
        <div className='w-full flex flex-col gap-6'>
          <h1 className='text-3xl font-bold text-slate-300'>Organization Settings</h1>

          {/* Tab Navigation */}
          <div className='flex gap-4'>
            <button
              onClick={() => setActiveTab('integrations')}
              className={clsx(
                'flex items-center gap-2 border rounded-lg px-4 py-2 transition-all font-medium',
                activeTab === 'integrations'
                  ? 'border-slate-600 bg-slate-700 text-white'
                  : 'border-slate-700 text-slate-400 hover:text-slate-300'
              )}
            >
              <span className='text-base'>🔗</span>
              Integrations
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={clsx(
                'flex items-center gap-2 border rounded-lg px-4 py-2 transition-all font-medium',
                activeTab === 'users'
                  ? 'border-slate-600 bg-slate-700 text-white'
                  : 'border-slate-700 text-slate-400 hover:text-slate-300'
              )}
            >
              <span className='text-base'>👤</span>
              Users
            </button>
          </div>
        </div>

        {/* Organization Section */}
        <div className='w-full flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold text-slate-300'>Git Org 1</h2>

          {/* Projects Section */}
          <div className='w-full flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-semibold text-slate-300'>Projects</h3>
              <div className='flex gap-3'>
                <button className='text-slate-300 hover:text-white transition-colors'>
                  <span className='text-xl'>🔍</span>
                </button>
                <button className='text-slate-300 hover:text-white transition-colors'>
                  <span className='text-xl'>➕</span>
                </button>
              </div>
            </div>

            {/* Projects List */}
            <div className='flex flex-col gap-3'>
              {MOCK_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className={clsx(
                    'w-full flex items-center justify-between p-4 rounded transition-colors',
                    project.status === 'completed'
                      ? 'bg-slate-700/50'
                      : 'hover:bg-slate-700/30'
                  )}
                >
                  <div className='flex items-center gap-3'>
                    {project.status === 'completed' && <span className='text-lg'>✓</span>}
                    <span className='text-lg font-semibold text-foreground'>
                      {project.name}
                    </span>
                  </div>
                  <div className='flex items-center justify-center w-8 h-8'>
                    {getStatusIcon(project)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
