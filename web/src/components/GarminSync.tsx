"use client";

import React from 'react';

export function GarminSync() {
    return (
        <div className="absolute inset-0 z-50 bg-[#101622] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center my-auto">

                {/* Left: Visual */}
                <div className="relative flex flex-col items-center justify-center py-8 md:py-0">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Pulsing Rings */}
                        <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-8 border border-primary/40 rounded-full animate-pulse"></div>

                        {/* Central Icon */}
                        <div className="w-32 h-32 bg-[#161e2e] border-2 border-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(13,89,242,0.2)] z-10">
                            <span className="material-symbols-outlined text-5xl text-primary">watch</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
                            CONNECT IQ™ INTEGRATION
                        </p>
                        <p className="text-slate-500 text-xs">VERSION 2.4.0 • LIVE TELEMETRY</p>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Gravalist Sensor</h1>
                        <p className="text-slate-400 leading-relaxed">
                            Turn your Garmin Edge® or Fenix® into a passive gravel intelligence unit.
                            Our Connect IQ™ data field analyzes micro-vibrations to classify surface quality in real-time.
                        </p>
                    </div>

                    {/* How it works */}
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-white text-sm">download</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase">1. Install Data Field</h4>
                                    <p className="text-xs text-slate-400 mt-1">Add "Gravalist Sensor" to your ride screens via the Connect IQ Store.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-white text-sm">sensors</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase">2. Ride & Record</h4>
                                    <p className="text-xs text-slate-400 mt-1">The app passively records surface "noise" (IMU data) while you ride.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-white text-sm">cloud_upload</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase">3. Auto-Sync</h4>
                                    <p className="text-xs text-slate-400 mt-1">When your activity saves, surface data is processed and added to the global map.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <button
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,89,242,0.4)] hover:shadow-[0_0_30px_rgba(13,89,242,0.6)] flex items-center justify-center gap-2 group"
                    >
                        <span>GET THE CONNECT IQ APP</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">open_in_new</span>
                    </button>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
                        <span className="material-symbols-outlined text-xs">battery_saver</span>
                        <span>Optimized for negligible battery impact (&lt;1% per hour).</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
