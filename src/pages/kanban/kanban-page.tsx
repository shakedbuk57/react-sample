import { useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  color: string;
}

const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-100 dark:bg-slate-800' },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-100 dark:bg-blue-900'
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-amber-100 dark:bg-amber-900'
  },
  { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' }
];

const MOCK_TASKS: Record<string, Task[]> = {
  todo: [
    {
      id: '1',
      title: 'Design Dashboard Layout',
      description: 'Create wireframes and mockups for the main dashboard',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Setup Database Schema',
      description: 'Define database structure and relations',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Write API Documentation',
      description: 'Document all endpoints and request/response formats',
      priority: 'medium'
    }
  ],
  'in-progress': [
    {
      id: '4',
      title: 'Implement Authentication',
      description: 'Add user login and registration functionality',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Create User Profile Page',
      description: 'Build user settings and profile management UI',
      priority: 'medium'
    }
  ],
  review: [
    {
      id: '6',
      title: 'Code Review: Payment Integration',
      description: 'Review payment gateway implementation',
      priority: 'high'
    },
    {
      id: '7',
      title: 'Fix Search Performance',
      description: 'Optimize search query performance',
      priority: 'medium'
    }
  ],
  done: [
    {
      id: '8',
      title: 'Setup Project Repository',
      description: 'Initialize Git repository and CI/CD pipeline',
      priority: 'low'
    },
    {
      id: '9',
      title: 'Design Logo and Branding',
      description: 'Create brand identity and logo designs',
      priority: 'low'
    },
    {
      id: '10',
      title: 'Setup Development Environment',
      description: 'Configure dev tools and build process',
      priority: 'medium'
    }
  ]
};

function getPriorityBorderColor(priority: Task['priority']): string {
  switch (priority) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#22c55e';
  }
}

function KanbanCard({
  task,
  onDragStart,
  fromColumnId
}: {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task, columnId: string) => void;
  fromColumnId: string;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task, fromColumnId)}
      style={{
        borderLeftColor: getPriorityBorderColor(task.priority)
      }}
      className={clsx(
        'p-4 bg-white dark:bg-slate-700 rounded border-l-4 cursor-move',
        'hover:shadow-lg transition-shadow',
        'border-t border-r border-b border-slate-200 dark:border-slate-500'
      )}
    >
      <h4 className='font-semibold text-sm text-foreground mb-1'>{task.title}</h4>
      <p className='text-xs text-slate-500 dark:text-slate-400'>
        {task.description}
      </p>
    </div>
  );
}

function KanbanColumn({
  column,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  draggedTask
}: {
  column: Column;
  tasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragStart: (e: React.DragEvent, task: Task, columnId: string) => void;
  draggedTask: Task | null;
}) {
  return (
    <div className='flex-shrink-0 w-80'>
      <div className={clsx('p-4 rounded-t border-b-2 border-slate-200', column.color)}>
        <h3 className='font-bold text-sm text-foreground'>
          {column.title}
          <span className='ml-2 text-xs font-normal text-slate-500 dark:text-slate-400'>
            ({tasks.length})
          </span>
        </h3>
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
        className={clsx(
          'p-4 min-h-96 rounded-b flex flex-col gap-3',
          'bg-slate-50 dark:bg-slate-800',
          draggedTask && 'bg-slate-100 dark:bg-slate-700'
        )}
      >
        {tasks.length === 0 ? (
          <div className='flex items-center justify-center h-full text-slate-400 dark:text-slate-500 text-sm'>
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onDragStart={onDragStart} fromColumnId={column.id} />
          ))
        )}
      </div>
    </div>
  );
}

export function KanbanPage() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>(MOCK_TASKS);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task, fromColumnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(fromColumnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();

    if (!draggedTask || !draggedFromColumn) return;

    // If dropping on the same column, do nothing
    if (draggedFromColumn === toColumnId) {
      setDraggedTask(null);
      setDraggedFromColumn(null);
      return;
    }

    // Move task from source column to target column
    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks[draggedFromColumn] = newTasks[draggedFromColumn].filter(
        (t) => t.id !== draggedTask.id
      );
      newTasks[toColumnId] = [...newTasks[toColumnId], draggedTask];
      return newTasks;
    });

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  return (
    <main
      className={clsx(
        'w-full h-dvh flex flex-col gap-6 p-6 bg-background',
        animator({ name: 'fadeIn', speed: 'faster' })
      )}
    >
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>Kanban Board</h1>
        <p className='text-slate-500 dark:text-slate-400 text-sm'>
          Drag and drop tasks between columns to update their status
        </p>
      </div>

      <div className='flex-1 overflow-x-auto pb-4'>
        <div className='flex gap-6 min-w-max'>
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks[column.id] || []}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              draggedTask={draggedTask}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
