import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";

const UserCard = () => {
  const [posts, setPosts] = useState(0);
  const user = useSelector((state: any) => state.user.user);

  const fetchPostsNumber = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      if (response.data.results) {
        setPosts(response.data.results.length);
      }
    } catch (error) {
      console.error("Failed to fetch posts number", error);
    }
  };

  useEffect(() => {
    fetchPostsNumber();
  }, []);

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mt-3">
      <div className="flex flex-col items-center w-full bg-black text-white p-6 rounded-lg shadow-lg">
        {/* Profile Icon and Name */}
        <Link href="/profile">
          <div className="flex flex-col items-center mb-6 cursor-pointer hover:scale-105 transition-transform duration-200">
            <CgProfile className="text-7xl text-white mb-4" />
            <div className="text-2xl font-bold tracking-wide">
              {user?.name || "User Name"}
            </div>
          </div>
        </Link>

        {/* Posts, Followers, Following */}
        <div className="w-full mb-6">
          <div className="flex justify-around text-center mb-4">
            <div>
              <div className="text-2xl font-semibold">{posts}</div>
              <div className="text-gray-400">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {user?.followers || 0}
              </div>
              <div className="text-gray-400">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {user?.following || 0}
              </div>
              <div className="text-gray-400">Following</div>
            </div>
          </div>
          <hr className="border-gray-600" />
        </div>

        {/* Search bar */}
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Search for people and posts..."
            className="w-full px-4 py-2 text-black rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
          />
        </div>

        {/* Additional Items */}
        <div className="w-full text-black space-y-4">
  <Link href="/create-post">
    <button className="w-full py-2 bg-gray-900 text-white border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300">
      Create a Post
    </button>
  </Link>
  <Link href="/friends">
    <button className="w-full py-2 mt-2 bg-gray-900 text-white border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300">
      Friends
    </button>
  </Link>
  <Link href="/liked-posts">
    <button className="w-full py-2 mt-2 bg-gray-900 text-white border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300">
      Liked Posts
    </button>
  </Link>
  <Link href="/commented-posts">
    <button className="w-full py-2 mt-2 bg-gray-900 text-white border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300">
      Commented Posts
    </button>
  </Link>
</div>
      </div>
    </div>
  );
};

export default UserCard;
