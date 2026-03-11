import { ReactNode } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import type { TaskStatus } from '../kanban-page';

interface KanbanColumnProps {
  label: string;
  status: TaskStatus;
  children: ReactNode;
}

export function KanbanColumn({ label, children }: KanbanColumnProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 w-80 flex-shrink-0',
        animator({ name: 'fadeInUp' })
      )}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-slate-800'>{label}</h2>
        <span className='bg-slate-200 text-slate-700 rounded-full px-3 py-1 text-sm font-medium'>
          {/* Count will be managed by parent */}
        </span>
      </div>

      <div className='flex-1 bg-slate-100 rounded-lg p-4 overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}
