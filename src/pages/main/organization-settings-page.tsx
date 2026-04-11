import { useState } from 'react';
import { clsx } from 'clsx';

interface Project {
  id: string;
  name: string;
  hasCheckmark?: boolean;
  icon: 'thumbs-up' | 'clock' | 'broken-link' | 'settings';
  iconColor?: string;
}

interface Tab {
  id: 'integrations' | 'users';
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'integrations', label: 'Integrations', icon: '🔗' },
  { id: 'users', label: 'Users', icon: '👤' }
];

const PROJECTS: Project[] = [
  { id: '1', name: 'Frontend Redesign', icon: 'thumbs-up', iconColor: 'text-green-500' },
  {
    id: '2',
    name: 'Task Group 3',
    icon: 'thumbs-up',
    hasCheckmark: true,
    iconColor: 'text-green-500'
  },
  { id: '3', name: 'Front end redesign', icon: 'clock', iconColor: 'text-slate-400' },
  { id: '4', name: 'Project 5', icon: 'broken-link', iconColor: 'text-red-500' }
];

function IconComponent({
  type,
  color
}: {
  type: 'thumbs-up' | 'clock' | 'broken-link' | 'settings';
  color?: string;
}) {
  const baseClass = 'w-6 h-6 flex items-center justify-center';
  const colorClass = color || 'text-slate-400';

  switch (type) {
    case 'thumbs-up':
      return (
        <div className={clsx(baseClass, colorClass)}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-2.3L21 11a2 2 0 0 0-2-1.7z' />
            <path d='M3 21h4' />
          </svg>
        </div>
      );
    case 'clock':
      return (
        <div className={clsx(baseClass, colorClass)}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='9' />
            <polyline points='12 6 12 12 16 14' />
          </svg>
        </div>
      );
    case 'broken-link':
      return (
        <div className={clsx(baseClass, colorClass)}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
        </div>
      );
    case 'settings':
      return (
        <div className={clsx(baseClass, colorClass)}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='3' />
            <path d='M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24' />
          </svg>
        </div>
      );
  }
}

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'users'>('integrations');

  return (
    <main className='flex w-full flex-col h-dvh gap-6 py-6 bg-slate-800'>
      {/* Header */}
      <div className='px-6 pt-2'>
        <h1 className='text-2xl font-bold text-slate-200 mb-4'>Organization Settings</h1>

        {/* Tab Navigation */}
        <div className='flex gap-3'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center gap-2 border rounded-full py-2 px-4 transition-colors',
                activeTab === tab.id
                  ? 'border-slate-600 text-slate-200'
                  : 'border-slate-600 text-slate-400 hover:text-slate-300'
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className='flex-1 flex flex-col px-6 overflow-y-auto'>
        {/* Organization Name */}
        <div className='mb-6'>
          <h2 className='text-lg font-normal text-slate-400'>Git Org 1</h2>
        </div>

        {/* Projects Section */}
        <div className='flex flex-col gap-4'>
          {/* Projects Header */}
          <div className='flex items-center justify-between'>
            <h3 className='text-slate-400'>Projects</h3>
            <div className='flex gap-3'>
              <button className='p-2 border border-slate-600 rounded-lg text-slate-400 hover:text-slate-300'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='w-5 h-5'
                >
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.35-4.35' />
                </svg>
              </button>
              <button className='p-2 border border-slate-600 rounded-lg text-slate-400 hover:text-slate-300'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='w-5 h-5'
                >
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div className='flex flex-col gap-3'>
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className={clsx(
                  'flex items-center justify-between p-4 rounded-lg border',
                  project.hasCheckmark ? 'bg-slate-700 border-slate-600' : 'border-slate-700'
                )}
              >
                <div className='flex items-center gap-3'>
                  {project.hasCheckmark && (
                    <span className='text-green-500 mr-2'>✓</span>
                  )}
                  <span className='text-slate-200'>{project.name}</span>
                </div>

                <div className='flex items-center gap-4'>
                  <IconComponent type={project.icon} color={project.iconColor} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar (from Figma design) */}
      <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent px-6 py-6'>
        <div className='flex items-center justify-between bg-slate-700 rounded-xl p-4 max-w-xl mx-auto w-full'>
          <input
            type='text'
            placeholder='Ask Anything?'
            className='flex-1 bg-transparent text-slate-400 placeholder-slate-500 outline-none'
          />
          <div className='flex items-center gap-3'>
            <button className='text-slate-500 hover:text-slate-400 p-1'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <rect x='3' y='3' width='7' height='7' />
                <rect x='14' y='3' width='7' height='7' />
                <rect x='3' y='14' width='7' height='7' />
                <rect x='14' y='14' width='7' height='7' />
              </svg>
            </button>
            <button className='text-slate-500 hover:text-slate-400 p-1'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-5 h-5'>
                <path d='M12 19l9-9M12 19l-9-9' />
                <path d='M21 15.34V9a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v6.34' />
              </svg>
            </button>
            <button className='text-slate-500 hover:text-slate-400 p-1'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-5 h-5'>
                <path d='M23 7l-7 5 7 5V7z' />
                <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
              </svg>
            </button>
            <button className='text-slate-500 hover:text-slate-400 p-1'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <circle cx='12' cy='12' r='2' />
              </svg>
            </button>
            <button className='text-slate-500 hover:text-slate-400 p-1'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <rect x='4' y='4' width='3' height='3' />
                <rect x='10.5' y='4' width='3' height='3' />
                <rect x='17' y='4' width='3' height='3' />
                <rect x='4' y='10.5' width='3' height='3' />
                <rect x='10.5' y='10.5' width='3' height='3' />
                <rect x='17' y='10.5' width='3' height='3' />
                <rect x='4' y='17' width='3' height='3' />
                <rect x='10.5' y='17' width='3' height='3' />
                <rect x='17' y='17' width='3' height='3' />
              </svg>
            </button>
            <button className='bg-red-500 text-white rounded-full p-2 hover:bg-red-600'>
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z' />
                <path d='M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z' fill='white' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
