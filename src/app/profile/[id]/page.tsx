import Nav from "@/components/Nav";
import React from "react";

function UserProfile({ params }: any) {
  return (
    <div>
      <Nav />
      <div className="flex flex-col justify-center space-y-4 items-center min-h-screen">
        <h1>Profile</h1>
        <div className="flex flex-wrap justify-center gap-2">
          <p className="text-2xl ">Profile page </p>
          <span className="p-2 rounded bg-orange-500 text-black">
            {params.id}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
