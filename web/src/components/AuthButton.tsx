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
                        className="flex items-center"
                    >
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3.5 rounded-2xl transition-all duration-300 text-white active:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-base md:text-xl text-primary drop-shadow-[0_0_8px_rgba(13,89,242,0.8)]">person</span>
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block">Profile</span>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Link
                            href="/register"
                            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3.5 rounded-2xl transition-all duration-300 text-slate-500 hover:text-white active:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-base md:text-xl">person</span>
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block">Profile</span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
