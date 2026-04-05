import { clsx } from 'clsx';

import type { KanbanTask } from '@/shared/types/kanban';

interface KanbanCardProps {
  task: KanbanTask;
  onCardClick?: (task: KanbanTask) => void;
}

const priorityColorMap: Record<KanbanTask['priority'], string> = {
  low: 'bg-slate-100 text-slate-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
};

export function KanbanCard({ task, onCardClick }: KanbanCardProps) {
  const handleClick = () => {
    onCardClick?.(task);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'w-full flex flex-col gap-3 border rounded p-3 cursor-pointer',
        'transition-all duration-200 hover:shadow-md hover:border-slate-400'
      )}
    >
      {/* Card Title */}
      <h4 className='font-semibold text-sm line-clamp-2'>{task.title}</h4>

      {/* Card Description */}
      {task.description && (
        <p className='text-xs text-slate-600 line-clamp-2'>{task.description}</p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className='flex gap-2 flex-wrap'>
          {task.tags.map((tag) => (
            <span
              key={tag}
              className='text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded'
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Priority Badge & Assignee */}
      <div className='flex items-center justify-between pt-1 gap-2'>
        <span
          className={clsx(
            'text-xs px-2 py-1 rounded font-medium',
            priorityColorMap[task.priority]
          )}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {task.assignee && (
          <span className='text-xs text-slate-600'>
            <span className='font-medium'>Assignee:</span> {task.assignee}
          </span>
        )}
      </div>
    </div>
  );
}
