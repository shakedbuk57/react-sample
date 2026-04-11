import type { Preview } from '@storybook/react';
import React from 'react';

import '../src/styles/main.scss';
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        {
          className: 'dark',
          style: {
            backgroundColor: '#000000',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          },
        },
        React.createElement(Story)
      ),
  ],
};

export default preview;
