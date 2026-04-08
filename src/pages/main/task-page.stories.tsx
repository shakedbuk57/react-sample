import type { Meta, StoryObj } from '@storybook/react-vite';
import { TaskPage } from './task-page';

const meta: Meta<typeof TaskPage> = {
  title: 'Pages/TaskPage',
  component: TaskPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TaskPage>;

export const Default: Story = {};
