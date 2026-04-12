import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { SignupPage } from './signup-page';
import userReducer from '@/shared/store/features/user/user-slices';
import { apiService } from '@/shared/services/api-service';

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/SignupPage',
  component: SignupPage,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      // Mock Redux store
      const mockStore = configureStore({
        reducer: {
          user: userReducer,
          [apiService.reducerPath]: apiService.reducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(apiService.middleware),
      });

      return (
        <Provider store={mockStore}>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SignupPage>;

export const Default: Story = {
  args: {},
};
