const fs = require('fs');

const content = `"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Box, Server, Play, Plus, RefreshCw, Cpu, Layers } from 'lucide-react';

// --- Shared Components ---
const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Icon size={20} /></span>}
            {title}
        </h3>
        <div className="text-slate-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const CodeBlock = ({ code, title, language = 'cpp' }: { code: string, title?: string, language?: string }) => (
    <div className="bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden mb-8 my-4 shadow-xl">
        {title && (
            <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Code size={14} className="text-blue-400" />
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

// --- INTERACTIVE 1: Array vs Linked List Memory Layout ---
const MemoryComparison = () => {
    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Server size={20} className="text-blue-400"/> Interactive: Array vs Linked List Memory Allocation</h4>
            
            <div className="space-y-8">
                {/* Array */}
                <div>
                    <h5 className="text-blue-400 font-bold mb-2">1. Array (Contiguous Memory)</h5>
                    <p className="text-sm text-slate-400 mb-4">Memory is allocated in a single, continuous block. If there isn't enough contiguous space, allocation fails or requires a complete reallocation.</p>
                    <div className="grid grid-cols-10 gap-1 bg-[#0d1117] p-4 rounded-xl border border-slate-800">
                        {Array.from({length: 10}).map((_, i) => (
                            <div key={i} className={\`h-12 flex flex-col items-center justify-center rounded border \${[2,3,4,5].includes(i) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800/50 border-slate-700 text-slate-600'}\`}>
                                <span className="text-xs font-mono opacity-50">0x{1000 + i*4}</span>
                                <span className="font-bold">{[2,3,4,5].includes(i) ? [10,20,30,40][i-2] : '-'}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Linked List */}
                <div>
                    <h5 className="text-orange-400 font-bold mb-2">2. Linked List (Non-Contiguous Memory)</h5>
                    <p className="text-sm text-slate-400 mb-4">Memory is scattered wherever space is available. Nodes are connected via pointers (addresses).</p>
                    <div className="grid grid-cols-10 gap-1 bg-[#0d1117] p-4 rounded-xl border border-slate-800 relative min-h-[120px]">
                        {Array.from({length: 10}).map((_, i) => {
                            const nodeMap: Record<number, {val: number, next: string, color: string}> = {
                                1: {val: 10, next: '0x1032', color: 'orange'},
                                8: {val: 20, next: '0x1016', color: 'pink'},
                                4: {val: 30, next: '0x1000', color: 'purple'},
                                0: {val: 40, next: 'NULL', color: 'red'}
                            };
                            const isNode = i in nodeMap;
                            const node = nodeMap[i];

                            return (
                                <div key={i} className={\`h-24 flex flex-col rounded border \${isNode ? \`bg-\${node.color}-500/10 border-\${node.color}-500\` : 'bg-slate-800/50 border-slate-700'} relative\`}>
                                    <div className="h-6 border-b border-slate-700/50 flex items-center justify-center text-[10px] font-mono text-slate-500 bg-black/20">
                                        0x{1000 + i*4}
                                    </div>
                                    {isNode ? (
                                        <div className="flex-1 flex flex-col">
                                            <div className={\`flex-1 flex items-center justify-center font-bold text-\${node.color}-400 text-sm\`}>
                                                {node.val}
                                            </div>
                                            <div className="h-6 border-t border-slate-700/50 flex items-center justify-center text-[10px] font-mono text-slate-400 bg-slate-900/50">
                                                {node.next}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center text-slate-600 font-bold opacity-30">-</div>
                                    )}
                                </div>
                            );
                        })}
                        {/* Decorative arrows */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" style={{ zIndex: 10 }}>
                            <path d="M 15% 50% Q 50% 20% 85% 50%" fill="none" stroke="orange" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow-orange)" />
                            <path d="M 85% 50% Q 65% 80% 45% 50%" fill="none" stroke="pink" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow-pink)" />
                            <path d="M 45% 50% Q 25% 20% 5% 50%" fill="none" stroke="purple" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow-purple)" />
                            <defs>
                                <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="orange" /></marker>
                                <marker id="arrow-pink" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="pink" /></marker>
                                <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="purple" /></marker>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE 2: Node Anatomy ---
const NodeAnatomy = () => {
    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 flex flex-col items-center">
            <h4 className="text-lg font-bold text-white mb-6 self-start flex items-center gap-2"><Box size={20} className="text-blue-400"/> Interactive: Anatomy of a Linked List Node</h4>
            
            <div className="flex items-center gap-8 w-full max-w-2xl">
                <div className="flex-1 bg-[#0d1117] rounded-xl border border-blue-500/30 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-transform hover:scale-105 duration-300">
                    <div className="bg-blue-500/20 px-4 py-2 text-center border-b border-blue-500/30 font-bold text-blue-400 font-mono text-sm">
                        Address: 0xA1B2
                    </div>
                    <div className="flex h-32">
                        <div className="flex-1 border-r border-slate-700 flex flex-col items-center justify-center p-4 group cursor-pointer hover:bg-emerald-500/10 transition-colors">
                            <span className="text-emerald-400 font-black text-3xl group-hover:scale-110 transition-transform">42</span>
                            <span className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">data</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-4 relative group cursor-pointer hover:bg-orange-500/10 transition-colors">
                            <span className="text-orange-400 font-mono font-bold group-hover:scale-110 transition-transform">0xC3D4</span>
                            <span className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">next pointer</span>
                            {/* Arrow sticking out */}
                            <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-orange-400 group-hover:translate-x-2 transition-transform">
                                <ArrowRight size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 text-slate-400 space-y-4">
                    <p>A Node is a composite data structure (a <code className="text-blue-400">struct</code> or <code className="text-blue-400">class</code>) consisting of two main fields:</p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div><span className="text-emerald-300 font-bold">Data:</span> Holds the actual value (int, string, object).</li>
                        <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div><span className="text-orange-300 font-bold">Pointer (Next):</span> Stores the memory address of the next node in the sequence.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE 3: Building a Linked List ---
const ListBuilder = () => {
    const [nodes, setNodes] = useState<number[]>([]);
    
    const addNode = () => {
        if (nodes.length < 6) {
            setNodes([...nodes, Math.floor(Math.random() * 100)]);
        }
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold text-white flex items-center gap-2"><Plus size={20} className="text-blue-400"/> Interactive: Dynamic Construction</h4>
                <div className="flex gap-2">
                    <button onClick={addNode} disabled={nodes.length >= 6} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                        <Plus size={16} /> Insert Node
                    </button>
                    <button onClick={() => setNodes([])} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                        <RefreshCw size={16} /> Reset
                    </button>
                </div>
            </div>

            <div className="min-h-[160px] bg-[#0d1117] rounded-xl border border-slate-800 p-8 flex items-center overflow-x-auto relative">
                {nodes.length === 0 ? (
                    <div className="w-full text-center text-slate-600 italic">List is empty. Head pointer is NULL.</div>
                ) : (
                    <div className="flex items-center gap-1">
                        <div className="text-emerald-400 font-bold text-sm mr-4 flex flex-col items-center">
                            <span>Head</span>
                            <ArrowRight size={16} className="text-emerald-500 mt-1 rotate-90" />
                        </div>
                        {nodes.map((val, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <div className="animate-in fade-in zoom-in slide-in-from-left-4 duration-500">
                                    <div className="flex border border-blue-500/30 rounded-lg overflow-hidden bg-slate-900 shadow-lg">
                                        <div className="px-4 py-3 border-r border-slate-700 font-bold text-white bg-blue-500/10 min-w-[3rem] text-center">
                                            {val}
                                        </div>
                                        <div className="px-3 py-3 text-xs text-orange-400 font-mono bg-slate-900/50 flex items-center justify-center">
                                            {i === nodes.length - 1 ? 'NULL' : 'ptr'}
                                        </div>
                                    </div>
                                </div>
                                {i < nodes.length - 1 && (
                                    <div className="text-orange-500 mx-2 animate-in fade-in duration-500 delay-300">
                                        <ArrowRight size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-4 text-sm text-slate-400 bg-slate-800/50 p-4 rounded-lg">
                <strong className="text-white">Note:</strong> Notice how we didn't have to declare a size limit? Linked Lists grow dynamically at runtime using heap memory (via <code>new</code> in C++ or <code>malloc()</code> in C).
            </div>
        </div>
    );
};

// --- INTERACTIVE 4: Types of Linked Lists ---
const ListTypes = () => {
    const [type, setType] = useState<'singly' | 'doubly' | 'circular'>('singly');

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Layers size={20} className="text-blue-400"/> Interactive: Linked List Variations</h4>
            
            <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
                {(['singly', 'doubly', 'circular'] as const).map(t => (
                    <button 
                        key={t}
                        onClick={() => setType(t)}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${type === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}\`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)} List
                    </button>
                ))}
            </div>

            <div className="h-48 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="flex items-center gap-8 relative">
                    {[10, 20, 30].map((val, i) => (
                        <div key={i} className="flex items-center relative z-10">
                            <div className="flex border border-slate-600 rounded-lg overflow-hidden bg-slate-800/80 shadow-xl">
                                {type === 'doubly' && (
                                    <div className="px-2 py-3 border-r border-slate-700 text-xs text-purple-400 font-mono bg-slate-900/50">prev</div>
                                )}
                                <div className="px-4 py-3 font-bold text-white bg-slate-700/50 min-w-[3rem] text-center">{val}</div>
                                <div className="px-2 py-3 border-l border-slate-700 text-xs text-orange-400 font-mono bg-slate-900/50">next</div>
                            </div>
                            
                            {/* Forward Arrows */}
                            {i < 2 && (
                                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-orange-400 z-0">
                                    <ArrowRight size={20} className={type === 'doubly' ? '-translate-y-2' : ''} />
                                </div>
                            )}

                            {/* Backward Arrows */}
                            {type === 'doubly' && i > 0 && (
                                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-purple-400 z-0">
                                    <ArrowLeft size={20} className="translate-y-2" />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Circular Arrow */}
                    {type === 'circular' && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, overflow: 'visible' }}>
                            <path d="M 280 20 Q 280 -60 140 -60 Q 0 -60 0 20" fill="none" stroke="orange" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-circular)" />
                            <defs>
                                <marker id="arrow-circular" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="orange" /></marker>
                            </defs>
                        </svg>
                    )}
                </div>
            </div>

            <div className="mt-6 text-slate-400 text-sm p-4 bg-[#0d1117] rounded-lg border border-slate-800">
                {type === 'singly' && <p><strong>Singly Linked List:</strong> Unidirectional. Each node only knows about the next node. Simple and memory efficient.</p>}
                {type === 'doubly' && <p><strong>Doubly Linked List:</strong> Bidirectional. Each node holds pointers to both the next AND previous nodes. Allows backward traversal but requires extra memory for the <code>prev</code> pointer.</p>}
                {type === 'circular' && <p><strong>Circular Linked List:</strong> The <code>next</code> pointer of the tail node loops back to the head node instead of pointing to <code>NULL</code>. Useful for round-robin scheduling.</p>}
            </div>
        </div>
    );
};

// --- INTERACTIVE 5: Memory Overhead Calculator ---
const MemoryOverhead = () => {
    const [numElements, setNumElements] = useState<number>(100);
    
    // Assuming 64-bit architecture (pointers are 8 bytes, int is 4 bytes)
    const arraySize = numElements * 4;
    const singlySize = numElements * (4 + 8); // data + next
    const doublySize = numElements * (4 + 8 + 8); // data + next + prev

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Cpu size={20} className="text-blue-400"/> Interactive: 64-bit Memory Overhead Calculator</h4>
            
            <div className="mb-8">
                <label className="block text-slate-400 text-sm font-bold mb-4">Number of Elements (Integers): {numElements.toLocaleString()}</label>
                <input 
                    type="range" 
                    min="10" 
                    max="10000" 
                    step="10"
                    value={numElements} 
                    onChange={(e) => setNumElements(parseInt(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0d1117] p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
                    <div className="text-slate-400 text-sm font-bold mb-2">Integer Array</div>
                    <div className="text-3xl font-black text-emerald-400 mb-1">{arraySize.toLocaleString()} B</div>
                    <div className="text-xs text-slate-500">Zero overhead</div>
                </div>
                <div className="bg-[#0d1117] p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500"></div>
                    <div className="text-slate-400 text-sm font-bold mb-2">Singly Linked List</div>
                    <div className="text-3xl font-black text-orange-400 mb-1">{singlySize.toLocaleString()} B</div>
                    <div className="text-xs text-orange-500/50">+ {((singlySize - arraySize) / arraySize * 100).toFixed(0)}% overhead (pointers)</div>
                </div>
                <div className="bg-[#0d1117] p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500"></div>
                    <div className="text-slate-400 text-sm font-bold mb-2">Doubly Linked List</div>
                    <div className="text-3xl font-black text-purple-400 mb-1">{doublySize.toLocaleString()} B</div>
                    <div className="text-xs text-purple-500/50">+ {((doublySize - arraySize) / arraySize * 100).toFixed(0)}% overhead (pointers)</div>
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-6 text-center">Calculations based on 64-bit architecture: <code>sizeof(int) = 4 bytes</code>, <code>sizeof(pointer) = 8 bytes</code>.</p>
        </div>
    );
};


export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                {/* HEADER */}
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Linked List Intro</h1>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 1</p>
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
                        <Link href="/unit1/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Unit 1: Searching
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Introduction to Linked Lists</h2>
                        <Link href="/unit2/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Insertion & Deletion <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Problem with Arrays" icon={Database}>
                        <p>
                            In Unit 1, we worked heavily with Arrays. Arrays are fantastic because they provide <strong>O(1) random access</strong>—if you want the 50th element, you just do <code>arr[50]</code> and you have it instantly.
                        </p>
                        <p>
                            However, Arrays have massive architectural flaws:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Fixed Size:</strong> Static arrays cannot be resized. If you declare an array of size 100, and you need to store 101 elements, you must allocate a brand new array and copy everything over (this is what <code>std::vector</code> does under the hood).</li>
                            <li><strong>Contiguous Memory:</strong> Arrays require a single, unbroken block of memory. If your RAM is fragmented, allocation for a large array might fail even if there is enough total free memory available.</li>
                            <li><strong>Expensive Insertions/Deletions:</strong> Inserting an element at the front of an array requires shifting every single subsequent element to the right. This takes <strong>O(N)</strong> time.</li>
                        </ul>
                    </TheoryCard>

                    <MemoryComparison />

                    <TheoryCard title="Enter the Linked List" icon={Layers}>
                        <p>
                            A Linked List solves the rigid memory constraints of an Array. Instead of requesting one massive block of memory upfront, a Linked List requests tiny blocks of memory (Nodes) exactly when it needs them.
                        </p>
                        <p>
                            Because these Nodes are scattered randomly across the heap memory, they need a way to find each other. Therefore, every Node must contain a <strong>Pointer</strong> that stores the memory address of the next Node in the sequence.
                        </p>
                    </TheoryCard>

                    <NodeAnatomy />

                    <TheoryCard title="Coding the Node in C++" icon={Code}>
                        <p>
                            In C++, we typically define a Node using a <code>struct</code> or a <code>class</code>. Because a Node contains a pointer to an object of its own type, this is known as a <strong>Self-Referential Structure</strong>.
                        </p>
                        <CodeBlock 
                            title="Node.cpp"
                            code={\`struct Node {
    int data;           // The payload
    Node* next;         // Pointer to the next Node
    
    // Constructor to easily create new nodes
    Node(int val) {
        data = val;
        next = nullptr; // Always initialize pointers to null!
    }
};\`}
                        />
                        <p className="mt-4">
                            The very first node in the list is called the <strong>Head</strong>. If the <code>head</code> pointer is <code>nullptr</code>, the list is completely empty. The very last node in the list always has its <code>next</code> pointer set to <code>nullptr</code> to signify the end of the chain.
                        </p>
                    </TheoryCard>

                    <ListBuilder />

                    <TheoryCard title="Types of Linked Lists" icon={Database}>
                        <p>
                            The standard Linked List we've been discussing is technically called a <strong>Singly Linked List</strong>. However, there are variants designed to solve specific traversal problems.
                        </p>
                    </TheoryCard>

                    <ListTypes />

                    <TheoryCard title="The Hidden Cost: Memory Overhead" icon={Cpu}>
                        <p>
                            While Linked Lists solve the problem of contiguous memory and expensive insertions, they introduce a new problem: <strong>Pointer Overhead</strong>.
                        </p>
                        <p>
                            Every single element now requires extra bytes just to store the address of the next element. In a 64-bit system, a pointer takes up 8 bytes. If your payload is a simple 4-byte integer, the pointer takes up twice as much space as the data itself!
                        </p>
                    </TheoryCard>

                    <MemoryOverhead />

                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Linked Lists trade <strong>O(1) random access</strong> for <strong>O(1) insertions/deletions</strong> (at the front) and <strong>dynamic sizing</strong>. They are the foundational building block for many complex data structures like Stacks, Queues, and Graphs. In Lecture 2, we will dive deep into the C++ code to implement dynamic traversal, insertion, and deletion algorithms.
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit2/L1/page.tsx', content);
console.log("DSA Unit 2 Lecture 1 Generation Complete.");
