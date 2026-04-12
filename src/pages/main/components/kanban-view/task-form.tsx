import { useForm } from 'react-hook-form';

import type { Task, TaskPriority } from '@/shared/store/features/kanban/kanban-types';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (data: Task) => void;
  onCancel: () => void;
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const { register, handleSubmit } = useForm<Task>({
    defaultValues: initialTask || {
      id: `task-${Date.now()}`,
      title: '',
      description: '',
      priority: 'medium',
      status: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-900'>
          Task Title
        </label>
        <input
          {...register('title', { required: 'Title is required' })}
          type='text'
          className='mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Enter task title'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-900'>
          Description
        </label>
        <textarea
          {...register('description')}
          className='mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Enter task description'
          rows={3}
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-900'>
          Priority
        </label>
        <select
          {...register('priority')}
          className='mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-900'>
          Due Date
        </label>
        <input
          {...register('dueDate')}
          type='date'
          className='mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>

      <div className='flex gap-2 justify-end pt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        >
          {initialTask ? 'Update' : 'Create'} Task
        </button>
      </div>
    </form>
  );
}
