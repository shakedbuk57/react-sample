import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { BrowseIntegrationsPage } from './browse-integrations-page';

const meta: Meta<typeof BrowseIntegrationsPage> = {
  title: 'Pages/BrowseIntegrationsPage',
  component: BrowseIntegrationsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/integrations']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BrowseIntegrationsPage>;

export const Default: Story = {};
