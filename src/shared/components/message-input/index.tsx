import { useState } from 'react';
import { clsx } from 'clsx';

import type { ReactNode } from 'react';

import {
  DocumentIcon,
  LinkIcon,
  ImageIcon,
  VoiceIcon,
  EmojiIcon,
  SendIcon
} from './icons';

export interface MessageInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  onAttachDocument?: () => void;
  onAttachLink?: () => void;
  onAttachImage?: () => void;
  onVoiceInput?: () => void;
  onEmojiClick?: () => void;
  disabled?: boolean;
}

export function MessageInput({
  placeholder = 'Ask Anything?',
  onSend,
  onAttachDocument,
  onAttachLink,
  onAttachImage,
  onVoiceInput,
  onEmojiClick,
  disabled = false
}: MessageInputProps) {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 p-6 rounded-2xl bg-slate-700'>
      <input
        type='text'
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={clsx(
          'flex-1 bg-slate-700 text-slate-100 placeholder-slate-400',
          'border-0 outline-none focus:ring-0 px-0 py-0',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      />

      <div className='flex items-center gap-4'>
        <ActionButton
          icon={<DocumentIcon />}
          onClick={onAttachDocument}
          disabled={disabled}
          ariaLabel='Attach document'
        />

        <ActionButton
          icon={<LinkIcon />}
          onClick={onAttachLink}
          disabled={disabled}
          ariaLabel='Attach link'
        />

        <ActionButton
          icon={<ImageIcon />}
          onClick={onAttachImage}
          disabled={disabled}
          ariaLabel='Attach image'
        />

        <ActionButton
          icon={<VoiceIcon />}
          onClick={onVoiceInput}
          disabled={disabled}
          ariaLabel='Voice input'
        />

        <ActionButton
          icon={<EmojiIcon />}
          onClick={onEmojiClick}
          disabled={disabled}
          ariaLabel='Emoji'
        />

        <div className='flex-1' />

        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={clsx(
            'flex items-center justify-center w-12 h-12 rounded-full',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'text-white'
          )}
          style={{
            backgroundColor: '#ff5a6b',
            opacity: disabled || !message.trim() ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!disabled && message.trim()) {
              e.currentTarget.style.backgroundColor = '#ff4757';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && message.trim()) {
              e.currentTarget.style.backgroundColor = '#ff5a6b';
            }
          }}
          aria-label='Send message'
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function ActionButton({ icon, onClick, disabled, ariaLabel }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        'flex items-center justify-center',
        'text-slate-400 hover:text-slate-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200'
      )}
    >
      {icon}
    </button>
  );
}
