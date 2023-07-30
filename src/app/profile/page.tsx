"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

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
        {!userData ? (
          <div className="flex flex-col gap-2 justify-center items-center min-h-[85vh]">
            <BeatLoader color="white" size={18} speedMultiplier={0.9} />

            <p className="text-gray-400">loading</p>
          </div>
        ) : (
          <>
            <h1>Profile</h1>

            <p>Profile page</p>
            <p>
              User email:{" "}
              <Link
                href={`/profile/${userData?.data?._id}`}
                className="text-orange-600 underline"
              >
                {userData?.data?.email}
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
