import React from "react";
import Logo from "@/images/demoLogo.svg";
import Image from "next/image";
import Nav from "@/components/Nav";

function ProfilePage() {
  return (
    <>
      <div className="min-h-screen">
        <Nav />
        <h1>Profile</h1>

        <p>Profile page</p>
      </div>
    </>
  );
}

export default ProfilePage;
