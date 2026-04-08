import { Link } from 'react-router';
import { clsx } from 'clsx';

import { APP_ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';

export function NewPage() {
  return (
    <main
      className={clsx(
        'w-full h-dvh flex items-center justify-center gap-6 flex-col',
        animator({ name: 'fadeIn', speed: 'faster' })
      )}
    >
      <h1 className='text-2xl font-bold'>New Page</h1>
      <p className='text-slate-400'>This is a new page</p>
      <Link className='border py-3 px-4 rounded' to={APP_ROUTES.landing}>
        Back to Landing Page
      </Link>
    </main>
  );
}
