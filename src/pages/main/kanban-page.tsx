import { KanbanBoard } from '@/shared/components/kanban';
import { APP_ROUTES } from '@/shared/constants';
import { Link } from 'react-router';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
}

interface Column {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  tasks: Task[];
}

const MOCK_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    status: 'todo',
    tasks: [
      {
        id: 'task-1',
        title: 'Design database schema',
        description: 'Create normalized schema for the application',
        priority: 'high',
        status: 'todo',
        createdAt: new Date('2024-01-01')
      },
      {
        id: 'task-2',
        title: 'Setup authentication',
        description: 'Implement JWT-based auth system',
        priority: 'high',
        status: 'todo',
        createdAt: new Date('2024-01-02')
      },
      {
        id: 'task-3',
        title: 'Create API documentation',
        priority: 'medium',
        status: 'todo',
        createdAt: new Date('2024-01-03')
      },
      {
        id: 'task-4',
        title: 'Setup CI/CD pipeline',
        priority: 'medium',
        status: 'todo',
        createdAt: new Date('2024-01-04')
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    status: 'in-progress',
    tasks: [
      {
        id: 'task-5',
        title: 'Build user dashboard',
        description: 'Create main user interface with analytics',
        priority: 'high',
        status: 'in-progress',
        createdAt: new Date('2024-01-05')
      },
      {
        id: 'task-6',
        title: 'Implement API endpoints',
        priority: 'medium',
        status: 'in-progress',
        createdAt: new Date('2024-01-06')
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    status: 'done',
    tasks: [
      {
        id: 'task-7',
        title: 'Project setup',
        description: 'Initialize React + TypeScript project',
        priority: 'high',
        status: 'done',
        createdAt: new Date('2024-01-07')
      },
      {
        id: 'task-8',
        title: 'Setup Tailwind CSS',
        priority: 'low',
        status: 'done',
        createdAt: new Date('2024-01-08')
      },
      {
        id: 'task-9',
        title: 'Configure ESLint and Prettier',
        priority: 'low',
        status: 'done',
        createdAt: new Date('2024-01-09')
      }
    ]
  }
];

export function KanbanPage() {
  const handleTaskMove = (taskId: string, fromColumnId: string, toColumnId: string) => {
    console.log(`Task ${taskId} moved from ${fromColumnId} to ${toColumnId}`);
  };

  return (
    <main className='w-full h-dvh flex flex-col bg-background'>
      <header className='border-b p-6 bg-card'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Kanban Board</h1>
            <p className='text-sm text-slate-500 mt-1'>Manage your tasks with drag and drop</p>
          </div>
          <Link
            to={APP_ROUTES.main}
            className='border py-2 px-4 rounded hover:bg-muted transition-colors'
          >
            Back
          </Link>
        </div>
      </header>

      <div className='flex-1 overflow-hidden'>
        <KanbanBoard columns={MOCK_COLUMNS} onTaskMove={handleTaskMove} />
      </div>
    </main>
  );
}
