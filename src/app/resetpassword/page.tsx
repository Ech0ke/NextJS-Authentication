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
    <div>
      <form className="text-center" onSubmit={handleSubmit}>
        <label htmlFor="password">New password</label>
        <input
          className="w-full p-2 text-gray-800 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleFormChange}
          placeholder="******"
        />
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          className="w-full p-2 text-gray-800 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleFormChange}
          placeholder="******"
        />
        <button className="bg-orange-600 p-4 rounded-md">Reset password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
