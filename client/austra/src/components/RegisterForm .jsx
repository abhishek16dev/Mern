import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onRegistered }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async data => {
    try {
      const { data: res } = await axios.post(
        'http://localhost:3000/auth/register',
        data
      );
      onRegistered(res.user);
    } catch (err) {
      console.error('Registration failed:', err);
      // TODO: show user-friendly error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className="
          relative
          w-full max-w-[500px] h-auto
          p-[10px]
          rounded-2xl
          bg-gray-800
          before:absolute before:inset-0 before:-m-1 before:rounded-2xl
          before:bg-gradient-to-br before:from-purple-600 before:via-pink-500 before:to-yellow-400
          before:-z-10
        "
      >
        <h2 className="text-4xl text-white font-extrabold text-center mb-6">
          Register
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-white"
        >
          {/* Name */}
          <div className="text-left">
            <label className="block mb-1 font-medium">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Your name"
              className="
                w-full p-[10px] rounded-full bg-white text-black
                placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400
              "
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="you@example.com"
              className="
                w-full p-[10px] rounded-full bg-white text-black
                placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400
              "
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Must be at least 6 characters',
                },
              })}
              placeholder="••••••••"
              className="
                w-full p-[10px] rounded-full bg-white text-black
                placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400
              "
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label className="block mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: value =>
                  value === watch('password') || 'Passwords do not match',
              })}
              placeholder="••••••••"
              className="
                w-full p-[10px] rounded-full bg-white text-black
                placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400
              "
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="
              w-3/5 block mx-auto mt-[10px] p-[10px] rounded-full
              bg-pink-500 text-white font-semibold
              hover:bg-pink-600 transition
            "
          >
            REGISTER
          </button>
        </form>

        <p className="mt-[10px] text-center text-gray-300 text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="underline hover:text-white text-white"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
