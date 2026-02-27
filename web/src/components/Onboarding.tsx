"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingProps {
    onClose: () => void;
}

const steps = [
    {
        title: "Global Gravel Engine",
        subtitle: "PASSIVE TERRAIN ANALYSIS",
        description: "Transform your Garmin into a surface-sensing unit. Gravalist analyzes micro-vibrations to classify terrain quality in real-time while you ride.",
        icon: "radar",
        color: "text-primary"
    },
    {
        title: "Ride & Contribute",
        subtitle: "AUTOMATIC DATA SYNC",
        description: "Your rides automatically contribute to the global maps. Every kilometer you record helps the community build a real-time atlas of gravel conditions.",
        icon: "auto_awesome",
        color: "text-emerald-500"
    },
    {
        title: "Community Wisdom",
        subtitle: "DYNAMIC SECTOR INSIGHTS",
        description: "Drop community notes to warn about corrugations, sand patches, or seasonal changes. Local knowledge, shared globally.",
        icon: "edit_note",
        color: "text-amber-500"
    },
    {
        title: "Plan Adventures",
        subtitle: "EXPLORATION ENGINE",
        description: "Use the map to discover premium champagne gravel or avoid brutal washboards. Plan your next route with confidence using peer-validated data.",
        icon: "explore",
        color: "text-rose-500"
    }
];

export function Onboarding({ onClose }: OnboardingProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#101622] text-white p-6 md:p-10">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="space-y-6 max-w-sm"
                    >
                        <div className={`w-20 h-20 mx-auto bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl`}>
                            <span className={`material-symbols-outlined text-4xl ${steps[currentStep].color}`}>
                                {steps[currentStep].icon}
                            </span>
                        </div>

                        <div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-2 block">
                                {steps[currentStep].subtitle}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                                {steps[currentStep].title}
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {steps[currentStep].description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="flex gap-2">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-primary' : 'w-2 bg-white/10'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-8 space-y-4">
                {currentStep === steps.length - 1 ? (
                    <div className="space-y-3 w-full">
                        <a
                            href="https://apps.garmin.com/en-US/apps/7014cfeb-226e-4d97-bc68-c59631f66c56"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
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
                ) : (
                    <button
                        onClick={nextStep}
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(13,89,242,0.3)] flex items-center justify-center gap-2 group"
                    >
                        <span>NEXT</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </button>
                )}

                {currentStep < steps.length - 1 && (
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Skip Guide
                    </button>
                )}
            </div>
        </div>
    );
}
