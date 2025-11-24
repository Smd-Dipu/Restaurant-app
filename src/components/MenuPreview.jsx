import React, { useState } from 'react';
import FullMenu from './FullMenu';

const dishes = [
    {
        name: "Truffle Risotto",
        description: "Arborio rice, black truffle, parmesan crisp, gold leaf.",
        price: "$45",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Pan-Seared Scallops",
        description: "Cauliflower purée, caviar, lemon butter sauce.",
        price: "$38",
        category: "Starter",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Wagyu Beef Tenderloin",
        description: "A5 Wagyu, potato gratin, red wine reduction.",
        price: "$120",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Chocolate Dôme",
        description: "Dark chocolate mousse, hazelnut praline, gold dust.",
        price: "$28",
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

const MenuPreview = () => {
    const [showFullMenu, setShowFullMenu] = useState(false);

    return (
        <section id="menu" className="py-20 bg-dark-900 text-center">
            <div className="container mx-auto px-6">
                <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4">Culinary Masterpieces</h3>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-16">Selected Menu</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {dishes.map((dish, index) => (
                        <div key={index} className="group relative border border-dark-800 hover:border-gold-400/30 transition-all duration-500 bg-dark-800/30 overflow-hidden">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h4 className="text-2xl font-serif text-white group-hover:text-gold-400 transition-colors">{dish.name}</h4>
                                    <span className="text-xl text-gold-400 font-bold">{dish.price}</span>
                                </div>
                                <p className="text-gray-400 font-light italic">{dish.description}</p>
                                <span className="inline-block mt-4 text-xs text-gray-500 uppercase tracking-wider">{dish.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <button
                        onClick={() => setShowFullMenu(true)}
                        className="px-10 py-3 border border-gold-400 text-gold-400 uppercase tracking-widest hover:bg-gold-400 hover:text-dark-900 transition-all"
                    >
                        View Full Menu
                    </button>
                </div>
            </div>

            {showFullMenu && <FullMenu onClose={() => setShowFullMenu(false)} />}
        </section>
    );
};

export default MenuPreview;
