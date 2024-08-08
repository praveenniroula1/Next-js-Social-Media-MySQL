import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";

const NewsFeed = () => {
  const posts = [
    {
      id: 1,
      name: "Praveen Niroula",
      time: "15 minutes ago",
      content: "https://images.unsplash.com/photo-1593642634367-d91a135587b5", // Unsplash image URL
      type: "image",
      like: 10,
      comments: [
        { id: 1, user: "Alice", text: "Great post!" },
        { id: 2, user: "Bob", text: "Thanks for sharing!" },
      ],
    },
    {
      id: 2,
      name: "John Doe",
      time: "2 hours ago",
      content: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a", // Unsplash image URL
      type: "image",
      comments: [
        { id: 1, user: "Alice", text: "Beautiful flowers!" },
        { id: 2, user: "Bob", text: "Love the colors!" },
      ],
    },
    {
      id: 3,
      name: "Sameer Ghimire",
      time: "2 hours ago",
      content: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Correct Unsplash image URL
      type: "image",
      comments: [
        { id: 1, user: "Alice", text: "Amazing capture!" },
        { id: 2, user: "Bob", text: "Nature is beautiful!" },
      ],
    },
    {
      id: 4,
      name: "Sujan Dangal",
      time: "8 hours ago",
      content: "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Correct Unsplash image URL
      type: "image",
      comments: [
        { id: 1, user: "Alice", text: "Stunning eyes!" },
        { id: 2, user: "Bob", text: "Very captivating!" },
      ],
    },
    {
      id: 5,
      name: "Rajesh Hamal",
      time: "2 minutes ago",
      content: "https://images.unsplash.com/photo-1485217988980-11786ced9454", // Correct Unsplash image URL
      type: "image",
      comments: [
        { id: 1, user: "Alice", text: "Incredible detail!" },
        { id: 2, user: "Bob", text: "What a shot!" },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          {/* Post Header */}
          <div className="flex items-center mb-4">
            <CgProfile className="text-3xl text-gray-500 mr-2" />
            <div>
              <div className="font-semibold">{post.name}</div>
              <div className="text-gray-500 text-sm">{post.time}</div>
            </div>
          </div>

          {/* Post Content */}
          {post.type === "image" ? (
            <img
              src={post.content}
              alt="Post content"
              className="w-full rounded-lg mb-4"
            />
          ) : (
            <video controls className="w-full rounded-lg mb-4">
              <source src={post.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-start mb-4">
            <button className="text-blue-500 hover:text-black-700">
            </button>
            <span className="flex">
              <IoHeart className="text-red-500 text-2xl"/><span>10</span>
            </span>{" "}
          </div>

          {/* Comment Input */}
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <span>
              <button className="text-blue-500 hover:text-blue-700">
                Comment
              </button>
            </span>
          </div>

          {/* Comments Section */}
          <div className="space-y-2">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <CgProfile className="text-xl text-gray-500" />
                <div className="bg-gray-100 p-2 rounded-lg w-full">
                  <div className="font-semibold">{comment.user}</div>
                  <div>{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
