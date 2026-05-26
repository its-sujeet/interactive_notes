const fs = require('fs');

const content = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, RefreshCcw, Merge, Target } from 'lucide-react';

// --- Shared Components ---
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

// --- INTERACTIVE 1: Reversing ---
const ReverseVisualizer = () => {
    const [nodes, setNodes] = useState([1, 2, 3, 4, 5]);
    const [state, setState] = useState<'idle' | 'running'>('idle');
    const [pointers, setPointers] = useState({ prev: -1, curr: 0, next: 1 });

    const stepSimulation = () => {
        setState('running');
        let p = -1;
        let c = 0;
        let n = 1;
        
        const interval = setInterval(() => {
            if (c >= nodes.length) {
                clearInterval(interval);
                setNodes([...nodes].reverse());
                setPointers({ prev: -1, curr: -1, next: -1 });
                setState('idle');
                return;
            }
            
            setPointers({ prev: p, curr: c, next: n });
            p = c;
            c = n;
            n = n + 1;
            
        }, 1000);
    };

    const reset = () => {
        setNodes([1, 2, 3, 4, 5]);
        setPointers({ prev: -1, curr: 0, next: 1 });
        setState('idle');
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><RefreshCcw size={20} className="text-purple-400"/> Interactive: 3-Pointer Reverse</h4>
            
            <div className="flex gap-4 mb-8">
                <button onClick={stepSimulation} disabled={state !== 'idle'} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                    <RefreshCcw size={16} /> Run Simulation
                </button>
                <button onClick={reset} disabled={state !== 'idle'} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors ml-auto">
                    Reset
                </button>
            </div>

            <div className="h-64 bg-[#0d1117] rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center relative">
                <div className="flex items-center gap-1 mb-8">
                    {nodes.map((val, i) => {
                        const isPrev = pointers.prev === i;
                        const isCurr = pointers.curr === i;
                        const isNext = pointers.next === i;
                        
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 relative">
                                {/* Pointers */}
                                <div className="absolute -top-8 flex flex-col items-center">
                                    {isPrev && <span className="text-[10px] text-red-400 font-bold font-mono">prev</span>}
                                    {isCurr && <span className="text-[10px] text-emerald-400 font-bold font-mono">curr</span>}
                                    {isNext && <span className="text-[10px] text-blue-400 font-bold font-mono">next</span>}
                                </div>
                                
                                <div className={\`flex border \${isCurr ? 'border-emerald-500 bg-emerald-900/20' : 'border-slate-600 bg-slate-800'} rounded-lg overflow-hidden shadow-lg\`}>
                                    <div className="px-4 py-3 border-r border-slate-700 font-bold text-white bg-slate-700/50 min-w-[3rem] text-center">
                                        {val}
                                    </div>
                                </div>
                                
                                {i < nodes.length - 1 && (
                                    <div className={\`absolute top-3 -right-8 z-10 \${(state === 'running' && i < pointers.curr) ? 'rotate-180 text-purple-500' : 'text-orange-500'}\`}>
                                        <ArrowRight size={20} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="mt-4 text-sm text-slate-400 bg-slate-800/50 p-4 rounded-lg">
                <strong className="text-white">The Trick:</strong> We need 3 pointers (<code>prev</code>, <code>curr</code>, <code>next</code>) because the moment we reverse <code>curr-&gt;next = prev</code>, we lose access to the rest of the list! <code>next</code> saves the rest of the list for us.
            </div>
        </div>
    );
};

// --- INTERACTIVE 2: Slow & Fast Pointers (Middle) ---
const TortoiseHareVisualizer = () => {
    const [nodes] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [state, setState] = useState<'idle' | 'running'>('idle');
    const [pointers, setPointers] = useState({ slow: 0, fast: 0 });

    const runSimulation = () => {
        setState('running');
        let s = 0;
        let f = 0;
        
        const interval = setInterval(() => {
            if (f >= nodes.length - 1 || f + 1 >= nodes.length - 1) {
                clearInterval(interval);
                // one last step if possible
                if(f + 2 < nodes.length) {
                    s += 1;
                    f += 2;
                } else if(f + 1 < nodes.length) {
                    s += 1;
                    f += 1;
                }
                setPointers({ slow: s, fast: f });
                setState('idle');
                return;
            }
            s += 1;
            f += 2;
            setPointers({ slow: s, fast: f });
            
        }, 1500);
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Target size={20} className="text-purple-400"/> Interactive: Finding the Middle (Tortoise & Hare)</h4>
            
            <div className="flex gap-4 mb-8">
                <button onClick={runSimulation} disabled={state !== 'idle'} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                    <Play size={16} /> Run Fast/Slow Pointers
                </button>
                <button onClick={() => setPointers({slow: 0, fast: 0})} disabled={state !== 'idle'} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors ml-auto">
                    Reset
                </button>
            </div>

            <div className="h-48 bg-[#0d1117] rounded-xl border border-slate-800 p-8 flex items-center overflow-x-auto relative">
                <div className="flex items-center gap-6">
                    {nodes.map((val, i) => {
                        const isSlow = pointers.slow === i;
                        const isFast = pointers.fast === i;
                        
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 relative">
                                {/* Pointers */}
                                <div className="absolute -top-10 flex flex-col items-center h-8">
                                    {isSlow && <span className="text-[10px] text-emerald-400 font-bold font-mono bg-emerald-500/20 px-2 py-0.5 rounded">slow (x1)</span>}
                                    {isFast && <span className="text-[10px] text-orange-400 font-bold font-mono bg-orange-500/20 px-2 py-0.5 rounded mt-1">fast (x2)</span>}
                                </div>
                                
                                <div className={\`flex border \${isSlow && isFast ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : isSlow ? 'border-emerald-500' : isFast ? 'border-orange-500' : 'border-slate-600'} rounded-full w-12 h-12 items-center justify-center bg-slate-800 shadow-lg\`}>
                                    <span className="font-bold text-white">{val}</span>
                                </div>
                                
                                {i < nodes.length - 1 && (
                                    <div className="absolute top-3 -right-6 text-slate-600 z-[-1]">
                                        ---
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
                {/* HEADER */}
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Standard Operations</h1>
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 3</p>
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
                        <Link href="/unit2/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> L2: Insert & Delete
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Classic Linked List Algorithms</h2>
                        <Link href="/unit2/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Cycle Detection <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="1. Reversing a Linked List" icon={RefreshCcw}>
                        <p>
                            Reversing a Singly Linked List is one of the most famous interview questions of all time. 
                            Because the list is singly-linked, you can only move forward. How do you make all the arrows point backward?
                        </p>
                        <p>
                            You iterate through the list, changing the <code>next</code> pointer of the current node to point to the previous node. However, to do this without losing the rest of the list, you need <strong>three pointers</strong>.
                        </p>
                    </TheoryCard>

                    <ReverseVisualizer />

                    <CodeBlock 
                        title="ReverseList.cpp"
                        code={\`Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    Node* next = nullptr;
    
    while (curr != nullptr) {
        next = curr->next;  // 1. Save the rest of the list
        curr->next = prev;  // 2. Reverse the pointer
        
        prev = curr;        // 3. Move prev forward
        curr = next;        // 4. Move curr forward
    }
    
    return prev; // prev is now pointing to the new head
}\`}
                    />

                    <TheoryCard title="2. Finding the Middle Node" icon={Target}>
                        <p>
                            If you have an array, finding the middle is easy: <code>arr[n/2]</code>. But in a Linked List, you don't know the size <code>n</code>!
                        </p>
                        <p>
                            <strong>Naive Approach:</strong> Traverse the entire list to count the nodes (find <code>n</code>). Then, traverse it again up to <code>n/2</code>. This takes two passes.
                        </p>
                        <p>
                            <strong>Optimal Approach (Tortoise and Hare):</strong> Use two pointers. A <code>slow</code> pointer that moves 1 step at a time, and a <code>fast</code> pointer that moves 2 steps at a time. When the <code>fast</code> pointer reaches the end, the <code>slow</code> pointer will be exactly at the middle!
                        </p>
                    </TheoryCard>

                    <TortoiseHareVisualizer />

                    <CodeBlock 
                        title="FindMiddle.cpp"
                        code={\`Node* findMiddle(Node* head) {
    if (head == nullptr) return nullptr;
    
    Node* slow = head;
    Node* fast = head;
    
    // Fast moves 2 steps, Slow moves 1 step
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    return slow; // Slow is now at the middle
}\`}
                    />

                    <TheoryCard title="3. Merging Two Sorted Lists" icon={Merge}>
                        <p>
                            Given two linked lists that are already sorted, merge them into a single sorted linked list. 
                            This is the exact same logic used in the Merge Step of <strong>Merge Sort</strong>.
                        </p>
                        <p>
                            We use a <strong>Dummy Node</strong> to anchor the start of our new list, and a <code>tail</code> pointer to build it up. We compare the heads of both lists, attach the smaller node to our <code>tail</code>, and move forward.
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="MergeSorted.cpp"
                        code={\`Node* mergeTwoLists(Node* list1, Node* list2) {
    Node dummy(0); // Stack allocated dummy node
    Node* tail = &dummy;
    
    while (list1 != nullptr && list2 != nullptr) {
        if (list1->data <= list2->data) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }
    
    // Attach whatever is left (one list will run out first)
    if (list1 != nullptr) tail->next = list1;
    if (list2 != nullptr) tail->next = list2;
    
    return dummy.next; // The real head of the merged list
}\`}
                    />

                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Mastering the <strong>Two-Pointer technique</strong> (fast/slow) and the <strong>Dummy Node technique</strong> is essential for Linked List algorithms. They drastically simplify edge cases and eliminate the need for multi-pass traversals. In Lecture 4, we will use the Tortoise and Hare algorithm to detect cycles!
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit2/L3/page.tsx', content);
console.log("DSA Unit 2 Lecture 3 Generation Complete.");
