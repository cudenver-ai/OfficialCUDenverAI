import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

import img from './images/group.jpg';
import neuralnetwork from './images/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled.jpeg';
import robotics from './images/sick-sponsored-featured-image-july2023-article1.jpg';
import icon from './images/club-rxCX8m8Y.png';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function Home() {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    return (
        <div className="HomePage">
            <div className="HeroTitle">
                <h1> Empowering the Next Generation of AI Innovators </h1>
                <h2> Fostering collaboration, innovation, and hands-on opportunities in AI, Data Science, and Machine Learning at CU Denver. </h2>
                <button>
                    <h3> Join Us </h3>
                </button>
            </div>

            {/* AI Student Association Signup Section */}
            <div className="SignupSection">
                <img src={icon} alt="AI Student Association Logo" className="signup-logo" />
                <h2>AI STUDENT ASSOCIATION</h2>
                <p>Join our community to get notified about events and hackathons, and gain exclusive access to participate!</p>
                <form className="signup-form">
                    <input type="email" placeholder="Enter Your Email" required />
                    <button type="submit">Apply</button>
                </form>
            </div>

            <div className="WhoWeAre">
                <h4> Who We Are </h4>
                <p> The AI Student Association at CU Denver is a student-led organization dedicated to exploring the applications of artificial intelligence, data science, and machine learning...</p>
            </div>

            {/* Other sections remain unchanged */}
        </div>
    );
}

export default Home;
