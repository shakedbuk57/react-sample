export type KanbanCardStatus = 'todo' | 'in-progress' | 'done';

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  status: KanbanCardStatus;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}

export interface KanbanColumn {
  id: KanbanCardStatus;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoard {
  columns: KanbanColumn[];
}
