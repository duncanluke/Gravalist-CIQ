"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#101622] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent">
            <div className="max-w-sm w-full">
                <form onSubmit={handleRegister} className="bg-[#161e2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl space-y-4">
                    <div className="text-center mb-4">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.4)]">
                                <span className="material-symbols-outlined text-white text-xl">terrain</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tighter">GRAVALIST</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Create Profile</h1>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Registration</span>
                        <Link href="/login" className="text-[10px] font-bold text-primary hover:text-white transition-colors uppercase tracking-widest">Sign In Instead</Link>
                    </div>

                    <div className="space-y-1.5 ml-1">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Full Name</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-1.5 ml-1">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-1.5 ml-1">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] disabled:opacity-50 mt-4"
                    >
                        {loading ? 'INITIALIZING...' : 'CREATE PROFILE'}
                    </button>

                </form>
            </div>
        </div>
    );
}
