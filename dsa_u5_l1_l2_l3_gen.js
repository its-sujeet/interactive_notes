const fs = require('fs');

const content1 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Share2 } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Introduction to Graphs</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 5 • Lecture 1</p>
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
                        <Link href="/unit4/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Unit 4: Heaps
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Graphs & Representations</h2>
                        <Link href="/unit5/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Breadth First Search <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="What is a Graph?" icon={Share2}>
                        <p>
                            A Graph is a non-linear data structure consisting of a set of <strong>Vertices (or Nodes)</strong> and a set of <strong>Edges</strong> that connect these vertices.
                        </p>
                        <p>
                            Unlike Trees (which are technically a restricted type of graph), graphs can have cycles, multiple paths between nodes, and unconnected components. They are used to model real-world networks like the Internet, Social Networks, Maps, and more.
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-300">
                            <li><strong>Directed Graph:</strong> Edges have a direction (one-way street, e.g., Twitter followers).</li>
                            <li><strong>Undirected Graph:</strong> Edges have no direction (two-way street, e.g., Facebook friends).</li>
                            <li><strong>Weighted Graph:</strong> Edges have a weight or cost associated with them (e.g., Distance between cities).</li>
                        </ul>
                    </TheoryCard>

                    <TheoryCard title="Representation 1: Adjacency Matrix" icon={Database}>
                        <p>
                            An Adjacency Matrix is a 2D array of size <code>V x V</code> (where V is the number of vertices). If there is an edge from vertex <code>i</code> to vertex <code>j</code>, then <code>matrix[i][j] = 1</code>. Otherwise, it is 0.
                        </p>
                        <CodeBlock 
                            title="GraphMatrix.cpp"
                            code={\`#include <iostream>
using namespace std;

int main() {
    int V = 4;
    int matrix[V][V] = {0}; // Initialize all to 0
    
    // Add edge between 0 and 1
    matrix[0][1] = 1;
    matrix[1][0] = 1; // Since it's undirected
    
    return 0;
}\`}
                        />
                        <p className="text-red-400 font-bold mt-2">Space Complexity: O(V²). Not good for sparse graphs!</p>
                    </TheoryCard>

                    <TheoryCard title="Representation 2: Adjacency List" icon={Database}>
                        <p>
                            An Adjacency List uses an array of Linked Lists (or dynamic arrays like <code>std::vector</code> in C++). For every vertex, we store a list of all vertices it connects to.
                        </p>
                        <CodeBlock 
                            title="GraphList.cpp"
                            code={\`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int V = 4;
    vector<int> adj[V]; // Array of vectors
    
    // Add edge between 0 and 1
    adj[0].push_back(1);
    adj[1].push_back(0); // Since it's undirected
    
    return 0;
}\`}
                        />
                        <p className="text-emerald-400 font-bold mt-2">Space Complexity: O(V + E). Excellent for sparse graphs!</p>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
`;

const content2 = `"use client";
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
                        code={\`#include <iostream>
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
}\`}
                    />

                </main>
            </div>
        </div>
    );
}
`;

const content3 = `"use client";
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
                            code={\`#include <iostream>
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
}\`}
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
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit5/L1/page.tsx', content1);
fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit5/L2/page.tsx', content2);
fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit5/L3/page.tsx', content3);
console.log("DSA Unit 5 Lectures 1, 2, 3 Generation Complete.");
