import { useState } from 'react';

import { clsx } from 'clsx';

import { KanbanColumn } from '@/shared/components/kanban-column';
import type { KanbanTask, KanbanBoard as KanbanBoardType } from '@/shared/types/kanban';
import { animator } from '@/shared/helpers';

interface KanbanBoardProps {
  board: KanbanBoardType;
  onCardClick?: (task: KanbanTask) => void;
}

export function KanbanBoard({ board, onCardClick }: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);

  const handleCardClick = (task: KanbanTask) => {
    setSelectedTask(task);
    onCardClick?.(task);
  };

  return (
    <div
      className={clsx(
        'w-full h-full flex flex-col gap-6 p-6 bg-white',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Board Header */}
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>{board.title}</h1>
          <p className='text-sm text-slate-500'>
            Manage your tasks across different stages
          </p>
        </div>
      </div>

      {/* Columns Container - Horizontal Scroll */}
      <div className='flex-1 overflow-x-auto overflow-y-hidden'>
        <div className='flex gap-6 min-w-min h-full'>
          {board.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* Selected Task Info - Optional */}
      {selectedTask && (
        <div className='border-t pt-4 mt-4'>
          <div className='max-w-2xl'>
            <h4 className='font-semibold text-sm mb-2'>Selected Task</h4>
            <p className='text-sm text-slate-700 mb-1'>
              <strong>Title:</strong> {selectedTask.title}
            </p>
            <p className='text-sm text-slate-700 mb-1'>
              <strong>Description:</strong> {selectedTask.description}
            </p>
            <p className='text-sm text-slate-700'>
              <strong>Priority:</strong>{' '}
              {selectedTask.priority.charAt(0).toUpperCase() +
                selectedTask.priority.slice(1)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
