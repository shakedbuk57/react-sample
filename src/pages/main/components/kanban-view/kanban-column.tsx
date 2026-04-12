import { useSelector } from 'react-redux';
import {
  useDroppable,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { kanbanSelectors } from '@/shared/store/features/kanban/kanban-selectors';
import type { Column } from '@/shared/store/features/kanban/kanban-types';
import { TaskCard } from './task-card';

interface KanbanColumnProps {
  column: Column;
  onAddTask?: (columnId: string) => void;
  onEditTask?: (taskId: string) => void;
}

export function KanbanColumn({
  column,
  onAddTask,
  onEditTask
}: KanbanColumnProps) {
  const tasks = useSelector(kanbanSelectors.tasks);
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  const columnTasks = column.taskIds.map((taskId) => tasks[taskId]).filter(Boolean);

  return (
    <div className='flex w-80 flex-shrink-0 flex-col rounded-lg bg-gray-100 p-4'>
      {/* Column Header */}
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='font-semibold text-gray-900'>{column.title}</h2>
          <p className='text-sm text-gray-600'>{columnTasks.length} tasks</p>
        </div>
      </div>

      {/* Droppable Area */}
      <SortableContext
        items={column.taskIds}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className='mb-3 flex flex-1 flex-col gap-2 rounded bg-white/50 p-2 min-h-96'
        >
          {columnTasks.length === 0 ? (
            <div className='flex items-center justify-center h-full text-gray-400'>
              <p className='text-sm'>No tasks yet</p>
            </div>
          ) : (
            columnTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask ? (t) => onEditTask(t.id) : undefined}
              />
            ))
          )}
        </div>
      </SortableContext>

      {/* Add Task Button */}
      {onAddTask && (
        <button
          onClick={() => onAddTask(column.id)}
          className='mt-2 w-full rounded border-2 border-dashed border-gray-300 py-2 text-sm text-gray-600 transition-colors hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
        >
          + Add Task
        </button>
      )}
    </div>
  );
}
