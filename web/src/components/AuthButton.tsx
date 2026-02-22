"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthButton() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    if (loading) return <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse"></div>;

    return (
        <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
                {user ? (
                    <motion.div
                        key="user"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-bold text-white uppercase tracking-wider">{user.user_metadata?.full_name || 'Anonymous Scout'}</p>
                            <p className="text-[9px] text-slate-500 font-mono tracking-tighter">LVL 4 SCOUT</p>
                        </div>
                        <Link
                            href="/profile"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center hover:border-primary transition-all overflow-hidden"
                        >
                            <span className="material-symbols-outlined text-primary text-xl md:text-2xl">person</span>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg hover:shadow-[0_0_15px_rgba(13,89,242,0.4)] transition-all uppercase tracking-widest"
                        >
                            Log In
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
