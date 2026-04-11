import { useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

type TabType = 'integrations' | 'users';

interface Project {
  id: string;
  name: string;
  isCompleted?: boolean;
  action?: 'like' | 'clock' | 'pin';
}

const ORGANIZATION_NAME = 'Git Org 1';

const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    name: 'Frontend Redesign',
    action: 'like'
  },
  {
    id: '2',
    name: 'Task Group 3',
    isCompleted: true,
    action: 'like'
  },
  {
    id: '3',
    name: 'Front end redesign',
    action: 'clock'
  },
  {
    id: '4',
    name: 'Project 5',
    action: 'pin'
  }
];

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('integrations');

  const renderActionIcon = (action?: string) => {
    switch (action) {
      case 'like':
        return (
          <svg
            className='w-5 h-5 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.788 1.106H5a2 2 0 01-2-2V9a2 2 0 012-2h6.4c1.268 0 2.519.946 2.905 2.21.364.955.544 1.926.564 2.79z'
            />
          </svg>
        );
      case 'clock':
        return (
          <svg
            className='w-5 h-5 text-slate-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        );
      case 'pin':
        return (
          <svg
            className='w-5 h-5 text-red-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4v2m0 5v2M4 12a8 8 0 1116 0 8 8 0 01-16 0z'
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <main
      className={clsx(
        'flex w-full flex-col gap-8 h-dvh p-6',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Header Section */}
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold text-slate-200'>Organization Settings</h1>

        {/* Tab Navigation */}
        <div className='flex gap-3'>
          <button
            onClick={() => setActiveTab('integrations')}
            className={clsx(
              'border py-3 px-6 rounded-full transition-all flex items-center gap-2',
              activeTab === 'integrations'
                ? 'border-slate-400 bg-slate-700'
                : 'border-slate-600 text-slate-400'
            )}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4'
              />
            </svg>
            Integrations
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={clsx(
              'border py-3 px-6 rounded-full transition-all flex items-center gap-2',
              activeTab === 'users'
                ? 'border-slate-400 bg-slate-700'
                : 'border-slate-600 text-slate-400'
            )}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
            Users
          </button>
        </div>
      </div>

      {/* Organization Name */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold text-slate-300'>{ORGANIZATION_NAME}</h2>
      </div>

      {/* Projects Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg text-slate-300'>Projects</h3>
          <div className='flex gap-3'>
            <button
              className='border border-slate-600 p-2 rounded hover:bg-slate-700 transition-colors'
              aria-label='Search'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
            <button
              className='border border-slate-600 p-2 rounded hover:bg-slate-700 transition-colors'
              aria-label='Add'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className='flex flex-col gap-2 max-h-[500px] overflow-y-auto'>
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={project.id}
              className={clsx(
                'flex items-center justify-between py-3 px-4 rounded border',
                project.isCompleted
                  ? 'bg-slate-700 border-slate-600'
                  : 'border-slate-600 hover:bg-slate-700/50 transition-colors'
              )}
            >
              <div className='flex items-center gap-3'>
                {project.isCompleted && (
                  <svg
                    className='w-4 h-4 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' />
                  </svg>
                )}
                <span className='text-slate-200'>{project.name}</span>
              </div>
              {renderActionIcon(project.action)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
