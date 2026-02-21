"use client";

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SectorInfo } from './SectorInfo';
import { GarminSync } from './GarminSync';
import { RewardPopup } from './RewardPopup';
import { Leaderboard } from './Leaderboard';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const GravelMap = dynamic(() => import('./GravelMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#0a0a0c] flex items-center justify-center text-slate-500">Initializing Map Engine...</div>
});

type View = 'map' | 'leaderboard';

export function MapInterface() {
    const [currentView, setCurrentView] = useState<View>('map');
    const [showSync, setShowSync] = useState(false);
    const [selectedSector, setSelectedSector] = useState<string | null>(null);
    const [isRiding, setIsRiding] = useState(false);
    const [showReward, setShowReward] = useState(false);

    // Simulate map interaction
    const handleSectorClick = (id: string) => {
        setSelectedSector(id);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0c]">
            {/* Top Navigation */}
            <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-b from-[#101622] to-transparent pointer-events-none">
                <div className="flex items-center gap-8 pointer-events-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(13,89,242,0.5)]">
                            <span className="material-symbols-outlined text-white text-lg md:text-2xl">terrain</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white hidden sm:block">maps.gravalist.com</h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setCurrentView('map')}
                            className={`text-sm font-medium transition-colors ${currentView === 'map' ? 'text-primary border-b-2 border-primary pb-1' : 'text-white hover:text-primary'}`}
                        >
                            Explorer
                        </button>
                        <button
                            onClick={() => setCurrentView('leaderboard')}
                            className={`text-sm font-medium transition-colors ${currentView === 'leaderboard' ? 'text-primary border-b-2 border-primary pb-1' : 'text-white hover:text-primary'}`}
                        >
                            Leaderboard
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
                    <button
                        onClick={() => setShowSync(true)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-2 md:px-4 rounded-lg text-xs font-bold transition-all"
                    >
                        <span className="material-symbols-outlined text-sm md:text-base">watch</span>
                        <span className="hidden sm:inline">SYNC DEVICE</span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 md:border-l md:border-white/10">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-bold text-white">rider@gravalist.com</p>
                            <p className="text-[10px] text-slate-400">Pro Scout</p>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 shadow-lg">
                            <span className="material-symbols-outlined text-slate-300">person</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            {currentView === 'map' ? (
                <>
                    {/* Desktop Left Sidebar (Search & Legend & Sector Info) */}
                    <div className="hidden md:flex absolute left-4 top-24 bottom-8 w-64 flex-col gap-4 pointer-events-none z-30">

                        {/* Search Box */}
                        <div className="pointer-events-auto bg-[#161e2e]/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl shrink-0">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-sm">search</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search area"
                                    className="w-full bg-black/20 border border-white/5 rounded-lg py-2 pl-9 pr-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Sector Info (Fills space when active) */}
                        <AnimatePresence mode="wait">
                            {selectedSector && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex-1 min-h-0 pointer-events-auto"
                                >
                                    <SectorInfo onClose={() => setSelectedSector(null)} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Search Bar (Top) */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[92%] z-30 pointer-events-auto md:hidden">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search area"
                                className="w-full bg-[#161e2e]/80 backdrop-blur-xl border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Real Map Implementation */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        <GravelMap onSectorClick={handleSectorClick} />
                    </div>

                    {/* Mobile Sector Popup */}
                    <AnimatePresence>
                        {selectedSector && (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                className="absolute bottom-0 left-0 right-0 z-50 md:hidden p-4"
                            >
                                <div className="max-h-[60vh] overflow-hidden rounded-xl shadow-2xl">
                                    <SectorInfo onClose={() => setSelectedSector(null)} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Map Controls (Right Side) */}
                    <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
                        <div className="bg-[#161e2e]/90 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col gap-2 shadow-xl">
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <div className="h-px bg-white/10 w-full"></div>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                        </div>
                        <button className="w-14 h-14 bg-[#161e2e]/90 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-xl hover:bg-white/10 transition-colors text-primary hidden md:flex">
                            <span className="material-symbols-outlined">near_me</span>
                        </button>
                        <button className="w-14 h-14 bg-[#161e2e]/90 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white hidden md:flex">
                            <span className="material-symbols-outlined">layers</span>
                        </button>

                        {/* Compact Legend */}
                        <div className="bg-[#161e2e]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col gap-3 shadow-xl hidden md:flex items-center">
                            <div className="w-3 h-3 rounded-full bg-brutal shadow-[0_0_8px_#ef4444]" title="Brutal"></div>
                            <div className="w-3 h-3 rounded-full bg-chunky shadow-[0_0_8px_#f59e0b]" title="Chunky"></div>
                            <div className="w-3 h-3 rounded-full bg-champagne shadow-[0_0_8px_#10b981]" title="Champagne"></div>
                        </div>
                    </div>

                    {/* Mobile Legend (Bottom) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] md:hidden">
                        <div className="flex items-center justify-between gap-3 bg-[#161e2e]/90 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl overflow-x-auto">
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-brutal shadow-[0_0_8px_#ef4444]"></div>
                                <span className="text-[10px] font-bold text-slate-300">BRUTAL</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-chunky shadow-[0_0_8px_#f59e0b]"></div>
                                <span className="text-[10px] font-bold text-slate-300">CHUNKY</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-champagne shadow-[0_0_8px_#10b981]"></div>
                                <span className="text-[10px] font-bold text-slate-300">CHAMPAGNE</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Leaderboard />
            )}

            <AnimatePresence>
                {showReward && (
                    <RewardPopup onClose={() => setShowReward(false)} />
                )}
            </AnimatePresence>

            {showSync && (
                <div className="absolute inset-0 z-50">
                    <button
                        onClick={() => setShowSync(false)}
                        className="absolute top-6 right-6 z-[60] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <GarminSync />
                </div>
            )}
        </div>
    );
}
