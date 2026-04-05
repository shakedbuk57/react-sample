import type { KanbanCard } from '@/shared/types';
import { animator } from '@/shared/helpers';
import { clsx } from 'clsx';

interface KanbanCardComponentProps {
  card: KanbanCard;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, cardId: string) => void;
}

const PRIORITY_COLORS = {
  low: 'border-l-blue-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-red-500'
};

export function KanbanCardComponent({ card, onDragStart }: KanbanCardComponentProps) {
  const priorityColor = card.priority ? PRIORITY_COLORS[card.priority] : 'border-l-slate-300';

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, card.id)}
      className={clsx(
        'w-full flex flex-col gap-2 border-l-4 p-3 rounded bg-white shadow-sm hover:shadow-md transition-shadow cursor-move',
        priorityColor,
        animator({ name: 'fadeIn', speed: 'fast' })
      )}
    >
      <h4 className='font-bold text-sm text-foreground'>{card.title}</h4>

      {card.description && (
        <p className='text-xs text-slate-600 line-clamp-2'>{card.description}</p>
      )}

      <div className='flex items-center justify-between gap-2 flex-wrap'>
        {card.priority && (
          <span className='text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 capitalize'>
            {card.priority}
          </span>
        )}

        {card.assignee && (
          <span className='text-xs px-2 py-1 rounded bg-blue-100 text-blue-700'>
            {card.assignee}
          </span>
        )}

        {card.dueDate && (
          <span className='text-xs text-slate-500 ml-auto'>{card.dueDate}</span>
        )}
      </div>
    </div>
  );
}
