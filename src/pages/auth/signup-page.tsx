import { Link, Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';

import { userSelectors } from '@/shared/store/features/user/user-selectors.ts';
import { loginAction } from '@/shared/store/features/user/user-slices';
import { SignupQuery } from '@/shared/services/user-api/types';
import { useSignupMutation } from '@/shared/services/user-api';
import { APP_DATA, APP_ROUTES } from '@/shared/constants';
import { animator, toast } from '@/shared/helpers';

export function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupRequest, { isLoading }] = useSignupMutation();
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.main} replace />;
  }

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupQuery>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  const handleSignup = (formValues: SignupQuery) => {
    signupRequest(formValues)
      .unwrap()
      .then(() => {
        dispatch(loginAction());
        navigate(APP_ROUTES.main);
        toast.success({
          message: `Welcome to ${APP_DATA.name}`
        });
      })
      .catch(() =>
        toast.error({
          message: 'Signup failed'
        })
      );
  };

  return (
    <div className='w-full flex flex-col gap-3 text-center items-center justify-center'>
      <form
        onSubmit={handleSubmit(handleSignup)}
        className={clsx(
          'flex flex-col w-full gap-3 border p-5 rounded max-w-md',
          animator({ name: 'fadeIn' })
        )}
      >
        <h3 className={clsx('text-lg mb-2', animator({ name: 'fadeInUp' }))}>
          {`Create Account for ${APP_DATA.name}`}
        </h3>

        <input
          className='border rounded px-4 py-2'
          {...register('username', { required: 'Username is required' })}
          placeholder='Username'
          type='text'
        />
        {errors.username && (
          <span className='text-red-500 text-sm'>{errors.username.message}</span>
        )}

        <input
          className='border rounded px-4 py-2'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format'
            }
          })}
          placeholder='Email'
          type='email'
        />
        {errors.email && (
          <span className='text-red-500 text-sm'>{errors.email.message}</span>
        )}

        <input
          className='border rounded px-4 py-2'
          {...register('password', { required: 'Password is required' })}
          placeholder='Password'
          type='password'
        />
        {errors.password && (
          <span className='text-red-500 text-sm'>{errors.password.message}</span>
        )}

        <input
          className='border rounded px-4 py-2'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match'
          })}
          placeholder='Confirm Password'
          type='password'
        />
        {errors.confirmPassword && (
          <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>
        )}

        <button
          className='mt-1 border py-3 px-4 rounded w-full'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <Link to={APP_ROUTES.login}>[ Already have an account? Login ]</Link>
      </form>
    </div>
  );
}
