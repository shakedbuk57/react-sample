import { useState, type FormEvent, type ChangeEvent } from 'react';
import { clsx } from 'clsx';

import iconDocument from '@/assets/icon-document.svg';
import iconLink from '@/assets/icon-link.svg';
import iconImage from '@/assets/icon-image.svg';
import iconMic from '@/assets/icon-mic.svg';
import iconGrid from '@/assets/icon-grid.svg';

interface AskAnythingInputProps {
  placeholder?: string;
  onSubmit?: (message: string) => void;
}

export function AskAnythingInput({
  placeholder = 'Ask Anything?',
  onSubmit
}: AskAnythingInputProps) {
  const [message, setMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'w-full flex items-center gap-4 rounded-2xl',
        'bg-slate-700 px-6 py-5'
      )}
    >
      <textarea
        value={message}
        onChange={handleChange}
        placeholder={placeholder}
        className={clsx(
          'flex-1 bg-transparent outline-none resize-none',
          'text-slate-300 placeholder-slate-400',
          'text-base leading-6',
          'min-h-12 max-h-32'
        )}
        rows={1}
      />

      <div className='flex items-center gap-3 flex-shrink-0'>
        <button
          type='button'
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'hover:bg-slate-600 active:bg-slate-500',
            'flex items-center justify-center text-slate-400'
          )}
          aria-label='Add document'
        >
          <img
            src={iconDocument}
            alt='document'
            className='w-6 h-6'
          />
        </button>

        <button
          type='button'
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'hover:bg-slate-600 active:bg-slate-500',
            'flex items-center justify-center text-slate-400'
          )}
          aria-label='Add link'
        >
          <img
            src={iconLink}
            alt='link'
            className='w-6 h-6'
          />
        </button>

        <button
          type='button'
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'hover:bg-slate-600 active:bg-slate-500',
            'flex items-center justify-center text-slate-400'
          )}
          aria-label='Add image'
        >
          <img
            src={iconImage}
            alt='image'
            className='w-6 h-6'
          />
        </button>

        <button
          type='button'
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'hover:bg-slate-600 active:bg-slate-500',
            'flex items-center justify-center text-slate-400'
          )}
          aria-label='Add voice'
        >
          <img
            src={iconMic}
            alt='microphone'
            className='w-6 h-6'
          />
        </button>

        <button
          type='button'
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'hover:bg-slate-600 active:bg-slate-500',
            'flex items-center justify-center text-slate-400'
          )}
          aria-label='Add participants'
        >
          <img
            src={iconGrid}
            alt='grid'
            className='w-6 h-6'
          />
        </button>
      </div>

      <button
        type='submit'
        disabled={!message.trim()}
        className={clsx(
          'p-3 rounded-full flex-shrink-0',
          'transition-all duration-200',
          'flex items-center justify-center',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          message.trim()
            ? 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
            : 'bg-slate-600 text-slate-400'
        )}
        aria-label='Send message'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16V4m0 0L1 10m6-6l6-6'
          />
        </svg>
      </button>
    </form>
  );
}
