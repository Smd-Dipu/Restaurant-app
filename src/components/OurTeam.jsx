import React from 'react';

const team = [
    {
        name: "Alessandro Rossi",
        role: "Executive Chef",
        bio: "With over 20 years of experience in Michelin-starred kitchens across Italy.",
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Sarah Jenkins",
        role: "Sommelier",
        bio: "Curating our award-winning wine list with passion and precision.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Marcus Chen",
        role: "Restaurant Manager",
        bio: "Ensuring every guest experiences the pinnacle of hospitality.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

const OurTeam = () => {
    return (
        <section id="team" className="py-20 bg-dark-900">
            <div className="container mx-auto px-6">
                <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4 text-center">The People Behind the Magic</h3>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">Meet Our Team</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <div key={index} className="text-center group">
                            <div className="relative overflow-hidden mb-6 mx-auto w-64 h-64 rounded-full border-2 border-gold-400/30 group-hover:border-gold-400 transition-colors duration-500">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <h4 className="text-2xl font-serif text-white mb-2">{member.name}</h4>
                            <p className="text-gold-400 uppercase text-xs tracking-widest mb-4">{member.role}</p>
                            <p className="text-gray-400 font-light max-w-xs mx-auto">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
