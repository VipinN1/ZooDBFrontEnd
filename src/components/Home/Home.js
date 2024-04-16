import React from "react";
import { Link } from 'react-router-dom';
import videoBackground from "../Videos/ZooVid2.mp4"; // Import your video file
import "./Home.css"
const Home = () => {
  return (
    <div className="content">
      <h1>Experience Wildlife At Our Zoo!</h1>
      <h3>Login or Learn more</h3>
      <Link to="/about-us">About Us</Link>
    </div>



  );
};

export default Home;
