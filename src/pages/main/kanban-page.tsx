import { useState } from 'react';

import type { KanbanBoard, KanbanCardStatus } from '@/shared/types';
import { KanbanView } from '@/shared/components/kanban';
import { toast } from '@/shared/helpers';

const MOCK_KANBAN_DATA: KanbanBoard = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create mockups and wireframes for the new marketing site',
          status: 'todo',
          priority: 'high',
          assignee: 'Sarah'
        },
        {
          id: '2',
          title: 'Fix responsive layout',
          description: 'Mobile layout issues on homepage',
          status: 'todo',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Write API documentation',
          description: 'Complete endpoint documentation for v2 API',
          status: 'todo',
          priority: 'low',
          dueDate: '2024-01-15'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: '4',
          title: 'Implement authentication',
          description: 'Set up OAuth 2.0 with Google and GitHub',
          status: 'in-progress',
          priority: 'high',
          assignee: 'John',
          dueDate: '2024-01-10'
        },
        {
          id: '5',
          title: 'Optimize database queries',
          description: 'Reduce query time for reports endpoint',
          status: 'in-progress',
          priority: 'medium',
          assignee: 'Mike'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        {
          id: '6',
          title: 'Setup CI/CD pipeline',
          description: 'GitHub Actions workflow configuration',
          status: 'done',
          priority: 'high',
          assignee: 'Alex',
          dueDate: '2024-01-05'
        },
        {
          id: '7',
          title: 'Create user profile page',
          description: 'User settings and preferences interface',
          status: 'done',
          assignee: 'Emma'
        },
        {
          id: '8',
          title: 'Database migration to PostgreSQL',
          description: 'Migrated from MongoDB to PostgreSQL',
          status: 'done',
          priority: 'high'
        }
      ]
    }
  ]
};

export function KanbanPage() {
  const [board, setBoard] = useState<KanbanBoard>(MOCK_KANBAN_DATA);

  const handleCardMove = (cardId: string, newStatus: KanbanCardStatus) => {
    // Find the card to get its title for the toast
    const card = board.columns
      .flatMap((col) => col.cards)
      .find((c) => c.id === cardId);

    if (card) {
      toast.success(`"${card.title}" moved to ${newStatus.replace('-', ' ')}`);
    }
  };

  return (
    <KanbanView
      board={board}
      title='Project Tasks'
      onCardMove={handleCardMove}
    />
  );
}
