"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import UserCard from "../components/UserCard";
import SponsoredCard from "../components/SponsorCard";
import { useSelector } from "react-redux";
import axios from "axios";

const Notifications = () => {
  const user = useSelector((state: any) => state.user.user);
  const [notification, setNotification] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notifications"
      );
      setNotification(response.data.rows);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAccept = async (notificationId: number, requestSenderId: number) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/notifications",
        {
          requestSenderId: requestSenderId,
        }
      );
      if (response.data.status === "success") {
        // Delete the notification after accepting the request
        await axios.delete("http://localhost:3000/api/notifications", {
          data: { notificationId }
        });
        // Update the UI to reflect the accepted request
        setNotification((prev) =>
          prev.filter((notif: any) => notif.notificationId !== notificationId)
        );
      } else {
        console.error("Error accepting the request:", response.data.message);
      }
    } catch (error) {
      console.error("Error accepting the request:", error);
    }
  };

  const handleReject = async (notificationId: number) => {
    try {
      // Delete the notification directly if rejected
      await axios.delete("http://localhost:3000/api/notifications", {
        data: { notificationId }
      });
      // Update the UI to reflect the rejected request
      setNotification((prev) =>
        prev.filter((notif: any) => notif.notificationId !== notificationId)
      );
    } catch (error) {
      console.error("Error rejecting the request:", error);
    }
  };

  return (
    <div className="flex justify-between h-screen p-8">
      {/* Left - Sidebar */}
      <UserCard />

      {/* Middle - Notifications */}
      <div className="flex flex-col items-center w-2/3 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Notifications</h2>
        {notification.length > 0 ? (
          <ul className="w-full">
            {notification.map((notif: any) => (
              <li
                key={notif.notificationId}
                className="flex items-center justify-between p-4 mb-2 border border-gray-300 rounded-lg"
              >
                <div className="flex items-center">
                  <CgProfile className="text-3xl text-gray-600" />
                  <span className="ml-4 text-lg font-semibold">
                    {notif.senderName} sent you a friend request.
                  </span>
                </div>
                <div className="flex">
                  <button
                    className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleAccept(notif.notificationId, notif.senderId)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleReject(notif.notificationId)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </div>

      {/* Right - SponsoredCard */}
      <SponsoredCard />
    </div>
  );
};

export default Notifications;
