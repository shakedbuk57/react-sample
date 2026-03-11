import { useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import { KanbanColumn } from './components/kanban-column';
import { KanbanCard } from './components/kanban-card';

export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design kanban board',
    description: 'Create the visual design for the kanban board UI',
    status: 'done',
    priority: 'high',
    assignee: 'Alice',
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Implement drag and drop',
    description: 'Add drag and drop functionality to cards',
    status: 'inProgress',
    priority: 'high',
    assignee: 'Bob',
    dueDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'Add animations',
    description: 'Add smooth animations for card movements',
    status: 'inProgress',
    priority: 'medium',
    assignee: 'Alice'
  },
  {
    id: '4',
    title: 'Write tests',
    description: 'Write unit tests for kanban components',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-01-25'
  },
  {
    id: '5',
    title: 'Documentation',
    description: 'Write documentation for the kanban board',
    status: 'todo',
    priority: 'low',
    assignee: 'Charlie'
  },
  {
    id: '6',
    title: 'Code review',
    description: 'Review pull requests from team members',
    status: 'done',
    priority: 'medium',
    assignee: 'Bob'
  },
  {
    id: '7',
    title: 'Performance optimization',
    description: 'Optimize kanban board rendering performance',
    status: 'todo',
    priority: 'high',
    assignee: 'Alice',
    dueDate: '2024-01-30'
  },
  {
    id: '8',
    title: 'Mobile responsive',
    description: 'Make kanban board responsive on mobile devices',
    status: 'inProgress',
    priority: 'medium'
  }
];

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'todo', label: 'To Do' },
  { status: 'inProgress', label: 'In Progress' },
  { status: 'done', label: 'Done' }
];

export function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <main
      className={clsx(
        'w-full h-dvh flex flex-col gap-6 p-6 bg-slate-50',
        animator({ name: 'fadeIn' })
      )}
    >
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>Kanban Board</h1>
        <p className='text-slate-600'>
          Manage your tasks and projects efficiently
        </p>
      </div>

      <div className='flex-1 overflow-x-auto'>
        <div className='flex gap-6 h-full min-w-max'>
          {COLUMNS.map(({ status, label }) => {
            const columnTasks = tasks.filter((task) => task.status === status);

            return (
              <KanbanColumn key={status} label={label} status={status}>
                <div className='flex flex-col gap-4'>
                  {columnTasks.map((task) => (
                    <KanbanCard
                      key={task.id}
                      task={task}
                      onMove={moveTask}
                      onDelete={deleteTask}
                      onUpdate={updateTask}
                      getPriorityColor={getPriorityColor}
                    />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className='flex items-center justify-center h-32 text-slate-400 border-2 border-dashed border-slate-300 rounded-lg'>
                      <span>No tasks</span>
                    </div>
                  )}
                </div>
              </KanbanColumn>
            );
          })}
        </div>
      </div>
    </main>
  );
}
