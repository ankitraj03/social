"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

const Login = () => {
  const {fetchUser} = useAuth();
  const router = useRouter();
  const [active, setActive] = useState<"login" | "signup">("login");

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (active === "signup") {
      if (form.confirmPassword && form.password !== form.confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  }, [form.password, form.confirmPassword, active]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (active === "signup" && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/${active === "login" ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials:"include",
          body:
            active === "login"
              ? JSON.stringify({ email: form.email, password: form.password })
              : JSON.stringify({
                  email: form.email,
                  username: form.username,
                  password: form.password,
                }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        await fetchUser();

        console.log(`${active} success`, data);


        setForm({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/");
      }
    } catch (err) {
      setError("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {active === "login" ? (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 ">
          <div className="max-w-4xl w-full bg-black shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border-1">
            <div className="p-8">
              <h4 className="text-2xl font-semibold mb-6 border-b pb-2">Login</h4>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password} 
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-blue-500 text-sm hover:underline">
                    Forgot password?
                  </a>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition border-1 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
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
              <h4 className="text-2xl font-semibold mb-6 border-b pb-2">Sign Up</h4>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email} 
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
                  <input
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password} 
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || !!error}
                  className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition border-1 disabled:opacity-50"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            </div>
            <div className="bg-gray-600 p-8 flex flex-col justify-center items-center text-center">
              <div className="border-b pb-5 mb-5 w-full">
                <h3 className="text-xl font-semibold mb-2">Already have an account?</h3>
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
