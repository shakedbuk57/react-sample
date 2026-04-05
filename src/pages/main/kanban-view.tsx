import { useMemo } from 'react';
import { clsx } from 'clsx';

// Types
interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
}

// Mock Data
const MOCK_KANBAN_DATA: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-slate-100 dark:bg-slate-800',
    cards: [
      {
        id: 'task-1',
        title: 'Design landing page',
        description: 'Create mockups and wireframes',
        priority: 'high',
        assignee: 'Sarah'
      },
      {
        id: 'task-2',
        title: 'Setup database schema',
        priority: 'high',
        assignee: 'John'
      },
      {
        id: 'task-3',
        title: 'Write API documentation',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-50 dark:bg-blue-900',
    cards: [
      {
        id: 'task-4',
        title: 'Implement user authentication',
        description: 'Setup JWT tokens and middleware',
        priority: 'high',
        assignee: 'Mike'
      },
      {
        id: 'task-5',
        title: 'Create dashboard layout',
        priority: 'medium',
        assignee: 'Sarah'
      },
      {
        id: 'task-6',
        title: 'Setup CI/CD pipeline',
        priority: 'medium',
        assignee: 'Alex'
      }
    ]
  },
  {
    id: 'review',
    title: 'In Review',
    color: 'bg-yellow-50 dark:bg-yellow-900',
    cards: [
      {
        id: 'task-7',
        title: 'Code review: API endpoints',
        priority: 'medium',
        assignee: 'John'
      },
      {
        id: 'task-8',
        title: 'Testing: User flow validation',
        priority: 'high',
        assignee: 'Emma'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-50 dark:bg-green-900',
    cards: [
      {
        id: 'task-9',
        title: 'Project kickoff meeting',
        assignee: 'Team'
      },
      {
        id: 'task-10',
        title: 'Repository setup',
        assignee: 'Alex'
      },
      {
        id: 'task-11',
        title: 'Define project roadmap',
        assignee: 'Lead'
      }
    ]
  }
];

// Card Component
function KanbanCardComponent({ card }: { card: KanbanCard }) {
  const priorityStyles = {
    low: 'border-l-2 border-l-green-500',
    medium: 'border-l-2 border-l-yellow-500',
    high: 'border-l-2 border-l-red-500'
  };

  const priorityBadgeStyles = {
    low: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    high: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
  };

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 w-full rounded border border-border bg-card p-3 hover:shadow-md transition-shadow',
        card.priority && priorityStyles[card.priority]
      )}
    >
      <div className='flex items-start justify-between gap-2'>
        <h4 className='font-semibold text-sm text-foreground flex-1 break-words'>
          {card.title}
        </h4>
        {card.priority && (
          <span
            className={clsx(
              'text-xs px-2 py-1 rounded whitespace-nowrap',
              priorityBadgeStyles[card.priority]
            )}
          >
            {card.priority}
          </span>
        )}
      </div>

      {card.description && (
        <p className='text-xs text-slate-600 dark:text-slate-400'>
          {card.description}
        </p>
      )}

      {card.assignee && (
        <div className='flex items-center gap-2 mt-1 pt-2 border-t border-border'>
          <div className='flex items-center justify-center w-6 h-6 rounded-full bg-primary text-xs font-semibold text-white'>
            {card.assignee.substring(0, 1).toUpperCase()}
          </div>
          <span className='text-xs text-foreground'>{card.assignee}</span>
        </div>
      )}
    </div>
  );
}

// Column Component
function KanbanColumnComponent({ column }: { column: KanbanColumn }) {
  return (
    <div className={clsx('flex flex-col gap-4 w-full min-w-80 rounded p-4', column.color)}>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-lg text-foreground'>{column.title}</h3>
        <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-xs font-semibold text-white'>
          {column.cards.length}
        </span>
      </div>

      <div className='flex flex-col gap-3 min-h-96'>
        {column.cards.length > 0 ? (
          column.cards.map((card) => (
            <KanbanCardComponent key={card.id} card={card} />
          ))
        ) : (
          <div className='flex items-center justify-center min-h-96 text-slate-400'>
            <p className='text-sm'>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Kanban View Component
export function KanbanView() {
  const columns = useMemo(() => MOCK_KANBAN_DATA, []);

  return (
    <main className='w-full h-dvh flex flex-col gap-6 bg-background p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Project Board</h1>
          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>
            Track your tasks and progress
          </p>
        </div>
      </div>

      <div className='flex-1 overflow-x-auto pb-4'>
        <div className='flex gap-6 h-full'>
          {columns.map((column) => (
            <KanbanColumnComponent key={column.id} column={column} />
          ))}
        </div>
      </div>
    </main>
  );
}
