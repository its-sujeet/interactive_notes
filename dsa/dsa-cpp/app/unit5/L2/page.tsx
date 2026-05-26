"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Waves, Layers } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Breadth First Search</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 5 • Lecture 2</p>
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
                        <Link href="/unit5/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Graph Representations
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Breadth First Search (BFS)</h2>
                        <Link href="/unit5/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Depth First Search <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Ripple Effect" icon={Waves}>
                        <p>
                            Breadth First Search (BFS) is a traversal algorithm that explores vertices level by level. It starts at a source vertex, explores all its immediate neighbors, then moves to their neighbors, and so on.
                        </p>
                        <p>
                            Think of it like dropping a stone in a pond: the ripples expand outward uniformly. This makes BFS the perfect algorithm for finding the <strong>Shortest Path</strong> on an unweighted graph!
                        </p>
                    </TheoryCard>

                    <TheoryCard title="The Core Mechanic: Queue + Visited Array" icon={Layers}>
                        <p>
                            Because graphs can have cycles (unlike trees), we must maintain a <code>visited</code> boolean array so we don't get trapped in an infinite loop. We also use a <strong>Queue</strong> to keep track of the next vertices to process.
                        </p>
                        <div className="bg-[#0d1117] rounded-lg p-6 font-mono text-sm border border-slate-700 mt-4 text-emerald-400">
                            1. Push source to Queue, mark as Visited.<br/>
                            2. While Queue is not empty:<br/>
                            &nbsp;&nbsp;&nbsp;a. Pop vertex <code>v</code> from Queue.<br/>
                            &nbsp;&nbsp;&nbsp;b. For every neighbor of <code>v</code>:<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If not visited: Mark visited, Push to Queue.
                        </div>
                    </TheoryCard>

                    <CodeBlock 
                        title="BFS.cpp"
                        code={`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int source, vector<int> adj[], int V) {
    bool visited[V] = {false};
    queue<int> q;
    
    // Start with the source node
    visited[source] = true;
    q.push(source);
    
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        cout << curr << " ";
        
        // Traverse all neighbors
        for (int neighbor : adj[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`}
                    />

                </main>
            </div>
        </div>
    );
}
