"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#101622] text-slate-300 font-sans selection:bg-primary/30 py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(13,89,242,0.3)]">
                        <span className="material-symbols-outlined text-white text-2xl">gavel</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Terms of Service & Privacy</h1>
                    <p className="text-sm text-slate-500 font-mono">LAST UPDATED: FEBRUARY 21, 2026</p>
                </motion.div>

                <div className="space-y-10 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            1. Data Collection
                        </h2>
                        <p>
                            Gravalist collects telemetry data from your Garmin Connect IQ device, including GPS coordinates,
                            IMU (vibration) scores, speed, gradient, and bike profile information. This data is used solely
                            to generate the community gravel quality map and leaderboards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            2. Privacy & Data Integrity
                        </h2>
                        <p className="mb-4">
                            We respect your privacy. <strong className="text-white">Gravalist does not and will never sell your personal ride data or location history to third-party advertisers or data brokers.</strong>
                        </p>
                        <p>
                            Your data is stored securely and processed anonymously when displayed on the global map.
                            We are not responsible for any technical failures, data loss, or corruption that may occur
                            during synchronization between your device and our servers.
                        </p>
                    </section>

                    <section className="bg-red-500/5 border border-red-500/20 p-8 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                            3. Assumption of Risk & Liability
                        </h2>
                        <p className="mb-4 font-bold text-slate-200">
                            Gravel cycling and off-road exploration are inherently dangerous activities.
                        </p>
                        <p className="mb-4">
                            Gravalist provides data visualizations based on user-contributed content. We do not certify the
                            safety or rideability of any route, sector, or trail. Conditions change due to weather, logging,
                            erosion, and other factors.
                        </p>
                        <p className="text-white font-bold italic">
                            By using this service, you agree that you are solely responsible for your own safety.
                            Gravalist and its developers accept NO liability for injury, death, property damage,
                            or any other loss incurred while following data provided on this platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            4. Community Conduct
                        </h2>
                        <p>
                            Users must respect local laws, private property, and trail closures. Do not trespass to
                            collect "Gravel Rocks" or validate sectors.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-6">
                        <p className="text-xs text-slate-500 text-center">
                            Questions? Contact us at <span className="text-primary">legal@gravalist.com</span>
                        </p>
                        <a
                            href="/"
                            className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full text-white text-sm font-bold transition-all border border-white/10"
                        >
                            RETURN TO DASHBOARD
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
