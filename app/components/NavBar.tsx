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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">
            <span className="font-bold text-4xl drop-shadow-[0_1px_2px_rgba(25,215,255,1)] flex justify-center items-center h-9">
              <span className="text-white">S</span>
              <span className="text-white">H</span>
              <span className="text-white">O</span>
              <span className="text-white">W</span>
              <span className="text-orange-600">C</span>
              <span className="text-orange-600">A</span>
              <span className="text-orange-600">S</span>
              <span className="text-orange-600">E</span>
              <span className="text-white m-5 flex text-3xl">
                <CgSearchLoading className="" />{" "}
                {user && user.name && `Welcome ${user.name}`}
              </span>
            </span>
          </Link>
        </div>
        <ul className="flex space-x-4">
          {user ? (
            <>
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
                <Link href="/notifications" className="text-white hover:text-gray-400">
                  Notifications
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white hover:text-gray-400" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
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
