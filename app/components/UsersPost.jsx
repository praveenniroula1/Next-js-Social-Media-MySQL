"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toogleLike } from "../redux/slices/likeSlice";

const UsersPost = () => {
  const dispatch = useDispatch();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userPost, setUserPost] = useState([]);
  const [likesCount, setLikesCount] = useState({});

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      setUserPost(response.data.results || []);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  // Fetch liked posts for the current user
  const fetchLikedPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/likes/user");
      const likedPostIds = new Set(response.data.likedPostIds);
      setLikedPosts(likedPostIds);
    } catch (error) {
      console.log("Error fetching liked posts:", error);
    }
  };

  // Fetch the like count for a specific post
  const fetchLikesCount = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/likes?postId=${postId}`
      );
      setLikesCount((prev) => ({ ...prev, [postId]: response.data.likeCount }));
    } catch (error) {
      console.log("Error fetching like count:", error);
    }
  };

  // Fetch posts and liked posts on component mount
  useEffect(() => {
    fetchPosts();
    fetchLikedPosts();
  }, []);

  // Fetch likes count for all posts after posts are fetched
  useEffect(() => {
    if (Array.isArray(userPost) && userPost.length > 0) {
      userPost.forEach((post) => {
        fetchLikesCount(post.postId);
      });
    }
  }, [userPost]);

  // Handle like/unlike button click
  const handleLike = async (postId) => {
    const alreadyLiked = likedPosts.has(postId);
    if (alreadyLiked) {
      setLikedPosts((prev) => new Set([...prev].filter((id) => id !== postId)));
    } else {
      setLikedPosts((prev) => new Set([...prev, postId]));
    }

    dispatch(toogleLike({ id: postId }));

    try {
      await axios.post("http://localhost:3000/api/likes", {
        postId,
        liked: !alreadyLiked,
      });
      fetchLikesCount(postId);
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };

  return (
    <div className="flex flex-col m-auto w-[100%] items-center space-y-8 py-10">
      {userPost.length === 0 ? (
        <p>No posts available</p>
      ) : (
        userPost.map((item, index) => (
          <div
            key={item.postId || index}
            className="bg-white rounded-lg shadow-lg p-6 w-96 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            <h1 className="text-xl font-semibold mb-4 text-center">
              {item.description}
            </h1>
            <div className="flex justify-center mb-4">
              <Image
                src={item.url}
                height={500}
                width={500}
                className="rounded-lg object-cover"
                alt="Post Image"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => handleLike(item.postId)}>
                  <IoHeart
                    className={`text-2xl ${
                      likedPosts.has(item.postId) || likesCount[item.postId] > 0
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  />
                </button>
                <span className="text-gray-600 font-medium">
                  {likesCount[item.postId] || 0}
                </span>
              </div>
              <input
                placeholder="Add a comment..."
                className="border rounded-lg p-2 w-full mr-2 text-sm"
              />
              <button className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm">
                Comment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UsersPost;

