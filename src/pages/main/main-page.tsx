import { useDispatch } from 'react-redux';

import { logoutAction } from '@/shared/store/features/user/user-slices';
import { APP_ROUTES } from '@/shared/constants';
import { Link } from 'react-router';
import { KanbanView } from './components/kanban-view';

export function MainPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
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
          <Link
            to={APP_ROUTES.landing}
            className='text-blue-600 hover:text-blue-800 underline'
          >
            Return Home
          </Link>
          <button
            className='border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-hidden'>
        <KanbanView />
      </div>
    </main>
  );
}
