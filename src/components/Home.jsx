import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import MenuPreview from './MenuPreview';
import Reservation from './Reservation';
import OurTeam from './OurTeam';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="bg-dark-900 min-h-screen text-white selection:bg-gold-400 selection:text-dark-900">
            <Navbar />
            <Hero />
            <About />
            <MenuPreview />
            <OurTeam />
            <Reservation />
            <Footer />
        </div>
    );
};

export default Home;
