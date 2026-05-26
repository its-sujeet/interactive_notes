"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, PlusCircle, Trash2 } from 'lucide-react';

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
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">BST Modifying Operations</h1>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">Unit 4 • Lecture 4</p>
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
                        <Link href="/unit4/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> BST Intro
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Insertion & Deletion in BST</h2>
                        <Link href="/unit4/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            AVL Trees <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Insertion" icon={PlusCircle}>
                        <p>
                            Inserting a new value into a BST is straightforward because <strong>a new node is always inserted as a leaf</strong>.
                        </p>
                        <p>
                            We follow the same logic as searching: if the value is smaller, go left. If larger, go right. When we hit a <code>nullptr</code>, we link the new node there.
                        </p>
                        <CodeBlock 
                            title="InsertBST.cpp"
                            code={`TreeNode* insert(TreeNode* node, int val) {
    if (node == nullptr) {
        return new TreeNode(val);
    }
    if (val < node->data) {
        node->left = insert(node->left, val);
    } else if (val > node->data) {
        node->right = insert(node->right, val);
    }
    return node; // Return the (unchanged) node pointer
}`}
                        />
                    </TheoryCard>

                    <TheoryCard title="Deletion (The 3 Cases)" icon={Trash2}>
                        <p>
                            Deleting a node is the trickiest operation in a BST because we must ensure the tree remains a valid BST after removal. There are 3 scenarios:
                        </p>
                        <ul className="space-y-4 mt-4 text-slate-300">
                            <li className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <strong className="text-emerald-400">Case 1: The node is a Leaf.</strong><br/>
                                Simplest case. Just delete the node and return <code>nullptr</code> to its parent.
                            </li>
                            <li className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <strong className="text-orange-400">Case 2: The node has 1 child.</strong><br/>
                                Delete the node and replace it with its only child. Return the child to the parent.
                            </li>
                            <li className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <strong className="text-rose-400">Case 3: The node has 2 children.</strong><br/>
                                We cannot simply delete it. We must find the <strong>Inorder Successor</strong> (the smallest node in the Right Subtree). Copy its value to the current node, then recursively delete the inorder successor from the right subtree.
                            </li>
                        </ul>
                    </TheoryCard>

                    <CodeBlock 
                        title="DeleteBST.cpp"
                        code={`TreeNode* minValueNode(TreeNode* node) {
    TreeNode* current = node;
    while (current && current->left != nullptr)
        current = current->left;
    return current;
}

TreeNode* deleteNode(TreeNode* root, int key) {
    if (root == nullptr) return root;

    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        // Node found!
        // Case 1 & 2: No child or 1 child
        if (root->left == nullptr) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == nullptr) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: Two children
        TreeNode* temp = minValueNode(root->right);
        root->data = temp->data; // Copy inorder successor's value
        // Delete the inorder successor
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}`}
                    />

                </main>
            </div>
        </div>
    );
}
