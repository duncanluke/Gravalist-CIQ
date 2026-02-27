"use client";

import React from 'react';

export function GarminSync() {
    return (
        <div className="w-full flex flex-col p-6 md:p-8 h-full bg-[#101622] text-white">
            <div className="flex-1 flex flex-col justify-center">
                <div className="relative mx-auto flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-[#161e2e] border border-primary/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.15)] z-10">
                        <span className="material-symbols-outlined text-3xl text-primary">pedal_bike</span>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                            CONNECT IQ™
                        </p>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Data Sensor</h1>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                        Add the Garmin IQ App to your compatible Edge® cycling computer and we'll passively collect the latest gravel conditions from your rides.
                    </p>
                </div>

                <div className="space-y-3 max-w-sm mx-auto w-full mb-8">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-white leading-none">1</span>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Install Data Field</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">Add to your ride screens via Connect IQ.</p>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-white leading-none">2</span>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Ride & Auto-Sync</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">Passively records surface data to global map.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mt-auto">
                <a
                    href="https://apps.garmin.com/en-US/apps/7014cfeb-226e-4d97-bc68-c59631f66c56"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(13,89,242,0.3)] flex items-center justify-center gap-2 group"
                >
                    <span>DOWNLOAD GARMIN APP</span>
                    <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">
                        download
                    </span>
                </a>
            </div>
        </div>
    );
}
