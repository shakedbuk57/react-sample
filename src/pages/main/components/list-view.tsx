import { clsx } from 'clsx';

import type { Task } from '../kanban-page';

interface ListViewProps {
  tasks: Task[];
}

const statusColorMap: Record<Task['status'], string> = {
  'todo': 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  'review': 'bg-yellow-100 text-yellow-700',
  'done': 'bg-green-100 text-green-700'
};

const priorityColorMap: Record<Task['priority'], string> = {
  low: 'text-blue-600',
  medium: 'text-orange-600',
  high: 'text-red-600'
};

const statusLabelMap: Record<Task['status'], string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'review': 'Review',
  'done': 'Done'
};

export function ListView({ tasks }: ListViewProps) {
  return (
    <div className='flex flex-col h-full bg-white rounded-lg border overflow-hidden'>
      {/* Table Header */}
      <div className='grid grid-cols-6 gap-4 px-6 py-4 border-b bg-gray-50 font-semibold text-gray-700 sticky top-0'>
        <div className='col-span-2'>Title</div>
        <div>Status</div>
        <div>Priority</div>
        <div>Assignee</div>
        <div>Due Date</div>
      </div>

      {/* Table Body */}
      <div className='flex-1 overflow-y-auto'>
        {tasks.length === 0 ? (
          <div className='flex items-center justify-center h-32 text-gray-400'>
            <p className='text-sm'>No tasks found</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              className={clsx(
                'grid grid-cols-6 gap-4 px-6 py-4 border-b items-center',
                'hover:bg-gray-50 transition-colors',
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              )}
            >
              {/* Title */}
              <div className='col-span-2'>
                <p className='font-medium text-gray-900'>{task.title}</p>
                <p className='text-sm text-gray-600 mt-1'>{task.description}</p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                    statusColorMap[task.status]
                  )}
                >
                  {statusLabelMap[task.status]}
                </span>
              </div>

              {/* Priority */}
              <div>
                <span
                  className={clsx(
                    'font-semibold text-sm',
                    priorityColorMap[task.priority]
                  )}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>

              {/* Assignee */}
              <div>
                <p className='text-sm text-gray-700'>
                  {task.assignee || '-'}
                </p>
              </div>

              {/* Due Date */}
              <div>
                <p className='text-sm text-gray-700'>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : '-'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
