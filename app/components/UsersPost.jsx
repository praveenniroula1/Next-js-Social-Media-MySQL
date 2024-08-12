"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const UsersPost = () => {
  const [posts, setPosts] = useState([]);

  const fetchUsersPost = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      console.log(response.data.results);
      setPosts(response.data.results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchUsersPost();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Your Posts:</h1>
      {posts.length > 0 ? (
        <div className="space-y-6 h-full">
          {posts.map((post, index) => (
            <div
              key={post.id || index}
              className="bg-white shadow-md rounded-lg overflow-hidden w-[50%] m-auto transition transform hover:scale-105 hover:shadow-lg"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {post.description}
                </h2>

                {/* Image placeholder */}
                {post.url && (
                  <div className="relative h-64 bg-gray-200 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.url}
                      alt="Post image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}

                {/* Additional post details here */}
                <div className="text-gray-600 mt-4">
                  <p className="font-medium mb-2">Likes: {post.likes || 0}</p>
                  <p className="font-medium">Comments:</p>
                  <ul className="list-disc ml-6 mt-2">
                    {(post.comments || []).map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available</p>
      )}
    </div>
  );
};

export default UsersPost;
