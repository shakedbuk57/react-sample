import type { Meta, StoryObj } from '@storybook/react-vite';

import { AskAnythingInput } from './index';

const meta: Meta<typeof AskAnythingInput> = {
  title: 'Components/AskAnythingInput',
  component: AskAnythingInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Ask Anything?',
    onSubmit: (message) => console.log('Message submitted:', message)
  }
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Type your question here...',
    onSubmit: (message) => console.log('Message submitted:', message)
  }
};

export const Interactive: Story = {
  args: {
    placeholder: 'Ask Anything?',
    onSubmit: (message) => alert(`Message submitted: "${message}"`)
  }
};
