"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
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
            setLoading(false);
        }
        getUser();
    }, [router, supabase]);

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

    const ConnectIQStoreURL = "https://apps.garmin.com/"; // General link, can be updated to specific app ID once published

    if (loading) return (
        <div className="min-h-screen bg-[#101622] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Loading Profile...</p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-[#101622] text-slate-300 overflow-y-auto custom-scrollbar z-50">
            <div className="min-h-full flex flex-col items-center pt-8 pb-12 px-4 w-full">
                {/* Top Navigation Bar */}
                <div className="w-full max-w-sm flex justify-start mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/5 rounded-xl backdrop-blur-md"
                    >
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        BACK TO MAP
                    </Link>
                </div>

                <div className="max-w-sm w-full shrink-0">
                    <div className="mb-8 pl-1">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Your Profile</h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#161e2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-8"
                    >

                        <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                            <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-3xl text-slate-400 border border-white/10 shadow-xl overflow-hidden">
                                <span className="material-symbols-outlined text-4xl">person</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">

                            {/* Garmin Integration Section */}
                            <div className="space-y-4">
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
                                            <li>Install the <a href={ConnectIQStoreURL} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Gravel Sector</a> app from the Connect IQ store.</li>
                                            <li>Open the <strong>Garmin Connect</strong> app on your smartphone.</li>
                                            <li>Navigate to your Device &gt; Activities &amp; App Management &gt; Data Fields &gt; Gravel Sector &gt; Settings.</li>
                                            <li>Paste your User ID above into the <strong>Gravalist User ID</strong> field and save.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-center border-t border-white/5 mt-6">
                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
