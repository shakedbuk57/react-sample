import { useState } from 'react';
import { clsx } from 'clsx';

import type { Task, TaskStatus } from '../kanban-page';

interface KanbanCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (task: Task) => void;
  getPriorityColor: (priority: Task['priority']) => string;
}

export function KanbanCard({
  task,
  onMove,
  onDelete,
  getPriorityColor
}: KanbanCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleMove = (newStatus: TaskStatus) => {
    onMove(task.id, newStatus);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowMenu(false);
  };

  return (
    <div
      className={clsx(
        'bg-white border rounded-lg p-4 cursor-grab active:cursor-grabbing',
        'shadow-sm hover:shadow-md transition-shadow duration-200',
        'relative group'
      )}
    >
      <div className='flex flex-col gap-3'>
        {/* Header with priority and menu */}
        <div className='flex items-start justify-between gap-2'>
          <h3 className='font-semibold text-slate-800 flex-1 text-sm leading-snug'>
            {task.title}
          </h3>
          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='text-slate-400 hover:text-slate-600 p-1'
              aria-label='Task menu'
            >
              <svg
                className='w-4 h-4'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10.5 1.5H9.5V3.5H10.5V1.5ZM10.5 8.5H9.5V10.5H10.5V8.5ZM10.5 15.5H9.5V17.5H10.5V15.5Z' />
              </svg>
            </button>

            {showMenu && (
              <div className='absolute right-0 mt-1 w-40 bg-white border rounded-lg shadow-lg z-10 text-sm'>
                <button
                  onClick={() => handleMove('todo')}
                  className='w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700 first:rounded-t-lg'
                >
                  Move to To Do
                </button>
                <button
                  onClick={() => handleMove('inProgress')}
                  className='w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700'
                >
                  Move to In Progress
                </button>
                <button
                  onClick={() => handleMove('done')}
                  className='w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700'
                >
                  Move to Done
                </button>
                <div className='border-t' />
                <button
                  onClick={handleDelete}
                  className='w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 last:rounded-b-lg'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className='text-xs text-slate-600 leading-relaxed'>
            {task.description}
          </p>
        )}

        {/* Assignee and dates */}
        <div className='flex flex-col gap-2 text-xs'>
          {task.assignee && (
            <div className='flex items-center gap-2'>
              <span className='text-slate-500'>Assignee:</span>
              <span className='bg-blue-100 text-blue-700 rounded px-2 py-1'>
                {task.assignee}
              </span>
            </div>
          )}

          {task.dueDate && (
            <div className='flex items-center gap-2'>
              <span className='text-slate-500'>Due:</span>
              <span className='text-slate-700'>{task.dueDate}</span>
            </div>
          )}
        </div>

        {/* Priority indicator */}
        <div className='flex items-center gap-2 pt-2 border-t border-slate-100'>
          <span className={clsx('text-xs font-medium', getPriorityColor(task.priority))}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{' '}
            Priority
          </span>
        </div>
      </div>
    </div>
  );
}
