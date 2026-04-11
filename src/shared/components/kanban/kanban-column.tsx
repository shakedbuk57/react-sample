import { clsx } from 'clsx';
import { KanbanCard } from './kanban-card';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
}

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onCardDragStart?: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  onDragOver,
  onDrop,
  onCardDragStart
}: KanbanColumnProps) {
  return (
    <div
      className='flex flex-col w-full gap-3 border p-5 rounded min-h-[500px] bg-muted'
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-column-id={id}
    >
      <h2 className='font-bold text-lg'>{title}</h2>
      <div className='text-xs text-slate-500 mb-2'>{tasks.length} tasks</div>

      <div className='flex flex-col gap-3'>
        {tasks.length === 0 && (
          <div className='flex items-center justify-center py-8 text-slate-400'>
            <p className='text-sm'>No tasks yet</p>
          </div>
        )}

        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer!.effectAllowed = 'move';
              e.dataTransfer!.setData('taskId', task.id);
              e.dataTransfer!.setData('sourceColumnId', id);
              if (onCardDragStart) {
                onCardDragStart(e, task.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
