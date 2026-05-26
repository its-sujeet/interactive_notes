"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                {/* HEADER */}
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Advanced Loops</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 2</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsLightMode(!isLightMode)} className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            {isLightMode ? '🌙' : '☀️'}
                        </button>
                    </div>
                </header>

                <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/unit2/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Previous
                        </Link>
                        <h2 className="text-xl font-bold text-white">Advanced Loops</h2>
                        <Link href="/unit2/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Next <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-8">
                        <h3 className="text-lg font-bold text-white mb-4">Syllabus Topics</h3>
                        <ul className="list-disc list-inside text-slate-300 space-y-2">
                            <li>Working with do-while loop and for-each loop</li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                        <p>Content generation pending. (Theory and Interactives will be generated in upcoming phases).</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
