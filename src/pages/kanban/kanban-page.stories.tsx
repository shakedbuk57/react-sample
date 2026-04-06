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
