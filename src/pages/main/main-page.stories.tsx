import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';

import { MainPageStoryWrapper } from './main-page-story-wrapper';
import userReducer from '@/shared/store/features/user/user-slices';
import { userApi } from '@/shared/services/main-api';

const createMockStore = (preloadedState?: PreloadedState<any>) =>
  configureStore({
    reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
    preloadedState,
  });

const mockStore = createMockStore();

const meta: Meta<typeof MainPageStoryWrapper> = {
  title: 'Pages/MainPage',
  component: MainPageStoryWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) =>
      React.createElement(
        Provider,
        { store: mockStore },
        React.createElement(MemoryRouter, {}, React.createElement(Story))
      ),
  ],
};

export default meta;
type Story = StoryObj<typeof MainPageStoryWrapper>;

export const Default: Story = {};

export const Loading: Story = {};
