import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home.tsx';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Nav from './components/Nav.tsx';
import Footer from './components/Footer.tsx';
import Profile from './components/Profile.tsx'
import News from './components/News.tsx'
import Hackathon from './components/events/Hackathon.tsx'
import HackathonResources from './components/events/HackathonResources.tsx'
import FAQ from './components/events/Faq.tsx'
import GithubEvent from './components/events/Github.tsx'
import HackathonDashboard from './components/events/HackathonDashboard.tsx'
import HackathonPrizes from './components/events/Prizes.tsx'





const allowedOrigins = [ "https://127.0.0.1:8080/"];


function App() {
  return (
    <Router>
      <div>
        {/* Possibly a layout that has a nav bar and a footer */}
        <Nav />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events/hackathon2025" element={<Hackathon />} />
          <Route path="/events/hackathon2025/resources" element={<HackathonResources />} />
          <Route path="/events/hackathon2025/faq" element={<FAQ />} />
          <Route path="/events/hackathon2025/prizes" element={<HackathonPrizes />} />
          <Route path="/hackathon-dashboard" element={<HackathonDashboard />} />
          <Route path="/events/githubevent" element={<GithubEvent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;