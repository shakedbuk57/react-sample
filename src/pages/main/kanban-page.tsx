import { useState } from 'react';
import { clsx } from 'clsx';

interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
  assignee?: string;
}

interface Column {
  id: string;
  title: string;
  status: Task['status'];
}

const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'inProgress', title: 'In Progress', status: 'inProgress' },
  { id: 'done', title: 'Done', status: 'done' }
];

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Initialize the project with TypeScript and Tailwind CSS',
    status: 'done',
    assignee: 'Alice'
  },
  {
    id: '2',
    title: 'Design kanban board layout',
    description: 'Create wireframes and design the board UI',
    status: 'done',
    assignee: 'Bob'
  },
  {
    id: '3',
    title: 'Implement drag-and-drop',
    description: 'Add native HTML5 drag-and-drop functionality',
    status: 'inProgress',
    assignee: 'Charlie'
  },
  {
    id: '4',
    title: 'Add task cards',
    description: 'Create task card components with styling',
    status: 'inProgress',
    assignee: 'Alice'
  },
  {
    id: '5',
    title: 'Write unit tests',
    description: 'Add tests for drag-and-drop and state management',
    status: 'todo'
  },
  {
    id: '6',
    title: 'Deploy to production',
    description: 'Build and deploy the kanban board',
    status: 'todo',
    assignee: 'David'
  },
  {
    id: '7',
    title: 'Update documentation',
    description: 'Write README and API documentation',
    status: 'todo'
  }
];

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

function TaskCard({ task, onDragStart }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className={clsx(
        'flex flex-col w-full gap-2 border p-3 rounded cursor-move',
        'bg-card border-border hover:shadow-md',
        'transition-shadow duration-200'
      )}
    >
      <h3 className='text-sm font-bold text-foreground'>{task.title}</h3>
      {task.description && (
        <p className='text-xs text-muted-foreground'>{task.description}</p>
      )}
      {task.assignee && (
        <div className='text-xs text-muted-foreground'>
          Assignee: <span className='font-semibold'>{task.assignee}</span>
        </div>
      )}
    </div>
  );
}

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  draggedTask: Task | null;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Task['status']) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

function KanbanColumn({
  column,
  tasks,
  draggedTask,
  onDragOver,
  onDrop,
  onDragStart
}: KanbanColumnProps) {
  const isDragOver =
    draggedTask && tasks.find((t) => t.id === draggedTask.id) === undefined;

  return (
    <div
      className={clsx(
        'flex flex-col w-full min-w-80 gap-3 p-4 rounded border',
        'bg-secondary border-border',
        isDragOver && 'bg-accent'
      )}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.status)}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold text-foreground'>{column.title}</h2>
        <span className='text-sm font-semibold text-muted-foreground'>
          {tasks.length}
        </span>
      </div>

      <div className='flex flex-col gap-2'>
        {tasks.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground text-sm'>
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();

    if (!draggedTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      )
    );

    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  return (
    <main className='flex w-full flex-col items-center justify-start h-dvh gap-6 p-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-foreground'>Kanban Board</h1>
        <p className='text-sm text-muted-foreground'>
          Drag and drop tasks between columns to update their status
        </p>
      </div>

      <div
        className='flex w-full gap-6 overflow-x-auto pb-4'
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.status)}
            draggedTask={draggedTask}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </main>
  );
}
