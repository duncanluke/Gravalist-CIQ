"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingProps {
    onClose: () => void;
}

export function Onboarding({ onClose }: OnboardingProps) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="flex flex-col h-full bg-[#101622] text-white">
            <AnimatePresence mode="wait">
                {currentStep === 0 ? (
                    <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col p-6 md:p-10 flex-1"
                    >
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 mx-auto bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
                                <span className="material-symbols-outlined text-4xl text-primary">
                                    radar
                                </span>
                            </div>

                            <div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-2 block">
                                    Global Gravel Engine
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                                    Map the Unmapped
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-4">
                                    Connect Garmin IQ to passively collect and view the latest peer-validated gravel conditions.
                                </p>
                            </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex justify-center gap-2 mb-8 mt-4">
                            <div className="h-1 rounded-full w-8 bg-primary transition-all duration-500" />
                            <div className="h-1 rounded-full w-2 bg-white/10 transition-all duration-500" />
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(13,89,242,0.3)] flex items-center justify-center gap-2 group"
                            >
                                <span>NEXT</span>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Skip Guide
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col flex-1 p-6 md:p-8"
                    >
                        {/* Summary View Similar to GarminSync */}
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="relative mx-auto flex flex-col items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-[#161e2e] border border-primary/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.15)] z-10">
                                    <span className="material-symbols-outlined text-3xl text-primary">watch</span>
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
                                    Add the Garmin IQ App to your device and we'll passively collect the latest gravel conditions from your rides.
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

                        {/* Progress Indicators */}
                        <div className="flex justify-center gap-2 mb-8 mt-auto">
                            <div className="h-1 rounded-full w-2 bg-white/10 transition-all duration-500" />
                            <div className="h-1 rounded-full w-8 bg-primary transition-all duration-500" />
                        </div>

                        <div className="space-y-3">
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
                            <button
                                onClick={onClose}
                                className="w-full py-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Continue to Map
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
