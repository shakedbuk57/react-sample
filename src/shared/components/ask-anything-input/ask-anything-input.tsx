import { useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

export interface AskAnythingInputProps {
  onSubmit?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function AskAnythingInput({
  onSubmit,
  placeholder = 'Ask Anything?',
  className
}: AskAnythingInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const actions = [
    { id: 'document', title: 'Document' },
    { id: 'link', title: 'Link' },
    { id: 'image', title: 'Image' },
    { id: 'voice', title: 'Voice' },
    { id: 'menu', title: 'More options' }
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-3xl border shadow-lg',
        'bg-[#323337] border-[#3b3c41]',
        animator({ name: 'fadeInUp' }),
        className
      )}
      style={{
        backgroundColor: '#323337',
        borderColor: '#3b3c41',
      }}
    >
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-base'
        style={{
          color: 'white',
        }}
      />

      <div className='flex items-center gap-3'>
        {actions.map((action) => (
          <button
            key={action.id}
            type='button'
            className='flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-200 transition-colors'
            title={action.title}
            onClick={() => {
              // Placeholder for future action handlers
              console.log(`Action clicked: ${action.id}`);
            }}
          >
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              {action.id === 'document' && (
                <path d='M9 13h6m-3-3V7m-3 8v3m0-6V9m3-2h3m3 0v3m-9 6h6m-3 3v3m-3-3V9' />
              )}
              {action.id === 'link' && <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />}
              {action.id === 'image' && (
                <>
                  <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                  <circle cx='8.5' cy='8.5' r='1.5' />
                  <path d='M21 15l-5-5L5 21' />
                </>
              )}
              {action.id === 'voice' && (
                <>
                  <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
                  <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
                  <line x1='12' y1='19' x2='12' y2='23' />
                  <line x1='8' y1='23' x2='16' y2='23' />
                </>
              )}
              {action.id === 'menu' && (
                <>
                  <circle cx='12' cy='12' r='1' />
                  <circle cx='19' cy='12' r='1' />
                  <circle cx='5' cy='12' r='1' />
                </>
              )}
            </svg>
          </button>
        ))}
      </div>

      <button
        type='submit'
        disabled={!inputValue.trim()}
        className='flex items-center justify-center w-8 h-8 rounded-full transition-colors flex-shrink-0'
        style={{
          backgroundColor: '#f5604b',
        }}
        title='Send'
      >
        <svg
          className='w-5 h-5 text-white'
          viewBox='0 0 24 24'
          fill='white'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 4v16m0 0l-4-4m4 4l4-4' stroke='white' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      </button>
    </form>
  );
}
