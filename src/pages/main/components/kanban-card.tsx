import { clsx } from 'clsx';

import type { Task } from '../kanban-page';

interface KanbanCardProps {
  task: Task;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const priorityColorMap: Record<Task['priority'], string> = {
  low: 'bg-blue-100 text-blue-700',
  medium: 'bg-orange-100 text-orange-700',
  high: 'bg-red-100 text-red-700'
};

export function KanbanCard({
  task,
  isDragging,
  onDragStart,
  onDragEnd
}: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={clsx(
        'p-4 rounded-lg border-2 border-white bg-white cursor-move transition-all',
        'hover:border-gray-300 hover:shadow-md',
        isDragging && 'opacity-50 border-gray-400'
      )}
    >
      {/* Title */}
      <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div className='flex flex-wrap gap-2 items-center'>
        {/* Priority Badge */}
        <span
          className={clsx(
            'px-2 py-1 rounded text-xs font-medium',
            priorityColorMap[task.priority]
          )}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        {/* Assignee */}
        {task.assignee && (
          <span className='px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'>
            {task.assignee}
          </span>
        )}
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <p className='text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100'>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
