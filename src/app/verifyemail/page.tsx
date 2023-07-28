"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  async function verifyUserEmail() {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (e: any) {
      setError(true);
      if (e.response) {
        // If the error object has a response and the response has a data object with an "error" property
        setErrorMessage(e.response.data.error); // Display the error message
      } else {
        // If the error object does not contain the expected structure, show the original error message
        console.log((e as Error).message);
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-slate-50 p-10 rounded-lg text-center text-black space-y-6">
        <h1 className="text-3xl">Verify Email</h1>
        {verified ? (
          <div>
            <h2 className="text-2xl">Email Verified ✅</h2>{" "}
            <button className="w-full p-2 border bg-orange-600 text-white  rounded-lg mb-4 focus:outline-none focus:border-none hover:bg-orange-500 transition duration-300 ease-in-out">
              Login
            </button>
          </div>
        ) : (
          !verified && !error && <BeatLoader />
        )}

        {error && (
          <div>
            <h2 className="text-2xl bg-red-600 text-black p-2 rounded-md">
              Error: {errorMessage}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
