import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-dark-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-400"></div>
                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Restaurant Interior"
                                className="w-full h-auto relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-400"></div>
                        </div>
                    </div>

                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4">Our Story</h3>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">A Legacy of Flavor</h2>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light">
                            Founded in 1985, Luxuria has been a beacon of culinary excellence in the heart of the city.
                            Our philosophy is simple: honor the ingredients, respect the tradition, and innovate with passion.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8 font-light">
                            Every dish tells a story, crafted with the finest locally sourced ingredients and a touch of
                            artistic flair. We invite you to join us for an unforgettable dining experience that transcends
                            the ordinary.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg"
                                alt="Chef Signature"
                                className="h-12 opacity-60 invert"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
