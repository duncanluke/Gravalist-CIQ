"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-[100] bg-gradient-to-t from-[#0a0a0c] to-transparent py-4 px-6 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
                <div className="flex items-center gap-4">
                    <Link href="/privacy" className="text-[9px] uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">
                        Privacy
                    </Link>
                    <Link href="/terms" className="text-[9px] uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">
                        Terms
                    </Link>
                </div>

                <div className="hidden sm:flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-slate-600 font-mono">Server Status: Nominal</span>
                </div>

                <span className="text-[9px] uppercase tracking-[0.2em] text-slate-600 font-mono">v1.0.4-beta</span>
            </div>
        </footer>
    );
}
