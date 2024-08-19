import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const PeopleYouMayKnow = () => {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/peopleyoumayknow");
      setUsers(response.data.rows);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFollow = async (idToFollow) => {
    try {
      await axios.post("http://localhost:3000/api/peopleyoumayknow", {
        idToFollow,
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== idToFollow));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded-lg"
        >
          <div className="flex items-center">
            <CgProfile size={40} className="text-gray-500" />
            <span className="ml-4 text-lg font-semibold">{user.name}</span>
          </div>
          <button
            onClick={() => handleFollow(user.id)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default PeopleYouMayKnow;
