"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Hash, Search } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Hashing</h1>
                            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">Unit 6 • Lecture 1</p>
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
                        <Link href="/unit5/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Unit 5: Topo Sort
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Hashing & Collisions</h2>
                        <Link href="/unit6/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Tries <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The O(1) Dream" icon={Search}>
                        <p>
                            We saw that arrays provide O(1) access if we know the index. But what if we want to search for a value like <code>"Alice"</code> in O(1) time?
                        </p>
                        <p>
                            <strong>Hashing</strong> is the process of converting a given key (like a string or large number) into a smaller value (an array index) using a <strong>Hash Function</strong>.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="Hash Functions & Collisions" icon={Hash}>
                        <p>
                            A Hash Function might map "Alice" to index 5. We store her data at <code>array[5]</code>. But what if the hash function also maps "Bob" to index 5? This is called a <strong>Collision</strong>.
                        </p>
                        <h4 className="text-emerald-400 font-bold mt-4">Collision Resolution Techniques:</h4>
                        <ul className="list-disc pl-6 space-y-4 mt-2 text-slate-300">
                            <li>
                                <strong>Chaining (Open Hashing):</strong><br/>
                                Instead of storing the value directly in the array, we store a Linked List at each index. If "Alice" and "Bob" both hash to index 5, <code>array[5]</code> points to a list: <code>Alice ➔ Bob ➔ NULL</code>.
                            </li>
                            <li>
                                <strong>Open Addressing (Closed Hashing):</strong><br/>
                                If index 5 is occupied, we probe the array for the next empty slot.<br/>
                                <em>Linear Probing:</em> Check 6, then 7, then 8...<br/>
                                <em>Quadratic Probing:</em> Check 5+1², then 5+2², then 5+3²...
                            </li>
                        </ul>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
