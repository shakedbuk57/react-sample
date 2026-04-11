import type { Preview } from '@storybook/react-vite';
import '../src/styles/main.scss';
import '../src/styles/tailwind.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      // Apply dark class to document root for Tailwind dark mode
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('dark');
      }
      return Story({});
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
