import { useState } from 'react';
import { clsx } from 'clsx';

export interface AskAnythingInputProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export function AskAnythingInput({
  onSubmit,
  placeholder = 'Ask Anything?'
}: AskAnythingInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='flex w-full max-w-2xl gap-4 rounded-2xl bg-slate-700 p-4'>
      {/* Input field with icons */}
      <div className='flex flex-1 items-center gap-3 px-3'>
        {/* Document icon */}
        <button
          type='button'
          className='flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors'
          aria-label='Add document'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.2'
          >
            <rect x='4' y='2' width='12' height='16' rx='1' />
            <path d='M8 6h4M8 10h4M8 14h4' />
          </svg>
        </button>

        {/* Attachment icon */}
        <button
          type='button'
          className='flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors'
          aria-label='Attach file'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.2'
          >
            <path d='M14 2v2M10 2v2M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2z' />
            <path d='M8 8h8M8 12h8M8 16h4' />
          </svg>
        </button>

        {/* Image icon */}
        <button
          type='button'
          className='flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors'
          aria-label='Add image'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.2'
          >
            <rect x='3' y='3' width='18' height='18' rx='2' />
            <circle cx='8' cy='8' r='1.5' />
            <path d='M3 17l5-5 5 5 8-8' />
          </svg>
        </button>

        {/* Microphone icon */}
        <button
          type='button'
          className='flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors'
          aria-label='Voice input'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.2'
          >
            <path d='M12 2a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z' />
            <path d='M19 10v2a7 7 0 01-14 0v-2M9 19v3h6v-3' />
            <line x1='9' y1='22' x2='15' y2='22' strokeLinecap='round' />
          </svg>
        </button>

        {/* More options icon */}
        <button
          type='button'
          className='flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors'
          aria-label='More options'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.2'
          >
            <circle cx='6' cy='12' r='1.5' />
            <circle cx='12' cy='12' r='1.5' />
            <circle cx='18' cy='12' r='1.5' />
          </svg>
        </button>

        {/* Input field */}
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className='flex-1 bg-transparent text-slate-300 placeholder-slate-500 outline-none'
        />
      </div>

      {/* Send button */}
      <button
        onClick={handleSubmit}
        className={clsx(
          'flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all',
          value.trim()
            ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
            : 'bg-red-500/50 text-slate-300 cursor-not-allowed'
        )}
        disabled={!value.trim()}
        aria-label='Send message'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M7 16l10-10M7 16l2-12 8 8-8 8-2-12z' fill='currentColor' />
        </svg>
      </button>
    </div>
  );
}
