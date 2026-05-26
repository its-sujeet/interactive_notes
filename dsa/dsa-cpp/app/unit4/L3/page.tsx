"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Search, Network } from 'lucide-react';

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

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden mb-8 my-4 shadow-xl">
        {title && (
            <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Code size={14} className="text-rose-400" />
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

// --- INTERACTIVE: BST Search ---
const BSTVisualizer = () => {
    const [target, setTarget] = useState('14');
    const [path, setPath] = useState<number[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    
    // Hardcoded simple BST for visualization
    const bstStructure = {
        val: 20, x: 150, y: 30,
        left: {
            val: 10, x: 75, y: 90,
            left: { val: 5, x: 37, y: 150 },
            right: { val: 14, x: 112, y: 150 }
        },
        right: {
            val: 30, x: 225, y: 90,
            right: { val: 40, x: 262, y: 150 }
        }
    };

    const handleSearch = () => {
        setIsSearching(true);
        const searchVal = parseInt(target);
        const newPath: number[] = [];
        
        const delaySearch = (node: any, currentDelay: number) => {
            if (!node) {
                setTimeout(() => setIsSearching(false), currentDelay);
                return;
            }
            
            setTimeout(() => {
                setPath(prev => [...prev, node.val]);
            }, currentDelay);

            if (node.val === searchVal) {
                setTimeout(() => setIsSearching(false), currentDelay + 500);
                return;
            }
            
            if (searchVal < node.val) {
                delaySearch(node.left, currentDelay + 1000);
            } else {
                delaySearch(node.right, currentDelay + 1000);
            }
        };

        setPath([]);
        delaySearch(bstStructure, 500);
    };

    const reset = () => {
        setPath([]);
        setIsSearching(false);
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Search size={20} className="text-rose-400"/> Interactive: BST Search O(log N)</h4>
            
            <div className="flex gap-4 mb-8 justify-center">
                <input 
                    type="number" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white w-24"
                />
                <button onClick={handleSearch} disabled={isSearching} className="px-6 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold rounded-lg">
                    Search
                </button>
                <button onClick={reset} disabled={isSearching} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-bold rounded-lg">
                    Reset
                </button>
            </div>

            <div className="h-64 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center justify-center relative">
                <svg width="300" height="200" viewBox="0 0 300 200">
                    {/* Edges */}
                    <line x1="150" y1="30" x2="75" y2="90" stroke="#334155" strokeWidth="2" />
                    <line x1="150" y1="30" x2="225" y2="90" stroke="#334155" strokeWidth="2" />
                    <line x1="75" y1="90" x2="37" y2="150" stroke="#334155" strokeWidth="2" />
                    <line x1="75" y1="90" x2="112" y2="150" stroke="#334155" strokeWidth="2" />
                    <line x1="225" y1="90" x2="262" y2="150" stroke="#334155" strokeWidth="2" />
                    
                    {/* Function to render nodes */}
                    {[
                        {val: 20, cx: 150, cy: 30},
                        {val: 10, cx: 75, cy: 90},
                        {val: 30, cx: 225, cy: 90},
                        {val: 5, cx: 37, cy: 150},
                        {val: 14, cx: 112, cy: 150},
                        {val: 40, cx: 262, cy: 150}
                    ].map(n => {
                        const isVisited = path.includes(n.val);
                        const isTarget = path[path.length - 1] === n.val && !isSearching;
                        
                        let fill = "#1e293b";
                        let stroke = "#475569";
                        
                        if (isTarget) {
                            fill = "rgba(16, 185, 129, 0.2)";
                            stroke = "#10b981"; // Green for found
                        } else if (isVisited) {
                            fill = "rgba(244, 63, 94, 0.2)";
                            stroke = "#f43f5e"; // Rose for visited
                        }

                        return (
                            <g key={n.val} className="transition-all duration-500">
                                <circle cx={n.cx} cy={n.cy} r="18" fill={fill} stroke={stroke} strokeWidth="3" />
                                <text x={n.cx} y={n.cy + 5} fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">{n.val}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
            {path.length > 0 && (
                <div className="text-center mt-4 text-sm font-mono text-slate-400">
                    Path: {path.join(" -> ")}
                </div>
            )}
        </div>
    );
};

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Binary Search Tree</h1>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">Unit 4 • Lecture 3</p>
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
                        <Link href="/unit4/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Tree Traversals
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Binary Search Tree (BST)</h2>
                        <Link href="/unit4/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Insert & Delete <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The BST Property" icon={Network}>
                        <p>
                            A <strong>Binary Search Tree</strong> is a special binary tree that imposes an ordering on its elements, making search extremely fast!
                        </p>
                        <p className="text-rose-400 font-bold">The Rule:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>For <em>every</em> node, all values in its <strong>Left Subtree</strong> must be strictly <strong>less than</strong> the node's value.</li>
                            <li>All values in its <strong>Right Subtree</strong> must be strictly <strong>greater than</strong> the node's value.</li>
                        </ul>
                    </TheoryCard>

                    <BSTVisualizer />

                    <TheoryCard title="Searching a BST: O(log N)" icon={Search}>
                        <p>
                            Because of the ordering property, every time we compare our target value with a node, we can instantly discard <strong>half</strong> of the remaining tree!
                        </p>
                        <p>
                            If the target is smaller, we only look left. If it's larger, we only look right. This is exactly how Binary Search works on sorted arrays.
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="SearchBST.cpp"
                        code={`TreeNode* searchBST(TreeNode* root, int val) {
    // Base Cases: root is null or key is present at root
    if (root == nullptr || root->data == val) {
        return root;
    }
    
    // Target is greater than root's value
    if (root->data < val) {
        return searchBST(root->right, val);
    }
    
    // Target is smaller than root's value
    return searchBST(root->left, val);
}`}
                    />

                </main>
            </div>
        </div>
    );
}
