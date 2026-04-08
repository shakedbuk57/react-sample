import { animator } from '@/shared/helpers';
import { TaskCard, type TaskCardProps } from './components/task-card';
import { TaskHeader } from './components/task-header';

const MOCK_TASKS: TaskCardProps[] = [
  {
    title: 'Product Page',
    category: 'Component',
    status: 'Active',
    statusColor: 'text-cyan-400',
    dataField: 'None',
    dataFieldIcon: '📋',
    date: '18.08.24',
    notificationCount: 2,
    userInitials: 'ER'
  }
];

export function TaskPage() {
  return (
    <main className={`w-full h-dvh flex flex-col bg-slate-900 text-white p-6 ${animator({ name: 'fadeIn' })}`}>
      <TaskHeader statusLabel='IN PROGRESS' statusCount={1} />

      {/* Content */}
      <div className='flex flex-col gap-6 flex-1 overflow-y-auto'>
        {MOCK_TASKS.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </main>
  );
}
