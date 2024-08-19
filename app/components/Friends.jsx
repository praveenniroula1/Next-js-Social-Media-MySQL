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
    <div className="p-4">
      {users?.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded-lg"
        >
          <div className="flex items-center">
            <CgProfile size={40} className="text-gray-500" />
            <span className="ml-4 text-lg font-semibold">{user.name}</span>
          </div>
          <button
            onClick={() => handleUnfollow(user.id)}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-blue-600"
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Friends;
