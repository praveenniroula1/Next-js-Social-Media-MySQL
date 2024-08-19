"use client";
import React, { useContext } from "react";
import UserCard from "../components/UserCard";
import UsersPost from "../components/UsersPost";
import SponsoredCard from "../components/SponsorCard";

const ProfilePage = () => {
  const user=useContext((state)=>state.user.user)
  return (
    <div className="m-2 flex justify-between">
      <UserCard />
      <UsersPost />
      <SponsoredCard/>
    </div>
  );
};

export default ProfilePage;
