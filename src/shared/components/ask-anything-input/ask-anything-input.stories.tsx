import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { AskAnythingInput } from './ask-anything-input';

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
    onSubmit: (text) => console.log('Submitted:', text),
  },
  render: (args) => {
    return (
      <div style={{ width: '600px' }}>
        <AskAnythingInput {...args} />
      </div>
    );
  },
};

export const WithInput: Story = {
  args: {
    placeholder: 'Ask Anything?',
    onSubmit: (text) => console.log('Submitted:', text),
  },
  render: (args) => {
    const [inputValue, setInputValue] = useState('What is React?');
    
    return (
      <div style={{ width: '600px' }}>
        <AskAnythingInput {...args} />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Type your question here...',
    onSubmit: (text) => console.log('Submitted:', text),
  },
  render: (args) => {
    return (
      <div style={{ width: '600px' }}>
        <AskAnythingInput {...args} />
      </div>
    );
  },
};
