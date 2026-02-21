"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RiderProfile {
    id: string;
    name: string;
    rocks: number;
    rides: number;
    stats: {
        brutal: number;
        chunky: number;
        champagne: number;
    };
    rank: number;
}

const MOCK_LEADERBOARD: RiderProfile[] = Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    name: [
        'Alex "The Goat" M.', 'Sarah "Sledgehammer" K.', 'Marcus T.', 'Jenny Gravel', 'David R.',
        'Tom "Dust" H.', 'Lisa B.', 'Mike "Corrugation" P.', 'Emma W.', 'James F.',
        'Rob "The Rock" S.', 'Anna K.', 'Chris L.', 'Pat M.', 'Sophie T.',
        'Dan "Grinder" H.', 'Kelly R.', 'Ben J.', 'Sam W.', 'Lucy P.'
    ][i] || `Rider ${i + 1}`,
    rocks: Math.floor(1500 * Math.pow(0.9, i)),
    rides: Math.floor(80 * Math.pow(0.95, i)),
    stats: {
        brutal: Math.floor(Math.random() * 60) + 10,
        chunky: Math.floor(Math.random() * 40) + 10,
        champagne: Math.floor(Math.random() * 30)
    },
    rank: i + 1
}));

export function Leaderboard() {
    return (
        <div className="w-full h-full overflow-y-auto bg-[#0a0a0c] pt-24 pb-12 px-4 md:px-8 custom-scrollbar">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-tight">Gravel Legends</h2>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Earn <span className="text-slate-200 font-bold">Gravel Rocks</span> by validating brutal sectors.
                    </p>
                </div>

                <div className="space-y-2">
                    {MOCK_LEADERBOARD.map((rider, index) => (
                        <motion.div
                            key={rider.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="bg-[#161e2e]/80 backdrop-blur-md border border-white/5 rounded-lg p-3 flex items-center gap-4 hover:bg-white/5 hover:border-white/10 transition-all group"
                        >
                            {/* Rank */}
                            <div className="text-sm md:text-base font-bold text-slate-500 font-mono w-8 text-center">
                                #{rider.rank}
                            </div>

                            {/* Name & Rides */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">
                                        {rider.name}
                                    </h3>
                                    {index === 0 && <span className="material-symbols-outlined text-amber-500 text-sm">crown</span>}
                                </div>
                                <p className="text-[10px] text-slate-500">{rider.rides} Rides</p>
                            </div>

                            {/* Stats Bar (Desktop) */}
                            <div className="w-24 hidden sm:block space-y-1">
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-brutal" style={{ width: `${rider.stats.brutal}%` }} title="Brutal"></div>
                                    <div className="h-full bg-chunky" style={{ width: `${rider.stats.chunky}%` }} title="Chunky"></div>
                                    <div className="h-full bg-champagne" style={{ width: `${rider.stats.champagne}%` }} title="Champagne"></div>
                                </div>
                            </div>

                            {/* Gravel Rocks Counter */}
                            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-md border border-white/5 min-w-[100px] justify-end">
                                <span className="material-symbols-outlined text-slate-400 text-sm">landscape</span>
                                <span className="text-sm font-mono font-bold text-white">{rider.rocks.toLocaleString()}</span>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
