import { useState } from 'react';

import { KanbanColumn } from '@/shared/components/kanban-column';

interface Card {
  id: string;
  title: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: '1',
        title: 'Design new dashboard',
        description: 'Create wireframes and mockups',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Setup database schema',
        description: 'PostgreSQL tables for users',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Write documentation',
        priority: 'low'
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    cards: [
      {
        id: '4',
        title: 'Implement authentication',
        description: 'JWT-based login system',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Build API endpoints',
        description: 'REST API for main features',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'review',
    title: 'Under Review',
    cards: [
      {
        id: '6',
        title: 'Code review for user service',
        priority: 'medium'
      },
      {
        id: '7',
        title: 'Test payment integration',
        description: 'Stripe integration testing',
        priority: 'high'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: '8',
        title: 'Project setup',
        description: 'Initialize React + Vite',
        priority: 'low'
      },
      {
        id: '9',
        title: 'Install dependencies',
        priority: 'low'
      },
      {
        id: '10',
        title: 'Configure Tailwind CSS',
        priority: 'low'
      }
    ]
  }
];

export function KanbanView() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const handleCardDragStart = (cardId: string, _columnId: string) => {
    setDraggedCardId(cardId);
  };

  const handleCardDragEnd = () => {
    setDraggedCardId(null);
  };

  const handleCardDropped = (cardId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => ({ ...col }));

      // Find source and target columns
      let sourceColumn = newColumns.find((col) =>
        col.cards.some((card) => card.id === cardId)
      );
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);

      if (!sourceColumn || !targetColumn) return prevColumns;

      // Find the card
      const cardIndex = sourceColumn.cards.findIndex(
        (card) => card.id === cardId
      );
      if (cardIndex === -1) return prevColumns;

      const [card] = sourceColumn.cards.splice(cardIndex, 1);

      // Add to target column
      targetColumn.cards.push(card);

      return newColumns;
    });

    setDraggedCardId(null);
  };

  return (
    <main className='flex w-full flex-col h-dvh gap-6 bg-white p-6'>
      <div>
        <h1 className='text-3xl font-bold'>Kanban Board</h1>
        <p className='text-slate-600 text-sm mt-1'>
          Drag cards between columns to organize your tasks
        </p>
      </div>

      <div
        className='flex gap-6 overflow-x-auto pb-4 flex-1'
        style={{
          scrollBehavior: 'smooth'
        }}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            onCardDragStart={handleCardDragStart}
            onCardDragEnd={handleCardDragEnd}
            onCardDropped={handleCardDropped}
          />
        ))}
      </div>
    </main>
  );
}
