import type { Preview } from '@storybook/react-vite';
import '../src/styles/main.scss';
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } }
  }
};
export default preview;
