import React from 'react';
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="entire-page">
      <div className="content-box about-header">
        <h1>Vision, Mission, and importance</h1>
      </div>
      <div className="content-box vision-content">
        <h2>Vision:</h2>
        <ul>
          <li>The Cougar Zoo & Aquarium, with its world-class exhibits and exceptional programs, attracts visitors from around the world and families from close to home.</li>
        </ul>
      </div>
      <div className="content-box mission-content">
        <h2>Mission:</h2>
        <ul>
          <li>The Cougar Zoo connects all people to each other and the natural world to promote understanding, appreciation, and conservation.</li>
        </ul>
      </div>
      <div className="content-box why-content">
        <h1>Why Zoos Matter</h1>
        <ul>
          <li>Zoological parks, together with museums and libraries, advance culture and knowledge, providing the opportunity for visitors to step back and look in awe at the wonders of our natural world.</li>
          <li>Zoos are uniquely capable of bringing families together and transmitting educational information between generations. Visitors become part of a conservation discussion that identifies environmental challenges while brainstorming potential solutions.</li>
          <li>The world around us is changing fast. Species of wildlife are facing global extinction on a massive scale. Zoos are in a unique position to make a difference.</li>
        </ul>
      </div>
    </div>
  );
}
