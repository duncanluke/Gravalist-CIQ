"use client";

import React from 'react';

export function GarminSync() {
    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

                {/* Left: Visual */}
                <div className="relative flex flex-col items-center justify-center py-4 md:py-0">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                        {/* Pulsing Rings */}
                        <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-8 border border-primary/40 rounded-full animate-pulse"></div>

                        {/* Central Icon */}
                        <div className="w-24 h-24 md:w-28 md:h-28 bg-[#161e2e] border-2 border-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(13,89,242,0.2)] z-10">
                            <span className="material-symbols-outlined text-4xl md:text-5xl text-primary">watch</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-1">
                            CONNECT IQ™
                        </p>
                        <p className="text-slate-500 text-[9px] uppercase tracking-widest">v2.4.0 • LIVE TELEMETRY</p>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Data Sensor</h1>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Analyze micro-vibrations with your Garmin Edge® or Fenix® to classify terrain in real-time.
                        </p>
                    </div>

                    {/* How it works */}
                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                            <div className="w-7 h-7 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-xs">download</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">1. Install Data Field</h4>
                                <p className="text-[9px] text-slate-500 mt-0.5">Add to your ride screens via Connect IQ.</p>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                            <div className="w-7 h-7 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-xs">sensors</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">2. Ride & Record</h4>
                                <p className="text-[9px] text-slate-500 mt-0.5">Passively records surface IMU data.</p>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                            <div className="w-7 h-7 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-xs">cloud_upload</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">3. Auto-Sync</h4>
                                <p className="text-[9px] text-slate-500 mt-0.5">Processed data is added to the global map.</p>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <button
                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,89,242,0.4)] flex items-center justify-center gap-2"
                    >
                        <span>GET CONNECT IQ APP</span>
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
