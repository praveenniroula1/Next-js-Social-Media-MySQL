"use client";
import React, { useContext } from "react";
import UserCard from "../components/UserCard";
import UsersPost from "../components/UsersPost";

const ProfilePage = () => {
  const user=useContext((state)=>state.user.user)
  return (
    <div className="m-2 flex justify-between">
      <UserCard />
      <UsersPost />
    </div>
  );
};

export default ProfilePage;
