"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
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
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-slate-500">We'll send a recovery link to your inbox.</p>
                </div>

                <div className="bg-[#161e2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-6 text-slate-300">
                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-green-500 text-3xl">mark_email_read</span>
                            </div>
                            <h2 className="text-xl font-bold text-white">Check Your Email</h2>
                            <p className="text-slate-500 text-sm">We've dispatched the recovery link to your address.</p>
                            <Link href="/login" className="inline-block mt-4 text-primary font-bold hover:underline">Return to Login</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    placeholder="alex@gravalist.com"
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] disabled:opacity-50"
                            >
                                {loading ? 'SENDING...' : 'SEND RECOVERY LINK'}
                            </button>

                            <p className="text-center text-xs text-slate-500">
                                Wait, I remember it! <Link href="/login" className="text-white hover:text-primary transition-colors font-bold">Sign In</Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
