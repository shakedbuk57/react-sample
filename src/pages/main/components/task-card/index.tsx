import { clsx } from 'clsx';

export interface TaskCardProps {
  title: string;
  category: string;
  status: string;
  statusColor: string;
  dataField: string;
  dataFieldIcon: string;
  date: string;
  notificationCount: number;
  userInitials: string;
}

export function TaskCard({
  title,
  category,
  status,
  statusColor,
  dataField,
  dataFieldIcon,
  date,
  notificationCount,
  userInitials
}: TaskCardProps) {
  return (
    <div className='flex flex-col gap-4 border border-slate-600 rounded-lg p-6 bg-slate-700'>
      {/* First Row: Data Field and Date */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-slate-300'>
          <span>{dataFieldIcon}</span>
          <span className='text-sm'>{dataField}</span>
        </div>
        <div className='flex items-center gap-2 text-slate-300'>
          <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
            <line x1='16' y1='2' x2='16' y2='6' />
            <line x1='8' y1='2' x2='8' y2='6' />
            <line x1='3' y1='10' x2='21' y2='10' />
          </svg>
          <span className='text-sm'>{date}</span>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-slate-600' />

      {/* Task Title */}
      <h3 className='text-xl font-semibold text-white'>{title}</h3>

      {/* Category and Status */}
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-3'>
          <svg className='w-6 h-6 text-cyan-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <rect x='3' y='3' width='7' height='7' />
            <rect x='14' y='3' width='7' height='7' />
            <rect x='3' y='14' width='7' height='7' />
            <rect x='14' y='14' width='7' height='7' />
          </svg>
          <span className='text-slate-300'>{category}</span>
        </div>
        <span className={clsx('text-base font-semibold', statusColor)}>{status}</span>
      </div>

      {/* Bottom Row: Notification Badge and User Avatar */}
      <div className='flex items-center justify-between mt-6'>
        <div className='relative'>
          <svg className='w-8 h-8 text-slate-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <rect x='4' y='4' width='16' height='16' rx='2' ry='2' />
            <line x1='4' y1='10' x2='20' y2='10' />
          </svg>
          {notificationCount > 0 && (
            <div className='absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
              {notificationCount}
            </div>
          )}
        </div>
        <div className='bg-sky-400 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-lg'>
          {userInitials}
        </div>
      </div>
    </div>
  );
}
