const fs = require('fs');

const content5 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, FastForward, Rewind, Maximize2 } from 'lucide-react';

// --- Shared Components ---
const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-pink-500/10 text-pink-400 rounded-lg"><Icon size={20} /></span>}
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
                <Code size={14} className="text-pink-400" />
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

// --- INTERACTIVE 1: DLL Traversal ---
const DLLTraversal = () => {
    const nodes = [10, 20, 30, 40, 50];
    const [curr, setCurr] = useState(0);

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Maximize2 size={20} className="text-pink-400"/> Interactive: Bidirectional Traversal</h4>
            
            <div className="flex gap-4 mb-8 justify-center">
                <button onClick={() => setCurr(prev => Math.max(0, prev - 1))} disabled={curr === 0} className="px-6 py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-pink-500/20">
                    <Rewind size={18} /> Traverse Backward (curr-&gt;prev)
                </button>
                <button onClick={() => setCurr(prev => Math.min(nodes.length - 1, prev + 1))} disabled={curr === nodes.length - 1} className="px-6 py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-pink-500/20">
                    Traverse Forward (curr-&gt;next) <FastForward size={18} />
                </button>
            </div>

            <div className="h-48 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center justify-center p-8 relative overflow-x-auto">
                <div className="flex items-center gap-8 relative">
                    {nodes.map((val, i) => {
                        const isCurr = curr === i;
                        
                        return (
                            <div key={i} className="flex items-center relative z-10 transition-all duration-300">
                                {/* Pointer Label */}
                                {isCurr && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg animate-bounce">
                                        curr
                                    </div>
                                )}
                                
                                <div className={\`flex border \${isCurr ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)] scale-110' : 'border-slate-600'} rounded-lg overflow-hidden bg-slate-800 shadow-xl transition-all\`}>
                                    <div className="px-2 py-3 border-r border-slate-700 text-xs text-blue-400 font-mono bg-slate-900/50">prev</div>
                                    <div className="px-4 py-3 font-bold text-white bg-slate-700/50 min-w-[3rem] text-center">{val}</div>
                                    <div className="px-2 py-3 border-l border-slate-700 text-xs text-orange-400 font-mono bg-slate-900/50">next</div>
                                </div>
                                
                                {/* Forward Arrows */}
                                {i < nodes.length - 1 && (
                                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-orange-400 z-0">
                                        <ArrowRight size={20} className="-translate-y-2" />
                                    </div>
                                )}

                                {/* Backward Arrows */}
                                {i > 0 && (
                                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-blue-400 z-0">
                                        <ArrowLeft size={20} className="translate-y-2" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Doubly Linked Lists</h1>
                            <p className="text-[10px] text-pink-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 5</p>
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
                        <Link href="/unit2/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Cycle Detection
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Doubly Linked Lists (DLL)</h2>
                        <Link href="/unit2/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Circular Linked Lists <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Power of Hindsight" icon={Database}>
                        <p>
                            A major limitation of Singly Linked Lists is that you can only traverse forward. If you are at a node and you need to access the node right behind it, you can't! You'd have to traverse all the way from the head again.
                        </p>
                        <p>
                            A <strong>Doubly Linked List (DLL)</strong> solves this by adding a second pointer to every node: <code>prev</code>. Now, every node holds the address of the next node AND the address of the previous node.
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="DLLNode.cpp"
                        code={\`struct Node {
    int data;
    Node* next;
    Node* prev; // New! Pointer to the previous node
    
    Node(int val) {
        data = val;
        next = nullptr;
        prev = nullptr;
    }
};\`}
                    />

                    <DLLTraversal />

                    <TheoryCard title="Insertion in a Doubly Linked List" icon={Code}>
                        <p>
                            Inserting a node in a DLL requires careful pointer wiring. Instead of updating 2 pointers like in a Singly Linked List, you now have to update <strong>up to 4 pointers</strong>!
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><code>newNode-&gt;next = curr-&gt;next;</code></li>
                            <li><code>newNode-&gt;prev = curr;</code></li>
                            <li><code>if (curr-&gt;next != nullptr) curr-&gt;next-&gt;prev = newNode;</code></li>
                            <li><code>curr-&gt;next = newNode;</code></li>
                        </ul>
                        <p className="mt-4 text-orange-400 font-bold text-sm">
                            ⚠️ Order matters! Always wire the new node's pointers FIRST before breaking the existing connections.
                        </p>
                    </TheoryCard>

                    <TheoryCard title="Deletion in a Doubly Linked List" icon={Code}>
                        <p>
                            Deletion is actually easier in a DLL than in a Singly Linked List! In a Singly Linked List, to delete a node, you needed a pointer to the <code>prev</code> node. In a DLL, the node itself already has a pointer to <code>prev</code>!
                        </p>
                        <p>
                            To delete a specific node <code>del</code>:
                        </p>
                        <CodeBlock 
                            title="DeleteDLLNode.cpp"
                            code={\`void deleteNode(Node*& head, Node* del) {
    if (head == nullptr || del == nullptr) return;

    // If node to be deleted is head node
    if (head == del) {
        head = del->next;
    }

    // Change next only if node to be deleted is NOT the last node
    if (del->next != nullptr) {
        del->next->prev = del->prev;
    }

    // Change prev only if node to be deleted is NOT the first node
    if (del->prev != nullptr) {
        del->prev->next = del->next;
    }

    // Finally, free the memory
    delete del;
}\`}
                        />
                    </TheoryCard>

                    <div className="bg-pink-900/20 border border-pink-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Doubly Linked Lists provide bidirectional traversal and <strong>O(1)</strong> deletion of a given node (without needing to traverse from the head). The tradeoff is memory overhead: every node now requires an extra 8 bytes for the <code>prev</code> pointer. In Lecture 6, we'll connect the tail back to the head to form a Circle!
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

const content6 = `"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, RotateCw, Activity } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg"><Icon size={20} /></span>}
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
                <Code size={14} className="text-yellow-400" />
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

// --- INTERACTIVE 1: Circular Linked List ---
const CLLVisualizer = () => {
    const [rotation, setRotation] = useState(0);
    const nodes = [10, 20, 30, 40];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><RotateCw size={20} className="text-yellow-400"/> Interactive: The Endless Loop</h4>
            
            <div className="h-80 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center justify-center relative">
                <div className="relative w-64 h-64" style={{ transform: \`rotate(\${rotation}deg)\`, transition: 'transform 0.05s linear' }}>
                    {nodes.map((val, i) => {
                        const angle = (i * 360) / nodes.length;
                        return (
                            <div 
                                key={i} 
                                className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-slate-800 border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center justify-center text-white font-bold"
                                style={{ transform: \`rotate(\${angle}deg) translateY(-100px) rotate(-\${angle + rotation}deg)\` }}
                            >
                                {val}
                            </div>
                        );
                    })}
                    {/* The Circular Arrow */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <circle cx="128" cy="128" r="100" fill="none" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="2" strokeDasharray="10 5" />
                    </svg>
                </div>
                
                {/* Fixed Head Label */}
                <div className="absolute top-1/2 left-1/2 -ml-24 -mt-32 w-16 text-center text-emerald-400 font-bold bg-slate-900/80 px-2 py-1 rounded">
                    Head
                    <ArrowRight size={16} className="text-emerald-500 rotate-90 mx-auto" />
                </div>
            </div>
            <p className="text-sm text-slate-400 mt-6 text-center">In a CLL, traversing until <code>curr-&gt;next == nullptr</code> will cause an infinite loop. We must traverse until <code>curr-&gt;next == head</code>.</p>
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Circular Linked Lists</h1>
                            <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 6</p>
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
                        <Link href="/unit2/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Doubly Linked Lists
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Circular Linked Lists (CLL)</h2>
                        <Link href="/unit3/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Unit 3: Stacks <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Breaking the Null Terminator" icon={RotateCw}>
                        <p>
                            In all previous variations, the last node's <code>next</code> pointer was always set to <code>NULL</code> (or <code>nullptr</code> in C++). This gave us a clear stopping condition.
                        </p>
                        <p>
                            A <strong>Circular Linked List (CLL)</strong> bends the tail around and points it back to the <code>head</code>. There is no <code>NULL</code> pointer anywhere in the list.
                        </p>
                        <p>
                            <strong>Why use a CLL?</strong><br/>
                            - Multi-player games (turn-based scheduling).<br/>
                            - Operating System CPU scheduling (Round Robin).<br/>
                            - Alt-Tabbing through open windows.
                        </p>
                    </TheoryCard>

                    <CLLVisualizer />

                    <TheoryCard title="The Traversal Gotcha" icon={Activity}>
                        <p>
                            If you run a standard traversal <code>while (curr != nullptr)</code> on a CLL, it will run forever. We must change our stopping condition.
                        </p>
                        <CodeBlock 
                            title="TraverseCLL.cpp"
                            code={\`void traverse(Node* head) {
    if (head == nullptr) return;
    
    Node* curr = head;
    
    // We use a do-while loop because initially, curr is at head!
    do {
        cout << curr->data << " ";
        curr = curr->next;
    } while (curr != head); // Stop when we wrap back around to the head
}\`}
                        />
                    </TheoryCard>

                    <TheoryCard title="Insertion in a Circular Linked List" icon={Code}>
                        <p>
                            Inserting at the head of a CLL is uniquely challenging. Because the <code>tail</code> points to the <code>head</code>, if you change the head, you MUST also traverse the entire list to update the tail to point to the new head!
                        </p>
                        <CodeBlock 
                            title="InsertHeadCLL.cpp"
                            code={\`void insertAtHead(Node*& head, int val) {
    Node* newNode = new Node(val);
    
    // Edge case: Empty list
    if (head == nullptr) {
        newNode->next = newNode; // Points to itself!
        head = newNode;
        return;
    }
    
    // Traverse to find the tail
    Node* curr = head;
    while (curr->next != head) {
        curr = curr->next;
    }
    
    // Wire the pointers
    newNode->next = head;    // New node points to old head
    curr->next = newNode;    // Tail points to new node
    head = newNode;          // Update head pointer
}\`}
                        />
                    </TheoryCard>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Unit 2 Complete!</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            You've officially mastered Linked Lists! We covered Singly Linked Lists, fast/slow pointer algorithms, cycle detection, Doubly Linked Lists, and Circular Linked Lists. You now have the architectural foundation needed to build higher-level data structures. Get ready for <strong>Unit 3: Stacks & Queues</strong>!
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit2/L5/page.tsx', content5);
console.log("DSA Unit 2 Lecture 5 Generation Complete.");

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit2/L6/page.tsx', content6);
console.log("DSA Unit 2 Lecture 6 Generation Complete.");
