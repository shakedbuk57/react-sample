import { useState } from 'react';

import type { KanbanBoard, KanbanCard, KanbanCardStatus } from '@/shared/types';
import { KanbanColumnComponent } from './kanban-column';
import { animator } from '@/shared/helpers';

interface KanbanViewProps {
  board: KanbanBoard;
  onCardMove?: (cardId: string, newStatus: KanbanCardStatus) => void;
  title?: string;
}

export function KanbanView({ board, onCardMove, title = 'Kanban Board' }: KanbanViewProps) {
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [columns, setColumns] = useState(board.columns);

  const handleCardDragStart = (e: React.DragEvent<HTMLDivElement>, cardId: string) => {
    setDraggedCardId(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: KanbanCardStatus) => {
    e.preventDefault();

    if (!draggedCardId) return;

    // Find the card and its current column
    let cardToMove: KanbanCard | null = null;
    let sourceColumnIndex = -1;

    for (let i = 0; i < columns.length; i++) {
      const cardIndex = columns[i].cards.findIndex((c) => c.id === draggedCardId);
      if (cardIndex !== -1) {
        cardToMove = columns[i].cards[cardIndex];
        sourceColumnIndex = i;
        break;
      }
    }

    if (!cardToMove || sourceColumnIndex === -1) return;

    // If card is being moved to the same column, do nothing
    if (cardToMove.status === targetStatus) {
      setDraggedCardId(null);
      return;
    }

    // Create updated columns
    const newColumns = columns.map((col, colIndex) => {
      if (colIndex === sourceColumnIndex) {
        // Remove card from source column
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== draggedCardId)
        };
      }

      if (col.id === targetStatus) {
        // Add card to target column with updated status
        return {
          ...col,
          cards: [
            ...col.cards,
            {
              ...cardToMove,
              status: targetStatus
            }
          ]
        };
      }

      return col;
    });

    setColumns(newColumns);
    onCardMove?.(draggedCardId, targetStatus);
    setDraggedCardId(null);
  };

  return (
    <main className='w-full flex flex-col items-center justify-start h-auto gap-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-dvh'>
      <div className={`flex flex-col items-center gap-2 ${animator({ name: 'fadeInDown' })}`}>
        <h1 className='text-4xl font-bold text-foreground'>{title}</h1>
        <p className='text-slate-600'>Organize your tasks across columns</p>
      </div>

      <div className='w-full flex gap-6 p-4 overflow-x-auto pb-6 justify-center flex-wrap lg:flex-nowrap lg:justify-start'>
        {columns.map((column) => (
          <KanbanColumnComponent
            key={column.id}
            column={column}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleCardDragStart}
          />
        ))}
      </div>
    </main>
  );
}
