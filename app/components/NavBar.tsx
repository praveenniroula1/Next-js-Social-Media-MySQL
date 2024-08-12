"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import {
  CiAirportSign1,
  CiAlignBottom,
  CiParking1,
  CiPower,
} from "react-icons/ci";
import { AiFillApple, AiFillProfile } from "react-icons/ai";
import { CgProfile, CgSearchLoading } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { RiProfileLine } from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold ">
          <Link href="/">
            <span className=" font-bold text-4xl drop-shadow-[0_1px_2px_rgba(25,215,255,1)] flex justify-center items-center h-9">
              <span className="text-orange-600">M</span>
              <span className="text-white ">A</span>
              <span className="text-orange-600">R</span>
              <span className="text-white">I</span>
              <span className="text-orange-600">C</span>
              <span className="text-white">H</span>
              <span className="text-orange-600">E</span>
              <span className="text-white">Y</span>
              <span className="text-yellow-500 m-10 flex">
                <CgSearchLoading className="" />{" "}
                {user && user.name && `Hello ${user.name}`}
              </span>
            </span>{" "}
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
