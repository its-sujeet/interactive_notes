"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Link as LinkIcon } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><Icon size={20} /></span>}
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
                <Code size={14} className="text-indigo-400" />
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

// --- INTERACTIVE: Stack Linked List Implementation ---
const StackLLVisualizer = () => {
    const [stack, setStack] = useState<number[]>([]);
    
    const push = () => {
        setStack([...stack, Math.floor(Math.random() * 90) + 10]);
    };

    const pop = () => {
        if (stack.length > 0) {
            setStack(stack.slice(0, -1));
        }
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><LinkIcon size={20} className="text-indigo-400"/> Interactive: Stack via Linked List</h4>
            
            <div className="flex gap-4 mb-8 justify-center">
                <button onClick={push} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                    Push (Insert at Head)
                </button>
                <button onClick={pop} disabled={stack.length === 0} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-bold rounded-lg transition-colors shadow-lg">
                    Pop (Delete Head)
                </button>
            </div>

            <div className="h-48 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center p-8 overflow-x-auto relative">
                {stack.length === 0 ? (
                    <div className="text-slate-500 font-mono w-full text-center">head == nullptr (Stack Empty)</div>
                ) : (
                    <div className="flex items-center">
                        <div className="mr-8 flex flex-col items-center">
                            <span className="text-emerald-400 font-bold mb-2 font-mono">top / head</span>
                            <ArrowRight size={20} className="text-emerald-500" />
                        </div>
                        
                        {/* Notice we reverse to show head on the left */}
                        {[...stack].reverse().map((item, index) => (
                            <div key={index} className="flex items-center animate-in fade-in slide-in-from-left-4">
                                <div className={`flex border ${index === 0 ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-slate-600'} rounded overflow-hidden bg-slate-800`}>
                                    <div className="px-4 py-3 font-bold text-white">{item}</div>
                                    <div className="px-2 py-3 border-l border-slate-700 text-xs text-orange-400 font-mono bg-slate-900/50 flex items-center justify-center">next</div>
                                </div>
                                <div className="text-orange-400 mx-2">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        ))}
                        <div className="text-slate-500 font-mono border-2 border-dashed border-slate-700 px-3 py-1 rounded">NULL</div>
                    </div>
                )}
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Stack using Linked List</h1>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Unit 3 • Lecture 2</p>
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
                        <Link href="/unit3/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Array Stack
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Linked List Implementation of Stack</h2>
                        <Link href="/unit3/L3" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Prefix/Postfix/Infix <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Dynamic Memory to the Rescue" icon={Database}>
                        <p>
                            To overcome the static size limitation of arrays, we can implement a Stack using a Singly Linked List.
                        </p>
                        <p>
                            In a Linked List Stack, the <code>top</code> of the stack is represented by the <code>head</code> of the linked list.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Push</strong> = <code>InsertAtHead</code></li>
                            <li><strong>Pop</strong> = <code>DeleteHead</code></li>
                        </ul>
                    </TheoryCard>

                    <StackLLVisualizer />

                    <TheoryCard title="C++ Implementation" icon={Code}>
                        <CodeBlock 
                            title="StackLL.cpp"
                            code={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) { data = val; next = nullptr; }
};

class Stack {
    Node* top;

public:
    Stack() { top = nullptr; }

    void push(int x) {
        Node* newNode = new Node(x);
        if (!newNode) {
            cout << "Heap Overflow\n"; return;
        }
        newNode->next = top;
        top = newNode; // New node is now the head (top)
    }

    void pop() {
        if (top == nullptr) {
            cout << "Stack Underflow\n"; return;
        }
        Node* temp = top;
        top = top->next; // Move head to next node
        delete temp;     // Free memory
    }

    int peek() {
        if (top == nullptr) return -1;
        return top->data;
    }
};`}
                        />
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
