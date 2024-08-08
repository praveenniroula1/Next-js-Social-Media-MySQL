"use client"
import React from 'react'
import UserCard from '../components/UserCard'
import SponsoredCard from '../components/SponsorCard'

const NotificationPage = () => {
    const notifications = [
        { id: 1, message: 'John Doe liked your post.', time: '2 minutes ago' },
        { id: 2, message: 'Jane Smith commented on your photo.', time: '5 minutes ago' },
        { id: 3, message: 'Mike Johnson started following you.', time: '10 minutes ago' },
        { id: 4, message: 'Anna Lee shared your status update.', time: '15 minutes ago' },
        { id: 6, message: 'Jane Smith commented on your photo.', time: '20 minutes ago' },
        { id: 7, message: 'Chris Brown sent you a friend request.', time: '20 minutes ago' },
        { id: 8, message: 'John Doe liked your post.', time: '20 minutes ago' },
        { id: 9, message: 'Chris Brown sent you a friend request.', time: '20 minutes ago' },
        { id: 10, message: 'Chris Brown sent you a friend request.', time: '20 minutes ago' },
      ];
  return (
    <div className='flex justify-between m-8'>
        <UserCard/>
        <div className='w-full max-w-md p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Notifications</h2>
      <ul className='space-y-3'>
        {notifications.map((notification) => (
          <li key={notification.id} className='flex items-start space-x-3 border-b pb-2'>
            <div className='flex-shrink-0'>
              <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C6.48 2 2 6.48 2 12c0 4.09 2.53 7.55 6.12 9.17-.19-.77-.29-1.59-.29-2.42V16H6v-2h1.03C7.07 11.29 8.67 10 10.5 10h3c1.83 0 3.43 1.29 3.47 3H18v2h-1.83c.08.8.25 1.62.53 2.42C19.48 19.55 22 16.09 22 12c0-5.52-4.48-10-10-10z'/>
              </svg>
            </div>
            <div className='flex-1'>
              <p className='text-md'>{notification.message}</p>
              <p className='text-sm text-gray-500'>{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
      <SponsoredCard/>
    </div>
  )
}

export default NotificationPage
