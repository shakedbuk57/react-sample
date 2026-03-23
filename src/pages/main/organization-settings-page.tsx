import { useState } from 'react';
import { Link } from 'react-router';

import { APP_ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { clsx } from 'clsx';

import { OrgTabs, type TabType } from './components/org-tabs';
import { OrgDropdown } from './components/org-dropdown';
import { SearchInput } from './components/search-input';
import { ExpandableListItem } from './components/expandable-list-item';
import {
  MOCK_ORGANIZATIONS,
  MOCK_PROJECTS,
  MOCK_USERS
} from './data/mock-data';

export function OrganizationSettingsPage() {
  const [selectedOrg, setSelectedOrg] = useState(MOCK_ORGANIZATIONS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('integrations');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects by selected organization
  const orgProjects = MOCK_PROJECTS.filter(
    (p) => p.organizationId === selectedOrg.id
  );

  // Filter based on search query
  const filteredProjects = orgProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRevokeProject = (projectId: string) => {
    console.log('Revoking project:', projectId);
  };

  return (
    <main className='flex flex-col w-full min-h-dvh bg-slate-950 text-white p-8'>
      <div
        className={clsx(
          'max-w-2xl mx-auto w-full',
          animator({ name: 'fadeIn' })
        )}
      >
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Organization Settings</h1>
          <Link
            to={APP_ROUTES.main}
            className='text-slate-400 hover:text-white underline text-sm'
          >
            Back to Main
          </Link>
        </div>

        {/* Organization Selector */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-2 text-slate-400'>
            Select Organization
          </label>
          <OrgDropdown
            organizations={MOCK_ORGANIZATIONS}
            selectedOrg={selectedOrg}
            onOrgChange={setSelectedOrg}
          />
        </div>

        {/* Tabs */}
        <OrgTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Search Input */}
        <div className='mb-6'>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              activeTab === 'integrations'
                ? 'Search projects...'
                : 'Search users...'
            }
          />
        </div>

        {/* Content Area */}
        {activeTab === 'integrations' && (
          <div className='space-y-3'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ExpandableListItem
                  key={project.id}
                  item={project}
                  onRevoke={handleRevokeProject}
                />
              ))
            ) : (
              <div className='text-center py-8'>
                <p className='text-slate-400'>
                  {searchQuery
                    ? 'No projects match your search'
                    : 'No projects available'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className='space-y-3'>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={clsx(
                    'w-full border rounded px-4 py-3 flex items-center justify-between bg-slate-900 hover:bg-slate-800',
                    animator({ name: 'fadeIn' })
                  )}
                >
                  <div className='flex-1'>
                    <h3 className='text-white font-semibold'>{user.name}</h3>
                    <p className='text-sm text-slate-400'>{user.email}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-sm bg-slate-700 px-3 py-1 rounded'>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-8'>
                <p className='text-slate-400'>
                  {searchQuery ? 'No users match your search' : 'No users found'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Browse Integrations Link */}
        {activeTab === 'integrations' && (
          <div className='mt-8 pt-6 border-t border-slate-700'>
            <Link
              to={APP_ROUTES.browseIntegrations}
              className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
            >
              Browse Available Integrations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
