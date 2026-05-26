"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Blocks, Activity } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Segment Trees</h1>
                            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">Unit 6 • Lecture 3</p>
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
                        <Link href="/unit6/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Tries
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Segment Trees</h2>
                        <Link href="/unit6/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Fenwick Trees <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Range Query Problem" icon={Activity}>
                        <p>
                            Imagine you have an array: <code>[1, 3, 5, 7, 9, 11]</code>.
                        </p>
                        <p>
                            You want to answer queries like "What is the sum of elements from index 2 to 5?"
                            Doing this naively takes <strong>O(N)</strong> per query. If we pre-compute a Prefix Sum array, it takes <strong>O(1)</strong>.
                        </p>
                        <p className="text-rose-400 font-bold">
                            But what if the array elements change? (Point Updates)
                        </p>
                        <p>
                            If you update an element, the Prefix Sum array takes <strong>O(N)</strong> to update!
                        </p>
                    </TheoryCard>

                    <TheoryCard title="The Solution: Segment Tree" icon={Blocks}>
                        <p>
                            A Segment Tree allows us to perform both Range Queries (e.g., Sum, Min, Max in a range) and Point Updates in <strong>O(log N)</strong> time.
                        </p>
                        <p>
                            It is a binary tree where:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-300">
                            <li>The <strong>Leaf Nodes</strong> represent the individual elements of the array.</li>
                            <li>The <strong>Internal Nodes</strong> represent the combined result (e.g., sum) of its children, covering a "segment" or range of the array.</li>
                            <li>The <strong>Root Node</strong> represents the result for the entire array (range 0 to N-1).</li>
                        </ul>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
