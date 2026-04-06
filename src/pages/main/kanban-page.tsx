import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

interface Column {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

const MOCK_COLUMNS: Column[] = [
  { id: '1', title: 'To Do', status: 'todo' },
  { id: '2', title: 'In Progress', status: 'in-progress' },
  { id: '3', title: 'Review', status: 'review' },
  { id: '4', title: 'Done', status: 'done' }
];

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Setup project structure',
    description: 'Initialize project with React and TypeScript',
    priority: 'high',
    status: 'done'
  },
  {
    id: '2',
    title: 'Create API integration',
    description: 'Integrate with backend API endpoints',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Build UI components',
    description: 'Create reusable component library',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Write unit tests',
    description: 'Add comprehensive test coverage',
    priority: 'medium',
    status: 'review'
  },
  {
    id: '5',
    title: 'Documentation',
    description: 'Write project documentation',
    priority: 'low',
    status: 'todo'
  },
  {
    id: '6',
    title: 'Performance optimization',
    description: 'Optimize bundle size and runtime performance',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: '7',
    title: 'Design system review',
    description: 'Review and finalize design tokens',
    priority: 'low',
    status: 'review'
  },
  {
    id: '8',
    title: 'Deploy to production',
    description: 'Setup CI/CD pipeline and deploy',
    priority: 'high',
    status: 'done'
  }
];

export function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return { borderColor: '#ef4444', textColor: '#dc2626' };
      case 'medium':
        return { borderColor: '#f59e0b', textColor: '#d97706' };
      case 'low':
        return { borderColor: '#10b981', textColor: '#059669' };
    }
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task['status']) => {
    if (!draggedTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      )
    );
    setDraggedTask(null);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <main className='flex w-full flex-col items-start justify-start h-dvh gap-6 overflow-hidden bg-background p-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Kanban Board</h1>
        <p className='text-muted-foreground'>
          Organize and manage your tasks across different workflow stages
        </p>
      </div>

      <div className='flex w-full gap-6 overflow-x-auto pb-6'>
        {MOCK_COLUMNS.map((column) => {
          const columnTasks = getTasksByStatus(column.status);

          return (
            <div
              key={column.id}
              className='flex flex-col gap-4 w-80 flex-shrink-0 h-full max-h-[calc(100vh-200px)]'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>{column.title}</h2>
                <span className='bg-muted text-muted-foreground text-sm font-medium px-2 py-1 rounded'>
                  {columnTasks.length}
                </span>
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.status)}
                className='flex flex-col gap-3 flex-grow overflow-y-auto pb-4 rounded-lg border-2 border-dashed border-border bg-card/50 p-3 transition-colors'
              >
                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => {
                    const priorityColor = getPriorityColor(task.priority);

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                        className={`flex flex-col gap-2 p-3 rounded border-l-4 bg-card cursor-move transition-all shadow-sm hover:shadow-md ${draggedTask?.id === task.id ? 'opacity-50' : ''}`}
                        style={{ borderLeftColor: priorityColor.borderColor }}
                      >
                        <h3 className='font-medium text-foreground'>{task.title}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {task.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <span
                            className='text-xs font-semibold px-2 py-1 rounded capitalize'
                            style={{ color: priorityColor.textColor }}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='flex items-center justify-center flex-grow text-muted-foreground text-sm'>
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
