"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Network } from 'lucide-react';

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

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Introduction to Trees</h1>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">Unit 4 • Lecture 1</p>
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
                        <Link href="/unit3/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Unit 3: Circular Queue
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Introduction to Trees & Binary Trees</h2>
                        <Link href="/unit4/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Tree Traversals <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="What is a Tree?" icon={Network}>
                        <p>
                            Unlike Arrays, Linked Lists, Stacks, and Queues which are <strong>linear</strong> data structures, a Tree is a <strong>hierarchical</strong> (non-linear) data structure.
                        </p>
                        <p>
                            A tree consists of nodes connected by edges. The top-most node is called the <strong>Root</strong>. If a node connects to other nodes below it, it is a <strong>Parent</strong> and the nodes below it are its <strong>Children</strong>. Nodes with no children are called <strong>Leaf Nodes</strong>.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <svg width="300" height="200" viewBox="0 0 300 200">
                                {/* Edges */}
                                <line x1="150" y1="30" x2="75" y2="100" stroke="#f43f5e" strokeWidth="2" />
                                <line x1="150" y1="30" x2="225" y2="100" stroke="#f43f5e" strokeWidth="2" />
                                <line x1="75" y1="100" x2="40" y2="170" stroke="#f43f5e" strokeWidth="2" />
                                <line x1="75" y1="100" x2="110" y2="170" stroke="#f43f5e" strokeWidth="2" />
                                <line x1="225" y1="100" x2="260" y2="170" stroke="#f43f5e" strokeWidth="2" />
                                
                                {/* Nodes */}
                                <circle cx="150" cy="30" r="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="3" />
                                <text x="150" y="35" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">1</text>
                                
                                <circle cx="75" cy="100" r="20" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
                                <text x="75" y="105" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">2</text>
                                
                                <circle cx="225" cy="100" r="20" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
                                <text x="225" y="105" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">3</text>
                                
                                <circle cx="40" cy="170" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
                                <text x="40" y="175" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">4</text>
                                
                                <circle cx="110" cy="170" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
                                <text x="110" y="175" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">5</text>
                                
                                <circle cx="260" cy="170" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
                                <text x="260" y="175" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">6</text>
                            </svg>
                        </div>
                    </TheoryCard>

                    <TheoryCard title="Terminology" icon={Database}>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li><strong>Root:</strong> The topmost node (Node 1).</li>
                            <li><strong>Edge:</strong> The connecting link between two nodes.</li>
                            <li><strong>Parent:</strong> Node 2 is the parent of 4 and 5.</li>
                            <li><strong>Child:</strong> Nodes 4 and 5 are children of 2.</li>
                            <li><strong>Siblings:</strong> Nodes that share the same parent (4 and 5).</li>
                            <li><strong>Leaf:</strong> Nodes with no children (4, 5, 6).</li>
                            <li><strong>Depth:</strong> Number of edges from the root to the node.</li>
                            <li><strong>Height:</strong> Number of edges on the longest path from the node to a leaf.</li>
                        </ul>
                    </TheoryCard>

                    <TheoryCard title="What is a Binary Tree?" icon={Code}>
                        <p>
                            A <strong>Binary Tree</strong> is a special type of tree where each node can have <strong>at most two children</strong>, referred to as the <em>left child</em> and the <em>right child</em>.
                        </p>
                        <CodeBlock 
                            title="TreeNode.cpp"
                            code={`struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};`}
                        />
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
