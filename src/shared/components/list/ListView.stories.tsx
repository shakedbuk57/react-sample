import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListView } from './list-view';
import type { Column } from './types';

interface User {
  name: string;
  age: number;
}

const meta: Meta<typeof ListView<User>> = {
  title: 'Components/ListView',
  component: ListView,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ListView<User>>;

// Sample user data matching MainPage usage
const sampleUsers: User[] = [
  { name: 'Alice Johnson', age: 28 },
  { name: 'Bob Smith', age: 34 },
  { name: 'Carol Williams', age: 29 },
  { name: 'David Brown', age: 41 },
];

const userColumns: Column<User>[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];

export const Default: Story = {
  args: {
    items: sampleUsers,
    columns: userColumns,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    columns: userColumns,
    emptyMessage: 'No users found',
  },
};

export const SingleRow: Story = {
  args: {
    items: [{ name: 'John Doe', age: 25 }],
    columns: userColumns,
  },
};

export const CustomColumns: Story = {
  args: {
    items: [
      { name: 'Emma Davis', age: 31 },
      { name: 'Frank Miller', age: 27 },
    ],
    columns: userColumns,
  },
};
