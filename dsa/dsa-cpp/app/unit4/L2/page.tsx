"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Route } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Tree Traversals</h1>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">Unit 4 • Lecture 2</p>
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
                        <Link href="/unit4/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Tree Intro
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Tree Traversals</h2>
                        <Link href="/unit4/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Binary Search Tree <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Depth-First Traversals" icon={Route}>
                        <p>
                            Unlike linear data structures (arrays, linked lists) which have only one logical way to traverse them, trees can be traversed in different ways.
                        </p>
                        <p>
                            The most common recursive Depth-First approaches depend on when you "visit" or print the current node (the Root) relative to its Left and Right subtrees.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-orange-400 font-bold text-lg mb-2">Preorder</h4>
                                <p className="font-mono text-sm text-white mb-2">Root ➔ Left ➔ Right</p>
                                <p className="text-xs text-slate-400">Used to create a copy of the tree or get prefix expression.</p>
                            </div>
                            
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 border-t-4 border-t-emerald-500">
                                <h4 className="text-emerald-400 font-bold text-lg mb-2">Inorder</h4>
                                <p className="font-mono text-sm text-white mb-2">Left ➔ Root ➔ Right</p>
                                <p className="text-xs text-slate-400">Used heavily in BSTs because it prints nodes in sorted order!</p>
                            </div>
                            
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-blue-400 font-bold text-lg mb-2">Postorder</h4>
                                <p className="font-mono text-sm text-white mb-2">Left ➔ Right ➔ Root</p>
                                <p className="text-xs text-slate-400">Used to delete the tree or get postfix expression. Children are processed before parents.</p>
                            </div>
                        </div>
                    </TheoryCard>

                    <TheoryCard title="Recursive Implementations" icon={Code}>
                        <CodeBlock 
                            title="Traversals.cpp"
                            code={`void printPreorder(TreeNode* node) {
    if (node == nullptr) return;
    cout << node->data << " ";      // 1. Visit Root
    printPreorder(node->left);      // 2. Traverse Left Subtree
    printPreorder(node->right);     // 3. Traverse Right Subtree
}

void printInorder(TreeNode* node) {
    if (node == nullptr) return;
    printInorder(node->left);       // 1. Traverse Left Subtree
    cout << node->data << " ";      // 2. Visit Root
    printInorder(node->right);      // 3. Traverse Right Subtree
}

void printPostorder(TreeNode* node) {
    if (node == nullptr) return;
    printPostorder(node->left);     // 1. Traverse Left Subtree
    printPostorder(node->right);    // 2. Traverse Right Subtree
    cout << node->data << " ";      // 3. Visit Root
}`}
                        />
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
