import { useState } from 'react';
import { Link } from 'react-router';

import { APP_ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { clsx } from 'clsx';

import { SearchInput } from './components/search-input';
import { MOCK_INTEGRATIONS } from './data/mock-data';

export function BrowseIntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter integrations based on search
  const filteredIntegrations = MOCK_INTEGRATIONS.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (
    status: 'connected' | 'disconnected' | 'pending'
  ) => {
    switch (status) {
      case 'connected':
        return 'bg-green-900 text-green-200';
      case 'disconnected':
        return 'bg-red-900 text-red-200';
      case 'pending':
        return 'bg-yellow-900 text-yellow-200';
    }
  };

  const getStatusIcon = (status: 'connected' | 'disconnected' | 'pending') => {
    switch (status) {
      case 'connected':
        return '✓';
      case 'disconnected':
        return '✕';
      case 'pending':
        return '⧗';
    }
  };

  return (
    <main className='flex flex-col w-full min-h-dvh bg-slate-950 text-white p-8'>
      <div
        className={clsx(
          'max-w-3xl mx-auto w-full',
          animator({ name: 'fadeIn' })
        )}
      >
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Available Integrations</h1>
          <Link
            to={APP_ROUTES.organizationSettings}
            className='text-slate-400 hover:text-white underline text-sm'
          >
            Back to Settings
          </Link>
        </div>

        {/* Description */}
        <p className='text-slate-400 mb-6'>
          Connect your organization with various tools and services to enhance
          collaboration and automation.
        </p>

        {/* Search Input */}
        <div className='mb-6'>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search integrations...'
          />
        </div>

        {/* Integrations Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {filteredIntegrations.length > 0 ? (
            filteredIntegrations.map((integration) => (
              <div
                key={integration.id}
                className={clsx(
                  'border rounded p-5 bg-slate-900 hover:bg-slate-800 flex flex-col gap-4',
                  animator({ name: 'fadeIn' })
                )}
              >
                {/* Integration Header */}
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-white'>
                      {integration.name}
                    </h3>
                    <p className='text-sm text-slate-400 mt-1'>
                      {integration.provider}
                    </p>
                  </div>
                  <div
                    className={clsx(
                      'px-3 py-1 rounded text-sm font-medium flex items-center gap-1',
                      getStatusColor(integration.status)
                    )}
                  >
                    <span>{getStatusIcon(integration.status)}</span>
                    <span className='capitalize'>{integration.status}</span>
                  </div>
                </div>

                {/* Last Sync */}
                {integration.lastSync && (
                  <p className='text-xs text-slate-500'>
                    Last synced:{' '}
                    {new Date(integration.lastSync).toLocaleDateString()}
                  </p>
                )}

                {/* Actions */}
                <div className='flex gap-2 pt-2 border-t border-slate-700'>
                  {integration.status === 'connected' ? (
                    <>
                      <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium'>
                        Configure
                      </button>
                      <button className='flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-medium'>
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium'>
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <p className='text-slate-400'>
                {searchQuery
                  ? 'No integrations match your search'
                  : 'No integrations available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
