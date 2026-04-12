import { useDispatch } from 'react-redux';

import { logoutAction } from '@/shared/store/features/user/user-slices';
import { useGetMainQuery } from '@/shared/services/main-api';
import { APP_ROUTES } from '@/shared/constants';
import { Link } from 'react-router';
import { KanbanView } from '@/shared/components/kanban-view';

export function MainPage() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetMainQuery();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const kanbanItems = data?.data.map((item) => ({
    id: item.id,
    name: item.name,
    age: item.age,
    status: (['todo', 'inProgress', 'done'] as const)[item.id % 3]
  })) || [];

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

      {isFetching && (
        <div className='flex items-center justify-center flex-1 bg-slate-100'>
          <p className='text-slate-600'>Loading...</p>
        </div>
      )}
      {data && <KanbanView items={kanbanItems} />}
    </main>
  );
}
