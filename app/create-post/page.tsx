"use client";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import SponsoredCard from "../components/SponsorCard";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";

const CreatePost = () => {
  const [form, setForm] = useState({
    description: "",
  });
  const user = useSelector((state: any) => state.user.user);
  const [images, setImages] = useState<any[]>([]);

  const handleImageChange = (e: any) => {
    const files: any = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", form.description);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between h-screen p-8  text-white">
      {/* left - Sidebar */}
      <UserCard />

      {/* center - Post Form */}
      <div className="flex relative justify-center items-start h-full w-full md:w-3/5 border-white p-6 rounded-lg shadow-lg">
        <form
          className="bg-black text-white shadow-lg rounded-lg p-6 max-w-lg w-full"
          onSubmit={handleOnSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Create a Post
          </h2>

          <div className="mb-4">
            <label
              className="block text-white font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              onChange={handleOnChange}
              name="description"
              value={form.description}
              id="description"
              className="w-full p-3 h-24 border border-white rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-white resize-none"
              placeholder="Write something amazing about your moment..."
            ></textarea>
          </div>

          {/* Image Previews */}
          <div className="mb-4">
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24 border-2 border-white rounded-lg">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-black text-white text-xl rounded-full p-1 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-white font-medium mb-2"
              htmlFor="images"
            >
              Upload Images
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 border border-white bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <p className="text-gray-400 text-sm mt-2">
              You can upload up to 5 images.
            </p>
          </div>

          <button className="w-full bg-white text-black font-bold py-3 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white transition duration-300">
            Post
          </button>
        </form>
      </div>

      {/* right - SponsoredCard */}
      <SponsoredCard />
    </div>
  );
};

export default CreatePost;
