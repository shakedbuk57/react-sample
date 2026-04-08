import { clsx } from 'clsx';

export interface TaskHeaderProps {
  statusLabel: string;
  statusCount: number;
  onMenuClick?: () => void;
  onMoreClick?: () => void;
}

export function TaskHeader({ statusLabel, statusCount, onMenuClick, onMoreClick }: TaskHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-8'>
      <div className='flex items-center gap-4'>
        {/* Menu Icon */}
        <button onClick={onMenuClick} className='p-2 hover:bg-slate-700 rounded transition-colors'>
          <svg className='w-8 h-8 text-slate-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='6' cy='5' r='1' />
            <circle cx='14' cy='5' r='1' />
            <circle cx='6' cy='12' r='1' />
            <circle cx='14' cy='12' r='1' />
            <circle cx='6' cy='19' r='1' />
            <circle cx='14' cy='19' r='1' />
          </svg>
        </button>
        {/* Status Badge */}
        <div className='flex items-center gap-3 bg-slate-700 px-4 py-2 rounded-full'>
          <span className='text-cyan-400 font-bold uppercase text-sm'>{statusLabel}</span>
          <span className='text-slate-300 text-sm font-medium'>{statusCount}</span>
        </div>
      </div>
      {/* More Options Icon */}
      <button onClick={onMoreClick} className='p-2 hover:bg-slate-700 rounded transition-colors'>
        <svg className='w-6 h-6 text-slate-400 cursor-pointer' viewBox='0 0 24 24' fill='currentColor'>
          <circle cx='12' cy='5' r='2' />
          <circle cx='12' cy='12' r='2' />
          <circle cx='12' cy='19' r='2' />
        </svg>
      </button>
    </div>
  );
}
