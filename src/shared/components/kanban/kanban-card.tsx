import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface KanbanCardProps {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const getPriorityColor = (
  priority: 'low' | 'medium' | 'high'
): { borderColor: string; textColor: string } => {
  switch (priority) {
    case 'high':
      return { borderColor: '#ef4444', textColor: '#ef4444' };
    case 'medium':
      return { borderColor: '#f59e0b', textColor: '#f59e0b' };
    case 'low':
      return { borderColor: '#22c55e', textColor: '#22c55e' };
  }
};

const getPriorityLabel = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
  }
};

export function KanbanCard({
  id,
  title,
  description,
  priority,
  draggable = true,
  onDragStart
}: KanbanCardProps) {
  const colors = getPriorityColor(priority);

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className={clsx(
        'flex flex-col w-full gap-2 border p-4 rounded bg-card cursor-move hover:shadow-md transition-shadow',
        'border-l-4'
      )}
      style={{ borderLeftColor: colors.borderColor }}
      data-card-id={id}
    >
      <div className='flex items-start justify-between gap-2'>
        <h3 className='font-semibold text-sm flex-1'>{title}</h3>
        <span
          className='text-xs font-bold px-2 py-1 rounded'
          style={{ color: colors.textColor }}
        >
          {getPriorityLabel(priority)}
        </span>
      </div>

      {description && <p className='text-xs text-slate-500'>{description}</p>}
    </div>
  );
}
