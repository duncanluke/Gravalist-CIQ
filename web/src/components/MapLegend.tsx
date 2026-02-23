import React from 'react';

export function MapLegend() {
    return (
        <div className="bg-[#101622]/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl w-40 cursor-default pointer-events-auto transition-all hover:border-white/20">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Road Surface</h4>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    <span className="text-[10px] text-white font-medium uppercase tracking-wider">Paved</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] -ml-0.5"></div>
                    <span className="text-[10px] text-white font-medium uppercase tracking-wider">Gravel</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                    <span className="text-[10px] text-white font-medium uppercase tracking-wider">Dirt</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-px bg-slate-500"></div>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Unknown</span>
                </div>
            </div>
        </div>
    );
}
