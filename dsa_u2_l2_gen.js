const fs = require('fs');

const content = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Play, MousePointerClick, RefreshCw, Trash2, Plus } from 'lucide-react';

// --- Shared Components ---
const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Icon size={20} /></span>}
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
                <Code size={14} className="text-emerald-400" />
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

// --- INTERACTIVE 1: Insertion ---
const InsertionVisualizer = () => {
    const [nodes, setNodes] = useState<{id: number, val: number}[]>([{id: 1, val: 10}, {id: 2, val: 20}, {id: 3, val: 30}]);
    const [status, setStatus] = useState('idle');
    const [newVal, setNewVal] = useState(99);
    let nextId = 4;

    const insertAtHead = () => {
        setStatus('insert_head');
        setTimeout(() => {
            setNodes(prev => [{id: Date.now(), val: newVal}, ...prev]);
            setNewVal(Math.floor(Math.random() * 100));
            setStatus('idle');
        }, 1000);
    };

    const insertAtTail = () => {
        setStatus('insert_tail');
        setTimeout(() => {
            setNodes(prev => [...prev, {id: Date.now(), val: newVal}]);
            setNewVal(Math.floor(Math.random() * 100));
            setStatus('idle');
        }, 1000);
    };

    const insertAtPos = (pos: number) => {
        if (pos < 0 || pos > nodes.length) return;
        setStatus('insert_pos');
        setTimeout(() => {
            setNodes(prev => {
                const arr = [...prev];
                arr.splice(pos, 0, {id: Date.now(), val: newVal});
                return arr;
            });
            setNewVal(Math.floor(Math.random() * 100));
            setStatus('idle');
        }, 1000);
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Plus size={20} className="text-emerald-400"/> Interactive: Inserting Nodes</h4>
            
            <div className="flex flex-wrap gap-4 mb-8 z-10 relative">
                <button onClick={insertAtHead} disabled={status !== 'idle' || nodes.length >= 7} className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 disabled:opacity-50 text-sm font-bold rounded-lg transition-colors">
                    Insert at Head (O(1))
                </button>
                <button onClick={insertAtTail} disabled={status !== 'idle' || nodes.length >= 7} className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 disabled:opacity-50 text-sm font-bold rounded-lg transition-colors">
                    Insert at Tail (O(N))
                </button>
                <button onClick={() => insertAtPos(Math.floor(nodes.length/2))} disabled={status !== 'idle' || nodes.length >= 7 || nodes.length < 2} className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 disabled:opacity-50 text-sm font-bold rounded-lg transition-colors">
                    Insert at Middle (O(N))
                </button>
                <button onClick={() => setNodes([])} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors ml-auto">
                    Clear List
                </button>
            </div>

            <div className="flex items-center gap-6 mb-8 text-sm">
                <span className="text-slate-400">Value to insert:</span>
                <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold rounded-lg">{newVal}</span>
            </div>

            <div className="min-h-[160px] bg-[#0d1117] rounded-xl border border-slate-800 p-8 flex items-center overflow-x-auto relative">
                {nodes.length === 0 ? (
                    <div className="w-full text-center text-slate-600 italic">List is empty. <code>head == NULL</code></div>
                ) : (
                    <div className="flex items-center gap-1">
                        <div className="text-emerald-400 font-bold text-sm mr-4 flex flex-col items-center">
                            <span>head</span>
                            <ArrowRight size={16} className="text-emerald-500 mt-1 rotate-90" />
                        </div>
                        {nodes.map((node, i) => (
                            <div key={node.id} className="flex items-center gap-1 transition-all duration-500">
                                <div className="flex border border-slate-600 rounded-lg overflow-hidden bg-slate-800 shadow-lg">
                                    <div className="px-4 py-3 border-r border-slate-700 font-bold text-white bg-slate-700/50 min-w-[3rem] text-center">
                                        {node.val}
                                    </div>
                                    <div className="px-3 py-3 text-xs text-orange-400 font-mono bg-slate-900/50 flex items-center justify-center">
                                        {i === nodes.length - 1 ? 'NULL' : 'ptr'}
                                    </div>
                                </div>
                                {i < nodes.length - 1 && (
                                    <div className="text-orange-500 mx-2">
                                        <ArrowRight size={20} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {status !== 'idle' && (
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-20 flex items-center justify-center">
                    <div className="bg-slate-800 border border-emerald-500/50 p-4 rounded-xl text-emerald-400 font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse">
                        <RefreshCw className="animate-spin" size={20} /> Re-wiring pointers...
                    </div>
                </div>
            )}
        </div>
    );
};

// --- INTERACTIVE 2: Deletion ---
const DeletionVisualizer = () => {
    const [nodes, setNodes] = useState<{id: number, val: number}[]>([
        {id: 1, val: 10}, {id: 2, val: 20}, {id: 3, val: 30}, {id: 4, val: 40}, {id: 5, val: 50}
    ]);
    const [status, setStatus] = useState('idle');
    const [targetId, setTargetId] = useState<number | null>(null);

    const deleteAtHead = () => {
        if(nodes.length === 0) return;
        setTargetId(nodes[0].id);
        setStatus('deleting');
        setTimeout(() => {
            setNodes(prev => prev.slice(1));
            setStatus('idle');
            setTargetId(null);
        }, 1000);
    };

    const deleteAtTail = () => {
        if(nodes.length === 0) return;
        setTargetId(nodes[nodes.length - 1].id);
        setStatus('deleting');
        setTimeout(() => {
            setNodes(prev => prev.slice(0, -1));
            setStatus('idle');
            setTargetId(null);
        }, 1000);
    };

    const deleteAtPos = (pos: number) => {
        if(pos < 0 || pos >= nodes.length) return;
        setTargetId(nodes[pos].id);
        setStatus('deleting');
        setTimeout(() => {
            setNodes(prev => {
                const arr = [...prev];
                arr.splice(pos, 1);
                return arr;
            });
            setStatus('idle');
            setTargetId(null);
        }, 1000);
    };

    const reset = () => {
        setNodes([{id: Date.now(), val: 10}, {id: Date.now()+1, val: 20}, {id: Date.now()+2, val: 30}, {id: Date.now()+3, val: 40}, {id: Date.now()+4, val: 50}]);
    }

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Trash2 size={20} className="text-red-400"/> Interactive: Deleting Nodes</h4>
            
            <div className="flex flex-wrap gap-4 mb-8 z-10 relative">
                <button onClick={deleteAtHead} disabled={status !== 'idle' || nodes.length === 0} className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 disabled:opacity-50 text-sm font-bold rounded-lg transition-colors">
                    Delete from Head (O(1))
                </button>
                <button onClick={deleteAtTail} disabled={status !== 'idle' || nodes.length === 0} className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 disabled:opacity-50 text-sm font-bold rounded-lg transition-colors">
                    Delete from Tail (O(N))
                </button>
                <button onClick={() => deleteAtPos(Math.floor(nodes.length/2))} disabled={status !== 'idle' || nodes.length < 3} className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 disabled:opacity-50 text-sm font-bold rounded-lg transition-colors">
                    Delete from Middle (O(N))
                </button>
                <button onClick={reset} disabled={status !== 'idle'} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors ml-auto">
                    <RefreshCw size={16} className="inline mr-2" /> Reset
                </button>
            </div>

            <div className="min-h-[160px] bg-[#0d1117] rounded-xl border border-slate-800 p-8 flex items-center overflow-x-auto relative">
                {nodes.length === 0 ? (
                    <div className="w-full text-center text-slate-600 italic">List is empty.</div>
                ) : (
                    <div className="flex items-center gap-1">
                        <div className="text-emerald-400 font-bold text-sm mr-4 flex flex-col items-center">
                            <span>head</span>
                            <ArrowRight size={16} className="text-emerald-500 mt-1 rotate-90" />
                        </div>
                        {nodes.map((node, i) => {
                            const isTarget = node.id === targetId;
                            return (
                                <div key={node.id} className={\`flex items-center gap-1 transition-all duration-500 \${isTarget ? 'opacity-20 scale-90 blur-[2px]' : ''}\`}>
                                    <div className={\`flex border \${isTarget ? 'border-red-500 bg-red-900/20' : 'border-slate-600 bg-slate-800'} rounded-lg overflow-hidden shadow-lg\`}>
                                        <div className={\`px-4 py-3 border-r \${isTarget ? 'border-red-500/50 text-red-400' : 'border-slate-700 text-white'} bg-slate-700/50 min-w-[3rem] text-center\`}>
                                            {node.val}
                                        </div>
                                        <div className="px-3 py-3 text-xs text-orange-400 font-mono bg-slate-900/50 flex items-center justify-center">
                                            {i === nodes.length - 1 ? 'NULL' : 'ptr'}
                                        </div>
                                    </div>
                                    {i < nodes.length - 1 && (
                                        <div className={\`text-orange-500 mx-2 transition-all duration-500 \${isTarget ? 'opacity-0 w-0 -mx-2' : ''}\`}>
                                            <ArrowRight size={20} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            <div className="mt-4 text-sm text-slate-400 bg-slate-800/50 p-4 rounded-lg flex items-start gap-3">
                <MousePointerClick className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                <p>
                    <strong className="text-white">Note the Time Complexity:</strong> Deleting from the head is instantly <strong>O(1)</strong> because we already have the <code>head</code> pointer. Deleting from the tail or middle requires traversing the list from the beginning to find the node immediately preceding the target, making it <strong>O(N)</strong>.
                </p>
            </div>
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Insertion & Deletion</h1>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 2</p>
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
                        <Link href="/unit2/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> L1: Intro to Linked Lists
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Insertion & Deletion</h2>
                        <Link href="/unit2/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Reversing a Linked List <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Art of Re-Wiring" icon={Database}>
                        <p>
                            Unlike arrays where you have to shift elements physically in memory, inserting or deleting an element in a Linked List simply involves changing the <strong>pointers</strong> (the addresses).
                        </p>
                        <p>
                            Think of it like redirecting trains on a track. You don't need to pick up the train cars and move them; you just flip a switch to route the track to a new car, and then route that new car back to the rest of the train.
                        </p>
                    </TheoryCard>

                    <InsertionVisualizer />

                    <TheoryCard title="Insertion Operations in C++" icon={Code}>
                        <h4 className="font-bold text-emerald-400 mt-4 mb-2">1. Insert at Beginning (Head)</h4>
                        <p className="mb-4">
                            This is an <strong>O(1)</strong> operation. We create a new node, point its <code>next</code> to the current head, and then update the head pointer to point to the new node.
                        </p>
                        <CodeBlock 
                            title="InsertHead.cpp"
                            code={\`void insertAtHead(Node*& head, int val) {
    Node* newNode = new Node(val); // 1. Create node
    newNode->next = head;          // 2. Point new node's next to current head
    head = newNode;                // 3. Update head to be the new node
}\`}
                        />
                        <h4 className="font-bold text-emerald-400 mt-8 mb-2">2. Insert at End (Tail)</h4>
                        <p className="mb-4">
                            This is an <strong>O(N)</strong> operation (unless you maintain a separate <code>tail</code> pointer). We must traverse from the head all the way to the node whose <code>next</code> is <code>nullptr</code>, and update it.
                        </p>
                        <CodeBlock 
                            title="InsertTail.cpp"
                            code={\`void insertAtTail(Node*& head, int val) {
    Node* newNode = new Node(val);
    
    if (head == nullptr) {         // Edge case: Empty list
        head = newNode;
        return;
    }
    
    Node* temp = head;
    while (temp->next != nullptr) { // Traverse to the last node
        temp = temp->next;
    }
    temp->next = newNode;          // Link the last node to the new node
}\`}
                        />
                    </TheoryCard>

                    <DeletionVisualizer />

                    <TheoryCard title="Deletion Operations in C++" icon={Trash2}>
                        <p>
                            When deleting nodes in C++, it is absolutely critical that you use the <code>delete</code> keyword to free the memory. Failing to do so results in a <strong>Memory Leak</strong>.
                        </p>
                        <h4 className="font-bold text-red-400 mt-6 mb-2">Delete from Beginning (Head)</h4>
                        <CodeBlock 
                            title="DeleteHead.cpp"
                            code={\`void deleteAtHead(Node*& head) {
    if (head == nullptr) return; // Edge case: Empty list
    
    Node* temp = head;           // Store the current head
    head = head->next;           // Move head to the next node
    delete temp;                 // FREE THE MEMORY!
}\`}
                        />
                        
                        <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-6">
                            <h4 className="font-bold text-red-400 mb-2">⚠️ The Danger of Dangling Pointers</h4>
                            <p className="text-sm">
                                If you write <code>head = head-&gt;next;</code> without first storing the old head in a temporary variable, you lose the memory address of the old head forever! You can never <code>delete</code> it, causing a permanent memory leak in your application.
                            </p>
                        </div>
                    </TheoryCard>

                    <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Inserting and deleting at the head of a Linked List is extremely fast <strong>(O(1))</strong>. However, operations anywhere else require traversing the list, taking <strong>O(N)</strong> time. Remember the golden rule of pointer manipulation: <strong>Always connect the new node to the list BEFORE breaking the old connections!</strong>
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit2/L2/page.tsx', content);
console.log("DSA Unit 2 Lecture 2 Generation Complete.");
