import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Login = () => {
  const [state, setState] = useState('signUp'); // 'signUp' or 'login'

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 flex flex-col items-center justify-center gap-6">
      {/* Logo top-left */}
      <img
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-80 text-indigo-300 text-sm">
        <h2 className="text-3xl text-white font-bold mb-2 text-center">
          {state === 'signUp' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          {state === 'signUp'
            ? 'Create your account'
            : 'Login to your account!'}
        </p>

        <form action="">
          {/* Full Name (only show on signUp) */}
          {state === 'signUp' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                className="bg-transparent outline-none text-white w-full"
                type="text"
                placeholder="Full Name"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" className="w-5 h-5" />
            <input
              className="bg-transparent outline-none text-white w-full"
              type="email"
              placeholder="Email id"
            />
          </div>

          {/* Password */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
              className="bg-transparent outline-none text-white w-full"
              type="password"
              placeholder="Password"
            />
          </div>

          {/* Forgot password (only in login) */}
          {state === 'login' && (
            <p className="mb-4 text-indigo-400 text-sm cursor-pointer hover:underline">
              Forgot Password?
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-indigo-900 w-full py-2.5 hover:from-indigo-600 hover:to-indigo-950 text-white rounded-full transition font-semibold cursor-pointer"
          >
            {state === 'signUp' ? 'Sign Up' : 'Login'}
          </button>

          {/* Switch state link */}
          <p className="text-center text-gray-400 mt-4">
            {state === 'signUp' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState('login')}
                  className="text-indigo-400 font-semibold cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <span
                  onClick={() => setState('signUp')}
                  className="text-indigo-400 font-semibold cursor-pointer hover:underline"
                >
                  Sign up here
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
