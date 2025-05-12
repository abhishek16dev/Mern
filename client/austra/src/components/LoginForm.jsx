import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    try {
      const { data: res } = await axios.post('http://localhost:3000/auth/login', data);
      onLogin(res.user);
    } catch (err) {
      console.error('Login failed:', err);
      // TODO: show error to user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className="
          relative
          w-full max-w-[500px] h-[550px]
          p-6
          rounded-2xl
          bg-gray-800
          before:absolute before:inset-0 before:-m-1 before:rounded-2xl
          before:bg-gradient-to-br before:from-purple-600 before:via-pink-500 before:to-yellow-400
          before:-z-10
        "
      >
        <div className="h-full flex flex-col justify-center text-center text-white">
          <h1 className="text-5xl font-extrabold mb-8">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-4">
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Username</label>
              <input
                type="text"
                {...register('username', { required: 'Required' })}
                placeholder="Username"
                className="
                  w-full
                p-[10px]
                  rounded-full
                  bg-white text-black
                  placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-pink-400
                "
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Required' })}
                placeholder="Password"
                className="
                  w-full
                  p-[10px]
                  rounded-full
                  bg-white text-black
                  placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-pink-400
                "
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="
                w-3/5 mx-auto block p-[10px] mt-[10px] rounded-full
                bg-pink-500 text-white font-semibold
                hover:bg-pink-600 transition
              "
            >
              LOGIN
            </button>
          </form>

          <div className="flex justify-between text-sm px-6 mt-6 text-gray-300">
            <Link to="/register" className="hover:text-white underline">
              Sign Up!
            </Link>
            <Link to="/forgot-password" className="hover:text-white underline">
              Can’t access your account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
