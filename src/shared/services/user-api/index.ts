import { apiService } from '@/shared/services/api-service';
import { REQUEST_METHODS } from '@/shared/constants';

import type { LoginQuery, LoginResult, SignupQuery, SignupResult } from './types';
import { ENDPOINT } from './endpoints';

export const userApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginQuery>({
      query: (payload: LoginQuery) => ({
        url: ENDPOINT.login,
        method: REQUEST_METHODS.POST,
        body: JSON.stringify(payload)
      })
    }),
    signup: builder.mutation<SignupResult, SignupQuery>({
      query: (payload: SignupQuery) => ({
        url: ENDPOINT.signup,
        method: REQUEST_METHODS.POST,
        body: JSON.stringify(payload)
      })
    })
  })
});

export const { useLoginMutation, useSignupMutation } = userApi;
