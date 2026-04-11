import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { KanbanColumn } from './kanban-column';

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

interface KanbanBoardProps {
  columns: Column[];
  onTaskMove?: (taskId: string, fromColumnId: string, toColumnId: string) => void;
}

export function KanbanBoard({ columns: initialColumns, onTaskMove }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedFromColumnId, setDraggedFromColumnId] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
      e.preventDefault();

      const taskId = e.dataTransfer.getData('taskId');
      const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

      if (!taskId || !sourceColumnId) {
        return;
      }

      // Don't move if dropping in the same column
      if (sourceColumnId === targetColumnId) {
        return;
      }

      // Find the task in the source column
      const sourceColumnIndex = columns.findIndex((col) => col.id === sourceColumnId);
      const targetColumnIndex = columns.findIndex((col) => col.id === targetColumnId);

      if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
        return;
      }

      const taskIndex = columns[sourceColumnIndex].tasks.findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex === -1) {
        return;
      }

      // Move task
      const task = columns[sourceColumnIndex].tasks[taskIndex];
      const updatedColumns = columns.map((col) => ({ ...col, tasks: [...col.tasks] }));

      // Remove from source
      updatedColumns[sourceColumnIndex].tasks.splice(taskIndex, 1);

      // Add to target
      updatedColumns[targetColumnIndex].tasks.push(task);

      setColumns(updatedColumns);
      setDraggedTaskId(null);
      setDraggedFromColumnId(null);

      // Call callback if provided
      if (onTaskMove) {
        onTaskMove(taskId, sourceColumnId, targetColumnId);
      }
    },
    [columns, onTaskMove]
  );

  const handleCardDragStart = useCallback((taskId: string, columnId: string) => {
    setDraggedTaskId(taskId);
    setDraggedFromColumnId(columnId);
  }, []);

  return (
    <div className='w-full h-full bg-background p-6'>
      <div className='w-full flex gap-6 overflow-x-auto pb-4'>
        {columns.map((column) => (
          <div key={column.id} className='flex-shrink-0 w-96'>
            <KanbanColumn
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              onCardDragStart={(e, taskId) => handleCardDragStart(taskId, column.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
