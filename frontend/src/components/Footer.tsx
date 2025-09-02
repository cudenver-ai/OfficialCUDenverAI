/*Functionality imports*/

import React from 'react';
import './Footer.css'; 

/*Image imports*/

import icon from './images/club-rxCX8m8Y.png';




function Footer() {
    ///////////////////////////
    // States
    ///////////////////////////

    
    ///////////////////////////
    // Functions
    ///////////////////////////

    ///////////////////////////
    // TSX Rendering
    ///////////////////////////
    
    return (
    <footer className="footer" style={{ padding: '40px 20px' }}>
      
      <div className="hring">
        <hr />
      </div>
      <div className="container">
        
        {/* Left Column - Contacts */}
        <div className="footer-col">
          <ul className="contact-list">
            <a href="https://www.ucdenver.edu/" className="social-link">
              <i className="fas fa-home"></i> 
            </a>
            <a className="social-link" href="mailto:aisa@ucdenver.edu?subject=Your%20Subject%20Here&body=Your%20message%20here.">
              <i className="fas fa-envelope"></i>
            </a>

          </ul>
          
        </div>

        {/* Right Column - Social Media */}
        <div className="footer-col">
          <img
            src={icon}
            alt="AI Club Icon"
            style={{ width: '80px', height: '80px', marginBottom: '15px' }}
          />
        </div>

        <div className="footer-col">
          <div className="social-links">
            <a href="https://youtube.com" className="social-link">
              <i className="fab fa-youtube" style={{color: "red"}}></i>
            </a>
            <a href="https://www.linkedin.com/company/cudenver-ai" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/cudenver-ai" className="social-link">
              <i className="fab fa-github" style={{color: "black"}}></i>
            </a>
          </div>
        </div>

      </div>
      
      {/*The seperation line*/}

      <div className="hring">
        <hr />
      </div>

      <div className="RightsReserved">
        
        
      Proudly affiliated with the University of Colorado Denver.
      <br></br>
      © 2025 AI Student Association at CU Denver. 
      <br></br>
      All rights reserved.
      </div>
  
  </footer>
  );
}

export default Footer;
