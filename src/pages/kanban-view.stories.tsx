import type { Meta, StoryObj } from '@storybook/react-vite';
import { KanbanView } from './kanban-view';

const meta: Meta<typeof KanbanView> = {
  title: 'Pages/KanbanView',
  component: KanbanView,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof KanbanView>;

export const Default: Story = {};
