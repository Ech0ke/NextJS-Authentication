"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/profile");
    } catch (e: any) {
      if (e.response) {
        // If the error object has a response and the response has a data object with an "error" property
        toast.error(e.response.data.error); // Display the error message
      } else {
        // If the error object does not contain the expected structure, show the original error message
        toast.error((e as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />

      <div className="flex flex-col rounded-md items-center max-w-lg min-w-[280px] w-2/5 justify-center pt-8 pb-5 px-5 md:px-10 bg-slate-50 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to the DEMO
        </h1>
        <form onSubmit={handleLogin} className="text-center">
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
            className="w-full p-2 border bg-orange-600 text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-none enabled:hover:bg-orange-500 disabled:opacity-50 transition duration-300 ease-in-out"
            type="submit"
            disabled={buttonDisabled}
          >
            {loading ? (
              <BeatLoader color="white" size={9} speedMultiplier={0.9} />
            ) : (
              "Login"
            )}
          </button>
        </form>
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
