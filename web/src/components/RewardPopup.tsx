"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RewardPopupProps {
    onClose: () => void;
}

export function RewardPopup({ onClose }: RewardPopupProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <div className="bg-[#161e2e] border border-primary/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">emoji_events</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Ride Validated!</h2>
                <p className="text-slate-400 mb-8 text-sm">
                    Your surface data has been added to the global map. You earned <span className="text-white font-bold">120 Gravel Rocks</span>.
                </p>
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                >
                    COLLECT ROCKS
                </button>
            </div>
        </motion.div>
    );
}
