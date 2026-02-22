"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/login?message=Password updated successfully');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#101622] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.4)]">
                            <span className="material-symbols-outlined text-white text-2xl">terrain</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tighter">GRAVALIST</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">New Password</h1>
                    <p className="text-slate-500">Secure your scout profile with a new secret.</p>
                </div>

                <form onSubmit={handleUpdate} className="bg-[#161e2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-6 text-slate-300">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">New Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] disabled:opacity-50"
                    >
                        {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                    </button>
                </form>
            </div>
        </div>
    );
}
