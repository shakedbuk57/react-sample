import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrganizationSettingsPage } from './organization-settings-page';

const meta: Meta<typeof OrganizationSettingsPage> = {
  title: 'Pages/OrganizationSettings',
  component: OrganizationSettingsPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationSettingsPage>;

export const Default: Story = {};

export const WithUsersTab: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState<'integrations' | 'users'>('users');

    return (
      <div onClick={(e) => {
        const button = (e.target as HTMLElement).closest('button');
        if (button?.textContent?.includes('Users')) {
          setActiveTab('users');
        } else if (button?.textContent?.includes('Integrations')) {
          setActiveTab('integrations');
        }
      }}>
        <OrganizationSettingsPage />
      </div>
    );
  }
};
