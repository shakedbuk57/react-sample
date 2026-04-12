import type { Preview } from '@storybook/react-vite';
import React from 'react';

import '../src/styles/main.scss';
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: any) =>
      React.createElement(
        'div',
        { className: 'dark' },
        React.createElement(Story)
      ),
  ],
};

export default preview;
