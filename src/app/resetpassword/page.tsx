"use client";

import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (!urlToken || urlToken.length === 0) {
      redirect("/");
    }
    setToken(urlToken);
  }, []);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (formData.password.length > 0 && formData.confirmPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  function handleFormChange(e: any) {
    const { name, value } = e.target;
    setFormData((oldData) => ({ ...oldData, [name]: value }));
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData({ password: "", confirmPassword: "" });
      toast.error("Passwords do not match. Try again.");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", {
        password: formData.password,
        token: token,
      });
      toast.success("Password reset successfull.");
      router.push("/login");
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
        <h1 className="text-2xl font-bold mb-6 text-center">Reset password</h1>
        <p className="mt-1 mb-5 text-center">
          Plese enter your new password. Make sure you remember it and don't
          share it with anyone!
        </p>
        <form className="text-center" onSubmit={handleSubmit}>
          <label htmlFor="password">New password</label>
          <input
            className="input-style !mb-5"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            placeholder="******"
          />
          <label htmlFor="confirmPassword">Repeat new password</label>
          <input
            className="input-style !mb-5"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleFormChange}
            placeholder="******"
          />
          <button
            disabled={buttonDisabled}
            className="w-full p-2 bg-orange-600 text-white  rounded-lg mt-2 mb-4 focus:outline-none focus:border-none enabled:hover:bg-orange-500 disabled:opacity-50 transition duration-300 ease-in-out"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
