import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AskAnythingInput } from './index';

const meta: Meta<typeof AskAnythingInput> = {
  title: 'Shared/AskAnythingInput',
  component: AskAnythingInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AskAnythingInput>;

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
    onSubmit: (message) => console.log('Message submitted:', message),
    disabled: true,
  },
};

export const WithText: Story = {
  args: {
    placeholder: 'Ask Anything?',
    onSubmit: (message) => console.log('Message submitted:', message),
    disabled: false,
  },
  render: (args) => {
    const [message, setMessage] = React.useState('What is AI?');
    
    return (
      <div className='flex items-center justify-center p-8'>
        <AskAnythingInput {...args} />
      </div>
    );
  },
};
