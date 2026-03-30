import { useState } from 'react';
import clsx from 'clsx';

import { animator } from '@/shared/helpers';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}

export interface TaskColumn {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const DEFAULT_COLUMNS: TaskColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-slate-100',
    tasks: [
      {
        id: '1',
        title: 'Design new landing page',
        description: 'Create mockups and wireframes',
        priority: 'high',
        assignee: 'Alice',
        dueDate: '2024-02-15'
      },
      {
        id: '2',
        title: 'Fix header alignment',
        description: 'Mobile responsive issues',
        priority: 'medium',
        assignee: 'Bob'
      },
      {
        id: '3',
        title: 'Write API documentation',
        description: 'Document all endpoints',
        priority: 'low',
        dueDate: '2024-02-20'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-100',
    tasks: [
      {
        id: '4',
        title: 'Implement user authentication',
        description: 'OAuth2 integration',
        priority: 'high',
        assignee: 'Charlie',
        dueDate: '2024-02-10'
      },
      {
        id: '5',
        title: 'Create dashboard charts',
        description: 'Revenue and metrics visualization',
        priority: 'medium',
        assignee: 'Diana'
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-100',
    tasks: [
      {
        id: '6',
        title: 'Code review: User API',
        description: 'PR #234 pending review',
        priority: 'high',
        assignee: 'Eve'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-100',
    tasks: [
      {
        id: '7',
        title: 'Setup CI/CD pipeline',
        description: 'GitHub Actions workflow',
        priority: 'high',
        assignee: 'Frank',
        dueDate: '2024-02-01'
      },
      {
        id: '8',
        title: 'Deploy to staging',
        description: 'Kubernetes cluster setup',
        priority: 'medium',
        assignee: 'Grace'
      },
      {
        id: '9',
        title: 'Database migration',
        description: 'PostgreSQL upgrade to v15',
        priority: 'high'
      }
    ]
  }
];

const PRIORITY_COLORS = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

function TaskCard({ task }: { task: Task }) {
  return (
    <div
      className={clsx(
        'bg-white border rounded p-3 cursor-move hover:shadow-md transition-shadow mb-3',
        animator({ name: 'fadeIn' })
      )}
      draggable
    >
      <h4 className='font-semibold text-sm mb-1'>{task.title}</h4>
      {task.description && (
        <p className='text-xs text-slate-500 mb-2'>{task.description}</p>
      )}
      <div className='flex items-center justify-between gap-2 text-xs'>
        <span className={clsx('rounded-full w-3 h-3', PRIORITY_COLORS[task.priority])} title={task.priority} />
        <div className='flex gap-2 flex-1 justify-end'>
          {task.assignee && (
            <span className='bg-slate-200 px-2 py-1 rounded text-xs'>
              {task.assignee}
            </span>
          )}
          {task.dueDate && (
            <span className='text-slate-400'>{task.dueDate}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ column, onAddTask }: { column: TaskColumn; onAddTask: (columnId: string) => void }) {
  return (
    <div
      className={clsx(
        'flex-1 min-w-80 rounded border p-4 flex flex-col',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Column Header */}
      <div className='flex items-center justify-between mb-4 pb-3 border-b'>
        <div>
          <h3 className='font-bold text-sm'>{column.title}</h3>
          <span className='text-xs text-slate-500'>{column.tasks.length} tasks</span>
        </div>
        <span className='bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold'>
          {column.tasks.length}
        </span>
      </div>

      {/* Tasks Container */}
      <div className='flex-1 overflow-y-auto mb-4'>
        {column.tasks.length === 0 ? (
          <div className='text-center py-8 text-slate-400'>
            <p className='text-sm'>No tasks yet</p>
          </div>
        ) : (
          column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => onAddTask(column.id)}
        className='w-full border py-2 px-3 rounded text-sm hover:bg-slate-50 transition-colors'
      >
        + Add Task
      </button>
    </div>
  );
}

export function KanbanPage() {
  const [columns, setColumns] = useState<TaskColumn[]>(DEFAULT_COLUMNS);
  const [newTaskInput, setNewTaskInput] = useState<{ columnId: string; title: string } | null>(null);

  const handleAddTask = (columnId: string) => {
    setNewTaskInput({ columnId, title: '' });
  };

  const handleCreateTask = () => {
    if (newTaskInput?.title.trim()) {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === newTaskInput.columnId
            ? {
                ...col,
                tasks: [
                  ...col.tasks,
                  {
                    id: `task-${Date.now()}`,
                    title: newTaskInput.title,
                    description: '',
                    priority: 'medium'
                  }
                ]
              }
            : col
        )
      );
      setNewTaskInput(null);
    }
  };

  const handleTaskDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: string) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('taskId', taskId);
  };

  const handleColumnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleColumnDrop = (event: React.DragEvent<HTMLDivElement>, columnId: string) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');

    // Find task in all columns
    let task: Task | null = null;
    let sourceColumnId: string | null = null;

    columns.forEach((col) => {
      const foundTask = col.tasks.find((t) => t.id === taskId);
      if (foundTask) {
        task = foundTask;
        sourceColumnId = col.id;
      }
    });

    if (task && sourceColumnId && sourceColumnId !== columnId) {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== taskId)
            };
          }
          if (col.id === columnId) {
            return {
              ...col,
              tasks: [...col.tasks, task]
            };
          }
          return col;
        })
      );
    }
  };

  return (
    <main className='w-full h-dvh flex flex-col gap-4 p-6 bg-slate-50 overflow-hidden'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-3xl font-bold'>Kanban Board</h1>
        <span className='text-sm text-slate-500'>
          {columns.reduce((sum, col) => sum + col.tasks.length, 0)} total tasks
        </span>
      </div>

      {/* Kanban Columns Container */}
      <div className='flex gap-4 flex-1 overflow-x-auto pb-4'>
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={handleColumnDragOver}
            onDrop={(e) => handleColumnDrop(e, column.id)}
          >
            <KanbanColumn
              column={column}
              onAddTask={handleAddTask}
            />
          </div>
        ))}
      </div>

      {/* New Task Input Modal (Simple Implementation) */}
      {newTaskInput && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded border p-6 w-full max-w-md shadow-lg'>
            <h2 className='text-xl font-bold mb-4'>Create New Task</h2>
            <input
              autoFocus
              type='text'
              placeholder='Task title'
              value={newTaskInput.title}
              onChange={(e) =>
                setNewTaskInput({
                  ...newTaskInput,
                  title: e.target.value
                })
              }
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCreateTask();
              }}
              className='w-full border rounded px-4 py-2 mb-4'
            />
            <div className='flex gap-2 justify-end'>
              <button
                onClick={() => setNewTaskInput(null)}
                className='border py-2 px-4 rounded hover:bg-slate-50'
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
