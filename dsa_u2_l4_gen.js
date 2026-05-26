const fs = require('fs');

const content = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Search, Target, Unlock } from 'lucide-react';

// --- Shared Components ---
const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-orange-500/10 text-orange-400 rounded-lg"><Icon size={20} /></span>}
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
                <Code size={14} className="text-orange-400" />
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

// --- INTERACTIVE 1: Cycle Detection (Floyd's Algorithm) ---
const FloydsAlgorithm = () => {
    const [state, setState] = useState<'idle' | 'running' | 'detected'>('idle');
    const [pointers, setPointers] = useState({ slow: 0, fast: 0 });

    const nodes = [10, 20, 30, 40, 50, 60, 70];
    const loopStartIndex = 3; // 40 is the start of the loop
    const tailIndex = 6; // 70 loops back to 40

    const runSimulation = () => {
        setState('running');
        let s = 0;
        let f = 0;
        
        const getNext = (i: number) => {
            if (i === tailIndex) return loopStartIndex;
            return i + 1;
        };
        
        const interval = setInterval(() => {
            s = getNext(s);
            f = getNext(getNext(f));
            
            setPointers({ slow: s, fast: f });
            
            if (s === f) {
                clearInterval(interval);
                setState('detected');
            }
        }, 1500);
    };

    const reset = () => {
        setState('idle');
        setPointers({ slow: 0, fast: 0 });
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Search size={20} className="text-orange-400"/> Interactive: Floyd's Cycle Finding Algorithm</h4>
            
            <div className="flex gap-4 mb-8">
                <button onClick={runSimulation} disabled={state !== 'idle'} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                    <Search size={16} /> Start Tortoise & Hare
                </button>
                <button onClick={reset} disabled={state === 'idle'} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors ml-auto">
                    Reset
                </button>
            </div>

            <div className="h-64 bg-[#0d1117] rounded-xl border border-slate-800 p-8 flex items-center justify-center relative overflow-hidden">
                {state === 'detected' && (
                    <div className="absolute top-4 left-4 right-4 bg-orange-500/20 border border-orange-500 text-orange-400 font-bold p-3 rounded-lg text-center z-20 animate-in fade-in slide-in-from-top-4">
                        Collision Detected at Node {nodes[pointers.slow]}! Loop Exists!
                    </div>
                )}
                
                <div className="flex items-center gap-6 relative mt-8">
                    {nodes.map((val, i) => {
                        const isSlow = pointers.slow === i;
                        const isFast = pointers.fast === i;
                        const isCollision = isSlow && isFast && state === 'detected';
                        
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                                {/* Pointers */}
                                <div className="absolute -top-12 flex flex-col items-center h-10 w-24">
                                    {isSlow && <span className={\`text-[10px] font-bold font-mono px-2 py-0.5 rounded \${isCollision ? 'bg-red-500 text-white' : 'text-emerald-400 bg-emerald-500/20'}\`}>slow</span>}
                                    {isFast && <span className={\`text-[10px] font-bold font-mono px-2 py-0.5 rounded mt-1 \${isCollision ? 'bg-red-500 text-white' : 'text-blue-400 bg-blue-500/20'}\`}>fast (x2)</span>}
                                </div>
                                
                                <div className={\`flex border \${isCollision ? 'border-red-500 bg-red-900/50 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110' : isSlow ? 'border-emerald-500' : isFast ? 'border-blue-500' : 'border-slate-600'} rounded-full w-12 h-12 items-center justify-center bg-slate-800 shadow-lg transition-all duration-300\`}>
                                    <span className="font-bold text-white">{val}</span>
                                </div>
                                
                                {i < nodes.length - 1 && (
                                    <div className="absolute top-3 -right-6 text-slate-600 z-0">
                                        <ArrowRight size={20} className="translate-x-1"/>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    
                    {/* The Loop Arrow */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                        <path 
                            d="M 390 10 Q 390 120 210 120 Q 210 120 210 45" 
                            fill="none" 
                            stroke="rgba(249, 115, 22, 0.5)" 
                            strokeWidth="3" 
                            strokeDasharray="6 4" 
                            markerEnd="url(#arrow-loop)" 
                        />
                        <defs>
                            <marker id="arrow-loop" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(249, 115, 22, 0.5)" />
                            </marker>
                        </defs>
                    </svg>
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Cycle Detection</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 2 • Lecture 4</p>
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
                        <Link href="/unit2/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> L3: Classic Algorithms
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Detecting Loops in Linked Lists</h2>
                        <Link href="/unit2/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Doubly Linked Lists <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Problem with Cycles" icon={Database}>
                        <p>
                            A cycle (or loop) in a Linked List occurs when a node's <code>next</code> pointer points back to a previous node in the list, rather than pointing to <code>NULL</code>.
                        </p>
                        <p>
                            If you try to traverse a cyclic linked list using a standard <code>while (curr != nullptr)</code> loop, your program will get stuck in an <strong>infinite loop</strong> and eventually crash or time out.
                        </p>
                    </TheoryCard>

                    <FloydsAlgorithm />

                    <TheoryCard title="Floyd's Cycle-Finding Algorithm (Tortoise & Hare)" icon={Target}>
                        <p>
                            To detect a cycle in <strong>O(N)</strong> time and <strong>O(1)</strong> space, we use two pointers:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Slow Pointer (Tortoise):</strong> Moves 1 step at a time.</li>
                            <li><strong>Fast Pointer (Hare):</strong> Moves 2 steps at a time.</li>
                        </ul>
                        <p className="mt-4">
                            If there is no cycle, the fast pointer will reach <code>NULL</code> and we know the list is safe. If there IS a cycle, the fast pointer will enter the loop and continuously cycle around. Eventually, it will "lap" the slow pointer and they will collide at the exact same node!
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="DetectCycle.cpp"
                        code={\`bool hasCycle(Node *head) {
    if (head == nullptr) return false;
    
    Node* slow = head;
    Node* fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;          // Move 1 step
        fast = fast->next->next;    // Move 2 steps
        
        if (slow == fast) {
            return true; // Collision detected! There is a loop.
        }
    }
    
    return false; // Fast reached NULL, no loop.
}\`}
                    />

                    <TheoryCard title="Finding the Starting Node of the Loop" icon={Search}>
                        <p>
                            Once a collision is detected, Floyd's Algorithm gives us a magical mathematical guarantee:
                        </p>
                        <p className="font-bold text-orange-400">
                            The distance from the Head of the list to the Start of the Loop is exactly equal to the distance from the Collision Point to the Start of the Loop.
                        </p>
                        <p>
                            To find the start of the loop:
                            <br/>1. Leave one pointer at the Collision Point.
                            <br/>2. Move the other pointer back to the Head.
                            <br/>3. Move BOTH pointers exactly 1 step at a time.
                            <br/>4. The node where they meet is the start of the loop!
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="FindLoopStart.cpp"
                        code={\`Node* detectCycleStart(Node *head) {
    if (head == nullptr) return nullptr;
    
    Node* slow = head;
    Node* fast = head;
    bool hasLoop = false;
    
    // 1. Detect Loop
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            hasLoop = true;
            break;
        }
    }
    
    if (!hasLoop) return nullptr;
    
    // 2. Find Start Node
    slow = head; // Reset slow to head
    while (slow != fast) {
        slow = slow->next; // Move 1 step
        fast = fast->next; // Move 1 step
    }
    
    return slow; // The start of the loop!
}\`}
                    />

                    <TheoryCard title="Removing the Loop" icon={Unlock}>
                        <p>
                            If we are asked to remove the loop, we simply need to find the node <em>just before</em> the start of the loop, and set its <code>next</code> pointer to <code>NULL</code>.
                        </p>
                        <p>
                            We can slightly modify the "Find Start Node" logic above. Instead of checking if <code>slow == fast</code>, we check if <code>slow-&gt;next == fast-&gt;next</code>. When this is true, <code>fast</code> is sitting on the last node of the loop! We just execute <code>fast-&gt;next = nullptr</code> to break it.
                        </p>
                    </TheoryCard>

                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Floyd's Tortoise and Hare algorithm is an elegant and heavily tested interview concept. It allows us to detect loops, find the start of loops, and find the middle of a linked list—all in <strong>O(N)</strong> time without using any extra memory structures like HashSets!
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit2/L4/page.tsx', content);
console.log("DSA Unit 2 Lecture 4 Generation Complete.");
