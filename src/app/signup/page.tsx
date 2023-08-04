"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";
import Logo from "@/images/demoLogo.svg";
import Image from "next/image";
import Popup from "@/components/Popup";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      setShowPopup(true);
      // router.push("/login");
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

  const handleHidePopup = () => {
    setShowPopup(false);
    router.push("/login");
  };

  return (
    <>
      <Popup
        show={showPopup}
        email={user.email}
        handleClose={handleHidePopup}
      />
      <div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
        <div className="flex flex-col rounded-md items-center max-w-[450px] min-w-[280px] w-11/12  justify-center pt-8 pb-5 px-5 md:px-8 bg-metal text-whiteText">
          <Image src={Logo} className=" h-16 mb-5" alt="App Logo" />
          <h1 className="text-2xl font-bold mb-6 text-center">
            Signup to the DEMO
          </h1>
          <form onSubmit={handleSignup} className="[&>label]:ml-1">
            <label htmlFor="username">Username</label>
            <input
              className="input-style"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="e.g. Mark"
            />
            <label htmlFor="email">Email</label>
            <input
              className="input-style"
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="e.g. email@mail.com"
            />
            <label htmlFor="password">Password</label>
            <input
              className="input-style !mb-5"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="********"
            />
            <button
              className="w-full p-2 bg-orange-600 text-white  rounded-lg mt-2 mb-4 focus:outline-none focus:border-none enabled:hover:bg-orange-500 disabled:opacity-50 transition duration-300 ease-in-out"
              onClick={handleSignup}
              disabled={buttonDisabled}
            >
              {loading ? (
                <BeatLoader color="white" size={9} speedMultiplier={0.9} />
              ) : (
                "Signup"
              )}
            </button>
          </form>
          <Link
            href="/login"
            className="underline hover:text-orange-500 transition duration-300 ease-in-out"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
