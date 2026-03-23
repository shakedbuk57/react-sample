export interface Organization {
  id: string;
  name: string;
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  subProjects?: Project[];
}

export interface Integration {
  id: string;
  name: string;
  provider: string;
  icon?: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSync?: string;
}

export const MOCK_ORGANIZATIONS: Organization[] = [
  { id: 'org-1', name: 'Git Org 1' },
  { id: 'org-2', name: 'Git Org 2' },
  { id: 'org-3', name: 'Git Org 3' },
  { id: 'org-4', name: 'Git Org 4' }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Frontend Redesign',
    description: 'Complete redesign of the frontend interface',
    organizationId: 'org-1',
    subProjects: [
      {
        id: 'proj-1-1',
        name: 'Design System',
        organizationId: 'org-1'
      },
      {
        id: 'proj-1-2',
        name: 'Component Library',
        organizationId: 'org-1'
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Platform Playground',
    description: 'Testing ground for new features',
    organizationId: 'org-1',
    subProjects: [
      {
        id: 'proj-2-1',
        name: 'API Testing',
        organizationId: 'org-1'
      }
    ]
  },
  {
    id: 'proj-3',
    name: 'Platform Monorepo',
    description: 'Main monorepo for all services',
    organizationId: 'org-1'
  },
  {
    id: 'proj-4',
    name: 'Mobile App',
    description: 'React Native mobile application',
    organizationId: 'org-2'
  },
  {
    id: 'proj-5',
    name: 'Backend Services',
    description: 'Microservices architecture',
    organizationId: 'org-2'
  },
  {
    id: 'proj-6',
    name: 'DevOps Infrastructure',
    description: 'Infrastructure and deployment configs',
    organizationId: 'org-3'
  }
];

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'int-1',
    name: 'GitHub',
    provider: 'github',
    status: 'connected',
    lastSync: '2024-01-15T10:30:00Z'
  },
  {
    id: 'int-2',
    name: 'Azure DevOps',
    provider: 'azure-devops',
    status: 'connected',
    lastSync: '2024-01-15T09:15:00Z'
  },
  {
    id: 'int-3',
    name: 'GitLab',
    provider: 'gitlab',
    status: 'disconnected'
  },
  {
    id: 'int-4',
    name: 'Bitbucket',
    provider: 'bitbucket',
    status: 'pending'
  },
  {
    id: 'int-5',
    name: 'Jira',
    provider: 'jira',
    status: 'connected',
    lastSync: '2024-01-15T08:45:00Z'
  },
  {
    id: 'int-6',
    name: 'Slack',
    provider: 'slack',
    status: 'disconnected'
  }
];

export const MOCK_USERS = [
  { id: 'user-1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Developer'
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Developer'
  },
  {
    id: 'user-4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Manager'
  }
];
