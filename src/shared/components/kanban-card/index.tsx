import { clsx } from 'clsx';

interface KanbanCardProps {
  id: string;
  title: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return { borderColor: '#ef4444', textColor: '#991b1b' };
    case 'medium':
      return { borderColor: '#f59e0b', textColor: '#92400e' };
    case 'low':
      return { borderColor: '#22c55e', textColor: '#166534' };
    default:
      return { borderColor: '#e5e7eb', textColor: '#6b7280' };
  }
};

export function KanbanCard({
  id,
  title,
  description,
  priority,
  onDragStart,
  onDragEnd
}: KanbanCardProps) {
  const colors = getPriorityColor(priority);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      data-card-id={id}
      className={clsx(
        'w-full flex flex-col gap-2 border-l-4 bg-white p-3 rounded cursor-move',
        'shadow-sm hover:shadow-md transition-shadow'
      )}
      style={{ borderLeftColor: colors.borderColor }}
    >
      <h4
        className='font-semibold text-sm'
        style={{ color: colors.textColor }}
      >
        {title}
      </h4>
      {description && (
        <p className='text-xs text-slate-600'>{description}</p>
      )}
      {priority && (
        <span
          className='text-xs font-medium w-fit px-2 py-1 rounded'
          style={{
            backgroundColor: colors.borderColor,
            color: '#ffffff'
          }}
        >
          {priority}
        </span>
      )}
    </div>
  );
}
