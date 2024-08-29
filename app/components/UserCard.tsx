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
    <div className="w-full md:w-1/4 mt-3">
      <div className="flex flex-col items-center w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        {/* Profile Icon and Name */}
        <Link href="/profile">
          <div className="flex flex-col items-center mb-6 cursor-pointer">
            <CgProfile className="text-6xl text-blue-500 mb-4" />
            <div className="text-2xl font-semibold">
              {user?.name || "User Name"}
            </div>
          </div>
        </Link>

        {/* Posts, Followers, Following */}
        <div className="w-full mb-6">
          <div className="flex justify-around text-center mb-4">
            <div>
              <div className="text-xl font-semibold">{posts}</div>
              <div className="text-gray-300">Posts</div>
            </div>
            <div>
              <div className="text-xl font-semibold">
                {user?.followers || 0}
              </div>
              <div className="text-gray-300">Followers</div>
            </div>
            <div>
              <div className="text-xl font-semibold">
                {user?.following || 0}
              </div>
              <div className="text-gray-300">Following</div>
            </div>
          </div>
          <hr className="border-gray-500" />
        </div>

        {/* Search bar */}
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Search for people and posts..."
            className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Additional Items */}
        <div className="w-full">
          <Link href="/create-post">
            <button className="w-full py-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
              Create a Post
            </button>
          </Link>
          <Link href="/friends">
            <button className="w-full py-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
              Friends
            </button>
          </Link>
          <button className="w-full py-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
            Liked Posts
          </button>
          <button className="w-full py-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
            Commented Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
