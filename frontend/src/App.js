import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './components/Authentication.tsx';
import Home from './components/Home.tsx';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Nav from './components/Nav.tsx';
import Footer from './components/Footer.tsx';
import Profile from './components/Profile.tsx'
import News from './components/News.tsx'

const allowedOrigins = [ "http://127.0.0.1:8080/"];


function App() {

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;