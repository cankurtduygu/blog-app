import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signInSchema } from '../lib/schemas';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../features/authSlice';
import useAuthCall from '../hooks/useAuthCall';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { signIn } = useAuthCall();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(userCredentials) {
   await signIn(userCredentials);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}

        <button className="btn btn-neutral mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </fieldset>
    </form>
  );
}
