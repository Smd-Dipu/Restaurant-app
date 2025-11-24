import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Admin = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingReservation, setEditingReservation] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('adminAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/login');
            return;
        }
        fetchReservations();
    }, [navigate]);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:3000/reservations');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setReservations(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this reservation?')) return;
        try {
            await fetch(`http://localhost:3000/reservations/${id}`, { method: 'DELETE' });
            setReservations(reservations.filter(res => res.id !== id));
        } catch (err) {
            alert('Error deleting reservation');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        navigate('/login');
    };

    const openEditModal = (reservation) => {
        setEditingReservation({ ...reservation });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setEditingReservation(null);
        setShowEditModal(false);
    };

    const handleEditChange = (field, value) => {
        setEditingReservation(prev => ({ ...prev, [field]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/reservations/${editingReservation.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingReservation),
            });
            if (!response.ok) throw new Error('Failed to update reservation');
            const updatedReservation = await response.json();
            setReservations(reservations.map(res => res.id === updatedReservation.id ? updatedReservation : res));
            closeEditModal();
        } catch (err) {
            alert('Error updating reservation');
        }
    };

    const openPasswordModal = () => {
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordError('');
        setPasswordSuccess('');
        setShowPasswordModal(true);
    };

    const closePasswordModal = () => {
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handlePasswordFormChange = (field, value) => {
        setPasswordForm(prev => ({ ...prev, [field]: value }));
        setPasswordError('');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        setPasswordLoading(true);

        try {
            const response = await fetch('http://localhost:3000/admin');
            if (!response.ok) throw new Error('Failed to fetch admin data');
            const adminData = await response.json();

            if (passwordForm.currentPassword !== adminData.password) {
                setPasswordError('Current password is incorrect');
                setPasswordLoading(false);
                return;
            }

            if (passwordForm.newPassword.length < 6) {
                setPasswordError('New password must be at least 6 characters');
                setPasswordLoading(false);
                return;
            }

            if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                setPasswordError('New passwords do not match');
                setPasswordLoading(false);
                return;
            }

            const updateResponse = await fetch('http://localhost:3000/admin', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...adminData, password: passwordForm.newPassword }),
            });

            if (!updateResponse.ok) throw new Error('Failed to update password');

            setPasswordSuccess('Password changed successfully!');
            setTimeout(() => closePasswordModal(), 2000);
        } catch (err) {
            setPasswordError('Error changing password. Please try again.');
        } finally {
            setPasswordLoading(false);
        }
    };

    const getStatistics = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcomingReservations = reservations.filter(res => new Date(res.date) >= today);
        const totalGuests = reservations.reduce((sum, res) => sum + parseInt(res.guests.match(/\d+/)[0]), 0);
        return { total: reservations.length, upcoming: upcomingReservations.length, totalGuests };
    };

    const getReservationsByDate = () => {
        const dateCount = {};
        reservations.forEach(res => { dateCount[res.date] = (dateCount[res.date] || 0) + 1; });
        return Object.entries(dateCount)
            .map(([date, count]) => ({ date, reservations: count }))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-7);
    };

    const getGuestDistribution = () => {
        const distribution = {};
        reservations.forEach(res => { distribution[res.guests] = (distribution[res.guests] || 0) + 1; });
        return Object.entries(distribution).map(([name, value]) => ({ name, value }));
    };

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    if (loading) return <div className="min-h-screen bg-gray-100 flex justify-center items-center text-xl">Loading...</div>;
    if (error) return <div className="min-h-screen bg-gray-100 flex justify-center items-center text-red-500">Error: {error}</div>;

    const stats = getStatistics();
    const reservationsByDate = getReservationsByDate();
    const guestDistribution = getGuestDistribution();

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
            <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Restaurant Admin</h1>
                <div className="flex gap-3 items-center">
                    <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Back to Website</a>
                    <button onClick={openPasswordModal} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        🔑 Change Password
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-8">
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button onClick={() => setActiveView('dashboard')} className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeView === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}>
                        📊 Dashboard
                    </button>
                    <button onClick={() => setActiveView('table')} className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeView === 'table' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}>
                        📋 Table View
                    </button>
                </div>

                {activeView === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium">Total Reservations</p>
                                        <p className="text-4xl font-bold mt-2">{stats.total}</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-4">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm font-medium">Upcoming Reservations</p>
                                        <p className="text-4xl font-bold mt-2">{stats.upcoming}</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-4">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm font-medium">Total Guests</p>
                                        <p className="text-4xl font-bold mt-2">{stats.totalGuests}</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-4">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Reservations Timeline</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={reservationsByDate}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="date" stroke="#6B7280" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="reservations" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 5 }} activeDot={{ r: 7 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Guest Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={guestDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                                            {guestDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Recent Reservations</h3>
                                <button onClick={() => setActiveView('table')} className="text-blue-600 hover:text-blue-800 font-medium text-sm">View All →</button>
                            </div>
                            <div className="space-y-3">
                                {reservations.slice(0, 5).map((res) => (
                                    <div key={res.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">{res.name.charAt(0)}</div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{res.name}</p>
                                                <p className="text-sm text-gray-600">{res.phone}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-800">{res.date}</p>
                                            <p className="text-sm text-gray-600">{res.guests}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'table' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">All Reservations</h2>
                            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">Total: {reservations.length}</span>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-4 px-6 font-bold">Name</th>
                                            <th className="py-4 px-6 font-bold">Phone</th>
                                            <th className="py-4 px-6 font-bold">Date</th>
                                            <th className="py-4 px-6 font-bold">Guests</th>
                                            <th className="py-4 px-6 font-bold text-center" style={{ width: '120px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {reservations.length === 0 ? (
                                            <tr><td colSpan="5" className="py-8 text-center text-lg text-gray-400">No reservations found.</td></tr>
                                        ) : (
                                            reservations.map((res) => (
                                                <tr key={res.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-medium text-gray-800">{res.name}</td>
                                                    <td className="py-4 px-6">{res.phone}</td>
                                                    <td className="py-4 px-6">{res.date}</td>
                                                    <td className="py-4 px-6">
                                                        <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold">{res.guests}</span>
                                                    </td>
                                                    <td className="py-4 px-6 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            <button onClick={() => openEditModal(res)} className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform" title="Edit">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => handleDelete(res.id)} className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform" title="Delete">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showEditModal && editingReservation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Edit Reservation</h3>
                            <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input type="text" value={editingReservation.name} onChange={(e) => handleEditChange('name', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                <input type="tel" value={editingReservation.phone} onChange={(e) => handleEditChange('phone', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                                <input type="date" value={editingReservation.date} onChange={(e) => handleEditChange('date', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                                <select value={editingReservation.guests} onChange={(e) => handleEditChange('guests', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required>
                                    <option value="1 Person">1 Person</option>
                                    <option value="2 People">2 People</option>
                                    <option value="3 People">3 People</option>
                                    <option value="4 People">4 People</option>
                                    <option value="5+ People">5+ People</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={closeEditModal} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Change Password</h3>
                            <button onClick={closePasswordModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <input type="password" value={passwordForm.currentPassword} onChange={(e) => handlePasswordFormChange('currentPassword', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                <input type="password" value={passwordForm.newPassword} onChange={(e) => handlePasswordFormChange('newPassword', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required minLength="6" />
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                <input type="password" value={passwordForm.confirmPassword} onChange={(e) => handlePasswordFormChange('confirmPassword', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                            </div>
                            {passwordError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{passwordError}</div>
                            )}
                            {passwordSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{passwordSuccess}</div>
                            )}
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={closePasswordModal} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={passwordLoading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    {passwordLoading ? 'Changing...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
