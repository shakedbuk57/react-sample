import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import type { Column, ListViewProps } from './types';

export function ListView<T extends Record<string, any>>({
  items,
  columns,
  className,
  emptyMessage = 'No items found'
}: ListViewProps<T>) {
  if (items.length === 0) {
    return (
      <div className={clsx('w-full flex items-center justify-center', className)}>
        <p className='text-slate-400'>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={clsx('w-full flex flex-col gap-2', animator({ name: 'fadeIn' }), className)}
    >
      {/* Header Row */}
      <div className='w-full border-b py-2 px-4 flex items-center justify-between mb-4'>
        {columns.map((column) => (
          <span key={String(column.key)} style={{ flex: column.width || '1' }}>
            {column.label}
          </span>
        ))}
      </div>

      {/* Data Rows */}
      {items.map((item, index) => (
        <div
          key={index}
          className='w-full border py-2 px-4 rounded flex items-center justify-between'
        >
          {columns.map((column) => (
            <span key={String(column.key)} style={{ flex: column.width || '1' }}>
              {String(item[column.key])}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
