import React from 'react';

const fullMenuData = {
    "Starters": [
        { name: "Pan-Seared Scallops", price: "$38", description: "Cauliflower purée, caviar, lemon butter sauce." },
        { name: "Beef Carpaccio", price: "$32", description: "Thinly sliced raw beef, arugula, parmesan, truffle oil." },
        { name: "Lobster Bisque", price: "$28", description: "Creamy lobster soup, cognac, chives." },
        { name: "Burrata Salad", price: "$26", description: "Heirloom tomatoes, fresh basil, balsamic glaze." }
    ],
    "Main Courses": [
        { name: "Truffle Risotto", price: "$45", description: "Arborio rice, black truffle, parmesan crisp, gold leaf." },
        { name: "Wagyu Beef Tenderloin", price: "$120", description: "A5 Wagyu, potato gratin, red wine reduction." },
        { name: "Miso Glazed Black Cod", price: "$55", description: "Sustainably sourced cod, bok choy, ginger dashi." },
        { name: "Duck Confit", price: "$48", description: "Crispy duck leg, beluga lentils, orange glaze." },
        { name: "Herb-Crusted Lamb Rack", price: "$65", description: "Fondant potatoes, seasonal vegetables, rosemary jus." }
    ],
    "Desserts": [
        { name: "Chocolate Dôme", price: "$28", description: "Dark chocolate mousse, hazelnut praline, gold dust." },
        { name: "Lemon Basil Tart", price: "$24", description: "Zesty lemon curd, italian meringue, basil gel." },
        { name: "Tiramisu", price: "$22", description: "Classic italian dessert, mascarpone, espresso soaked ladyfingers." }
    ]
};

const FullMenu = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] bg-dark-900 overflow-y-auto animate-fade-in">
            <div className="container mx-auto px-6 py-20 relative">
                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 text-gold-400 hover:text-white transition-colors text-xl uppercase tracking-widest z-50"
                >
                    Close [X]
                </button>

                <div className="text-center mb-16">
                    <h2 className="text-gold-400 uppercase tracking-[0.2em] text-sm mb-4">The Complete Collection</h2>
                    <h1 className="text-5xl md:text-6xl font-serif text-white">Our Menu</h1>
                    <div className="w-24 h-1 bg-gold-400 mx-auto mt-8"></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    {Object.entries(fullMenuData).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="text-3xl font-serif text-gold-400 mb-8 text-center border-b border-dark-800 pb-4">{category}</h3>
                            <div className="grid gap-8">
                                {items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-baseline group border-b border-dark-800 pb-4 hover:border-gold-400/30 transition-colors">
                                        <div className="flex-1 pr-8">
                                            <h4 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors mb-2">{item.name}</h4>
                                            <p className="text-gray-400 font-light text-sm italic">{item.description}</p>
                                        </div>
                                        <span className="text-xl text-gold-400 font-bold">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 border border-gold-400 text-gold-400 uppercase tracking-widest hover:bg-gold-400 hover:text-dark-900 transition-all"
                    >
                        Close Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FullMenu;
