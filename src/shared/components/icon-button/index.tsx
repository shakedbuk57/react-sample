import { clsx } from 'clsx';

interface IconButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

export function IconButton({ icon, alt, onClick, className }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center rounded p-2 hover:bg-opacity-80 transition-opacity',
        className
      )}
      type='button'
      aria-label={alt}
    >
      <img src={icon} alt={alt} className='w-5 h-5' />
    </button>
  );
}
