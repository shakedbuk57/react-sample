import { useState } from 'react';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import devopsIcon from '@/assets/devops_1.svg';

interface Provider {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  isConnected: boolean;
  connectedAccount?: string;
}

interface ProjectInfo {
  id: string;
  name: string;
  description: string;
}

export function BrowseIntegrationsPage() {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 'github',
      name: 'GitHub',
      displayName: 'GitHub',
      icon: '🐙',
      isConnected: false
    },
    {
      id: 'azure',
      name: 'Azure DevOps',
      displayName: 'Azure DevOps',
      icon: devopsIcon,
      isConnected: true,
      connectedAccount: 'Azure DevOps'
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const handleRevokeAccess = async (providerId: string) => {
    setIsRevoking(providerId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? { ...p, isConnected: false, connectedAccount: undefined }
          : p
      )
    );
    setIsRevoking(null);
  };

  const handleConnectProvider = async (providerId: string) => {
    setIsConnecting(providerId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? { ...p, isConnected: true, connectedAccount: p.displayName }
          : p
      )
    );
    setIsConnecting(null);
  };

  const handleShowProjectInfo = () => {
    setSelectedProject({
      id: '1',
      name: 'Sample Project',
      description: '1 project will be unlinked'
    });
    setShowProjectModal(true);
  };

  const azureProvider = providers.find((p) => p.id === 'azure');
  const githubProvider = providers.find((p) => p.id === 'github');

  return (
    <main
      className={clsx(
        'w-full flex flex-col items-center justify-start min-h-dvh gap-6 p-6',
        animator({ name: 'fadeIn' })
      )}
    >
      <div className='w-full max-w-2xl'>
        <h1 className='text-2xl font-bold text-foreground mb-8'>Browse Integrations</h1>

        {/* Provider Cards Container */}
        <div className='flex flex-col gap-6 w-full'>
          {/* Each Provider Card */}
          {providers.map((provider) => (
            <div
              key={provider.id}
              className='w-full bg-card border border-border rounded-2xl p-6 flex flex-col gap-4'
            >
              {/* Provider Header */}
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded flex items-center justify-center bg-muted text-foreground text-lg'>
                  {typeof provider.icon === 'string' &&
                  provider.icon.startsWith('http') ? (
                    <img src={provider.icon} alt={provider.name} className='w-full h-full' />
                  ) : typeof provider.icon === 'string' && !provider.icon.startsWith('/') ? (
                    provider.icon
                  ) : (
                    <img src={provider.icon} alt={provider.name} className='w-full h-full' />
                  )}
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Git Provider</p>
                  <h3 className='text-lg font-semibold text-foreground'>{provider.name}</h3>
                </div>
              </div>

              {/* Connection Status */}
              {provider.isConnected ? (
                <div className='flex flex-col gap-3'>
                  <p className='text-sm text-foreground'>
                    You are currently connected to {provider.connectedAccount}, Revoke access to
                    connect {githubProvider?.name}
                  </p>

                  {/* Project Info Section */}
                  <div className='bg-secondary rounded-lg p-4 flex flex-col gap-2'>
                    <p className='text-sm text-muted-foreground'>
                      Project: <span className='text-foreground font-medium'>Sample Project</span>
                    </p>
                    <button
                      onClick={handleShowProjectInfo}
                      className='text-left text-sm text-primary hover:text-primary/80 font-medium'
                    >
                      View Project Details
                    </button>
                  </div>

                  {/* Revoke Button */}
                  <button
                    onClick={() => handleRevokeAccess(provider.id)}
                    disabled={isRevoking === provider.id}
                    className='w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 rounded font-semibold transition-colors'
                  >
                    {isRevoking === provider.id ? 'Revoking...' : `Revoke ${provider.name}`}
                  </button>

                  {selectedProject && (
                    <p className='text-xs text-muted-foreground text-center'>
                      {selectedProject.description}
                    </p>
                  )}
                </div>
              ) : (
                <div className='flex flex-col gap-3'>
                  <p className='text-sm text-muted-foreground'>Not connected</p>

                  {/* Connect Button */}
                  <button
                    onClick={() => handleConnectProvider(provider.id)}
                    disabled={isConnecting === provider.id}
                    className='w-full border border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 rounded font-semibold transition-colors'
                  >
                    {isConnecting === provider.id ? 'Connecting...' : `Connect ${provider.name}`}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project Info Modal */}
      {showProjectModal && selectedProject && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 flex flex-col gap-4 shadow-xl'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold text-foreground'>Project Information</h2>
              <button
                onClick={() => setShowProjectModal(false)}
                className='text-muted-foreground hover:text-foreground text-2xl leading-none'
              >
                ×
              </button>
            </div>

            <div className='flex flex-col gap-3'>
              <div>
                <p className='text-xs text-muted-foreground font-medium'>Project Name</p>
                <p className='text-sm text-foreground'>{selectedProject.name}</p>
              </div>
              <div>
                <p className='text-xs text-muted-foreground font-medium'>Status</p>
                <p className='text-sm text-foreground'>{selectedProject.description}</p>
              </div>
            </div>

            <button
              onClick={() => setShowProjectModal(false)}
              className='w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded font-medium transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
