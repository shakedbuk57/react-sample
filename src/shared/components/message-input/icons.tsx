export function DocumentIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-5 h-5'
    >
      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <polyline points='14 2 14 8 20 8' />
      <line x1='12' y1='13' x2='12' y2='17' />
      <line x1='10' y1='15' x2='14' y2='15' />
    </svg>
  );
}

export function LinkIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-5 h-5'
    >
      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
    </svg>
  );
  // Paperclip icon alternative:
  // <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-5 h-5'>
  //   <path d='M21.5 2v19a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2V2m17 0L3.5 21M21.5 2L3.5 21' />
  // </svg>
}

export function ImageIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-5 h-5'
    >
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <circle cx='8.5' cy='8.5' r='1.5' />
      <polyline points='21 15 16 10 5 21' />
    </svg>
  );
}

export function VoiceIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-5 h-5'
    >
      <path d='M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
      <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
      <line x1='12' y1='19' x2='12' y2='23' />
      <line x1='8' y1='23' x2='16' y2='23' />
    </svg>
  );
}

export function EmojiIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-5 h-5'
    >
      <circle cx='9' cy='9' r='1.5' />
      <circle cx='15' cy='9' r='1.5' />
      <circle cx='9' cy='15' r='1.5' />
      <circle cx='15' cy='15' r='1.5' />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='w-6 h-6'
    >
      <path d='M12 2L2 14h9v8h6v-8h9L12 2z' />
    </svg>
  );
}
