import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/main.scss';
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      // Apply dark theme
      const html = document.documentElement;
      html.classList.add('dark');
      return React.createElement(Story);
    },
  ],
};
export default preview;
