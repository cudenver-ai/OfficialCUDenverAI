import React, { useState, useEffect } from 'react';
import './Nav.css'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

/*Image imports*/
import icon from './images/Header_Logo.png';
import defaultProfilePic from './images/Default_pfp.jpg'; 

// UI Imports
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

  

const Nav = () => {
    ///////////////////////////
    //States
    ///////////////////////////


    const [bar, setBarClass] = useState("bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const navigate = useNavigate();

    const isLoggedIn = Cookies.get("username");


    const menuDisplay = (
        <div>
          <button onClick={() => { updateMenu(); navigate('/projects'); }}>Projects</button>
          <button onClick={() => { updateMenu(); navigate('/events'); }}>Events</button>
          <button onClick={() => { updateMenu(); navigate('/blog'); }}>Resources</button>
          <button onClick={() => { updateMenu(); navigate('/news'); }}>News</button>
          <button onClick={() => { updateMenu(); navigate('/about-us'); }}>About</button>
          {isLoggedIn ? (
            <Menu>
              <MenuButton>
                <img src={profilePicture} alt="Profile" />
              </MenuButton>
              <MenuItems anchor="bottom">
                <MenuItem>
                  <button onClick={() => { updateMenu(); navigate('/profile'); }}>MyProfile</button>
                </MenuItem>
                <MenuItem>
                  <button onClick={() => { updateMenu(); navigate('/events'); }}>MyEvents</button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <button className="JoinButton" onClick={() => { updateMenu(); navigate('/home', { state: { scrollTo: 'FeaturedProject' } }); }}>
              Join
            </button>
          )}
        </div>
      );

    ///////////////////////////
    //Functions
    ///////////////////////////

    const updateMenu = () => {
        if(!isMenuClicked) {
            setMenuClass("menu visible")
            setBarClass("bar clicked")
        }
        else {
            setMenuClass("menu hidden")
            setBarClass("bar unclicked")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    const SignOut = async () => {
        try {
            const response = await axios.post('http://129.153.84.107:8080/sign-out', {}, {
                withCredentials: true, // Ensures cookies are sent
            });
            if (response.status === 200) {
                Cookies.remove("username"); // Clear cookies
                setIsAuthenticated(false); // Update state
                navigate('/home'); // Redirect to home page
            }
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Failed to sign out. Please try again.");
        }
    };

    ///////////////////////////
    //TSX Rendering
    ///////////////////////////
    return (
        <div className="parent">
            <nav>
                {/*AI Club navigation bar logo*/}

                <button className='Logo_Button' onClick={() => { navigate('/home'); }}>
                  <img className='Logo_img'
                    src={icon} 
                    alt="AI Club Icon" 
                  />
                </button>

                {/*AI Club navigation bar buttons*/}

                <div className="Nav-Links">
                    {menuDisplay}
                </div>

                <div className="Hamburger-menu">
                    <div className="burger-menu" onClick={updateMenu}>
                            <div className={bar} onClick={updateMenu}></div>
                            <div className={bar} onClick={updateMenu}></div>
                            <div className={bar} onClick={updateMenu}></div>
                    </div>
                </div>
                
            </nav>

            <div className={menu_class}>
                {menuDisplay}
            </div>
                

            {/*The separation line*/}


        </div>
    );
};

export default Nav;
