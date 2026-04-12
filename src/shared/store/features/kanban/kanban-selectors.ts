import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { REDUCER_NAMES } from '@/shared/store/reducer-names';

import type { KanbanInitialState } from './kanban-types';

const kanbanState = createDraftSafeSelector(
  (state: { [key: string]: KanbanInitialState }) =>
    state[REDUCER_NAMES.kanban],
  (state) => ({
    ...state
  })
);

const columns = createDraftSafeSelector(
  (state: { [key: string]: KanbanInitialState }) =>
    state[REDUCER_NAMES.kanban].columns,
  (cols) => cols
);

const tasks = createDraftSafeSelector(
  (state: { [key: string]: KanbanInitialState }) =>
    state[REDUCER_NAMES.kanban].tasks,
  (allTasks) => allTasks
);

const columnOrder = createDraftSafeSelector(
  (state: { [key: string]: KanbanInitialState }) =>
    state[REDUCER_NAMES.kanban].columnOrder,
  (order) => order
);

export const kanbanSelectors = {
  kanbanState,
  columns,
  tasks,
  columnOrder
};
