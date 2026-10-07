import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();
    const { user, loading } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (user && !loading) {
            navigate('/admin', { replace: true });
        }
    }, [user, loading, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setIsLoggingIn(false);
        } else {
            navigate('/admin', { replace: true });
        }
    };

    if (loading) return null; // Avoid flicker while checking session

    return (
        <div className="min-h-screen bg-[#070810] flex flex-col justify-center items-center p-4 font-sans text-[#F2EDF5]">
            <div className="w-full max-w-md bg-[#11101A] border border-[#18131D] rounded-xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-widest text-[#B84DFF] mb-2">DRAZYX</h1>
                    <p className="text-[#A99EAE] text-sm">Restricted Access</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-[#A99EAE] uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#070810] border border-[#18131D] rounded p-3 text-[#F2EDF5] focus:outline-none focus:border-[#B84DFF] transition-colors"
                            placeholder="admin@drazyx.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#A99EAE] uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#070810] border border-[#18131D] rounded p-3 text-[#F2EDF5] focus:outline-none focus:border-[#B84DFF] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-[#B84DFF] hover:bg-opacity-80 text-white font-medium py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoggingIn ? 'Authenticating...' : 'Enter System'}
                    </button>
                </form>
            </div>
        </div>
    );
};