import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { KanbanInitialState, Task, Column } from './kanban-types';

const initialState: KanbanInitialState = {
  columns: [
    { id: 'todo', title: 'To Do', taskIds: ['task1', 'task2'] },
    { id: 'in-progress', title: 'In Progress', taskIds: ['task3'] },
    { id: 'done', title: 'Done', taskIds: ['task4', 'task5'] }
  ],
  tasks: {
    task1: {
      id: 'task1',
      title: 'Design new landing page',
      description: 'Create mockups and wireframes',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-02-15'
    },
    task2: {
      id: 'task2',
      title: 'Update documentation',
      priority: 'low',
      status: 'todo'
    },
    task3: {
      id: 'task3',
      title: 'Implement authentication',
      description: 'Add login and signup flows',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-02-10'
    },
    task4: {
      id: 'task4',
      title: 'Database schema migration',
      priority: 'medium',
      status: 'done'
    },
    task5: {
      id: 'task5',
      title: 'API endpoint testing',
      priority: 'medium',
      status: 'done'
    }
  },
  columnOrder: ['todo', 'in-progress', 'done']
};

const kanbanSlices = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: Task; columnId: string }>) => {
      const { task, columnId } = action.payload;
      state.tasks[task.id] = task;

      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.taskIds.push(task.id);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      delete state.tasks[taskId];

      state.columns.forEach((col) => {
        col.taskIds = col.taskIds.filter((id) => id !== taskId);
      });
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        fromColumnId: string;
        toColumnId: string;
        newIndex: number;
      }>
    ) => {
      const { taskId, fromColumnId, toColumnId, newIndex } = action.payload;

      // Remove from source column
      const fromColumn = state.columns.find((col) => col.id === fromColumnId);
      if (fromColumn) {
        fromColumn.taskIds = fromColumn.taskIds.filter((id) => id !== taskId);
      }

      // Add to target column
      const toColumn = state.columns.find((col) => col.id === toColumnId);
      if (toColumn) {
        toColumn.taskIds.splice(newIndex, 0, taskId);
        // Update task status
        if (state.tasks[taskId]) {
          state.tasks[taskId].status = toColumnId;
        }
      }
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      const column = action.payload;
      state.columns.push(column);
      state.columnOrder.push(column.id);
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      const column = state.columns.find((col) => col.id === columnId);

      if (column) {
        // Delete all tasks in the column
        column.taskIds.forEach((taskId) => {
          delete state.tasks[taskId];
        });

        // Remove column
        state.columns = state.columns.filter((col) => col.id !== columnId);
        state.columnOrder = state.columnOrder.filter((id) => id !== columnId);
      }
    },
    reorderColumns: (state, action: PayloadAction<string[]>) => {
      state.columnOrder = action.payload;
    }
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  addColumn,
  deleteColumn,
  reorderColumns
} = kanbanSlices.actions;

export default kanbanSlices.reducer;
