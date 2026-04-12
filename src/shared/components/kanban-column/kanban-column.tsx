import {
  useDroppable,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { KanbanCard } from '@/shared/components/kanban-card';
import type { CommonComponentProperties } from '@/shared/types';

interface KanbanColumnItem {
  id: string | number;
  name: string;
  age: number;
}

interface KanbanColumnProps extends CommonComponentProperties {
  columnId: string;
  title: string;
  items: KanbanColumnItem[];
}

export function KanbanColumn({
  columnId,
  title,
  items,
  className = ''
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: columnId
  });

  return (
    <div
      className={`flex w-full min-h-96 flex-col rounded-lg border border-slate-200 bg-slate-50 p-4 ${className}`}
    >
      <h2 className='mb-4 font-semibold text-slate-700'>{title}</h2>
      <div
        ref={setNodeRef}
        className='flex-1 space-y-3 overflow-y-auto rounded-md bg-white p-2'
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <KanbanCard
              key={item.id}
              id={item.id}
              name={item.name}
              age={item.age}
            />
          ))}
        </SortableContext>
      </div>
      <p className='mt-3 text-xs text-slate-500'>
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </p>
    </div>
  );
}
