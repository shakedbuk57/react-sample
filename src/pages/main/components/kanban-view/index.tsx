import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addTask,
  updateTask
} from '@/shared/store/features/kanban/kanban-slices';
import { kanbanSelectors } from '@/shared/store/features/kanban/kanban-selectors';
import type { Task } from '@/shared/store/features/kanban/kanban-types';
import { KanbanBoard } from './kanban-board';
import { TaskForm } from './task-form';
import { TaskModal } from './task-modal';

type ModalState = {
  type: 'create' | 'edit' | null;
  columnId?: string;
  taskId?: string;
};

export function KanbanView() {
  const dispatch = useDispatch();
  const tasks = useSelector(kanbanSelectors.tasks);
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  const handleAddTask = useCallback((columnId: string) => {
    setModalState({ type: 'create', columnId });
  }, []);

  const handleEditTask = useCallback((taskId: string) => {
    setModalState({ type: 'edit', taskId });
  }, []);

  const handleFormSubmit = useCallback(
    (formData: Task) => {
      if (modalState.type === 'create' && modalState.columnId) {
        const newTask: Task = {
          ...formData,
          id: formData.id || `task-${Date.now()}`,
          status: modalState.columnId
        };
        dispatch(addTask({ task: newTask, columnId: modalState.columnId }));
      } else if (modalState.type === 'edit') {
        dispatch(updateTask(formData));
      }
      setModalState({ type: null });
    },
    [modalState, dispatch]
  );

  const handleCloseModal = useCallback(() => {
    setModalState({ type: null });
  }, []);

  const currentTask =
    modalState.type === 'edit' && modalState.taskId
      ? tasks[modalState.taskId]
      : undefined;

  const modalTitle =
    modalState.type === 'create' ? 'Create New Task' : 'Edit Task';

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold text-gray-900'>Kanban Board</h1>
        <p className='text-gray-600'>
          Drag and drop tasks between columns to manage your workflow
        </p>
      </div>

      <div className='flex-1 overflow-hidden rounded-lg bg-white p-4'>
        <KanbanBoard onAddTask={handleAddTask} onEditTask={handleEditTask} />
      </div>

      <TaskModal
        isOpen={modalState.type !== null}
        title={modalTitle}
        onClose={handleCloseModal}
      >
        <TaskForm
          initialTask={currentTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </TaskModal>
    </div>
  );
}
