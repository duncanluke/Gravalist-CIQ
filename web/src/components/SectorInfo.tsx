"use client";

import React from 'react';

interface SectorInfoProps {
    onClose: () => void;
}

export function SectorInfo({ onClose }: SectorInfoProps) {
    return (
        <div className="flex flex-col h-full bg-[#161e2e]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto">
            {/* Header / Close */}
            <div className="flex justify-between items-center p-3 border-b border-white/5 shrink-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sector Analysis</span>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>

            <div className="p-3 space-y-4 overflow-y-auto custom-scrollbar flex-1">

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/20 p-2 rounded border border-white/5">
                        <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Rides</p>
                        <p className="text-lg font-mono font-bold text-white leading-none">1,248</p>
                    </div>
                    <div className="bg-black/20 p-2 rounded border border-white/5">
                        <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Rating</p>
                        <span className="text-xs font-bold text-amber-500 uppercase leading-none">
                            Chunky
                        </span>
                    </div>
                    <div className="bg-black/20 p-2 rounded border border-white/5">
                        <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Grade</p>
                        <p className="text-sm font-mono text-white leading-none">4.2%</p>
                    </div>
                    <div className="bg-black/20 p-2 rounded border border-white/5">
                        <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Speed</p>
                        <p className="text-sm font-mono text-white leading-none">22.4</p>
                    </div>
                </div>

                <div className="h-px bg-white/5 w-full"></div>

                {/* Tech Breakdown */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Tech Breakdown</h3>

                    {/* Frame Type */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] text-slate-400">
                            <span>Frame</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                            <div className="h-full bg-slate-400" style={{ width: '45%' }}></div>
                            <div className="h-full bg-slate-500" style={{ width: '35%' }}></div>
                            <div className="h-full bg-slate-600" style={{ width: '20%' }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                            <span>Carbon</span>
                            <span>Ti</span>
                            <span>Metal</span>
                        </div>
                    </div>

                    {/* Bike Type */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] text-slate-400">
                            <span>Bike</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                            <div className="h-full bg-primary" style={{ width: '60%' }}></div>
                            <div className="h-full bg-emerald-600" style={{ width: '30%' }}></div>
                            <div className="h-full bg-amber-600" style={{ width: '10%' }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                            <span className="text-primary">Gravel</span>
                            <span className="text-emerald-600">HT</span>
                            <span className="text-amber-600">MTB</span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-white/5 w-full"></div>

                {/* Community Notes */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Notes</h3>

                    <div className="space-y-2">
                        <div className="bg-white/5 p-2 rounded border border-white/5">
                            <p className="text-[10px] text-slate-300 leading-snug mb-1">
                                "Heavy corrugation on the descent."
                            </p>
                            <div className="flex justify-between items-center text-[9px] text-slate-500">
                                <span>Oct 24</span>
                                <span className="text-primary">@gravelking</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-2 rounded border border-white/5">
                            <p className="text-[10px] text-slate-300 leading-snug mb-1">
                                "Sandy patches cleared up."
                            </p>
                            <div className="flex justify-between items-center text-[9px] text-slate-500">
                                <span>Oct 22</span>
                                <span className="text-primary">@sarah_rides</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
