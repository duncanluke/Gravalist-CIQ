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
    const [copied, setCopied] = useState(false);

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

    const handleCopyId = () => {
        if (user?.id) {
            navigator.clipboard.writeText(user.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
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
                        <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
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
                            <p className="text-xs text-slate-500">Verified Rider since 2026</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Full Name</label>
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

                        {/* Garmin Integration Section */}
                        <div className="pt-6 border-t border-white/5 space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">watch</span>
                                    Garmin Integration
                                </h3>
                                <p className="text-xs text-slate-400">Pair your bike computer to upload rides to the map automatically.</p>
                            </div>

                            <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1 mb-1 block">Your User ID</label>
                                    <div className="flex gap-2">
                                        <code className="flex-1 bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-white font-mono text-xs overflow-x-auto whitespace-nowrap">
                                            {user?.id}
                                        </code>
                                        <button
                                            type="button"
                                            onClick={handleCopyId}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${copied ? 'bg-green-500/20 text-green-500 border border-green-500/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                                            {copied ? 'COPIED' : 'COPY'}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 mt-2">
                                    <p className="text-xs text-slate-300 font-bold">How to pair:</p>
                                    <ol className="text-xs text-slate-400 space-y-2 list-decimal list-outside ml-4">
                                        <li>Install the <strong>Gravel Sector</strong> app from the Connect IQ store.</li>
                                        <li>Open the <strong>Garmin Connect</strong> app on your smartphone.</li>
                                        <li>Navigate to your Device &gt; Activities &amp; App Management &gt; Data Fields &gt; Gravel Sector &gt; Settings.</li>
                                        <li>Paste your User ID above into the <strong>Gravalist User ID</strong> field and save.</li>
                                    </ol>
                                </div>
                            </div>
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
