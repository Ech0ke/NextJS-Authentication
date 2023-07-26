"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import axios from "axios";
import { toast } from "react-hot-toast";

type userInfoProps = {
  message: string;
  success: boolean;
  data: {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
  };
};

function ProfilePage() {
  const [userData, setUserData] = useState<userInfoProps | null>(null);

  useEffect(() => {
    async function getUserInfo(): Promise<void> {
      try {
        const response = await axios.get("/api/users/me");
        if (response !== null) {
          setUserData(response.data);
        } else {
          toast.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }
    getUserInfo();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Nav />
        <h1>Profile</h1>

        <p>Profile page</p>
        <span>{userData?.data?.email}</span>
      </div>
    </>
  );
}

export default ProfilePage;
