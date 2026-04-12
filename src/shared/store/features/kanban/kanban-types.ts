export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: string;
  dueDate?: string;
  assignee?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanInitialState {
  columns: Column[];
  tasks: Record<string, Task>;
  columnOrder: string[];
}
