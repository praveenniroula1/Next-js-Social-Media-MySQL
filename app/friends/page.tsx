"use client";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import SponsoredCard from "../components/SponsorCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Followers from "../components/Followers"; // Renamed component
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";

interface Friend {
  id: number;
  name: string;
  isFollowed: boolean;
  isRequestPending: boolean;
}

const FriendsList = () => {
  const user = useSelector((state: any) => state.user.user);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [activeTab, setActiveTab] = useState<string>("friends");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/allusers"
      );
      const userData = response.data.results.map((friend: Friend) => ({
        ...friend,
        isFollowed: false,
        isRequestPending: false,
      }));
      setFriends(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFollow = async (receiverId: number) => {
    try {
      const friend = friends.find((f) => f.id === receiverId);
      if (friend) {
        if (!friend.isFollowed && !friend.isRequestPending) {
          await axios.post("http://localhost:3000/api/follow", {
            requestSenderId: user.id,
            requestReceiverId: receiverId,
          });

          setFriends((prevFriends) =>
            prevFriends.map((f) =>
              f.id === receiverId
                ? { ...f, isFollowed: false, isRequestPending: true }
                : f
            )
          );
        } else if (friend.isRequestPending) {
          console.log("Request already pending or followed");
        }
      }
    } catch (error) {
      console.error("Error handling follow request:", error);
    }
  };

  const handleCancelRequest = async (receiverId: number) => {
    try {
      console.log("Request cancelled");
      setFriends((prevFriends) =>
        prevFriends.map((f) =>
          f.id === receiverId
            ? { ...f, isFollowed: false, isRequestPending: false }
            : f
        )
      );
    } catch (error) {
      console.error("Error cancelling follow request:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between m-8 space-y-4 md:space-y-0">
      <UserCard />
      <div className="flex-1 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Friends List</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`py-2 px-4 font-semibold rounded-lg ${
              activeTab === "friends"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            }`}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
          <button
            className={`py-2 px-4 font-semibold rounded-lg ${
              activeTab === "peopleYouMayKnow"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            }`}
            onClick={() => setActiveTab("peopleYouMayKnow")}
          >
            People You May Know
          </button>
        </div>

        {/* Render Components Based on Active Tab */}
        {activeTab === "friends" && <Followers />} {/* Renamed */}
        {activeTab === "peopleYouMayKnow" && <PeopleYouMayKnow />}
      </div>
      <SponsoredCard />
    </div>
  );
};

export default FriendsList;
