"use client"
import React from 'react'
import UserCard from '../components/UserCard'
import SponsoredCard from '../components/SponsorCard'
import { FaUserCircle } from 'react-icons/fa';

const friends = [
    { name: 'Alice Johnson', logo: <FaUserCircle size={40} /> },
    { name: 'Bob Smith', logo: <FaUserCircle size={40} /> },
    { name: 'Carol Davis', logo: <FaUserCircle size={40} /> },
    { name: 'David Wilson', logo: <FaUserCircle size={40} /> },
    { name: 'Eve Brown', logo: <FaUserCircle size={40} /> },
    { name: 'Frank White', logo: <FaUserCircle size={40} /> },
    { name: 'Grace Lee', logo: <FaUserCircle size={40} /> },
    { name: 'Hank Clark', logo: <FaUserCircle size={40} /> },
    { name: 'Ivy Lewis', logo: <FaUserCircle size={40} /> },
    { name: 'Jack Martinez', logo: <FaUserCircle size={40} /> },
    { name: 'Kathy Hall', logo: <FaUserCircle size={40} /> },
    { name: 'Liam Allen', logo: <FaUserCircle size={40} /> },
    { name: 'Mia Young', logo: <FaUserCircle size={40} /> },
    { name: 'Noah King', logo: <FaUserCircle size={40} /> },
    { name: 'Olivia Scott', logo: <FaUserCircle size={40} /> },
  ];

const FriendsList = () => {
  return (
    <div className='flex justify-between m-8'>
        <UserCard/>
        <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Friends List</h2>
      <ul className="space-y-4">
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center space-x-4 p-2 border-b border-red-200 w-96">
            <div className="flex-shrink-0">{friend.logo}</div>
            <div className="flex-1">
              <p className="text-lg font-medium">{friend.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
      <SponsoredCard/>
    </div>
  )
}

export default FriendsList
