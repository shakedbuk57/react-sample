import type { CommonComponentProperties } from '@/shared/types';
import { clsx } from 'clsx';

export interface ReadyStatusProps extends CommonComponentProperties {
  showIcon?: boolean;
  text?: string;
}

export function ReadyStatus({
  showIcon = true,
  text = 'Ready',
  className,
  style
}: ReadyStatusProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 bg-slate-800',
        className
      )}
      style={style}
    >
      {showIcon && (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='text-green-500'
        >
          <path
            d='M12 3c-1.1 0-2 .9-2 2v8H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6.3l1.7 1.7c.3.3.8.5 1.3.5.5 0 1-.2 1.4-.6.3-.3.6-.8.6-1.4V7c0-1.1-.9-2-2-2h-2z'
            fill='currentColor'
          />
        </svg>
      )}
      <span className='text-base font-medium text-green-500'>{text}</span>
    </div>
  );
}
