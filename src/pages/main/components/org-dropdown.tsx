import { clsx } from 'clsx';
import { useState } from 'react';

import type { Organization } from '../data/mock-data';

interface OrgDropdownProps {
  organizations: Organization[];
  selectedOrg: Organization;
  onOrgChange: (org: Organization) => void;
}

export function OrgDropdown({
  organizations,
  selectedOrg,
  onOrgChange
}: OrgDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative w-full max-w-xs'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between border rounded px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white'
      >
        <span>{selectedOrg.name}</span>
        <span
          className={clsx(
            'transform transition-transform',
            isOpen ? 'rotate-180' : ''
          )}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className='absolute top-full mt-1 w-full border rounded bg-slate-900 z-10 shadow-lg'>
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                onOrgChange(org);
                setIsOpen(false);
              }}
              className={clsx(
                'w-full text-left px-4 py-2 hover:bg-slate-800',
                selectedOrg.id === org.id ? 'bg-slate-700' : ''
              )}
            >
              {org.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
