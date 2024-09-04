"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { CgSearchLoading } from "react-icons/cg";

const Navbar: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/logout");
      if (response.data.success === true) {
        dispatch(clearUser());
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and User Greeting */}
        <div className="text-white text-2xl font-bold flex items-center space-x-2">
          <Link href="/">
            <span className="text-4xl font-extrabold tracking-wide flex items-center">
              <span className="text-white">S</span>
              <span className="text-white">H</span>
              <span className="text-white">O</span>
              <span className="text-white">W</span>
              <span className="text-orange-500">C</span>
              <span className="text-orange-500">A</span>
              <span className="text-orange-500">S</span>
              <span className="text-orange-500">E</span>
            </span>
          </Link>
          {user && user.name && (
            <span className="ml-6 text-xl flex items-center space-x-2">
              <CgSearchLoading className="text-white" />
              <span className="font-medium text-white">
                Welcome, <span className="text-gray-200">{user.name}</span>
              </span>
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          {user ? (
            <>
              <li>
                <Link href="/" className="text-white hover:text-gray-400 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/friends" className="text-white hover:text-gray-400 transition duration-200">
                  Friends
                </Link>
              </li>
              <li>
                <Link href="/messages" className="text-white hover:text-gray-400 transition duration-200">
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="text-white hover:text-gray-400 transition duration-200">
                  Notifications
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white hover:text-gray-400 transition duration-200" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/" className="text-white hover:text-gray-400 transition duration-200">
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
