import type { KanbanColumn, KanbanCard, KanbanCardStatus } from '@/shared/types';
import { KanbanCardComponent } from './kanban-card';
import { animator } from '@/shared/helpers';

interface KanbanColumnProps {
  column: KanbanColumn;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, targetStatus: KanbanCardStatus) => void;
  onCardDragStart?: (e: React.DragEvent<HTMLDivElement>, cardId: string) => void;
}

const COLUMN_COLORS = {
  'todo': { bg: 'bg-slate-50', border: 'border-slate-200', title: 'text-slate-700' },
  'in-progress': { bg: 'bg-blue-50', border: 'border-blue-200', title: 'text-blue-700' },
  'done': { bg: 'bg-green-50', border: 'border-green-200', title: 'text-green-700' }
};

export function KanbanColumnComponent({
  column,
  onDragOver,
  onDrop,
  onCardDragStart
}: KanbanColumnProps) {
  const colors = COLUMN_COLORS[column.id];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragOver?.(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop?.(e, column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex flex-col gap-4 p-4 rounded-lg border-2 ${colors.bg} ${colors.border} w-full max-w-sm min-h-96 ${animator({ name: 'fadeIn' })}`}
    >
      <div className='flex items-center justify-between'>
        <h3 className={`font-bold text-lg ${colors.title}`}>{column.title}</h3>
        <span className={`text-sm font-semibold ${colors.title} bg-white px-2 py-1 rounded`}>
          {column.cards.length}
        </span>
      </div>

      <div className='flex flex-col gap-3 flex-1'>
        {column.cards.length === 0 ? (
          <div className='flex items-center justify-center h-32 text-slate-400'>
            <p className='text-sm'>No cards yet</p>
          </div>
        ) : (
          column.cards.map((card) => (
            <KanbanCardComponent
              key={card.id}
              card={card}
              onDragStart={onCardDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}
