import { useState } from 'react';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';

export interface ChatInputProps {
  placeholder?: string;
  onSubmit?: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({
  placeholder = 'Ask Anything?',
  onSubmit,
  disabled = false
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'w-full flex flex-col gap-3 px-8 py-6 rounded-3xl',
        'bg-slate-700 border border-slate-600',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Placeholder Text Row */}
      <div className='text-slate-300 text-lg font-normal'>{placeholder}</div>

      {/* Content Row: Icons on left, input and send button on right */}
      <div className='flex items-center justify-between gap-6'>
        {/* Toolbar Icons - Left side */}
        <div className='flex items-center gap-5'>
          {/* Document Icon */}
          <button
            type='button'
            className='flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-400 transition-colors'
            aria-label='Add document'
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='w-6 h-6'
            >
              <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' />
              <polyline points='13 2 13 9 20 9' />
            </svg>
          </button>

          {/* Attachment Icon */}
          <button
            type='button'
            className='flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-400 transition-colors'
            aria-label='Attach file'
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='w-6 h-6'
            >
              <path d='m21.5 2-.5 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2l-.5-19' />
              <path d='M3 5h18' />
              <path d='M10 11v6' />
              <path d='M14 11v6' />
            </svg>
          </button>

          {/* Image Icon */}
          <button
            type='button'
            className='flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-400 transition-colors'
            aria-label='Add image'
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='w-6 h-6'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
              <circle cx='8.5' cy='8.5' r='1.5' />
              <polyline points='21 15 16 10 5 21' />
            </svg>
          </button>

          {/* Microphone Icon */}
          <button
            type='button'
            className='flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-400 transition-colors'
            aria-label='Voice input'
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='w-6 h-6'
            >
              <path d='M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
              <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
              <line x1='12' y1='19' x2='12' y2='23' />
              <line x1='8' y1='23' x2='16' y2='23' />
            </svg>
          </button>

          {/* Settings Grid Icon */}
          <button
            type='button'
            className='flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-400 transition-colors'
            aria-label='Settings'
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              className='w-6 h-6'
            >
              <circle cx='6' cy='6' r='1.5' />
              <circle cx='18' cy='6' r='1.5' />
              <circle cx='6' cy='18' r='1.5' />
              <circle cx='18' cy='18' r='1.5' />
            </svg>
          </button>
        </div>

        {/* Text Input - Middle (flex-1 to take remaining space) */}
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'flex-1 bg-transparent text-foreground placeholder-slate-500',
            'border-none outline-none text-sm',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        />

        {/* Submit Button - Right side */}
        <button
          type='submit'
          disabled={disabled || !message.trim()}
          className={clsx(
            'flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0',
            'bg-red-500 text-white hover:bg-red-600 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label='Send message'
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            strokeWidth='2.5'
            className='w-5 h-5'
          >
            <path d='M12 5v14M12 5l-5 5M12 5l5 5' />
          </svg>
        </button>
      </div>
    </form>
  );
}
