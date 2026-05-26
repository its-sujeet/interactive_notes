"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, MousePointer2, Layers } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Depth First Search</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 5 • Lecture 3</p>
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
                        <Link href="/unit5/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Breadth First Search
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Depth First Search (DFS)</h2>
                        <Link href="/unit5/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Shortest Path (Dijkstra) <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Going Deep" icon={MousePointer2}>
                        <p>
                            Depth First Search (DFS) explores as far as possible along each branch before backtracking. It dives deep into the graph, only retreating when it hits a dead end.
                        </p>
                        <p>
                            Think of navigating a maze: you pick a path and follow it until you hit a wall, then you backtrack to the last intersection and try the other path.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="The Core Mechanic: Recursion (or Stack)" icon={Layers}>
                        <p>
                            DFS naturally maps to the Call Stack via recursion. Just like BFS, we must maintain a <code>visited</code> array to prevent infinite loops from cycles.
                        </p>
                        <CodeBlock 
                            title="DFS.cpp"
                            code={`#include <iostream>
#include <vector>
using namespace std;

// Recursive helper function
void dfsRecursive(int curr, vector<int> adj[], bool visited[]) {
    // 1. Mark current node as visited
    visited[curr] = true;
    cout << curr << " ";
    
    // 2. Recursively visit all unvisited neighbors
    for (int neighbor : adj[curr]) {
        if (!visited[neighbor]) {
            dfsRecursive(neighbor, adj, visited);
        }
    }
}

void dfs(int source, vector<int> adj[], int V) {
    bool visited[V] = {false};
    dfsRecursive(source, adj, visited);
}`}
                        />
                    </TheoryCard>

                    <TheoryCard title="When to use BFS vs DFS?" icon={Code}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-emerald-400 font-bold text-lg mb-2">Use BFS when:</h4>
                                <ul className="list-disc pl-4 text-sm space-y-2">
                                    <li>You need to find the shortest path on an unweighted graph.</li>
                                    <li>The target node is likely close to the source.</li>
                                    <li>The tree/graph is very deep but not very wide.</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-rose-400 font-bold text-lg mb-2">Use DFS when:</h4>
                                <ul className="list-disc pl-4 text-sm space-y-2">
                                    <li>You need to search the entire graph (e.g., finding connected components).</li>
                                    <li>You need to detect cycles or do topological sorting.</li>
                                    <li>The tree is very wide but not very deep (saves memory compared to queue).</li>
                                </ul>
                            </div>
                        </div>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
