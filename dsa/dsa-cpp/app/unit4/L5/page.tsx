"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Activity, Scale } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">AVL Trees</h1>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">Unit 4 • Lecture 5</p>
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
                        <Link href="/unit4/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> BST Insert/Delete
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">AVL Trees (Self-Balancing)</h2>
                        <Link href="/unit4/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Heaps <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Problem with BSTs" icon={Activity}>
                        <p>
                            What happens if you insert already sorted data into a standard BST? (e.g., 10, 20, 30, 40)
                        </p>
                        <p>
                            The tree becomes a "skewed" tree, essentially degrading into a Linked List! The time complexity of search drops from <strong>O(log N)</strong> to <strong>O(N)</strong>.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="The AVL Solution" icon={Scale}>
                        <p>
                            An <strong>AVL Tree</strong> is a self-balancing Binary Search Tree. It ensures that the tree never becomes skewed.
                        </p>
                        <p>
                            <strong>Balance Factor Property:</strong> For every node in an AVL tree, the difference in height between its left subtree and right subtree cannot be more than 1.
                        </p>
                        <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm border border-slate-700 mt-4 text-center text-emerald-400">
                            Balance Factor = Height(LeftSubtree) - Height(RightSubtree)<br/>
                            Allowed Values: -1, 0, +1
                        </div>
                    </TheoryCard>

                    <TheoryCard title="Tree Rotations" icon={Scale}>
                        <p>
                            If an insertion or deletion violates the Balance Factor property, the AVL tree performs a <strong>Rotation</strong> to rebalance itself while maintaining the BST properties.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg">
                                <h4 className="font-bold text-rose-400">Left-Left (LL) Case</h4>
                                <p className="text-sm mt-2">Requires a <strong>Right Rotation</strong>.</p>
                            </div>
                            <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg">
                                <h4 className="font-bold text-blue-400">Right-Right (RR) Case</h4>
                                <p className="text-sm mt-2">Requires a <strong>Left Rotation</strong>.</p>
                            </div>
                            <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg">
                                <h4 className="font-bold text-emerald-400">Left-Right (LR) Case</h4>
                                <p className="text-sm mt-2">Requires <strong>Left Rotation</strong> then <strong>Right Rotation</strong>.</p>
                            </div>
                            <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg">
                                <h4 className="font-bold text-orange-400">Right-Left (RL) Case</h4>
                                <p className="text-sm mt-2">Requires <strong>Right Rotation</strong> then <strong>Left Rotation</strong>.</p>
                            </div>
                        </div>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
