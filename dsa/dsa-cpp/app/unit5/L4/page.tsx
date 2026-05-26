"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Navigation } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Dijkstra's Algorithm</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 5 • Lecture 4</p>
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
                        <Link href="/unit5/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Depth First Search
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Shortest Path (Dijkstra)</h2>
                        <Link href="/unit5/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Minimum Spanning Tree <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Problem" icon={Navigation}>
                        <p>
                            BFS can find the shortest path in an <strong>unweighted</strong> graph. But what if the edges have different weights (e.g., distance between cities, traffic delay)?
                        </p>
                        <p>
                            Enter <strong>Dijkstra's Algorithm</strong>. It finds the shortest path from a single source node to all other nodes in a graph with <strong>non-negative</strong> edge weights.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="How it Works (Greedy Approach)" icon={Database}>
                        <p>
                            Dijkstra's is a Greedy Algorithm. It maintains a set of nodes whose shortest distance from the source is already known.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
                            <li>Create a <code>dist[]</code> array, initialize all distances to Infinity, except <code>dist[source] = 0</code>.</li>
                            <li>Use a <strong>Priority Queue (Min-Heap)</strong> to repeatedly pick the node with the minimum distance.</li>
                            <li>For the picked node <code>u</code>, look at all its neighbors <code>v</code>.</li>
                            <li><strong>Relaxation:</strong> If <code>dist[u] + weight(u, v) &lt; dist[v]</code>, update <code>dist[v]</code> and push <code>v</code> to the priority queue.</li>
                        </ul>
                    </TheoryCard>

                    <CodeBlock 
                        title="Dijkstra.cpp"
                        code={`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii; // {distance, vertex}

void dijkstra(int source, vector<pii> adj[], int V) {
    // 1. Initialize distances to Infinity
    vector<int> dist(V, 1e9);
    dist[source] = 0;
    
    // 2. Min-Heap Priority Queue: stores {distance, vertex}
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, source});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        int d = pq.top().first;
        pq.pop();
        
        // Skip if we already found a shorter path
        if (d > dist[u]) continue;
        
        // 3. Relax all neighbors
        for (auto edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    // Print shortest distances
    for (int i = 0; i < V; i++) {
        cout << "Node " << i << " Distance: " << dist[i] << "\n";
    }
}`}
                    />

                </main>
            </div>
        </div>
    );
}
