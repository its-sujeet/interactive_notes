"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, ListOrdered, GitMerge } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Icon size={20} /></span>}
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
                <Code size={14} className="text-purple-400" />
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Topological Sorting</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 5 • Lecture 6</p>
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
                        <Link href="/unit5/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Minimum Spanning Tree
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Topological Sorting</h2>
                        <Link href="/unit6/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Unit 6: Advanced Topics <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Dependencies and Orders" icon={ListOrdered}>
                        <p>
                            Imagine you're taking university courses. Course B requires Course A as a prerequisite. You <strong>must</strong> take A before B.
                        </p>
                        <p>
                            A <strong>Directed Acyclic Graph (DAG)</strong> perfectly models this. Topological Sorting is a linear ordering of vertices such that for every directed edge <code>U ➔ V</code>, vertex <code>U</code> comes before <code>V</code> in the ordering.
                        </p>
                        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg border border-red-500/30 mt-4 text-sm font-bold">
                            Important: Topological Sort is ONLY possible for Directed Acyclic Graphs (DAGs). If there is a cycle, you have a deadlock (A requires B, B requires A), and no ordering is possible!
                        </div>
                    </TheoryCard>

                    <TheoryCard title="Kahn's Algorithm (BFS based)" icon={GitMerge}>
                        <p>
                            Kahn's algorithm uses the concept of <strong>In-Degree</strong> (the number of incoming edges to a vertex).
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-300 text-sm">
                            <li>Compute the in-degree of all vertices.</li>
                            <li>Push all vertices with <strong>in-degree 0</strong> into a Queue. (These are courses with no prerequisites!).</li>
                            <li>While Queue is not empty:
                                <ul className="list-circle pl-6 mt-2 text-slate-400">
                                    <li>Pop a vertex <code>u</code> and add it to the topological order array.</li>
                                    <li>For every neighbor <code>v</code> of <code>u</code>, decrement its in-degree by 1. (We completed a prerequisite!).</li>
                                    <li>If <code>v</code>'s in-degree becomes 0, push <code>v</code> into the Queue.</li>
                                </ul>
                            </li>
                        </ul>
                    </TheoryCard>

                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Unit 5 Complete!</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            You have mastered Graphs! From representing networks, exploring them via BFS and DFS, finding the shortest path with Dijkstra, connecting networks cheaply with MSTs, to scheduling tasks with Topological Sort. It's time for the final frontier: <strong>Unit 6: Advanced Topics</strong>.
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
