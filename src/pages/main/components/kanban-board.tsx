import { useState } from 'react';

import type { Task } from '../kanban-page';
import { KanbanColumn } from './kanban-column';

interface KanbanBoardProps {
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: Task['status']) => void;
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'slate' },
  { id: 'in-progress', title: 'In Progress', color: 'blue' },
  { id: 'review', title: 'Review', color: 'yellow' },
  { id: 'done', title: 'Done', color: 'green' }
] as const;

export function KanbanBoard({ tasks, onMoveTask }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      onMoveTask(draggedTask, status);
      setDraggedTask(null);
    }
  };

  return (
    <div className='flex gap-6 h-full overflow-x-auto pb-4'>
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={getTasksByStatus(column.id as Task['status'])}
          draggedTaskId={draggedTask}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
