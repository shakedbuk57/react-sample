import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import { logoutAction } from '@/shared/store/features/user/user-slices';
import { useGetMainQuery } from '@/shared/services/main-api';
import { APP_ROUTES } from '@/shared/constants';
import { ListView, type Column } from '@/shared/components/list';

export function MainPage() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetMainQuery();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <main className='flex w-full flex-col items-center justify-center h-dvh gap-6'>
      <h1 className='text-2xl font-bold'>React Sample</h1>
      <h3 className='flex gap-1'>
        Main Page <span className='text-red-500'>( Protected )</span>
      </h3>
      <button className='border py-3 px-4 rounded' onClick={handleLogout}>
        Logout
      </button>
      <Link to={APP_ROUTES.landing}>[ Return Home ]</Link>

      {isFetching && <p>Loading...</p>}
      {data && (
        <ListView
          items={data.data}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'age', label: 'Age' }
          ] as Column<(typeof data.data)[number]>[]}
        />
      )}
    </main>
  );
}
