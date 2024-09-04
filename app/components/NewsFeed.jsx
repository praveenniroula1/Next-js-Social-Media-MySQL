"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { toogleLike } from "../redux/slices/likeSlice";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userPost, setUserPost] = useState([]);
  const [likesCount, setLikesCount] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/newsfeed");
      setUserPost(response.data.posts || []);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/likes");
      const likedPostIds = new Set(response.data.likedPostIds);
      setLikedPosts(likedPostIds);
    } catch (error) {
      console.log("Error fetching liked posts:", error);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
      await fetchLikedPosts();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && Array.isArray(userPost) && userPost.length > 0) {
      userPost.forEach((post) => {
        fetchLikesCount(post.postId);
      });
    }
  }, [userPost, loading]);

  const handleLike = async (postId) => {
    const alreadyLiked = likedPosts.has(postId);

    setLikedPosts((prev) =>
      alreadyLiked
        ? new Set([...prev].filter((id) => id !== postId))
        : new Set([...prev, postId])
    );
    setLikesCount((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (alreadyLiked ? -1 : 1),
    }));

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-8 py-10">
      {userPost.length === 0 ? (
        <p className="text-gray-500">No posts available</p>
      ) : (
        userPost.map((item, index) => (
          <div
            key={item.postId || index}
            className="bg-white text-black rounded-lg shadow-lg p-6 w-[130%] hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center space-x-3 mb-4">
              <CgProfile className="text-4xl text-gray-700" />
              <div>
                <h3 className="font-semibold text-lg">{item.userName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4 text-center">
              {item.description}
            </h1>

            {item.imageUrl && (
              <div className="flex justify-center mb-4">
                <Image
                  src={item.imageUrl}
                  height={400}
                  width={400}
                  className="rounded-lg object-cover"
                  alt="Post Image"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => handleLike(item.postId)}>
                  <IoHeart
                    className={`text-2xl ${
                      likedPosts.has(item.postId)
                        ? "text-red-500"
                        : "text-gray-700"
                    } hover:text-red-400 transition-colors duration-200 ease-in-out`}
                  />
                </button>
                <span className="text-gray-600 font-medium">
                  {likesCount[item.postId] || 0}
                </span>
              </div>
              <input
                placeholder="Add a comment..."
                className="border border-gray-300 rounded-lg p-2 w-full mr-2 text-sm"
              />
              <button className="bg-black text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200 ease-in-out">
                Comment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
