import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'border rounded p-5 bg-card text-card-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}
