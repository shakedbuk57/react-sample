import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatInput } from './index';

const meta: Meta<typeof ChatInput> = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    placeholder: 'Ask Anything?',
    onSubmit: (message) => console.log('Message submitted:', message),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Ask Anything?',
    disabled: true,
  },
};
