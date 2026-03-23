import { useState } from 'react';
import { ReadyStatus } from '@/shared/components/ready-status';
import { animator } from '@/shared/helpers';
import { clsx } from 'clsx';

type TabType = 'integrations' | 'users';

interface Project {
  id: string;
  name: string;
  description?: string;
  status?: 'ready' | 'pending' | 'error';
  hasCheckmark?: boolean;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Frontend Redesign',
    status: 'ready',
    hasCheckmark: false
  },
  {
    id: '2',
    name: 'Task Group 3',
    hasCheckmark: true,
    status: 'ready'
  },
  {
    id: '3',
    name: 'Front end redesign',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Project 5',
    status: 'error'
  }
];

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('integrations');

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'ready':
        return (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-green-500'
          >
            <path
              d='M9 16.17L4.83 12M9 16.17L19.9 5.27M9 16.17L5.41 19.76'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
          </svg>
        );
      case 'pending':
        return (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-slate-400'
          >
            <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
            <path
              d='M12 6V12L16 14'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-red-500'
          >
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
            <path
              d='M8 16L16 8M16 16L8 8'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <main className={clsx('flex w-full flex-col gap-6 p-6', animator({ name: 'fadeIn' }))}>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-slate-100'>Organization Settings</h1>

        {/* Tabs */}
        <div className='flex gap-3'>
          <button
            onClick={() => setActiveTab('integrations')}
            className={clsx(
              'flex gap-2 items-center px-4 py-2 rounded border',
              activeTab === 'integrations'
                ? 'border-slate-400 bg-slate-700 text-white'
                : 'border-slate-600 text-slate-300 hover:bg-slate-800'
            )}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='8' cy='8' r='2' stroke='currentColor' strokeWidth='2' />
              <circle cx='16' cy='8' r='2' stroke='currentColor' strokeWidth='2' />
              <circle cx='8' cy='16' r='2' stroke='currentColor' strokeWidth='2' />
              <circle cx='16' cy='16' r='2' stroke='currentColor' strokeWidth='2' />
              <line x1='10' y1='8' x2='14' y2='8' stroke='currentColor' strokeWidth='2' />
              <line x1='8' y1='10' x2='8' y2='14' stroke='currentColor' strokeWidth='2' />
              <line x1='16' y1='10' x2='16' y2='14' stroke='currentColor' strokeWidth='2' />
              <line x1='10' y1='16' x2='14' y2='16' stroke='currentColor' strokeWidth='2' />
            </svg>
            Integrations
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={clsx(
              'flex gap-2 items-center px-4 py-2 rounded border',
              activeTab === 'users'
                ? 'border-slate-400 bg-slate-700 text-white'
                : 'border-slate-600 text-slate-300 hover:bg-slate-800'
            )}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='8' r='4' stroke='currentColor' strokeWidth='2' />
              <path
                d='M4 20C4 15.58 7.58 12 12 12C16.42 12 20 15.58 20 20'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
            Users
          </button>
        </div>
      </div>

      {/* Organization Title */}
      <h2 className='text-xl font-semibold text-slate-300 mt-4'>Git Org 1</h2>

      {/* Projects Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium text-slate-300'>Projects</h3>
          <div className='flex gap-2'>
            <button className='p-2 rounded border border-slate-600 text-slate-400 hover:bg-slate-800'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                <path d='M12 8V16M8 12H16' stroke='currentColor' strokeWidth='2' />
              </svg>
            </button>
            <button className='p-2 rounded border border-slate-600 text-slate-400 hover:bg-slate-800'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                <path d='M8 12H16' stroke='currentColor' strokeWidth='2' />
              </svg>
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className='flex flex-col gap-3'>
          {MOCK_PROJECTS.map((project) => (
            <div
              key={project.id}
              className={clsx(
                'flex items-center justify-between p-4 rounded border',
                project.hasCheckmark ? 'bg-slate-700 border-slate-600' : 'border-slate-600'
              )}
            >
              <div className='flex items-center gap-3'>
                {project.hasCheckmark && (
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='text-green-500'
                  >
                    <path
                      d='M4 12L8 16L20 4'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
                <div className='flex flex-col'>
                  <h4 className='text-base font-medium text-slate-100'>{project.name}</h4>
                  {project.description && (
                    <p className='text-sm text-slate-400'>{project.description}</p>
                  )}
                </div>
              </div>
              {getStatusIcon(project.status)}
            </div>
          ))}
        </div>
      </div>

      {/* Ready Status Banner */}
      <div className='mt-8 flex items-center gap-4 rounded border border-green-500 bg-slate-700 p-4'>
        <ReadyStatus text='Ready' />
        <div className='flex items-center gap-2'>
          <span className='text-slate-100'>Everything set! lets start a</span>
          <a href='#' className='text-blue-400 underline'>
            New Task
          </a>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-slate-400'
          >
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
            <text x='12' y='16' textAnchor='middle' fill='currentColor' fontSize='12'>
              i
            </text>
          </svg>
        </div>
      </div>
    </main>
  );
}
