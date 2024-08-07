"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null); // Initialize as null for better loading state handling

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        setUser(response.data.data); // Access user data from response
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []); // Dependency array

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {user ? (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Welcome, {user.name}</h1>
          <p style={{ fontSize: "18px", marginBottom: "5px" }}>Email: <strong>{user.email}</strong></p>
          <p style={{ fontSize: "18px", marginBottom: "5px" }}>ID: <strong>{user.id}</strong></p>
          <p style={{ fontSize: "18px", marginBottom: "5px" }}>Created At: <strong>{new Date(user.created_at).toLocaleDateString()}</strong></p>
          {/* Optionally, you can include other user details */}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
