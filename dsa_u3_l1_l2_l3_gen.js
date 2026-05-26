const fs = require('fs');

const content1 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Database, Layers, ArrowUpCircle } from 'lucide-react';

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

// --- INTERACTIVE: Stack Array Implementation ---
const StackVisualizer = () => {
    const [stack, setStack] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState('');
    const MAX_SIZE = 5;

    const push = () => {
        if (stack.length < MAX_SIZE && inputValue !== '') {
            setStack([...stack, parseInt(inputValue)]);
            setInputValue('');
        }
    };

    const pop = () => {
        if (stack.length > 0) {
            setStack(stack.slice(0, -1));
        }
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Layers size={20} className="text-indigo-400"/> Interactive: Stack Operations (Array)</h4>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter number"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white w-32 focus:outline-none focus:border-indigo-500"
                        />
                        <button onClick={push} disabled={stack.length >= MAX_SIZE || inputValue === ''} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                            Push <ArrowUpCircle size={16} />
                        </button>
                    </div>
                    <button onClick={pop} disabled={stack.length === 0} className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20">
                        Pop
                    </button>
                    
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-4">
                        <p className="text-sm text-slate-400 mb-2">Variables:</p>
                        <p className="text-white font-mono text-sm">top = {stack.length - 1}</p>
                        <p className="text-white font-mono text-sm mt-1">isFull = {stack.length >= MAX_SIZE ? 'true' : 'false'}</p>
                        <p className="text-white font-mono text-sm mt-1">isEmpty = {stack.length === 0 ? 'true' : 'false'}</p>
                    </div>
                </div>

                <div className="relative w-48 h-64 border-x-4 border-b-4 border-slate-700 rounded-b-xl flex flex-col justify-end p-2 pb-0">
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                        Max Size: {MAX_SIZE}
                    </div>
                    {/* Render empty slots */}
                    {Array.from({ length: MAX_SIZE - stack.length }).map((_, i) => (
                        <div key={\`empty-\${i}\`} className="w-full h-10 border border-dashed border-slate-700/50 mb-2 rounded bg-slate-800/10" />
                    ))}
                    {/* Render items reversed (top at top) */}
                    {[...stack].reverse().map((item, index) => {
                        const isTop = index === 0;
                        return (
                            <div key={index} className={\`w-full h-10 mb-2 rounded flex items-center justify-center font-bold text-white transition-all animate-in slide-in-from-top-10 \${isTop ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] border-2 border-indigo-400' : 'bg-slate-700 border border-slate-600'}\`}>
                                {item}
                                {isTop && <span className="absolute -right-16 text-indigo-400 font-mono text-sm flex items-center gap-1"><ArrowLeft size={14}/> top</span>}
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Stack Introduction</h1>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Unit 3 • Lecture 1</p>
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
                        <Link href="/unit2/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> U2: Circular Linked List
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Introduction to Stacks (Array Impl)</h2>
                        <Link href="/unit3/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Stack using Linked List <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="What is a Stack?" icon={Database}>
                        <p>
                            A Stack is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle. Think of it like a stack of plates in a cafeteria: the last plate you put on top is the first one you take off.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-300">
                            <li><strong>Push:</strong> Insert an element at the top.</li>
                            <li><strong>Pop:</strong> Remove the element from the top.</li>
                            <li><strong>Peek / Top:</strong> Look at the top element without removing it.</li>
                            <li><strong>isEmpty:</strong> Check if the stack has no elements.</li>
                        </ul>
                    </TheoryCard>

                    <StackVisualizer />

                    <TheoryCard title="Array Implementation of Stack" icon={Code}>
                        <p>
                            Implementing a stack using an array is straightforward. We need a fixed-size array and an integer variable called <code>top</code> initialized to <code>-1</code>.
                        </p>
                        <CodeBlock 
                            title="StackArray.cpp"
                            code={\`#include <iostream>
using namespace std;

class Stack {
    int* arr;
    int top;
    int capacity;

public:
    Stack(int size) {
        capacity = size;
        arr = new int[capacity];
        top = -1; // -1 means empty
    }

    void push(int x) {
        if (top == capacity - 1) {
            cout << "Stack Overflow\\n";
            return;
        }
        arr[++top] = x; // Increment top, then insert
    }

    void pop() {
        if (top == -1) {
            cout << "Stack Underflow\\n";
            return;
        }
        top--; // Just decrement top, no need to delete data
    }

    int peek() {
        if (top == -1) return -1;
        return arr[top];
    }
};\`}
                        />
                    </TheoryCard>

                    <TheoryCard title="Pros and Cons of Array Implementation" icon={Layers}>
                        <p><strong>Advantages:</strong></p>
                        <ul className="list-disc pl-6 space-y-1 mb-4 text-emerald-400">
                            <li>Easy to implement.</li>
                            <li>Memory is saved as pointers are not involved.</li>
                        </ul>
                        <p><strong>Disadvantages:</strong></p>
                        <ul className="list-disc pl-6 space-y-1 text-red-400">
                            <li><strong>Static Size:</strong> It is not dynamic. It doesn't grow or shrink depending on needs at runtime (unless we use dynamic arrays like <code>std::vector</code>).</li>
                        </ul>
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
`;

const content2 = `"use client";
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
                                <div className={\`flex border \${index === 0 ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-slate-600'} rounded overflow-hidden bg-slate-800\`}>
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
                            code={\`#include <iostream>
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
            cout << "Heap Overflow\\n"; return;
        }
        newNode->next = top;
        top = newNode; // New node is now the head (top)
    }

    void pop() {
        if (top == nullptr) {
            cout << "Stack Underflow\\n"; return;
        }
        Node* temp = top;
        top = top->next; // Move head to next node
        delete temp;     // Free memory
    }

    int peek() {
        if (top == nullptr) return -1;
        return top->data;
    }
};\`}
                        />
                    </TheoryCard>

                </main>
            </div>
        </div>
    );
}
`;

const content3 = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, AlignLeft, Layers } from 'lucide-react';

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

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);
    const [expression, setExpression] = useState("A+B*C");

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Infix, Prefix, Postfix</h1>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Unit 3 • Lecture 3</p>
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
                        <Link href="/unit3/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Stack via Linked List
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Expression Evaluations</h2>
                        <Link href="/unit3/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Queue Array <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Three Notations" icon={AlignLeft}>
                        <p>
                            Arithmetic expressions can be written in three different notations based on the position of the <strong>Operator</strong> relative to the <strong>Operands</strong>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-orange-400 font-bold text-lg mb-2">Infix</h4>
                                <p className="text-sm mb-4">Operator is IN BETWEEN operands.</p>
                                <div className="text-2xl font-mono text-white text-center py-4 bg-[#0d1117] rounded-lg">A + B</div>
                                <p className="text-xs text-slate-400 mt-4 text-center">Standard human format.</p>
                            </div>
                            
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-emerald-400 font-bold text-lg mb-2">Prefix (Polish)</h4>
                                <p className="text-sm mb-4">Operator is BEFORE operands.</p>
                                <div className="text-2xl font-mono text-white text-center py-4 bg-[#0d1117] rounded-lg">+ A B</div>
                                <p className="text-xs text-slate-400 mt-4 text-center">Read right-to-left.</p>
                            </div>
                            
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 border-t-4 border-t-indigo-500 relative">
                                <span className="absolute -top-3 right-4 bg-indigo-500 text-xs font-bold px-2 py-1 rounded text-white">Most Important!</span>
                                <h4 className="text-blue-400 font-bold text-lg mb-2">Postfix (Reverse Polish)</h4>
                                <p className="text-sm mb-4">Operator is AFTER operands.</p>
                                <div className="text-2xl font-mono text-white text-center py-4 bg-[#0d1117] rounded-lg">A B +</div>
                                <p className="text-xs text-slate-400 mt-4 text-center">Extremely easy for computers.</p>
                            </div>
                        </div>
                    </TheoryCard>

                    <TheoryCard title="Why do computers love Postfix?" icon={Layers}>
                        <p>
                            When a computer evaluates an <strong>Infix</strong> expression like <code>2 + 3 * 4</code>, it has to scan back and forth to respect BODMAS/PEMDAS rules. It must know that <code>*</code> has higher precedence than <code>+</code>.
                        </p>
                        <p>
                            If we convert it to <strong>Postfix</strong>: <code>2 3 4 * +</code>, the computer can evaluate it in a single left-to-right pass using a <strong>Stack</strong> without worrying about parentheses or precedence!
                        </p>
                    </TheoryCard>

                    <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Stack Algorithm for Postfix Evaluation</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed text-left">
                            1. Scan expression from left to right.<br/>
                            2. If you see an <strong>Operand</strong> (number), <strong>PUSH</strong> it to the stack.<br/>
                            3. If you see an <strong>Operator</strong> (+, -, *, /), <strong>POP</strong> two operands from the stack.<br/>
                            4. Apply the operator to them (note: <code>val2 operator val1</code>).<br/>
                            5. <strong>PUSH</strong> the result back to the stack.<br/>
                            6. When expression ends, the final answer is sitting at the top of the stack!
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
`;

fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit3/L1/page.tsx', content1);
fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit3/L2/page.tsx', content2);
fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit3/L3/page.tsx', content3);
console.log("DSA Unit 3 Lectures 1, 2, 3 Generation Complete.");
