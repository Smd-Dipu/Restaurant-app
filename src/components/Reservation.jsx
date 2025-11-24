import React, { useState } from 'react';

const Reservation = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        guests: '2 People'
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:3000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', phone: '', date: '', guests: '2 People' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="reservation" className="py-20 bg-dark-800 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4">Book Your Table</h3>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">Make a Reservation</h2>

                    {status === 'success' && (
                        <div className="mb-8 p-4 bg-green-900/50 border border-green-500 text-green-200 rounded">
                            Reservation confirmed successfully! We look forward to seeing you.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mb-8 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded">
                            Something went wrong. Please try again or call us directly.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-400">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-900 border border-gray-700 p-4 text-white focus:border-gold-400 outline-none transition-colors"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-400">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-900 border border-gray-700 p-4 text-white focus:border-gold-400 outline-none transition-colors"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-400">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-900 border border-gray-700 p-4 text-white focus:border-gold-400 outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-400">Guests</label>
                            <select
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                className="w-full bg-dark-900 border border-gray-700 p-4 text-white focus:border-gold-400 outline-none transition-colors"
                            >
                                <option>2 People</option>
                                <option>3 People</option>
                                <option>4 People</option>
                                <option>5+ People</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 mt-8 text-center">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-12 py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Reservation;
