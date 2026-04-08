import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { NewPage } from './new-page';

const meta: Meta<typeof NewPage> = {
  title: 'Pages/NewPage',
  component: NewPage,
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
type Story = StoryObj<typeof NewPage>;

export const Default: Story = {};
