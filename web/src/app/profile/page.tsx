"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [fullName, setFullName] = useState('');
    const [bikeType, setBikeType] = useState('Gravel');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);
            setFullName(user.user_metadata?.full_name || '');
            setBikeType(user.user_metadata?.bike_type || 'Gravel');
            setLoading(false);
        }
        getUser();
    }, [router, supabase]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: fullName,
                bike_type: bikeType
            }
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        }
        setUpdating(false);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) return (
        <div className="min-h-screen bg-[#101622] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Loading Profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#101622] text-slate-300 py-20 px-6">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Scout Profile</h1>
                        <p className="text-slate-500 text-sm">Manage your identification and gear.</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-lg transition-all border border-red-500/10"
                    >
                        SIGN OUT
                    </button>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleUpdate}
                    className="bg-[#161e2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-8"
                >
                    {message && (
                        <div className={`p-4 rounded-lg border text-xs font-bold ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-3xl text-slate-400 border border-white/10 shadow-xl overflow-hidden">
                            <span className="material-symbols-outlined text-4xl">person</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{user.email}</p>
                            <p className="text-xs text-slate-500">Verified Scout since 2026</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Full Scout Name</label>
                            <input
                                required
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Primary Bike</label>
                            <select
                                value={bikeType}
                                onChange={(e) => setBikeType(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                            >
                                <option value="Gravel">Gravel Bike</option>
                                <option value="Hardtail">Hardtail MTB</option>
                                <option value="Endurance">Endurance Road</option>
                                <option value="Monster">Monster Cross</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            disabled={updating}
                            className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,89,242,0.3)] disabled:opacity-50"
                        >
                            {updating ? 'SAVING...' : 'UPDATE PROFILE'}
                        </button>
                        <Link
                            href="/"
                            className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center justify-center"
                        >
                            MAP
                        </Link>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
