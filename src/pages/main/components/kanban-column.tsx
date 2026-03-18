import { clsx } from 'clsx';

import type { Task } from '../kanban-page';
import { KanbanCard } from './kanban-card';

interface KanbanColumnProps {
  column: { id: string; title: string; color: string };
  tasks: Task[];
  draggedTaskId: string | null;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDrop: (status: Task['status']) => void;
}

const colorMap: Record<string, string> = {
  slate: 'bg-slate-100 border-slate-300',
  blue: 'bg-blue-100 border-blue-300',
  yellow: 'bg-yellow-100 border-yellow-300',
  green: 'bg-green-100 border-green-300'
};

const colorHeaderMap: Record<string, string> = {
  slate: 'text-slate-700',
  blue: 'text-blue-700',
  yellow: 'text-yellow-700',
  green: 'text-green-700'
};

export function KanbanColumn({
  column,
  tasks,
  draggedTaskId,
  onDragStart,
  onDragEnd,
  onDrop
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropZone = () => {
    onDrop(column.id as Task['status']);
  };

  return (
    <div
      className={clsx(
        'flex flex-col w-80 flex-shrink-0 rounded-lg border-2 overflow-hidden',
        colorMap[column.color]
      )}
      onDragOver={handleDragOver}
      onDrop={handleDropZone}
    >
      {/* Column Header */}
      <div className='px-4 py-3 border-b border-inherit bg-white'>
        <h2 className={clsx('font-bold text-lg', colorHeaderMap[column.color])}>
          {column.title}
        </h2>
        <p className='text-sm text-gray-600 mt-1'>{tasks.length} items</p>
      </div>

      {/* Column Content */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {tasks.length === 0 ? (
          <div className='flex items-center justify-center h-32 text-gray-400'>
            <p className='text-sm text-center'>No tasks yet</p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              isDragging={draggedTaskId === task.id}
              onDragStart={() => onDragStart(task.id)}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
}
