import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const Friends = () => {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/friends");
      setUsers(response.data.friends);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUnfollow = async (idToUnfollow) => {
    try {
      await axios.delete(`http://localhost:3000/api/friends`, {
        data: { idToUnfollow },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== idToUnfollow));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Friends List</h2>
      {users?.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
              <CgProfile size={24} className="text-gray-600" />
            </div>
            <span className="text-lg font-semibold text-gray-700">{user.name}</span>
          </div>
          <button
            onClick={() => handleUnfollow(user.id)}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out"
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Friends;
