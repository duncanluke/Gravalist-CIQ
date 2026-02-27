"use client";

import React from 'react';

export function RidersPanel() {
    return (
        <div className="bg-[#161e2e]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">group</span>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-white">Active Riders</h3>
                </div>
                <span className="text-xs font-mono text-primary animate-pulse">12 LIVE</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[30vh] pr-1 custom-scrollbar">
                {/* Rider Item 1 */}
                <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                                <img src="https://picsum.photos/seed/rider1/100/100" alt="Rider" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#161e2e]"></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Alex M.</p>
                            <p className="text-[10px] text-slate-400">Sector 02 • Climbing</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">14.2 km/h</span>
                </div>

                {/* Rider Item 2 */}
                <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                                <img src="https://picsum.photos/seed/rider2/100/100" alt="Rider" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[#161e2e]"></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Sarah K.</p>
                            <p className="text-[10px] text-amber-500">Sector 04 • Chunky</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">22.1 km/h</span>
                </div>

                {/* Rider Item 3 */}
                <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                                <img src="https://picsum.photos/seed/rider3/100/100" alt="Rider" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-slate-500 rounded-full border-2 border-[#161e2e]"></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Marcus T.</p>
                            <p className="text-[10px] text-slate-400">Sector 01 • Idle</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">0.0 km/h</span>
                </div>
            </div>
        </div>
    );
}

export function AlertsPanel() {
    return (
        <div className="bg-[#161e2e]/90 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500">warning</span>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-white">Sector Alerts</h3>
                </div>
                <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold border border-red-500/20">2 CRITICAL</span>
            </div>

            <div className="flex flex-col gap-3">
                <div className="bg-red-500/10 border-l-2 border-red-500 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-white">WASH OUT: Sector 04</p>
                    <p className="text-[10px] text-slate-400 mt-1">Deep ruts after bridge. High clearance suggested.</p>
                    <p className="text-[9px] text-slate-500 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">schedule</span> 14m ago
                    </p>
                </div>

                <div className="bg-amber-500/10 border-l-2 border-amber-500 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-white">Logging Activity: North Hub</p>
                    <p className="text-[10px] text-slate-400 mt-1">Heavy machinery on fire road connecting to Sector 02.</p>
                    <p className="text-[9px] text-slate-500 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">schedule</span> 1h ago
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Sidebar() {
    return (
        <div className="absolute left-6 top-24 bottom-6 w-80 flex flex-col gap-4 pointer-events-none z-20 hidden md:flex">
            {/* Sidebar panels could go here, but they are used individually in MapInterface */}
        </div>
    );
}
