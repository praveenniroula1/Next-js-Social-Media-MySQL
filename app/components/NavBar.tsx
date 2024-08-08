"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  console.log(user);
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/logout");
      if (response.data.success === true) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">
            MARICHEY,{" "}
            <span className="text-yellow-500 m-10">
              {user && user.name && `Hello ${user.name}`}
            </span>
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/friends" className="text-white hover:text-gray-400">
              Friends
            </Link>
          </li>
          <li>
            <Link href="/messages" className="text-white hover:text-gray-400">
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/notifications"
              className="text-white hover:text-gray-400"
            >
              Notifications
            </Link>
          </li>
          {user ? (
            <li>
              <Link
                href="/"
                className="text-white hover:text-gray-400"
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
