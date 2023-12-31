"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Logo from "@/images/demoLogo.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const allowedPaths = [
    "/login",
    "/signup",
    "/forgotpassword",
    "/verifyemail",
    "/resetpassword",
  ];

  // TODO: use redux to show different navbars based on if the user is logged in or not

  const toggleMenu = (): void => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  useEffect(() => {
    toggleMenu();
  }, [pathname]);

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.get(`http://localhost:3000/api/users/logout`);
      router.push("/login");
    } catch (e: any) {
      if (e.response) {
        // If the error object has a response and the response has a data object with an "error" property
        toast.error(e.response.data.error); // Display the error message
      } else {
        // If the error object does not contain the expected structure, show the original error message
        toast.error((e as Error).message);
      }
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Toaster
        containerStyle={{
          top: 80,
        }}
      />
      <nav className="bg-gray-900 border-gray-200">
        <div className=" flex flex-wrap items-center justify-between mx-0 p-4">
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={Logo} className="h-8 w-5 mr-3" alt="App Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DEMO
            </span>
          </div>

          {allowedPaths.includes(pathname) ? (
            <button
              type="button"
              className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <>
              <div className="flex md:order-2">
                <button
                  type="button"
                  className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mx-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600 transition duration-300 ease-in-out"
                  aria-controls="navbar-sticky"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`items-center justify-between ${
                  isMenuOpen && "hidden"
                } w-full md:flex md:w-auto md:order-1 `}
                id="navbar-cta"
              >
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
                  <li>
                    <Link
                      href="/"
                      className={`${
                        pathname === "/"
                          ? "text-orange-500"
                          : " hover:underline text-gray-100"
                      }`}
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/profile"
                      className={`${
                        pathname === "/profile"
                          ? "text-orange-500"
                          : " hover:underline text-gray-100"
                      }`}
                      aria-current="page"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
