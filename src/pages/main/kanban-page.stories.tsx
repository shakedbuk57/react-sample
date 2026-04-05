import type { Meta, StoryObj } from '@storybook/react';
import { KanbanPage } from './kanban-page';

const meta: Meta<typeof KanbanPage> = {
  title: 'Pages/KanbanPage',
  component: KanbanPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KanbanPage>;

export const Default: Story = {};
