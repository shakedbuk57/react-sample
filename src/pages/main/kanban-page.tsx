import { useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import { KanbanBoard } from './components/kanban-board';
import { ListView } from './components/list-view';

export type ViewMode = 'kanban' | 'list';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design system setup',
    description: 'Create design tokens and CSS variables',
    status: 'done',
    priority: 'high',
    assignee: 'Alice',
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'API integration',
    description: 'Connect to backend endpoints',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Bob',
    dueDate: '2024-02-01'
  },
  {
    id: '3',
    title: 'User authentication',
    description: 'Implement login and signup flows',
    status: 'review',
    priority: 'high',
    assignee: 'Charlie',
    dueDate: '2024-01-20'
  },
  {
    id: '4',
    title: 'Database optimization',
    description: 'Add indexes and optimize queries',
    status: 'todo',
    priority: 'medium',
    assignee: 'Diana',
    dueDate: '2024-02-10'
  },
  {
    id: '5',
    title: 'Testing infrastructure',
    description: 'Set up unit and integration tests',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Eve',
    dueDate: '2024-01-25'
  },
  {
    id: '6',
    title: 'Documentation',
    description: 'Write API and component docs',
    status: 'todo',
    priority: 'low',
    assignee: 'Frank',
    dueDate: '2024-02-15'
  },
  {
    id: '7',
    title: 'Performance audit',
    description: 'Analyze and improve load times',
    status: 'done',
    priority: 'high',
    assignee: 'Grace',
    dueDate: '2024-01-10'
  },
  {
    id: '8',
    title: 'Mobile responsiveness',
    description: 'Ensure mobile-friendly design',
    status: 'review',
    priority: 'medium',
    assignee: 'Henry',
    dueDate: '2024-01-22'
  }
];

export function KanbanPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <main
      className={clsx(
        'flex w-full flex-col h-dvh gap-4 bg-slate-50',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Header */}
      <div className='w-full border-b bg-white px-6 py-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Kanban Board</h1>

        {/* View Mode Toggle */}
        <div className='flex items-center gap-2 border rounded-lg p-1'>
          <button
            onClick={() => setViewMode('kanban')}
            className={clsx(
              'px-4 py-2 rounded font-medium transition-colors',
              viewMode === 'kanban'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            Kanban
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={clsx(
              'px-4 py-2 rounded font-medium transition-colors',
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            List
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-hidden px-6 pb-6'>
        {viewMode === 'kanban' ? (
          <KanbanBoard tasks={tasks} onMoveTask={handleMoveTask} />
        ) : (
          <ListView tasks={tasks} />
        )}
      </div>
    </main>
  );
}
