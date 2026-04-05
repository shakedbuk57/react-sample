export type KanbanTaskPriority = 'low' | 'medium' | 'high';
export type KanbanTaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: KanbanTaskPriority;
  status: KanbanTaskStatus;
  assignee?: string;
  dueDate?: string;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: KanbanTaskStatus;
  tasks: KanbanTask[];
}

export interface KanbanBoard {
  id: string;
  title: string;
  columns: KanbanColumn[];
}
