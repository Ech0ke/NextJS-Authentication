"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col rounded-md items-center max-w-lg min-w-[280px] w-2/5 justify-center pt-8 pb-5 px-5 md:px-10 bg-slate-50 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to the DEMO
        </h1>
        <label htmlFor="email">Email</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="e.g. email@mail.com"
        />
        <label htmlFor="password">Password</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="********"
        />
        <button
          className="w-full p-2 border bg-orange-600 text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-orange-500 transition duration-300 ease-in-out"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link
          href="/signup"
          className="underline hover:text-orange-500 transition duration-300 ease-in-out"
        >
          Create new account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
