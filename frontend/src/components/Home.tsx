import React from 'react';
import './Home.css';
import introVid from './videos/mainpage1.mp4';


function Home() {
  return (
    <div className="video-container">
    <video
        src = {introVid}
        autoPlay
        muted
        playsInline
    >
    </video>
    </div>
  
  );
}

export default Home;
