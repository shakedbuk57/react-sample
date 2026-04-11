import { useState } from 'react';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';
import {
  CheckCircleIcon,
  ClockIcon,
  LinkBrokenIcon,
  ThumbsUpIcon,
  SearchIcon,
  PlusIcon,
  IntegrationIcon,
  UsersIcon,
  UpArrowIcon,
  AttachmentIcon,
  ImageIcon,
  MicrophoneIcon,
  GridIcon
} from '@/shared/components/icons';

type Tab = 'integrations' | 'users';

interface Project {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'failed' | 'approved';
}

const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Frontend Redesign', status: 'approved' },
  { id: '2', name: 'Task Group 3', status: 'completed' },
  { id: '3', name: 'Front end redesign', status: 'in_progress' },
  { id: '4', name: 'Project 5', status: 'failed' }
];

function ProjectStatusIcon({ status }: { status: Project['status'] }) {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon />;
    case 'in_progress':
      return <ClockIcon />;
    case 'failed':
      return <LinkBrokenIcon />;
    case 'approved':
      return <ThumbsUpIcon />;
  }
}

function ProjectListItem({ project }: { project: Project }) {
  return (
    <div
      className={clsx(
        'w-full flex items-center justify-between px-5 py-4 border-b border-slate-700 hover:bg-slate-800 transition-colors'
      )}
    >
      <div className='flex items-center gap-3'>
        {project.status === 'completed' && <CheckCircleIcon />}
        <span className='text-white text-lg font-medium'>{project.name}</span>
      </div>
      <ProjectStatusIcon status={project.status} />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all',
        active
          ? 'border-slate-500 bg-slate-700 text-white'
          : 'border-slate-700 text-slate-400 hover:border-slate-600'
      )}
    >
      <Icon />
      <span className='font-medium'>{label}</span>
    </button>
  );
}

function ChatInputBar() {
  const [input, setInput] = useState('');

  return (
    <div
      className={clsx(
        'w-full max-w-2xl mx-auto rounded-3xl bg-slate-700 p-4 flex items-center gap-4',
        animator({ name: 'fadeIn' })
      )}
    >
      <input
        type='text'
        placeholder='Ask Anything?'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='flex-1 bg-transparent text-slate-300 placeholder-slate-500 outline-none text-lg'
      />

      <div className='flex items-center gap-3'>
        <button className='p-2 hover:bg-slate-600 rounded-lg transition-colors'>
          <AttachmentIcon />
        </button>
        <button className='p-2 hover:bg-slate-600 rounded-lg transition-colors'>
          <ImageIcon />
        </button>
        <button className='p-2 hover:bg-slate-600 rounded-lg transition-colors'>
          <MicrophoneIcon />
        </button>
        <button className='p-2 hover:bg-slate-600 rounded-lg transition-colors'>
          <GridIcon />
        </button>
      </div>

      <button className='p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors flex items-center justify-center'>
        <UpArrowIcon />
      </button>
    </div>
  );
}

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('integrations');

  return (
    <main className='w-full flex flex-col items-center py-8 gap-8 min-h-screen bg-slate-900'>
      {/* Header */}
      <div className={clsx('w-full', animator({ name: 'fadeInDown' }))}>
        <h1 className='text-3xl font-bold text-slate-300 mb-6'>Organization Settings</h1>

        {/* Tabs */}
        <div className='flex gap-4'>
          <TabButton
            active={activeTab === 'integrations'}
            onClick={() => setActiveTab('integrations')}
            icon={IntegrationIcon}
            label='Integrations'
          />
          <TabButton
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
            icon={UsersIcon}
            label='Users'
          />
        </div>
      </div>

      {/* Organization Section */}
      <div
        className={clsx(
          'w-full',
          activeTab === 'integrations' ? 'block' : 'hidden',
          animator({ name: 'fadeIn' })
        )}
      >
        <h2 className='text-2xl font-semibold text-slate-400 mb-6'>Git Org 1</h2>

        {/* Projects Section */}
        <div className='w-full'>
          <div className='flex items-center justify-between px-5 mb-4'>
            <h3 className='text-lg font-semibold text-slate-400'>Projects</h3>
            <div className='flex gap-2'>
              <button className='p-2 border border-slate-700 rounded-full hover:border-slate-600 transition-colors'>
                <SearchIcon />
              </button>
              <button className='p-2 border border-slate-700 rounded-full hover:border-slate-600 transition-colors'>
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Project List */}
          <div className='w-full flex flex-col rounded-lg overflow-hidden border border-slate-700'>
            {MOCK_PROJECTS.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Users Tab Content */}
      <div
        className={clsx(
          'w-full text-center text-slate-400',
          activeTab === 'users' ? 'block' : 'hidden',
          animator({ name: 'fadeIn' })
        )}
      >
        <p className='py-8'>Users management content goes here</p>
      </div>

      {/* Chat Input Bar */}
      <ChatInputBar />
    </main>
  );
}
