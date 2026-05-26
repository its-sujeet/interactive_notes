"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Network, Share2 } from 'lucide-react';

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

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Minimum Spanning Tree</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 5 • Lecture 5</p>
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
                        <Link href="/unit5/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Dijkstra
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Minimum Spanning Tree (MST)</h2>
                        <Link href="/unit5/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Topological Sorting <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="What is a Spanning Tree?" icon={Share2}>
                        <p>
                            Given a connected, undirected graph, a <strong>Spanning Tree</strong> is a subgraph that is a tree (no cycles) and connects all the vertices together.
                        </p>
                        <p>
                            A single graph can have many spanning trees. A <strong>Minimum Spanning Tree (MST)</strong> is the spanning tree where the sum of the edge weights is as small as possible.
                        </p>
                        <p className="text-sm text-slate-400 mt-2">Real-world use case: Laying down a network of fiber optic cables to connect all cities with the minimum total length of cable.</p>
                    </TheoryCard>

                    <TheoryCard title="Algorithm 1: Prim's Algorithm" icon={Network}>
                        <p>
                            Similar to Dijkstra's. We start with a single node, and greedily add the cheapest edge that connects a node in our growing MST to a node outside of it.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300 text-sm">
                            <li>Maintain a <code>visited</code> array (to track nodes in the MST).</li>
                            <li>Use a Min-Heap (Priority Queue) to store edges <code>{'{weight, vertex}'}</code>.</li>
                            <li>Start at any node, push its edges to the heap.</li>
                            <li>Pop the minimum edge. If the target vertex is not visited, add the edge to MST, mark vertex visited, and push all its edges to the heap.</li>
                        </ul>
                    </TheoryCard>

                    <TheoryCard title="Algorithm 2: Kruskal's Algorithm" icon={Network}>
                        <p>
                            Kruskal's takes a global approach instead of growing from a single node.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300 text-sm">
                            <li>Sort all edges in the graph in ascending order of their weights.</li>
                            <li>Iterate through the sorted edges.</li>
                            <li>Add the edge to the MST <strong>only if it doesn't form a cycle</strong> with the edges already added.</li>
                            <li>We use the <strong>Disjoint Set (Union-Find)</strong> data structure (Unit 6) to efficiently check for cycles!</li>
                        </ul>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
