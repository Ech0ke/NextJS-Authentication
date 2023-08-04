"use client";

import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email: email });
      toast.success("Reset password link sent. Check your email.", {
        duration: 4000,
      });
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
  }
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
      <div className="flex flex-col rounded-md items-center max-w-[450px] min-w-[280px] w-11/12  justify-center pt-8 pb-5 px-5 md:px-8 bg-metal text-whiteText">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Forgot your password?
        </h1>
        <p className="mt-1 mb-5">
          No problem, just enter your email and you will receive an email with
          password reset instructions.
        </p>
        <form className="[&>label]:ml-1" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="input-style !mb-5"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. email@mail.com"
          />
          <button
            className="w-full p-2 bg-orange-600 text-white  rounded-lg mt-2 mb-4 focus:outline-none focus:border-none enabled:hover:bg-orange-500 disabled:opacity-50 transition duration-300 ease-in-out"
            disabled={buttonDisabled}
          >
            Send reset password link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
