import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContextType = {
    session: Session | null;
    user: User | null;
    isAdmin: boolean;
    signOut: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function checkAdmin(userId: string | undefined) {
    if (!userId) return false;
    const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
    return !error && Boolean(data);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        const resolveSession = async (nextSession: Session | null) => {
            const nextUser = nextSession?.user ?? null;
            const nextIsAdmin = await checkAdmin(nextUser?.id);
            if (!active) return;
            setSession(nextSession);
            setUser(nextUser);
            setIsAdmin(nextIsAdmin);
            setLoading(false);
        };

        supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
            resolveSession(nextSession);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setLoading(true);
            window.setTimeout(() => resolveSession(nextSession), 0);
        });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, isAdmin, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
