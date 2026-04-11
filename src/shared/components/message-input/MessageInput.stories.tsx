import type { Meta, StoryObj } from '@storybook/react-vite';

import { MessageInput } from './index';

const meta = {
  title: 'Components/MessageInput',
  component: MessageInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Ask Anything?'
  },
  render: (args) => (
    <div className='w-screen h-screen bg-black flex items-center justify-center p-8'>
      <div className='w-full max-w-md'>
        <MessageInput {...args} />
      </div>
    </div>
  )
};

export const WithText: Story = {
  args: {
    placeholder: 'Ask Anything?'
  },
  render: (args) => (
    <div className='w-screen h-screen bg-black flex items-center justify-center p-8'>
      <div className='w-full max-w-md'>
        <MessageInput {...args} />
      </div>
    </div>
  )
};

export const Disabled: Story = {
  args: {
    placeholder: 'Ask Anything?',
    disabled: true
  },
  render: (args) => (
    <div className='w-screen h-screen bg-black flex items-center justify-center p-8'>
      <div className='w-full max-w-md'>
        <MessageInput {...args} />
      </div>
    </div>
  )
};
