import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { KanbanPage } from './kanban-page';

const meta: Meta<typeof KanbanPage> = {
  title: 'Pages/KanbanPage',
  component: KanbanPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KanbanPage>;

export const Default: Story = {
  args: {},
};
