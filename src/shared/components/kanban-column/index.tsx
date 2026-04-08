import { KanbanCard } from '../kanban-card';

interface Card {
  id: string;
  title: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface KanbanColumnProps {
  id: string;
  title: string;
  cards: Card[];
  onCardDragStart?: (cardId: string, columnId: string) => void;
  onCardDragEnd?: (cardId: string) => void;
  onCardDropped?: (cardId: string, targetColumnId: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function KanbanColumn({
  id,
  title,
  cards,
  onCardDragStart,
  onCardDragEnd,
  onCardDropped,
  onDragOver
}: KanbanColumnProps) {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    cardId: string
  ) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceColumnId', id);
    onCardDragStart?.(cardId, id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    if (cardId) {
      onCardDropped?.(cardId, id);
    }
  };

  const handleDragOverDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver?.(e);
  };

  return (
    <div className='flex flex-col gap-3 w-full min-w-80 h-full'>
      <div className='flex items-center justify-between px-1'>
        <h3 className='font-semibold text-lg'>{title}</h3>
        <span className='bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded'>
          {cards.length}
        </span>
      </div>

      <div
        onDragOver={handleDragOverDefault}
        onDrop={handleDrop}
        className='flex flex-col gap-3 p-3 bg-slate-50 rounded border-2 border-dashed border-slate-300 flex-1 overflow-y-auto'
      >
        {cards.length === 0 ? (
          <div className='flex items-center justify-center h-24 text-slate-400'>
            <p className='text-sm'>No cards yet</p>
          </div>
        ) : (
          cards.map((card) => (
            <KanbanCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              priority={card.priority}
              onDragStart={(e) => handleDragStart(e, card.id)}
              onDragEnd={() => onCardDragEnd?.(card.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
