import { useState } from 'react';
import { clsx } from 'clsx';

import { IconButton } from '@/shared/components/icon-button';

interface AskInputProps {
  onSend?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function AskInput({
  onSend,
  placeholder = 'Ask Anything?',
  className
}: AskInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend?.(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    console.log('Attachment clicked');
  };

  const handleLink = () => {
    console.log('Link clicked');
  };

  const handleImage = () => {
    console.log('Image clicked');
  };

  const handleMicrophone = () => {
    console.log('Microphone clicked');
  };

  const handleMore = () => {
    console.log('More options clicked');
  };

  return (
    <div
      className={clsx('w-full max-w-2xl rounded-2xl p-3 flex items-center gap-3 border', className)}
      style={{
        backgroundColor: '#323337',
        borderColor: '#3b3c41',
        boxShadow: '0 2px 4px rgba(25, 33, 61, 0.08)'
      }}
    >
      {/* Input field */}
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={clsx('flex-1 bg-transparent outline-none text-sm leading-relaxed')}
        style={{
          color: '#9ba0aa'
        }}
        autoComplete='off'
      />

      {/* Action icon buttons */}
      <div className='flex items-center gap-2'>
        <IconButton
          icon='/icons/attachment.svg'
          alt='Attachment'
          onClick={handleAttachment}
        />
        <IconButton
          icon='/icons/link.svg'
          alt='Link'
          onClick={handleLink}
        />
        <IconButton
          icon='/icons/image.svg'
          alt='Image'
          onClick={handleImage}
        />
        <IconButton
          icon='/icons/mic.svg'
          alt='Microphone'
          onClick={handleMicrophone}
        />
        <IconButton
          icon='/icons/more.svg'
          alt='More options'
          onClick={handleMore}
        />
      </div>

      {/* Send button */}
      <button
        onClick={handleSend}
        className='flex items-center justify-center rounded-full hover:opacity-90 transition-opacity flex-shrink-0'
        type='button'
        aria-label='Send'
        style={{
          backgroundColor: '#f5604b',
          width: '28px',
          height: '28px',
          padding: '6px 8px',
          minWidth: '28px'
        }}
      >
        <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M10.5 1.5l-9 9 9 9v-6.5h8v-5h-8V1.5z' />
        </svg>
      </button>
    </div>
  );
}
