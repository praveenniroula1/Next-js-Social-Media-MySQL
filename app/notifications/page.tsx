"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import UserCard from "../components/UserCard";
import SponsoredCard from "../components/SponsorCard";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/notifications"
        );
        if (response.data.status === "success") {
          setNotifications(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (notificationId: number) => {
    // Implement accept follow request logic here
    console.log("Accepted follow request:", notificationId);
  };

  const handleReject = async (notificationId: number) => {
    // Implement reject follow request logic here
    console.log("Rejected follow request:", notificationId);
  };

  return (
    <div className="flex justify-between h-screen p-8">
      {/* left - Sidebar */}
      <UserCard />
      <div className=" mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Notifications
        </h2>
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
              <div className="flex items-center">
                <CgProfile className="text-blue-500 text-2xl mr-3" />
                <span className="text-gray-700 font-medium">
                  {notification.senderName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  sent you a follow request.
                </span>{" "}
              </div>{" "}
              <div className="space-x-2 flex">
                <button
                  onClick={() => handleAccept(notification.notificationId)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(notification.notificationId)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* right - SponsoredCard */}
      <SponsoredCard />
    </div>
  );
};

export default Notifications;
