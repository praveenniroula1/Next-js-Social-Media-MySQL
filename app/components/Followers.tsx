import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

interface Follower {
  id: string;
  name: string;
}

interface FollowState {
  [key: string]: boolean;
}

const Followers: React.FC = () => {
  // State to store the list of followers
  const [followers, setFollowers] = useState<Follower[]>([]);

  // State to store whether each follower is followed or not
  const [followState, setFollowState] = useState<FollowState>({});

  // Fetch followers from the API
  const fetchFollowers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/followers");
      const fetchedFollowers: Follower[] = response.data.followedUsers;
      if (fetchFollowers.length === 0) {
      }
      setFollowers(fetchedFollowers);

      // Initialize followState with false for each follower
      const initialFollowState: FollowState = {};
      fetchedFollowers.forEach((friend) => {
        initialFollowState[friend.id] = false; // Initially, not followed
      });
      setFollowState(initialFollowState);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  // Fetch followers when the component mounts
  useEffect(() => {
    fetchFollowers();
  }, []);

  // Handle follow/unfollow toggle
  const handleFollow = async (id: string) => {
    const response: any = await axios.patch(
      `http://localhost:3000/api/followers?followId=${id}`
    );
    console.log(response.data);
    setFollowState((prevFollowState) => ({
      ...prevFollowState,
      [id]: !prevFollowState[id],
    }));
    console.log(`Toggled follow state for ${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Friends</h1>
      <ul className="space-y-2">
        {!followers && "No followers yet!!!"}
        {followers?.map((friend) => (
          <li
            key={friend.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded shadow"
          >
            <div className="flex justify-center items-center gap-2 text-xl">
              <CgProfile className="text-blue-800 text-3xl" />
              <p className="font-semibold">{friend.name}</p>
            </div>
            <button
              onClick={() => handleFollow(friend.id)}
              className={`${
                followState[friend.id]
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white px-4 py-2 rounded`}
            >
              {followState[friend.id] ? "Follow" : "Unfollow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
