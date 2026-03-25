import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  icon: 'thumbs-up' | 'clock' | 'network' | 'none';
  isSelected?: boolean;
  expandable?: boolean;
}

interface ProjectGroup {
  id: string;
  name: string;
  icon: 'network';
  isExpanded?: boolean;
  children?: Project[];
}

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'users'>(
    'integrations'
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['group-1']));

  // Mock projects data
  const projectGroups: ProjectGroup[] = [
    {
      id: 'group-1',
      name: 'Platform Monorepo',
      icon: 'network',
      isExpanded: true,
      children: [
        {
          id: 'proj-1',
          name: 'Frontend Redesign',
          icon: 'thumbs-up',
          isSelected: false
        },
        {
          id: 'proj-2',
          name: 'Backend API Refactor',
          icon: 'thumbs-up',
          isSelected: false
        },
        {
          id: 'proj-3',
          name: 'Mobile App',
          icon: 'thumbs-up',
          isSelected: true
        }
      ]
    },
    {
      id: 'proj-4',
      name: 'Frontend Redesign',
      icon: 'clock',
      isSelected: false
    },
    {
      id: 'proj-5',
      name: 'Project 5',
      icon: 'network',
      isSelected: false,
      expandable: true
    }
  ];

  const toggleGroupExpansion = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'thumbs-up':
        return (
          <svg
            className='w-5 h-5 text-slate-400'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M2 10.5a1.5 1.5 0 113 0v-7a1.5 1.5 0 00-3 0v7z' />
            <path d='M14 4a2 2 0 100-4 2 2 0 000 4z' />
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
              d='M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        );
      case 'network':
        return (
          <svg
            className='w-5 h-5 text-red-400'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1116 0 8 8 0 01-16 0z' />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderProjectItem = (project: Project, depth: number = 0) => {
    const paddingClass = depth > 0 ? 'pl-12' : 'pl-4';
    return (
      <div
        key={project.id}
        className={`w-full flex items-center gap-4 py-3 px-4 border-b border-slate-600 hover:bg-slate-700/30 transition-colors last:border-b-0 ${paddingClass}`}
      >
        {project.icon !== 'none' && renderIcon(project.icon)}
        <span className='text-white flex-1'>{project.name}</span>
        {project.isSelected && (
          <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </div>
    );
  };

  const renderProjectGroup = (group: ProjectGroup) => {
    const isExpanded = expandedGroups.has(group.id);
    const hasChildren = group.children && group.children.length > 0;

    return (
      <div key={group.id}>
        <div
          className='w-full flex items-center gap-4 py-3 px-4 border-b border-slate-600 hover:bg-slate-700/30 transition-colors cursor-pointer'
          onClick={() => hasChildren && toggleGroupExpansion(group.id)}
        >
          {group.icon !== 'none' && renderIcon(group.icon)}
          <span className='text-white flex-1'>{group.name}</span>
          {hasChildren && (
            <svg
              className={`w-5 h-5 text-slate-400 transform transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className='border-l border-slate-600 ml-0'>
            {group.children?.map((child) => renderProjectItem(child, 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className='w-full h-dvh flex flex-col gap-6 p-6 bg-slate-900 text-white overflow-y-auto'>
      {/* Header */}
      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-semibold text-slate-300'>
          Organization Settings
        </h1>

        {/* Tab Navigation */}
        <div className='flex gap-6 border-b border-slate-600 pb-4'>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              activeTab === 'integrations'
                ? 'border-b-2 border-white text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10.5 1.5H3a1.5 1.5 0 00-1.5 1.5v14a1.5 1.5 0 001.5 1.5h14a1.5 1.5 0 001.5-1.5V9.5' />
              <path d='M6 14h8M6 10h8' strokeLinecap='round' stroke='currentColor' fill='none' />
            </svg>
            Integrations
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              activeTab === 'users'
                ? 'border-b-2 border-white text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M10 10a2 2 0 100-4 2 2 0 000 4zM5.172 14.243a4 4 0 017.656 0M15 13H5a3 3 0 00-3 3v2h16v-2a3 3 0 00-3-3z' />
            </svg>
            Users
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-medium text-slate-300'>Projects</h2>
          <button
            className='flex items-center justify-center w-10 h-10 border border-slate-600 rounded-full hover:border-slate-500 hover:bg-slate-700/30 transition-colors'
            aria-label='Add project'
          >
            <svg
              className='w-6 h-6 text-slate-400'
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

        {/* Projects List */}
        <div className='border border-slate-600 rounded-lg overflow-hidden bg-slate-700/20'>
          {projectGroups.map((group) =>
            group.children && group.children.length > 0
              ? renderProjectGroup(group)
              : renderProjectItem(group as any)
          )}
        </div>
      </div>
    </main>
  );
}
