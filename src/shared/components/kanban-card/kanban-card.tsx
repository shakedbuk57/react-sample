import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import type { CommonComponentProperties } from '@/shared/types';

interface KanbanCardProps extends CommonComponentProperties {
  id: string | number;
  name: string;
  age: number;
}

export function KanbanCard({ id, name, age, className = '' }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex cursor-move select-none gap-3 border border-slate-300 rounded bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
      {...attributes}
      {...listeners}
    >
      <div className='flex-1'>
        <p className='font-semibold text-slate-800'>{name}</p>
        <p className='text-sm text-slate-500'>Age: {age}</p>
      </div>
    </div>
  );
}
