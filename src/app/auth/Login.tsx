"use client";

import { useState } from "react";

const Login = () => {
  const [active, setActive] = useState<"login" | "signup">("login");

  return (
    <>
      {active === "login" ? (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 ">
          <div className="max-w-4xl w-full bg-black shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border-1">
            <div className="p-8">
              <h4 className="text-2xl font-semibold mb-6 border-b pb-2">
                Login
              </h4>
              <form className="space-y-5">
                <div className="relative">
                  {/* Icon placeholder */}
                  <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-blue-500 text-sm hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition border-1"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="bg-gray-600 p-8 flex flex-col justify-center items-center text-center">
              <div className="border-b pb-5 mb-5 w-full">
                <h3 className="text-xl font-semibold mb-2">First time here?</h3>
                <button
                  onClick={() => setActive("signup")}
                  className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-4xl w-full bg-black shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border-1">
            <div className="p-8">
              <h4 className="text-2xl font-semibold mb-6 border-b pb-2">
                Sign Up
              </h4>
              <form className="space-y-5">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition border-1"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="bg-gray-600 p-8 flex flex-col justify-center items-center text-center">
              <div className="border-b pb-5 mb-5 w-full">
                <h3 className="text-xl font-semibold mb-2">
                  Already have an account?
                </h3>
                <button
                  onClick={() => setActive("login")}
                  className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition border-1"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
