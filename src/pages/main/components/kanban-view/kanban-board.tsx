import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners
} from '@dnd-kit/core';

import { moveTask } from '@/shared/store/features/kanban/kanban-slices';
import { kanbanSelectors } from '@/shared/store/features/kanban/kanban-selectors';
import type { Task } from '@/shared/store/features/kanban/kanban-types';
import { KanbanColumn } from './kanban-column';
import { TaskCard } from './task-card';

interface KanbanBoardProps {
  onAddTask?: (columnId: string) => void;
  onEditTask?: (taskId: string) => void;
}

export function KanbanBoard({ onAddTask, onEditTask }: KanbanBoardProps) {
  const dispatch = useDispatch();
  const columns = useSelector(kanbanSelectors.columns);
  const tasks = useSelector(kanbanSelectors.tasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setActiveId(null);
        return;
      }

      const taskId = active.id as string;
      const fromColumnId = columns.find((col) =>
        col.taskIds.includes(taskId)
      )?.id;
      const toColumnId = over.id as string;

      if (fromColumnId && toColumnId && tasks[taskId]) {
        const toColumn = columns.find((col) => col.id === toColumnId);
        const newIndex = toColumn ? toColumn.taskIds.length : 0;

        dispatch(
          moveTask({
            taskId,
            fromColumnId,
            toColumnId,
            newIndex
          })
        );
      }

      setActiveId(null);
    },
    [columns, tasks, dispatch]
  );

  const activeTask = activeId && tasks[activeId] ? tasks[activeId] : null;

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveId(event.active.id as string)}
    >
      <div className='flex gap-4 overflow-x-auto pb-4'>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
