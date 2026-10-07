import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const Dashboard = () => {
    const [stats, setStats] = useState({ releases: 0, beats: 0, room: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const [{ count: rCount }, { count: bCount }, { count: rmCount }] = await Promise.all([
                supabase.from('releases').select('*', { count: 'exact', head: true }),
                supabase.from('beats').select('*', { count: 'exact', head: true }),
                supabase.from('room_posts').select('*', { count: 'exact', head: true })
            ]);
            setStats({ releases: rCount || 0, beats: bCount || 0, room: rmCount || 0 });
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end border-b border-[#18131D] pb-4">
                <div>
                    <h1 className="text-3xl font-bold">Good evening, Drazyx.</h1>
                    <p className="text-[#A99EAE] mt-2">Here is what is happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/admin/releases/new" className="bg-[#B84DFF] hover:bg-opacity-80 text-white px-4 py-2 rounded text-sm font-medium transition">+ New Release</Link>
                    <Link to="/admin/beats/new" className="bg-[#18131D] hover:bg-[#11101A] border border-[#A99EAE] text-[#F2EDF5] px-4 py-2 rounded text-sm font-medium transition">+ New Beat</Link>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Content Box */}
                <div className="bg-[#11101A] p-6 rounded-lg border border-[#18131D]">
                    <h2 className="text-[#A99EAE] text-sm uppercase tracking-wider mb-4">Content</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between"><span>Releases</span> <span className="font-bold">{stats.releases}</span></div>
                        <div className="flex justify-between"><span>Beats</span> <span className="font-bold">{stats.beats}</span></div>
                        <div className="flex justify-between"><span>Room Posts</span> <span className="font-bold">{stats.room}</span></div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#11101A] p-6 rounded-lg border border-[#18131D] md:col-span-2">
                    <h2 className="text-[#A99EAE] text-sm uppercase tracking-wider mb-4">Recent Activity</h2>
                    <div className="text-sm text-[#A99EAE] py-4">
                        <p>Activity logs will appear here once connected.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};