import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { setProfile, setLoading, setError } from "../actions/ProfileActions";
import { CgProfile } from "react-icons/cg";

function Profile() {
    ///////////////////////////
    // States
    ///////////////////////////
    /**
    * @description React hook for dispatching actions to update states
    */
    const dispatch = useDispatch();

    /**
     * gets the `news`, `loading`, and `error` from the Redux state
     *
     * @typedef {Array | null} news - The array of news articles fetched from the store, or null if not yet loaded
     * @typedef {boolean} loading - Indicates whether the news data is currently being loaded
     * @typedef {string | null} error - Error message if there was an issue fetching the news, or null if no error
     */
    const {profile, loading, error } = useSelector((state: any) => state.profile);
    
    ///////////////////////////
    //Functions
    ///////////////////////////
 
    /**
     * Fetches news from our backend API
     * 
     * @returns {Promise<Array<Object>>} - A promise resolving to a list of news
     */    

    ///////////////////////////
    // TSX Rendering
    ///////////////////////////
    return (
        <div className="ProjectsPage">

            {/* Profile Section */}
            <section>
            <div className="profile-container">
                <div className="profile-header">
                    <img src={profilePicture} alt="Profile" />
                    <h1>{username}</h1>
                    <p>{email}</p>
                </div>

                <div className="profile-bio" >
                    <h2>Bio</h2>
                    <p>{bio}</p>
                </div>
                </div>
            </section>



        </div>
    );
}



export default Profile;