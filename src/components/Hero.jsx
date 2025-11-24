import React, { useState, useEffect } from 'react';

const heroImages = [
    "/hero.png",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="home" className="relative h-screen w-full overflow-hidden">
            {heroImages.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            ))}

            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
                <h2 className="text-gold-400 text-sm md:text-xl uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
                    Fine Dining Experience
                </h2>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-6 md:mb-8 leading-tight">
                    Taste the <span className="italic text-gold-400">Extraordinary</span>
                </h1>
                <p className="max-w-2xl text-gray-300 text-base md:text-lg mb-8 md:mb-10 font-light leading-relaxed px-4">
                    Experience a culinary journey like no other, where tradition meets innovation in an atmosphere of pure elegance.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto px-8">
                    <a href="#menu" className="px-8 py-3 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition-colors w-full md:w-auto">
                        View Menu
                    </a>
                    <a href="#reservation" className="px-8 py-3 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-dark-900 transition-colors w-full md:w-auto">
                        Reservation
                    </a>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 flex space-x-3">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-gold-400 w-8' : 'bg-white/50 hover:bg-white'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
