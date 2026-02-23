"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-[100] bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent py-2 pb-3 px-4 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
                <div className="flex items-center gap-3 md:gap-4">
                    <Link href="https://gravalist.com" target="_blank" className="flex items-center gap-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-white hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-[10px] md:text-sm">terrain</span>
                        GRAVALIST
                    </Link>
                    <div className="w-px h-3 bg-white/10"></div>
                    <Link href="/privacy" className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">
                        Privacy Policy
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="hidden sm:inline text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-600 font-mono">Server Status: Nominal</span>
                </div>
            </div>
        </footer>
    );
}
