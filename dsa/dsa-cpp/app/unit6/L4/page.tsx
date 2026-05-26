"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Activity, Binary } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Icon size={20} /></span>}
            {title}
        </h3>
        <div className="text-slate-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden mb-8 my-4 shadow-xl">
        {title && (
            <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Code size={14} className="text-amber-400" />
                <span className="text-xs font-mono text-slate-300">{title}</span>
            </div>
        )}
        <div className="p-4 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Fenwick Trees (BIT)</h1>
                            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">Unit 6 • Lecture 4</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsLightMode(!isLightMode)} className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            {isLightMode ? '🌙' : '☀️'}
                        </button>
                    </div>
                </header>

                <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/unit6/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Segment Trees
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Fenwick Trees (Binary Indexed Tree)</h2>
                        <Link href="/unit6/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Disjoint Set <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="A Simpler Alternative to Segment Trees" icon={Activity}>
                        <p>
                            Like Segment Trees, a <strong>Fenwick Tree</strong> or <strong>Binary Indexed Tree (BIT)</strong> solves the Range Query + Point Update problem in O(log N) time.
                        </p>
                        <p>
                            However, Fenwick Trees use much less memory (exactly N array elements) and are much easier to implement (iterative bitwise operations instead of recursive tree traversals).
                        </p>
                    </TheoryCard>

                    <TheoryCard title="The Bitwise Magic" icon={Binary}>
                        <p>
                            A Fenwick tree relies heavily on binary representation. The key operation is isolating the <strong>last set bit</strong> of an index to determine how many elements that index is responsible for.
                        </p>
                        <div className="bg-[#0d1117] rounded-lg p-6 font-mono text-sm border border-slate-700 mt-4 text-emerald-400 text-center">
                            Isolate Last Set Bit: <code>index & (-index)</code>
                        </div>
                        <p className="mt-4 text-sm text-slate-400">
                            By adding the last set bit, we find the "parent" node to update. By subtracting the last set bit, we find the "previous range" to add for a prefix sum query.
                        </p>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
