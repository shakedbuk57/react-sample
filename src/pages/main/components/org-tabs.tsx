import { clsx } from 'clsx';

export type TabType = 'integrations' | 'users';

interface OrgTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function OrgTabs({ activeTab, onTabChange }: OrgTabsProps) {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'integrations', label: 'Integrations', icon: '🚀' },
    { id: 'users', label: 'Users', icon: '👤' }
  ];

  return (
    <div className='flex gap-6 border-b mb-6'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'py-3 px-2 border-b-2 flex gap-2 items-center',
            activeTab === tab.id
              ? 'border-white text-white'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          )}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
