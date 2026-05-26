"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Triangle } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-rose-500/10 text-rose-400 rounded-lg"><Icon size={20} /></span>}
            {title}
        </h3>
        <div className="text-slate-300 leading-relaxed space-y-4">
            {children}
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Heaps & Priority Queues</h1>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">Unit 4 • Lecture 6</p>
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
                        <Link href="/unit4/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> AVL Trees
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Heaps & Priority Queues</h2>
                        <Link href="/unit5/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Unit 5: Graphs <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="What is a Priority Queue?" icon={Database}>
                        <p>
                            A standard Queue operates on First-In-First-Out (FIFO). A <strong>Priority Queue</strong> is an extension where each element has a "priority". Elements with higher priority are dequeued before elements with lower priority.
                        </p>
                        <p>
                            If we use an Array or Linked List, insertion takes O(1) but finding the highest priority takes O(N). Or, keeping it sorted takes O(N) insertion.
                        </p>
                        <p className="text-emerald-400 font-bold">
                            Heaps allow us to do both Insertion and finding Highest Priority in O(log N)!
                        </p>
                    </TheoryCard>

                    <TheoryCard title="What is a Heap?" icon={Triangle}>
                        <p>
                            A Heap is a special Tree-based data structure that satisfies two properties:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-300">
                            <li><strong>Complete Binary Tree:</strong> All levels are completely filled except possibly the last level, which is filled from left to right. This means we can efficiently represent it as an Array!</li>
                            <li><strong>Heap Property:</strong><br/>
                                - <em>Max-Heap:</em> The parent is always &gt;= its children (Root is the absolute maximum).<br/>
                                - <em>Min-Heap:</em> The parent is always &lt;= its children (Root is the absolute minimum).
                            </li>
                        </ul>
                    </TheoryCard>

                    <TheoryCard title="Array Representation of Heaps" icon={Code}>
                        <p>
                            Because heaps are Complete Binary Trees, we don't need Node structs and pointers! We just use a flat array.
                        </p>
                        <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg mt-4 font-mono text-sm space-y-2 text-center">
                            <p className="text-rose-400">For a node at index <code>i</code>:</p>
                            <p className="text-slate-300">Left Child is at: <code>2 * i + 1</code></p>
                            <p className="text-slate-300">Right Child is at: <code>2 * i + 2</code></p>
                            <p className="text-slate-300">Parent is at: <code>(i - 1) / 2</code></p>
                        </div>
                    </TheoryCard>

                    <div className="bg-rose-900/20 border border-rose-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Unit 4 Complete!</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            You've officially conquered hierarchical data structures! You learned tree traversals, the ultra-fast Binary Search Tree, self-balancing AVL trees to fix worst-case scenarios, and Heaps for Priority Queues. It's time to generalize everything into networks in <strong>Unit 5: Graphs</strong>.
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
