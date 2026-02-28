"use client";

import React, { useState, Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-sm w-full">
            <form onSubmit={handleLogin} className="bg-[#161e2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-300">
                <div className="text-center mb-4">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.4)]">
                            <span className="material-symbols-outlined text-white text-xl">terrain</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tighter">GRAVALIST</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                </div>

                {message && (
                    <div className="bg-primary/10 border border-primary/20 text-primary text-xs p-4 rounded-lg">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-lg">
                        {error}
                    </div>
                )}



                <div className="space-y-2 text-slate-300">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Email Address</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                        placeholder="alex@gravalist.com"
                    />
                </div>

                <div className="space-y-1.5 text-slate-300 ml-1">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Password</label>
                        <Link href="/reset-password" title="reset password" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Forgot?</Link>
                    </div>
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
                    {loading ? 'AUTHORIZING...' : 'LOG IN'}
                </button>

            </form>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="fixed inset-0 bg-[#101622] overflow-y-auto custom-scrollbar z-50 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent">
            <div className="min-h-full flex items-center justify-center p-6 w-full">
                <Suspense fallback={
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Initializing...</p>
                    </div>
                }>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
