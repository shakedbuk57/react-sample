import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { OrganizationSettingsPage } from './organization-settings-page';

const meta: Meta<typeof OrganizationSettingsPage> = {
  title: 'Pages/OrganizationSettings',
  component: OrganizationSettingsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/settings/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrganizationSettingsPage>;

export const Default: Story = {};
