import { useRef, useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

interface AskAnythingInputProps {
  placeholder?: string;
  onSubmit?: (message: string) => void;
  disabled?: boolean;
}

export function AskAnythingInput({
  placeholder = 'Ask Anything?',
  onSubmit,
  disabled = false
}: AskAnythingInputProps) {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSubmit?.(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleAttachment = () => {
    // Placeholder for attachment functionality
    console.log('Attachment button clicked');
  };

  const handleLink = () => {
    // Placeholder for link insertion functionality
    console.log('Link button clicked');
  };

  const handleImage = () => {
    // Placeholder for image upload functionality
    console.log('Image button clicked');
  };

  const handleMicrophone = () => {
    // Placeholder for voice recording functionality
    console.log('Microphone button clicked');
  };

  const handleGrid = () => {
    // Placeholder for grid/poll functionality
    console.log('Grid/Poll button clicked');
  };

  return (
    <div
      className={clsx(
        'w-full max-w-2xl flex items-center gap-4 p-6 rounded-2xl text-white',
        animator({ name: 'fadeIn' })
      )}
      style={{
        backgroundColor: '#3b3c41'
      }}
    >
      <div className='flex-1 flex flex-col gap-3'>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className='w-full bg-transparent text-white placeholder-slate-400 outline-none resize-none text-base'
          rows={1}
          style={{
            minHeight: '24px'
          }}
        />

        <div className='flex items-center gap-3'>
          <button
            onClick={handleAttachment}
            disabled={disabled}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              disabled ? 'text-slate-500 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'
            )}
            title='Attach file'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' />
              <polyline points='13 2 13 9 20 9' />
            </svg>
          </button>

          <button
            onClick={handleLink}
            disabled={disabled}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              disabled ? 'text-slate-500 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'
            )}
            title='Insert link'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
              <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
            </svg>
          </button>

          <button
            onClick={handleImage}
            disabled={disabled}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              disabled ? 'text-slate-500 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'
            )}
            title='Insert image'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
              <circle cx='8.5' cy='8.5' r='1.5' />
              <polyline points='21 15 16 10 5 21' />
            </svg>
          </button>

          <button
            onClick={handleMicrophone}
            disabled={disabled}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              disabled ? 'text-slate-500 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'
            )}
            title='Voice recording'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
              <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
              <line x1='12' y1='19' x2='12' y2='23' />
              <line x1='8' y1='23' x2='16' y2='23' />
            </svg>
          </button>

          <button
            onClick={handleGrid}
            disabled={disabled}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              disabled ? 'text-slate-500 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'
            )}
            title='Create poll or grid'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <rect x='3' y='3' width='7' height='7' />
              <rect x='14' y='3' width='7' height='7' />
              <rect x='14' y='14' width='7' height='7' />
              <rect x='3' y='14' width='7' height='7' />
            </svg>
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled || !message.trim()}
        className={clsx(
          'flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all text-white',
          disabled || !message.trim()
            ? 'cursor-not-allowed'
            : 'hover:scale-105 active:scale-95'
        )}
        style={{
          backgroundColor: disabled || !message.trim() ? '#6b7280' : '#f5604b'
        } as React.CSSProperties}
        title='Send message'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <polyline points='18 15 12 9 6 15' />
          <line x1='12' y1='9' x2='12' y2='21' />
        </svg>
      </button>
    </div>
  );
}
