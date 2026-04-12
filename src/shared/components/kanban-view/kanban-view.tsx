import { useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';

import { KanbanColumn } from '@/shared/components/kanban-column';
import type { CommonComponentProperties } from '@/shared/types';

export interface KanbanItem {
  id: string | number;
  name: string;
  age: number;
  status?: 'todo' | 'inProgress' | 'done';
}

interface KanbanViewProps extends CommonComponentProperties {
  items: KanbanItem[];
}

const COLUMN_IDS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done'
} as const;

export function KanbanView({ items: initialItems = [] }: KanbanViewProps) {
  const [items, setItems] = useState<KanbanItem[]>(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const todoItems = useMemo(
    () =>
      items.filter((item) => item.status === 'todo' || !item.status).slice(0, 3),
    [items]
  );

  const inProgressItems = useMemo(
    () => items.filter((item) => item.status === 'inProgress').slice(0, 3),
    [items]
  );

  const doneItems = useMemo(
    () => items.filter((item) => item.status === 'done').slice(0, 3),
    [items]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setItems((prevItems) => {
      const activeItem = prevItems.find((item) => item.id === activeId);
      if (!activeItem) return prevItems;

      const newStatus = (overId as string) as
        | 'todo'
        | 'inProgress'
        | 'done';

      const isValidStatus = Object.values(COLUMN_IDS).includes(newStatus);
      if (!isValidStatus) {
        return arrayMove(
          prevItems,
          prevItems.findIndex((item) => item.id === activeId),
          prevItems.findIndex((item) => item.id === overId)
        );
      }

      return prevItems.map((item) =>
        item.id === activeId ? { ...item, status: newStatus } : item
      );
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className='w-full flex-1 bg-slate-100 p-6'>
        <h1 className='mb-6 text-3xl font-bold text-slate-800'>Kanban Board</h1>
        <SortableContext
          items={[
            COLUMN_IDS.TODO,
            COLUMN_IDS.IN_PROGRESS,
            COLUMN_IDS.DONE
          ]}
          strategy={horizontalListSortingStrategy}
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <KanbanColumn
              columnId={COLUMN_IDS.TODO}
              title='To Do'
              items={todoItems}
            />
            <KanbanColumn
              columnId={COLUMN_IDS.IN_PROGRESS}
              title='In Progress'
              items={inProgressItems}
            />
            <KanbanColumn
              columnId={COLUMN_IDS.DONE}
              title='Done'
              items={doneItems}
            />
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}
