import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const PeopleYouMayKnow = () => {
  const [mayKnow, setMayKnow] = useState([]);

  const fetchMayKnowPeople = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/peopleyoumayknow"
      );
      setMayKnow(response.data.mayKnowUsers);
      console.log(response.data.mayKnowUsers);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  useEffect(() => {
    fetchMayKnowPeople();
  }, []);
  return  (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Friends</h1>
      <ul className="space-y-2">
        {mayKnow?.map((friend) => (
          <li
            key={friend.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded shadow"
          >
            <div className="flex justify-center items-center gap-2 text-xl">
              <CgProfile className="text-blue-800 text-3xl"/>
              <p className="font-semibold">{friend.name}</p>
              {/* <p className="text-sm text-gray-600">{friend.email}</p> */}
            </div>
            <button
              // onClick={() => handleUnfollow(friend.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleYouMayKnow;
