import type { Meta, StoryObj } from '@storybook/react-vite';

import { BrowseIntegrationsPage } from './browse-integrations-page';

const meta: Meta<typeof BrowseIntegrationsPage> = {
  title: 'Pages/BrowseIntegrationsPage',
  component: BrowseIntegrationsPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BrowseIntegrationsPage>;

/**
 * Default story showing the Browse Integrations page with:
 * - Azure DevOps connected with revoke button and project info
 * - GitHub disconnected with connect button
 */
export const Default: Story = {};
