import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black py-16 border-t border-dark-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-serif text-gold-400 mb-6">LUXURIA</h3>
                        <p className="text-gray-500 mb-6">
                            123 Culinary Avenue<br />
                            New York, NY 10012
                        </p>
                        <p className="text-gray-500">
                            +88 01755 555 555<br />
                            reservations@luxuria.com
                        </p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-white uppercase tracking-widest mb-6 text-sm">Opening Hours</h4>
                        <p className="text-gray-500 mb-2">Mon - Sun</p>
                        <p className="text-gold-400 font-serif text-xl">17:00 - 23:00</p>
                    </div>

                    <div className="flex flex-col justify-center md:items-end items-center">
                        <div className="flex space-x-6 mb-6">
                            <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors">Instagram</a>
                            <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors">Facebook</a>
                            <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors">Twitter</a>
                        </div>
                        <p className="text-gray-600 text-sm">
                            &copy; {new Date().getFullYear()} Luxuria Restaurant.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
