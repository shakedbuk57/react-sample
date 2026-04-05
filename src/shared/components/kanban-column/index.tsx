import { clsx } from 'clsx';

import { KanbanCard } from '@/shared/components/kanban-card';
import type { KanbanTask, KanbanColumn as KanbanColumnType } from '@/shared/types/kanban';

interface KanbanColumnProps {
  column: KanbanColumnType;
  onCardClick?: (task: KanbanTask) => void;
}

export function KanbanColumn({ column, onCardClick }: KanbanColumnProps) {
  return (
    <div className='flex flex-col gap-3 w-80 flex-shrink-0'>
      {/* Column Header */}
      <div className='flex items-center justify-between gap-2 pb-2 border-b'>
        <h3 className='font-semibold text-sm'>{column.title}</h3>
        <span className='bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium'>
          {column.tasks.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className='flex flex-col gap-2 flex-1 overflow-y-auto max-h-[600px]'>
        {column.tasks.length === 0 ? (
          <div className='flex items-center justify-center h-40 text-slate-400'>
            <p className='text-sm'>No tasks yet</p>
          </div>
        ) : (
          column.tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onCardClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
