"use client";
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-96 fixed top-0 left-0 bg-gray-900 text-white p-5">
      <div className="flex justify-between">
        {" "}
        <h1 className="text-xl font-bold mb-4"><Link href="/">MyApp</Link></h1>{" "}
      </div>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for people, posts"
          className="w-full px-4 py-2 border-2 border-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </div>
      <div className="mt-14">
        <ul>
          <li className="mb-4">
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/message" className="hover:underline">
              Messages
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/notifications" className="hover:underline">
              Notifications
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/settings" className="hover:underline">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/logout" className="hover:underline">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
