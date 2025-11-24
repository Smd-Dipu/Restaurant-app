import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 shadow-lg py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="text-2xl font-serif font-bold text-gold-400 tracking-wider cursor-pointer z-50 relative">
                    LUXURIA
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#menu" className="text-gray-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-widest">Menu</a>
                    <a href="#team" className="text-gray-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-widest">Team</a>
                    <a href="#about" className="text-gray-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-widest">About</a>
                    <a href="#reservation" className="px-6 py-2 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900 transition-all uppercase text-sm tracking-widest">
                        Book a Table
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gold-400 z-50 relative focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div className={`w-6 h-0.5 bg-gold-400 mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-gold-400 mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-gold-400 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-dark-900 z-40 flex flex-col justify-center items-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <div className="flex flex-col space-y-8 text-center">
                        <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white hover:text-gold-400 font-serif transition-colors">Menu</a>
                        <a href="#team" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white hover:text-gold-400 font-serif transition-colors">Team</a>
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white hover:text-gold-400 font-serif transition-colors">About</a>
                        <a href="#reservation" onClick={() => setMobileMenuOpen(false)} className="px-8 py-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900 transition-all uppercase tracking-widest">
                            Book a Table
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
