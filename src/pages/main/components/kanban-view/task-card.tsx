import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { deleteTask } from '@/shared/store/features/kanban/kanban-slices';
import type { Task } from '@/shared/store/features/kanban/kanban-types';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const priorityColors = {
  low: 'border-blue-300 bg-blue-50',
  medium: 'border-yellow-300 bg-yellow-50',
  high: 'border-red-300 bg-red-50'
};

const priorityBadgeColors = {
  low: 'bg-blue-200 text-blue-800',
  medium: 'bg-yellow-200 text-yellow-800',
  high: 'bg-red-200 text-red-800'
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded border-l-4 p-3 bg-white shadow-sm transition-shadow hover:shadow-md ${priorityColors[task.priority]}`}
      {...attributes}
      {...listeners}
    >
      <div className='flex items-start justify-between gap-2'>
        <div className='flex-1'>
          <h4 className='font-medium text-sm text-gray-900'>{task.title}</h4>
          {task.description && (
            <p className='mt-1 text-xs text-gray-600 line-clamp-2'>
              {task.description}
            </p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className='text-gray-400 hover:text-red-500 transition-colors flex-shrink-0'
          title='Delete task'
        >
          ×
        </button>
      </div>

      <div className='mt-2 flex flex-wrap gap-1'>
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${priorityBadgeColors[task.priority]}`}
        >
          {task.priority}
        </span>
        {task.dueDate && (
          <span className='inline-block px-2 py-0.5 rounded text-xs text-gray-600 bg-gray-100'>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(task)}
          className='mt-2 w-full py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors'
        >
          Edit
        </button>
      )}
    </div>
  );
}
