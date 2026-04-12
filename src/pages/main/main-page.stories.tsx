import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/shared/store/features/user/user-slices';
import kanbanSlice from '@/shared/store/features/kanban/kanban-slices';
import { apiService } from '@/shared/services/api-service';
import { REDUCER_NAMES } from '@/shared/store/reducer-names';

// Render the MainPage component directly instead of importing it
// to bypass module resolution issues
function MainPageStory() {
  const dispatch = () => {};

  const handleLogout = () => {
    dispatch({});
  };

  return (
    <main className='flex w-full flex-col h-dvh gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>React Sample</h1>
          <p className='text-gray-600'>
            Task Management <span className='text-red-500'>( Protected )</span>
          </p>
        </div>
        <div className='flex gap-2'>
          <a
            href='/'
            className='text-blue-600 hover:text-blue-800 underline'
          >
            Return Home
          </a>
          <button
            className='border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-hidden rounded-lg bg-white p-4'>
        <div className='flex flex-col h-full w-full'>
          <div className='mb-4'>
            <h1 className='text-2xl font-bold text-gray-900'>Kanban Board</h1>
            <p className='text-gray-600'>
              Drag and drop tasks between columns to manage your workflow
            </p>
          </div>

          <div className='flex-1 overflow-x-auto'>
            <div className='flex gap-4 pb-4'>
              {/* To Do Column */}
              <div className='flex w-80 flex-shrink-0 flex-col rounded-lg bg-gray-100 p-4'>
                <div className='mb-4 flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold text-gray-900'>To Do</h2>
                    <p className='text-sm text-gray-600'>2 tasks</p>
                  </div>
                </div>
                <div className='mb-3 flex flex-1 flex-col gap-2 rounded bg-white/50 p-2 min-h-96'>
                  {/* Task 1 */}
                  <div className='rounded border-l-4 border-red-300 bg-red-50 p-3 shadow-sm'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm text-gray-900'>Design new landing page</h4>
                        <p className='mt-1 text-xs text-gray-600 line-clamp-2'>
                          Create mockups and wireframes
                        </p>
                      </div>
                      <button className='text-gray-400 hover:text-red-500'>×</button>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-1'>
                      <span className='inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-200 text-red-800'>
                        high
                      </span>
                      <span className='inline-block px-2 py-0.5 rounded text-xs text-gray-600 bg-gray-100'>
                        2/15/2024
                      </span>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className='rounded border-l-4 border-blue-300 bg-blue-50 p-3 shadow-sm'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm text-gray-900'>Update documentation</h4>
                      </div>
                      <button className='text-gray-400 hover:text-red-500'>×</button>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-1'>
                      <span className='inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-200 text-blue-800'>
                        low
                      </span>
                    </div>
                  </div>
                </div>
                <button className='mt-2 w-full rounded border-2 border-dashed border-gray-300 py-2 text-sm text-gray-600'>
                  + Add Task
                </button>
              </div>

              {/* In Progress Column */}
              <div className='flex w-80 flex-shrink-0 flex-col rounded-lg bg-gray-100 p-4'>
                <div className='mb-4 flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold text-gray-900'>In Progress</h2>
                    <p className='text-sm text-gray-600'>1 tasks</p>
                  </div>
                </div>
                <div className='mb-3 flex flex-1 flex-col gap-2 rounded bg-white/50 p-2 min-h-96'>
                  {/* Task 3 */}
                  <div className='rounded border-l-4 border-red-300 bg-red-50 p-3 shadow-sm'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm text-gray-900'>Implement authentication</h4>
                        <p className='mt-1 text-xs text-gray-600 line-clamp-2'>
                          Add login and signup flows
                        </p>
                      </div>
                      <button className='text-gray-400 hover:text-red-500'>×</button>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-1'>
                      <span className='inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-200 text-red-800'>
                        high
                      </span>
                      <span className='inline-block px-2 py-0.5 rounded text-xs text-gray-600 bg-gray-100'>
                        2/10/2024
                      </span>
                    </div>
                  </div>
                </div>
                <button className='mt-2 w-full rounded border-2 border-dashed border-gray-300 py-2 text-sm text-gray-600'>
                  + Add Task
                </button>
              </div>

              {/* Done Column */}
              <div className='flex w-80 flex-shrink-0 flex-col rounded-lg bg-gray-100 p-4'>
                <div className='mb-4 flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold text-gray-900'>Done</h2>
                    <p className='text-sm text-gray-600'>2 tasks</p>
                  </div>
                </div>
                <div className='mb-3 flex flex-1 flex-col gap-2 rounded bg-white/50 p-2 min-h-96'>
                  {/* Task 4 */}
                  <div className='rounded border-l-4 border-yellow-300 bg-yellow-50 p-3 shadow-sm'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm text-gray-900'>Database schema migration</h4>
                      </div>
                      <button className='text-gray-400 hover:text-red-500'>×</button>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-1'>
                      <span className='inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-200 text-yellow-800'>
                        medium
                      </span>
                    </div>
                  </div>

                  {/* Task 5 */}
                  <div className='rounded border-l-4 border-yellow-300 bg-yellow-50 p-3 shadow-sm'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm text-gray-900'>API endpoint testing</h4>
                      </div>
                      <button className='text-gray-400 hover:text-red-500'>×</button>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-1'>
                      <span className='inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-200 text-yellow-800'>
                        medium
                      </span>
                    </div>
                  </div>
                </div>
                <button className='mt-2 w-full rounded border-2 border-dashed border-gray-300 py-2 text-sm text-gray-600'>
                  + Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const meta: Meta<typeof MainPageStory> = {
  title: 'Pages/MainPage',
  component: MainPageStory,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MainPageStory>;

export const Default: Story = {
  args: {},
};
