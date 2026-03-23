import { clsx } from 'clsx';
import { useState } from 'react';

import { animator } from '@/shared/helpers';
import type { Project } from '../data/mock-data';

interface ExpandableListItemProps {
  item: Project;
  onRevoke?: (id: string) => void;
}

export function ExpandableListItem({ item, onRevoke }: ExpandableListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.subProjects && item.subProjects.length > 0;

  return (
    <div className='w-full'>
      <div
        className={clsx(
          'w-full border rounded px-4 py-3 flex items-center justify-between bg-slate-900 hover:bg-slate-800 cursor-pointer',
          animator({ name: 'fadeIn' })
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className='flex-1'>
          <h3 className='text-white font-semibold'>{item.name}</h3>
          {item.description && (
            <p className='text-sm text-slate-400 mt-1'>{item.description}</p>
          )}
        </div>
        <div className='flex items-center gap-4'>
          {hasSubItems && (
            <span
              className={clsx(
                'transform transition-transform text-slate-400',
                isExpanded ? 'rotate-180' : ''
              )}
            >
              ▼
            </span>
          )}
        </div>
      </div>

      {isExpanded && hasSubItems && (
        <div className='ml-4 mt-2 space-y-2 border-l border-slate-700 pl-4'>
          {item.subProjects?.map((subItem) => (
            <div
              key={subItem.id}
              className={clsx(
                'w-full border rounded px-3 py-2 bg-slate-800 flex items-center justify-between',
                animator({ name: 'slideInLeft', speed: 'faster' })
              )}
            >
              <div className='flex-1'>
                <h4 className='text-slate-200'>{subItem.name}</h4>
              </div>
              {onRevoke && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRevoke(subItem.id);
                  }}
                  className='text-sm px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-white'
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
