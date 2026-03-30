import type { Meta, StoryObj } from '@storybook/react-vite';
import { KanbanPage } from './kanban-page';

const meta: Meta<typeof KanbanPage> = {
  title: 'Pages/KanbanPage',
  component: KanbanPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof KanbanPage>;

export const Default: Story = {};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive kanban board with draggable task cards. Four columns: To Do, In Progress, Review, and Done. Each task shows priority indicator, assignee, and due date.',
      },
    },
  },
};
