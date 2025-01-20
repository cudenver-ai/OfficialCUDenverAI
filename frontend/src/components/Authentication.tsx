import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Authentication.css'; 
import ParticlesComponent from '../motion/Particles.js';

function AuthPage() {
  ///////////////////////////
  // States
  ///////////////////////////

  const navigate = useNavigate(); 

  /**
  * @typedef {Object} signupData
  * @description Signup data set redux state
  */
  const [signupData, setSignupData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  /**
  * @typedef {Object} loginData
  * @description Login data set redux state
  */
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  ///////////////////////////
  // Functions
  ///////////////////////////

  /**
  * Handles the current signup form changes
  * 
  */

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  /**
  * Handles the current login form changes
  * 
  */

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  /**
  * POST signup information to the backend API
  * 
  */

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', signupData);
    
    fetch('http://localhost:8080/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Signup successful:', data);
        navigate('/home'); // Redirect to home page on successful signup
      })
      .catch((error) => {
        console.log('Signup failed:', error);
      });
  };

  /**
  * POST login information to the backend API
  * 
  */

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);

    fetch('http://localhost:8080/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
        navigate('/home'); // Redirect to home page on successful login
      })
      .catch((error) => {
        console.log('Login failed:', error);
      });
  };

    ///////////////////////////
    // TSX Rendering
    ///////////////////////////

  return (

    

    <div

      className='ParentDiv'
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        height: '100vh',
        alignItems: 'center',
        backgroundColor: 'Black',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <ParticlesComponent id="particles" />

      {/* Signup Form */}
      <div className="SignUp" style={{ width: '100%', padding: '30px', backgroundColor: '#282C34', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
        <h2 style={{ color: '#61DAFB', textAlign: 'center' }}>Join the AI Revolution</h2>
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.9em' }}>Be part of the AI Club and shape the future.</p>
          <form onSubmit={handleSignupSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                value={signupData.fname}
                onChange={handleSignupChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                value={signupData.lname}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#61DAFB',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      
      {/* Login Form */}
        <div className="Login" style={{ width: '100%', padding: '30px', backgroundColor: '#282C34', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
          <h2 style={{ color: '#61DAFB', textAlign: 'center' }}>Welcome Back</h2>
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.9em' }}>Log in to continue exploring AI possibilities.</p>
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#61DAFB',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Log In
            </button>
          </form>
        </div>
    </div>
  );
}

export default AuthPage;
