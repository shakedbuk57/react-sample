import { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';

type Tab = 'integrations' | 'users';

interface ListItem {
  id: string;
  name: string;
  icon?: string;
  isLiked?: boolean;
  children?: ListItem[];
}

const INTEGRATIONS_DATA: ListItem[] = [
  {
    id: '1',
    name: 'Frontend Redesign',
    isLiked: true
  },
  {
    id: '2',
    name: 'Platform Playground',
    children: []
  },
  {
    id: '3',
    name: 'Platform Monorepo',
    children: [
      {
        id: '3-1',
        name: 'Sub Item 1'
      },
      {
        id: '3-2',
        name: 'Sub Item 2'
      }
    ]
  }
];

const ORGANIZATIONS = ['Git Org 1', 'Git Org 2', 'Git Org 3'];

export function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('integrations');
  const [selectedOrg, setSelectedOrg] = useState(ORGANIZATIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['3'])
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return INTEGRATIONS_DATA.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleExpand = (id: string) => {
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

  const renderListItem = (item: ListItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <div
          className={clsx(
            'w-full flex items-center justify-between py-4 px-4',
            level === 0 && 'border-b border-slate-600'
          )}
        >
          <div className='flex items-center gap-3'>
            {hasChildren && (
              <button
                onClick={() => toggleExpand(item.id)}
                className='text-slate-400 hover:text-slate-200 transition-colors w-5 flex items-center justify-center text-lg'
              >
                <span
                  className={clsx(
                    'transition-transform inline-block',
                    isExpanded ? 'rotate-90' : ''
                  )}
                >
                  ▶
                </span>
              </button>
            )}
            {!hasChildren && <span className='w-5'></span>}
            <span className='text-white font-medium'>{item.name}</span>
          </div>
          {item.isLiked && (
            <span className='text-green-400 text-xl'>👍</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {item.children?.map((child) =>
              renderListItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className={clsx(
      'w-full h-dvh flex flex-col bg-slate-800 text-white p-6',
      animator({ name: 'fadeIn' })
    )}>
      <div className='mb-8 bg-slate-700 p-4 rounded'>
        <h1 className='text-2xl font-semibold mb-4 text-slate-200'>
          Organization Settings
        </h1>

        {/* Tab Navigation */}
        <div className='flex gap-3'>
          <button
            onClick={() => setActiveTab('integrations')}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded border transition-colors',
              activeTab === 'integrations'
                ? 'border-slate-400 bg-slate-700 text-white'
                : 'border-slate-600 text-slate-300 hover:border-slate-500'
            )}
          >
            <span className='text-lg'>⚡</span>
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded border transition-colors',
              activeTab === 'users'
                ? 'border-slate-400 bg-slate-700 text-white'
                : 'border-slate-600 text-slate-300 hover:border-slate-500'
            )}
          >
            <span className='text-lg'>👤</span>
            Users
          </button>
        </div>
      </div>

      {/* Organization Dropdown */}
      <div className='mb-6'>
        <div className='flex items-center justify-between bg-slate-700 border border-slate-600 rounded px-4 py-2 hover:border-slate-500 transition-colors'>
          <select
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className='flex-1 bg-transparent text-slate-300 cursor-pointer focus:outline-none appearance-none'
          >
            {ORGANIZATIONS.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
          <span className='text-slate-400 pointer-events-none'>▼</span>
        </div>
      </div>

      {/* Search Input */}
      <div className='mb-6'>
        <div className='relative flex items-center'>
          <span className='absolute left-4 text-slate-400'>🔍</span>
          <input
            type='text'
            placeholder='Find...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={clsx(
              'w-full bg-slate-700 text-white border-2 border-blue-500 rounded px-4 py-2 pl-10',
              'placeholder-slate-400 focus:outline-none'
            )}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className='absolute right-3 text-slate-400 hover:text-white transition-colors text-lg'
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* List Items */}
      <div className='flex-1 overflow-y-auto'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => renderListItem(item))
        ) : (
          <div className='text-slate-400 text-center py-8'>
            No items found
          </div>
        )}
      </div>
    </main>
  );
}
