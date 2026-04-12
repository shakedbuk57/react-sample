export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
}

export interface ListViewProps<T> {
  items: T[];
  columns: Column<T>[];
  className?: string;
  emptyMessage?: string;
}
