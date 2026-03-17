import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '../lib/schemas';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuthCall from '../hooks/useAuthCall';

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signUp } = useAuthCall();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      image: '',
      city: '',
      bio: '',
    },
  });

  async function onSubmit(userCredentials) {
    // console.log(data);
    await signUp(userCredentials);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Sign Up for a new account</legend>

        {/* First Name & Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="label">First Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="First Name"
              {...register('firstName')}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Last Name"
              {...register('lastName')}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Username & Image */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1">
            <label className="label">Username</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Username"
              {...register('username')}
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="label">Image</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Image URL"
              {...register('image')}
              disabled={isSubmitting}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>

        {/* City & Biography */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1">
            <label className="label">City</label>
            <input
              type="text"
              className="input w-full"
              placeholder="City"
              {...register('city')}
              disabled={isSubmitting}
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="label">Biography</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Biography"
              {...register('bio')}
              disabled={isSubmitting}
            />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>
        </div>

        {/* Email & Password */}
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register('email')}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              {...register('password')}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button className="btn btn-neutral mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
      </fieldset>
    </form>
  );
}
