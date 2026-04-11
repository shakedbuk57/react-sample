import type { Meta, StoryObj } from '@storybook/react';
import { AskInput } from './index';

const meta: Meta<typeof AskInput> = {
  title: 'Components/AskInput',
  component: AskInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AskInput>;

export const Default: Story = {
  args: {
    placeholder: 'Ask Anything?',
    onSend: (text: string) => {
      console.log('Message sent:', text);
    },
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Type your question here...',
    onSend: (text: string) => {
      console.log('Message sent:', text);
    },
  },
};
