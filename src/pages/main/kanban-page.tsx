import { useState } from 'react';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
}

interface KanbanColumn {
  id: 'todo' | 'inProgress' | 'done';
  title: string;
  color: string;
  count: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design homepage',
    description: 'Create wireframes and mockups',
    status: 'todo'
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add login and signup pages',
    status: 'todo'
  },
  {
    id: '3',
    title: 'Build API endpoints',
    description: 'Set up REST API for main features',
    status: 'inProgress'
  },
  {
    id: '4',
    title: 'Create dashboard',
    description: 'Implement main dashboard view',
    status: 'inProgress'
  },
  {
    id: '5',
    title: 'Setup database',
    description: 'Configure PostgreSQL and migrations',
    status: 'done'
  },
  {
    id: '6',
    title: 'Deploy to production',
    description: 'Set up CI/CD pipeline',
    status: 'done'
  }
];

function KanbanCard({ task }: { task: Task }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer?.setData('taskId', task.id);
      }}
      className='bg-white border border-slate-200 rounded p-4 cursor-move hover:shadow-md transition-shadow'
    >
      <h3 className='font-semibold text-sm mb-1'>{task.title}</h3>
      <p className='text-xs text-slate-600 mb-3'>{task.description}</p>
      <div className='flex items-center gap-1'>
        <span
          className={clsx(
            'text-xs px-2 py-1 rounded',
            {
              'bg-red-100 text-red-700': task.status === 'todo',
              'bg-blue-100 text-blue-700': task.status === 'inProgress',
              'bg-green-100 text-green-700': task.status === 'done'
            }
          )}
        >
          {task.status === 'todo' && 'To Do'}
          {task.status === 'inProgress' && 'In Progress'}
          {task.status === 'done' && 'Done'}
        </span>
      </div>
    </div>
  );
}

function KanbanColumn({
  column,
  tasks,
  onDrop
}: {
  column: KanbanColumn;
  tasks: Task[];
  onDrop: (taskId: string, status: 'todo' | 'inProgress' | 'done') => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div className='flex flex-col gap-4 flex-1 min-w-72'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <h2 className='font-bold text-lg'>{column.title}</h2>
          <span className={clsx('px-2.5 py-1 rounded-full text-sm font-semibold', column.color)}>
            {column.count}
          </span>
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const taskId = e.dataTransfer?.getData('taskId');
          if (taskId) {
            onDrop(taskId, column.id);
          }
        }}
        className={clsx(
          'flex flex-col gap-3 bg-slate-50 rounded p-4 min-h-96 border-2 border-dashed transition-colors',
          {
            'border-blue-400 bg-blue-50': isDragOver,
            'border-slate-200': !isDragOver
          }
        )}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => <KanbanCard key={task.id} task={task} />)
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p className='text-slate-400 text-sm'>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleDrop = (taskId: string, newStatus: 'todo' | 'inProgress' | 'done') => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getTasksByStatus = (status: 'todo' | 'inProgress' | 'done'): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  const columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-red-100 text-red-700',
      count: getTasksByStatus('todo').length
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      color: 'bg-blue-100 text-blue-700',
      count: getTasksByStatus('inProgress').length
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100 text-green-700',
      count: getTasksByStatus('done').length
    }
  ];

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-slate-900 mb-2'>Kanban Board</h1>
          <p className='text-slate-600'>
            Organize and track your tasks by dragging cards between columns
          </p>
        </div>

        {/* Kanban Grid */}
        <div className='flex gap-6 overflow-x-auto pb-4'>
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
