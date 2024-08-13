"use client";
import { addUser } from "@/app/redux/slices/userSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "@/app/components/UserCard"; // Update the path based on your file structure
import NewsFeed from "../components/NewsFeed";
import SponsoredCard from "../components/SponsorCard";

interface User {
  name: string;
  posts: number;
  followers: number;
  following: number;
  // Add other properties if there are more in the userDetails
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dashboard");
      console.log(response.data.userDetails);
      setUser(response.data.userDetails);
      dispatch(addUser(response.data.userDetails));
    } catch (error) {
      setError("Failed to fetch user details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-between h-screen p-8">
      {/* left - Sidebar */}

      <UserCard />

      {/* center - NewsFeed */}

      <NewsFeed />

      <SponsoredCard />
      {/* right - SponsoredCard */}
    </div>
  );
};

export default Dashboard;
