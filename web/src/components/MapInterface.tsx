"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { SectorInfo } from './SectorInfo';
import { GarminSync } from './GarminSync';
import { Leaderboard } from './Leaderboard';
import { AuthButton } from './AuthButton';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const GravelMap = dynamic(() => import('./GravelMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#0a0a0c] flex items-center justify-center text-slate-500 font-mono text-xs uppercase tracking-[0.2em] animate-pulse">Initializing Engine...</div>
});

type View = 'map' | 'leaderboard';

export function MapInterface() {
    const [currentView, setCurrentView] = useState<View>('map');
    const [showSync, setShowSync] = useState(false);
    const [selectedSector, setSelectedSector] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Get initial user
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            subscription.unsubscribe();
        };
    }, []);

    const handleSectorClick = (id: string) => {
        setSelectedSector(id);
    };

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a0c] selection:bg-primary/30">

            {/* Dynamic Header */}
            <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pointer-events-none ${currentView === 'leaderboard' ? 'bg-[#101622]/90 backdrop-blur-md border-b border-white/5' : ''
                }`}>
                <div className="max-w-7xl mx-auto px-4 py-3 md:py-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4 bg-[#101622]/80 backdrop-blur-xl border border-white/10 p-1.5 md:p-2 pr-4 md:pr-6 rounded-2xl shadow-2xl pointer-events-auto">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.4)] transition-transform hover:scale-105 active:scale-95">
                            <span className="material-symbols-outlined text-white text-lg md:text-2xl">terrain</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xs md:text-base font-bold tracking-tight text-white leading-tight">maps.gravalist.com</h1>
                            <span className="text-[8px] md:text-[10px] text-slate-500 font-mono uppercase tracking-widest">Gravel Conditions</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">

                        <div className="bg-[#101622]/80 backdrop-blur-xl border border-white/10 p-1 md:p-1.5 px-3 md:px-4 rounded-2xl shadow-2xl flex items-center gap-4">
                            <button
                                onClick={() => setShowSync(true)}
                                className="group relative p-2 text-slate-400 hover:text-white transition-all transform hover:rotate-12"
                                title="Sync Garmin"
                            >
                                <span className="material-symbols-outlined text-xl md:text-2xl">watch</span>
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#101622]"></span>
                            </button>
                            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
                            <AuthButton />
                        </div>
                    </div>
                </div>
            </header>

            {/* Primary Map - Always Rendered but hidden if leaderboard active */}
            <div className={`absolute inset-0 transition-all duration-700 ${currentView === 'leaderboard' ? 'opacity-20 blur-xl scale-110 pointer-events-none' : 'opacity-100 blur-0 scale-100'}`}>
                <GravelMap onSectorClick={handleSectorClick} user={user} />
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 w-full h-full pointer-events-none">

                {/* DESKTOP SIDEBAR */}
                <AnimatePresence>
                    {selectedSector && !isMobile && (
                        <motion.div
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            className="absolute left-6 top-28 bottom-24 w-80 z-40"
                        >
                            <div className="max-h-full overflow-hidden pointer-events-auto">
                                <SectorInfo onClose={() => setSelectedSector(null)} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MOBILE BOTTOM SHEET */}
                <AnimatePresence>
                    {selectedSector && isMobile && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute bottom-0 left-0 right-0 z-50 pointer-events-auto"
                        >
                            <div className="max-h-[80dvh] rounded-t-[2.5rem] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.8)] bg-[#101622] border-t border-white/10 p-2">
                                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto my-3"></div>
                                <div className="overflow-y-auto max-h-[calc(80dvh-3rem)]">
                                    <SectorInfo onClose={() => setSelectedSector(null)} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LEADERBOARD VIEW */}
                <AnimatePresence>
                    {currentView === 'leaderboard' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 z-30 pointer-events-auto bg-[#0a0a0c]/40 backdrop-blur-sm pt-24 md:pt-32 pb-24 px-4 overflow-y-auto"
                        >
                            <div className="max-w-4xl mx-auto">
                                <Leaderboard />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* UNIFIED BOTTOM NAVIGATION BAR */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] pointer-events-auto">
                    <div className="bg-[#101622]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl shadow-2xl flex items-center gap-2">
                        <button
                            onClick={() => setCurrentView('map')}
                            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all duration-300 ${currentView === 'map' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-slate-500 active:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-xl">map</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden ${currentView === 'map' ? 'w-auto' : 'w-0 opacity-0'}`}>Map</span>
                        </button>
                        <button
                            onClick={() => setCurrentView('leaderboard')}
                            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all duration-300 ${currentView === 'leaderboard' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-slate-500 active:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-xl">leaderboard</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden ${currentView === 'leaderboard' ? 'w-auto' : 'w-0 opacity-0'}`}>Leaderboard</span>
                        </button>
                    </div>
                </div>

                {/* DESKTOP LEGEND / FOOTER */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none hidden md:block">
                    <Footer />
                </div>
            </div>

            {/* SYNC MODAL */}
            <AnimatePresence>
                {showSync && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={() => setShowSync(false)}></div>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl min-h-[400px] max-h-[90vh] bg-[#101622] rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col mx-4"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">watch</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white tracking-tight">Garmin Sync</h3>
                                </div>
                                <button
                                    onClick={() => setShowSync(false)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/5"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <GarminSync />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
}
