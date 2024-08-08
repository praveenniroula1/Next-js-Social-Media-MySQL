import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Link from "next/link";

interface UserCardProps {
  user: {
    name: string;
    posts: number;
    followers: number;
    following: number;
  } | null;
}

const UserCard = () => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div className="w-[25%] mt-3">

<div className="flex flex-col items-center w-full bg-gray-800 text-white p-4 rounded-lg">
      {/* Profile Icon and Name */}
      <div className="flex flex-col items-center mb-8">
        <CgProfile className="text-6xl text-blue-500 mb-4" />
        <div className="text-2xl font-semibold">
          {user && user.name && `${user.name}`}
        </div>
      </div>

      {/* Posts, Followers, Following */}
      <div className="w-full mb-6">
        <div className="flex justify-around w-full text-center mb-4">
          <div>
            <div className="text-xl font-semibold">{user?.posts || 11}</div>
            <div className="text-gray-300">Posts</div>
          </div>
          <div>
            <div className="text-xl font-semibold">{user?.followers ||  3}</div>
            <div className="text-gray-300">Followers</div>
          </div>
          <div>
            <div className="text-xl font-semibold">{user?.following || 7}</div>
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
        <button className="w-full py-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
          Create a Post
        </button>
        <button className="w-full py-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
         <Link href="/friends">Friends</Link> 
        </button>
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
