const fs = require('fs');

const content4 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Activity, Binary } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Fenwick Trees (BIT)</h1>
                            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">Unit 6 • Lecture 4</p>
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
                        <Link href="/unit6/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Segment Trees
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Fenwick Trees (Binary Indexed Tree)</h2>
                        <Link href="/unit6/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Disjoint Set <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="A Simpler Alternative to Segment Trees" icon={Activity}>
                        <p>
                            Like Segment Trees, a <strong>Fenwick Tree</strong> or <strong>Binary Indexed Tree (BIT)</strong> solves the Range Query + Point Update problem in O(log N) time.
                        </p>
                        <p>
                            However, Fenwick Trees use much less memory (exactly N array elements) and are much easier to implement (iterative bitwise operations instead of recursive tree traversals).
                        </p>
                    </TheoryCard>

                    <TheoryCard title="The Bitwise Magic" icon={Binary}>
                        <p>
                            A Fenwick tree relies heavily on binary representation. The key operation is isolating the <strong>last set bit</strong> of an index to determine how many elements that index is responsible for.
                        </p>
                        <div className="bg-[#0d1117] rounded-lg p-6 font-mono text-sm border border-slate-700 mt-4 text-emerald-400 text-center">
                            Isolate Last Set Bit: <code>index & (-index)</code>
                        </div>
                        <p className="mt-4 text-sm text-slate-400">
                            By adding the last set bit, we find the "parent" node to update. By subtracting the last set bit, we find the "previous range" to add for a prefix sum query.
                        </p>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
`;

const content5 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Component, Merge } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Disjoint Set (Union-Find)</h1>
                            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">Unit 6 • Lecture 5</p>
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
                        <Link href="/unit6/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Fenwick Trees
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Disjoint Set (Union-Find)</h2>
                        <Link href="/unit6/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Dynamic Programming <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Connectivity Problem" icon={Component}>
                        <p>
                            Imagine a network of computers. Sometimes new connections are added. You need to answer quickly: "Are computer A and computer B connected (even indirectly)?"
                        </p>
                        <p>
                            A <strong>Disjoint Set</strong> (also known as Union-Find) data structure perfectly solves this. It keeps track of a set of elements partitioned into non-overlapping (disjoint) subsets.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="Core Operations" icon={Merge}>
                        <ul className="list-disc pl-6 space-y-4 text-slate-300">
                            <li>
                                <strong>Find(x):</strong> Determine which subset element 'x' belongs to. This is usually done by finding the "representative" or "root" of the subset.
                            </li>
                            <li>
                                <strong>Union(x, y):</strong> Merge the subsets containing 'x' and 'y' into a single subset.
                            </li>
                        </ul>
                        <p className="mt-4 text-emerald-400 font-bold">
                            With Path Compression and Union by Rank, these operations run in nearly O(1) time—specifically O(α(N)), the inverse Ackermann function.
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="UnionFind.cpp"
                        code={\`class DisjointSet {
    vector<int> parent, rank;
public:
    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for(int i=0; i<n; i++) parent[i] = i;
    }
    
    // Find with Path Compression
    int findUPar(int node) {
        if(node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]); 
    }
    
    // Union by Rank
    void unionByRank(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if(ulp_u == ulp_v) return;
        
        if(rank[ulp_u] < rank[ulp_v]) {
            parent[ulp_u] = ulp_v;
        } else if(rank[ulp_v] < rank[ulp_u]) {
            parent[ulp_v] = ulp_u;
        } else {
            parent[ulp_v] = ulp_u;
            rank[ulp_u]++;
        }
    }
};\`}
                    />

                </main>
            </div>
        </div>
    );
}
`;

const content6 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Brain, Target } from 'lucide-react';

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

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Dynamic Programming</h1>
                            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">Unit 6 • Lecture 6</p>
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
                        <Link href="/unit6/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Disjoint Set
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Dynamic Programming Basics</h2>
                        <span className="flex items-center gap-2 text-slate-600 cursor-not-allowed">
                            Course Complete <ArrowRight size={16} />
                        </span>
                    </div>

                    <TheoryCard title="Those Who Cannot Remember The Past..." icon={Brain}>
                        <p>
                            ...are condemned to compute it again.
                        </p>
                        <p>
                            <strong>Dynamic Programming (DP)</strong> is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems. The crucial difference between DP and Divide & Conquer is that DP subproblems overlap.
                        </p>
                        <p>
                            Instead of recomputing the same subproblem multiple times (like the naive Fibonacci recursive algorithm), DP stores the result of each subproblem in a table (usually an array) and reuses it.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="Two Approaches" icon={Target}>
                        <ul className="list-disc pl-6 space-y-6 text-slate-300">
                            <li>
                                <strong className="text-rose-400">Top-Down (Memoization):</strong><br/>
                                You write the recursive function as usual, but before returning an answer, you save it in an array or map. The next time the function is called with the same parameters, you instantly return the saved answer.
                            </li>
                            <li>
                                <strong className="text-emerald-400">Bottom-Up (Tabulation):</strong><br/>
                                You get rid of recursion entirely. You start by solving the smallest possible subproblems (base cases) first, and iteratively build up the solutions array using loops until you reach the main problem.
                            </li>
                        </ul>
                    </TheoryCard>

                    <div className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">DSA Course Complete! 🎉</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            From basic Arrays to the mind-bending optimizations of Dynamic Programming, you have traversed the entire landscape of Data Structures and Algorithms. You are now equipped with the mental models to write highly efficient, scalable software and tackle the toughest algorithmic challenges!
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link href="/" className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2">
                                <ArrowLeft size={18} /> Return to Course Hub
                            </Link>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit6/L4/page.tsx', content4);
fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit6/L5/page.tsx', content5);
fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit6/L6/page.tsx', content6);
console.log("DSA Unit 6 Lectures 4, 5, 6 Generation Complete.");
