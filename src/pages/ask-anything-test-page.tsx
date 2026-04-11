import { useState } from 'react';
import { clsx } from 'clsx';

import { AskAnythingInput } from '@/shared/components/ask-anything-input';
import { animator } from '@/shared/helpers';

export function AskAnythingTestPage() {
  const [submissions, setSubmissions] = useState<string[]>([]);

  const handleSubmit = (text: string) => {
    setSubmissions((prev) => [text, ...prev]);
  };

  return (
    <main className='w-full flex flex-col items-center justify-center h-dvh gap-8 bg-black p-4'>
      <div className='w-full max-w-lg flex flex-col gap-4'>
        <h1
          className={clsx(
            'text-3xl font-bold text-white text-center mb-4',
            animator({ name: 'fadeInDown' })
          )}
        >
          Ask Anything Input
        </h1>

        <div className={clsx('flex flex-col gap-2', animator({ name: 'fadeInUp', delay: '0.2s' }))}>
          <AskAnythingInput
            onSubmit={handleSubmit}
            placeholder='Ask Anything?'
          />
        </div>

        {submissions.length > 0 && (
          <div className='mt-6 flex flex-col gap-2'>
            <h2 className='text-lg font-semibold text-slate-300'>
              Submissions ({submissions.length})
            </h2>
            <div className='flex flex-col gap-2 max-h-64 overflow-y-auto'>
              {submissions.map((submission, index) => (
                <div
                  key={index}
                  className='p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm'
                >
                  {submission}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
