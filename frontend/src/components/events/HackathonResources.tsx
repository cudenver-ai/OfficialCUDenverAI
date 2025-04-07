/**
 * This will be the page for the hackathon with route /events/hackathon2025
 */

/*Functionality imports*/

import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { setBlogs, setError } from "../../actions/BlogsActions";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Link, Element } from "react-scroll";
import './HackathonResources.css'



function HackathonResources() {
    ///////////////////////////
    // States
    ///////////////////////////


    ///////////////////////////
    // Functions
    ///////////////////////////



    ///////////////////////////
    // TSX Rendering
    ///////////////////////////

    return (        <div className="hackathon-resources">

    <div className="hackathon-nav">
        <ul>
        <li><RouterLink to="/events/hackathon2025">Hackathon Info</RouterLink></li>
        <li><RouterLink to="/events/hackathon2025/prizes">Prizes</RouterLink></li>
          <li><RouterLink to="/events/hackathon2025/resources">Resources</RouterLink></li>
          <li><RouterLink to="/events/hackathon2025/faq">FAQ</RouterLink></li>
        <li><RouterLink to="/events/hackathon2025/rules">Rules</RouterLink></li>
        </ul>
      </div>
      
        {/* Datasets Section */}
        <Element name="datasets" className="section">
            <h2>📂 Datasets</h2>
            <p>Use these datasets to build innovative AI projects.</p>
            <ul>
                <li><a href="https://www.kaggle.com/datasets" target="_blank">Kaggle Datasets</a> - Wide variety of datasets.</li>
                <li><a href="https://data.gov/" target="_blank">Data.gov</a> - Government public datasets.</li>
                <li><a href="https://www.tensorflow.org/datasets" target="_blank">TensorFlow Datasets</a> - ML-focused datasets.</li>
                <li><a href="https://github.com/awesomedata/awesome-public-datasets" target="_blank">Awesome Public Datasets</a> - A curated list of free datasets.</li>
            </ul>
        </Element>

        {/* Tutorials Section */}
        <Element name="tutorials" className="section">
            <h2>📚 Tutorials</h2>
            <p>Learn how to build AI models and applications.</p>
            <ul>
                <li><a href="https://www.tensorflow.org/tutorials" target="_blank">TensorFlow Tutorials</a> - Learn deep learning basics.</li>
                <li><a href="https://pytorch.org/tutorials/" target="_blank">PyTorch Tutorials</a> - Hands-on ML training.</li>
                <li><a href="https://www.fast.ai/" target="_blank">FastAI</a> - High-level AI framework with tutorials.</li>
                <li><a href="https://scikit-learn.org/stable/tutorial/index.html" target="_blank">Scikit-Learn</a> - Beginner-friendly ML guide.</li>
            </ul>
        </Element>

        {/* Starting Points Section */}
        <Element name="starting-points" className="section">
            <h2>🚀 Starting Points</h2>
            <p>Pre-built frameworks and boilerplate code.</p>
            <ul>
                <li><a href="https://github.com/keras-team/keras" target="_blank">Keras Starter</a> - Deep learning with Keras.</li>
                <li><a href="https://github.com/pytorch/examples" target="_blank">PyTorch Examples</a> - Official PyTorch projects.</li>
                <li><a href="https://github.com/machine-learning-apps" target="_blank">ML App Templates</a> - Ready-to-use ML apps.</li>
                <li><a href="https://huggingface.co/models" target="_blank">Hugging Face Models</a> - Pre-trained NLP models.</li>
            </ul>
        </Element>
    </div>);
}

export default HackathonResources;
