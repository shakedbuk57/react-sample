import { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';

type Tab = 'integrations' | 'users';

interface OrganizationItem {
  id: string;
  name: string;
  isExpanded: boolean;
  subItems?: string[];
}

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('integrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['git-org-1'])
  );

  // Mock data
  const organizationItems: OrganizationItem[] = [
    {
      id: 'git-org-1',
      name: 'Git Org 1',
      isExpanded: expandedItems.has('git-org-1'),
      subItems: ['Frontend Redesign']
    },
    {
      id: 'platform-playground',
      name: 'Platform Playground',
      isExpanded: expandedItems.has('platform-playground'),
      subItems: ['Module A', 'Module B', 'Module C']
    },
    {
      id: 'platform-monorepo',
      name: 'Platform Monorepo',
      isExpanded: expandedItems.has('platform-monorepo'),
      subItems: ['Service 1', 'Service 2']
    }
  ];

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery) return organizationItems;
    return organizationItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, organizationItems]);

  const handleToggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <main
      className={clsx(
        'w-full max-w-2xl mx-auto p-6 flex flex-col gap-6',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Header */}
      <h1 className='text-2xl font-bold'>Organization Settings</h1>

      {/* Tab Navigation */}
      <div className='flex gap-3'>
        <button
          onClick={() => setActiveTab('integrations')}
          className={clsx(
            'px-6 py-3 rounded border flex items-center gap-2 transition-colors',
            activeTab === 'integrations'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent text-foreground border-muted hover:bg-muted'
          )}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='1' />
            <path d='M9 11a3 3 0 0 0 6 0' />
            <path d='M12 17v4' />
            <path d='M8 19h8' />
            <path d='M3.48 9c.5-1.45 2.02-2.67 3.85-2.9M20.52 9c-.5-1.45-2.02-2.67-3.85-2.9' />
          </svg>
          Integrations
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={clsx(
            'px-6 py-3 rounded border flex items-center gap-2 transition-colors',
            activeTab === 'users'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent text-foreground border-muted hover:bg-muted'
          )}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
            <circle cx='12' cy='7' r='4' />
          </svg>
          Users
        </button>
      </div>

      {/* Search Input */}
      <div className='relative'>
        <div
          className={clsx(
            'flex items-center gap-3 px-4 py-3 border rounded',
            'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
          )}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-muted-foreground flex-shrink-0'
          >
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
          <input
            type='text'
            placeholder='Find...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground'
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className='text-muted-foreground hover:text-foreground transition-colors'
              aria-label='Clear search'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Organization Items List */}
      <div className='flex flex-col gap-2'>
        {filteredItems.map((item) => (
          <div key={item.id}>
            {/* Main Item */}
            <button
              onClick={() => handleToggleExpand(item.id)}
              className={clsx(
                'w-full flex items-center justify-between px-4 py-3 border rounded',
                'hover:bg-muted transition-colors text-left'
              )}
            >
              <div className='flex items-center gap-3'>
                {/* Chevron Icon */}
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={clsx(
                    'transition-transform flex-shrink-0',
                    expandedItems.has(item.id) ? 'rotate-180' : ''
                  )}
                >
                  <polyline points='6 9 12 15 18 9' />
                </svg>
                <span className='text-foreground'>{item.name}</span>
              </div>

              {/* Like Icon - appears for specific items */}
              {item.id === 'platform-playground' && (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='text-green-500 flex-shrink-0'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
              )}
            </button>

            {/* Expanded Items */}
            {expandedItems.has(item.id) && item.subItems && (
              <div className='ml-8 mt-2 flex flex-col gap-2 border-l border-muted pl-4'>
                {item.subItems.map((subItem, idx) => (
                  <div
                    key={idx}
                    className='py-2 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
