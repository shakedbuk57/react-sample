import { useDispatch } from 'react-redux';
import { logoutAction } from '@/shared/store/features/user/user-slices';
import { APP_ROUTES } from '@/shared/constants';
import { Link } from 'react-router';
import React from 'react';

const MOCK_DATA = [
  { id: 1, name: 'John Smith', age: 28 },
  { id: 2, name: 'Sarah Johnson', age: 34 },
  { id: 3, name: 'Michael Brown', age: 31 },
  { id: 4, name: 'Emma Davis', age: 26 },
  { id: 5, name: 'Robert Wilson', age: 35 },
  { id: 6, name: 'Lisa Anderson', age: 29 },
];

export function MainPageStoryWrapper() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  // Create kanban data from mock data
  const kanbanItems = MOCK_DATA.map((item) => ({
    id: item.id,
    name: item.name,
    age: item.age,
    status: (['todo', 'inProgress', 'done'] as const)[item.id % 3]
  }));

  const todoItems = kanbanItems.filter(item => item.status === 'todo' || !item.status).slice(0, 3);
  const inProgressItems = kanbanItems.filter(item => item.status === 'inProgress').slice(0, 3);
  const doneItems = kanbanItems.filter(item => item.status === 'done').slice(0, 3);

  const renderColumn = (title: string, items: any[]) => (
    <div key={title} className='flex w-full min-h-96 flex-col rounded-lg border border-slate-200 bg-slate-50 p-4'>
      <h2 className='mb-4 font-semibold text-slate-700'>{title}</h2>
      <div className='flex-1 space-y-3 overflow-y-auto rounded-md bg-white p-2'>
        {items.map((item) => (
          <div
            key={item.id}
            className='rounded-md bg-white p-3 border border-slate-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing'
          >
            <div className='font-medium text-slate-800'>{item.name}</div>
            <div className='text-sm text-slate-600'>Age: {item.age}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className='flex w-full flex-col h-dvh gap-0'>
      <div className='flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold text-slate-800'>React Sample</h1>
          <h3 className='flex gap-1 text-sm text-slate-600'>
            Main Page <span className='text-red-500'>( Protected )</span>
          </h3>
        </div>
        <div className='flex gap-3'>
          <button className='border border-slate-300 rounded px-4 py-2 hover:bg-slate-50 transition-colors' onClick={handleLogout}>
            Logout
          </button>
          <Link to={APP_ROUTES.landing} className='border border-slate-300 rounded px-4 py-2 hover:bg-slate-50 transition-colors'>
            Home
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className='flex items-center justify-center flex-1 bg-slate-100'>
          <p className='text-slate-600'>Loading...</p>
        </div>
      )}
      {!isLoading && (
        <div className='flex-1 bg-slate-100 p-6'>
          <h1 className='mb-6 text-3xl font-bold text-slate-800'>Kanban Board</h1>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {renderColumn('To Do', todoItems)}
            {renderColumn('In Progress', inProgressItems)}
            {renderColumn('Done', doneItems)}
          </div>
        </div>
      )}
    </main>
  );
}
