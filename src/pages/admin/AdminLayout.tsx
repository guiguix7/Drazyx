import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const AdminLayout = () => {
    const { signOut } = useAuth();
    const location = useLocation();

    const navGroups = [
        {
            label: 'CONTENT', links: [
                { to: '/admin', label: 'Dashboard' },
                { to: '/admin/releases', label: 'Releases' },
                { to: '/admin/beats', label: 'Beats' },
                { to: '/admin/room', label: 'The Room' }
            ]
        },
        {
            label: 'AUDIENCE', links: [
                { to: '/admin/messages', label: 'Messages' },
                { to: '/admin/subscribers', label: 'Subscribers' }
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-[#070810] text-[#F2EDF5] font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#11101A] border-r border-[#18131D] flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-widest text-[#B84DFF]">DRAZYX ADMIN</h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <h2 className="text-xs font-semibold text-[#A99EAE] tracking-wider mb-3 px-2">{group.label}</h2>
                            <ul className="space-y-1">
                                {group.links.map(link => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className={`block px-2 py-2 rounded transition-colors ${location.pathname === link.to ? 'bg-[#18131D] text-[#B84DFF]' : 'hover:bg-[#18131D] text-[#F2EDF5]'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#18131D]">
                    <button
                        onClick={signOut}
                        className="w-full text-left px-2 py-2 text-[#A99EAE] hover:text-[#F2EDF5] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};