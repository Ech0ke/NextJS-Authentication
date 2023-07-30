"use client";

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email: email });
      toast.success("Reset password link sent. Check your email.");
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
    <div>
      {" "}
      <form className="text-center" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="w-full p-2 text-gray-800 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. email@mail.com"
        />
        <button className="bg-orange-600 p-4 rounded-md">
          Send reset password link
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
