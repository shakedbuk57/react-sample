import { KanbanBoard } from '@/shared/components/kanban-board';
import type { KanbanBoard as KanbanBoardType } from '@/shared/types/kanban';

// Mock Kanban Data
const MOCK_KANBAN_DATA: KanbanBoardType = {
  id: 'board-1',
  title: 'Product Development Board',
  columns: [
    {
      id: 'col-1',
      title: 'To Do',
      status: 'todo',
      tasks: [
        {
          id: 'task-1',
          title: 'Design login page',
          description: 'Create mockups and prototypes for the new login flow',
          priority: 'high',
          status: 'todo',
          assignee: 'Sarah',
          tags: ['design', 'ui']
        },
        {
          id: 'task-2',
          title: 'Setup project structure',
          description: 'Initialize repository and configure build tools',
          priority: 'high',
          status: 'todo',
          assignee: 'John',
          tags: ['setup', 'devops']
        },
        {
          id: 'task-3',
          title: 'Write API documentation',
          description: 'Document all REST endpoints with examples',
          priority: 'medium',
          status: 'todo',
          tags: ['documentation']
        }
      ]
    },
    {
      id: 'col-2',
      title: 'In Progress',
      status: 'in-progress',
      tasks: [
        {
          id: 'task-4',
          title: 'Implement authentication',
          description: 'Add JWT-based authentication to the backend',
          priority: 'high',
          status: 'in-progress',
          assignee: 'Mike',
          tags: ['backend', 'security']
        },
        {
          id: 'task-5',
          title: 'Build component library',
          description: 'Create reusable React components for UI',
          priority: 'medium',
          status: 'in-progress',
          assignee: 'Emma',
          tags: ['frontend', 'components']
        }
      ]
    },
    {
      id: 'col-3',
      title: 'Review',
      status: 'review',
      tasks: [
        {
          id: 'task-6',
          title: 'Code review: User dashboard',
          description: 'Review the new user dashboard implementation',
          priority: 'medium',
          status: 'review',
          assignee: 'David',
          tags: ['review', 'frontend']
        },
        {
          id: 'task-7',
          title: 'Test payment integration',
          description: 'QA testing for Stripe payment gateway integration',
          priority: 'high',
          status: 'review',
          assignee: 'Lisa',
          tags: ['testing', 'payments']
        }
      ]
    },
    {
      id: 'col-4',
      title: 'Done',
      status: 'done',
      tasks: [
        {
          id: 'task-8',
          title: 'Setup CI/CD pipeline',
          description: 'Configure GitHub Actions for automated deployments',
          priority: 'high',
          status: 'done',
          assignee: 'John',
          tags: ['devops', 'ci-cd']
        },
        {
          id: 'task-9',
          title: 'Create landing page',
          description: 'Build the main landing page with hero section',
          priority: 'medium',
          status: 'done',
          assignee: 'Sarah',
          tags: ['design', 'frontend']
        }
      ]
    }
  ]
};

export function KanbanPage() {
  const handleCardClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
  };

  return (
    <main className='w-full h-dvh flex flex-col bg-slate-50'>
      <KanbanBoard
        board={MOCK_KANBAN_DATA}
        onCardClick={() => {}}
      />
    </main>
  );
}
