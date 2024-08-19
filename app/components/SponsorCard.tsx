import React from "react";

const SponsoredCard = () => {
  return (
    <div className="w-[30%] h-full border-3 border-green-500 flex items-start justify-center">
      <div className="bg-dark p-4 rounded-lg shadow-md">
        <img
          src="https://glamadelaide.com.au/wp-content/uploads/2024/03/The-Turkish-Delight-hero-.jpg"
          alt="Sponsored content"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Advertise with Us</h3>
          <p className="text-gray-600">
            You can run your ad in our applications and reach a wider audience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SponsoredCard;
