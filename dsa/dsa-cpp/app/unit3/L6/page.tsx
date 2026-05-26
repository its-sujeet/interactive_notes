"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, RotateCw } from 'lucide-react';

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

// --- INTERACTIVE: Circular Queue Visualizer ---
const CircularQueueVisualizer = () => {
    const [queue, setQueue] = useState<(number | null)[]>([null, null, null, null, null]);
    const [front, setFront] = useState(-1);
    const [rear, setRear] = useState(-1);
    const MAX_SIZE = 5;

    const enqueue = () => {
        if ((rear + 1) % MAX_SIZE === front) {
            alert("Queue is Full!");
            return;
        }
        
        let newFront = front;
        if (front === -1) newFront = 0;
        
        const newRear = (rear + 1) % MAX_SIZE;
        
        const newQueue = [...queue];
        newQueue[newRear] = Math.floor(Math.random() * 90) + 10;
        
        setQueue(newQueue);
        setFront(newFront);
        setRear(newRear);
    };

    const dequeue = () => {
        if (front === -1) {
            alert("Queue is Empty!");
            return;
        }
        
        const newQueue = [...queue];
        newQueue[front] = null;
        
        let newFront = front;
        let newRear = rear;
        
        if (front === rear) {
            // Last element deleted
            newFront = -1;
            newRear = -1;
        } else {
            newFront = (front + 1) % MAX_SIZE;
        }
        
        setQueue(newQueue);
        setFront(newFront);
        setRear(newRear);
    };

    return (
        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-8 overflow-hidden relative">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><RotateCw size={20} className="text-emerald-400"/> Interactive: Circular Queue Array</h4>
            
            <div className="flex gap-4 mb-8 justify-center">
                <button onClick={enqueue} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors">
                    Enqueue
                </button>
                <button onClick={dequeue} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors">
                    Dequeue
                </button>
            </div>

            <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 border-4 border-slate-700 rounded-full flex items-center justify-center p-8">
                    {queue.map((val, i) => {
                        const angle = (i * 360) / MAX_SIZE;
                        const isFront = i === front;
                        const isRear = i === rear;
                        
                        return (
                            <div 
                                key={i} 
                                className={`absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${val !== null ? 'border-emerald-500 bg-emerald-500/20 text-white' : 'border-slate-600 bg-slate-800 text-slate-500 border-dashed'}`}
                                style={{ transform: `rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)` }}
                            >
                                {val !== null ? val : '-'}
                                
                                {isFront && <div className="absolute -bottom-6 text-[10px] font-mono text-orange-400 bg-slate-900 px-1 rounded">front</div>}
                                {isRear && <div className="absolute -top-6 text-[10px] font-mono text-blue-400 bg-slate-900 px-1 rounded">rear</div>}
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-8 flex gap-8 font-mono text-sm">
                    <div className="text-orange-400">front: {front}</div>
                    <div className="text-blue-400">rear: {rear}</div>
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
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Circular Queue</h1>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Unit 3 • Lecture 6</p>
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
                        <Link href="/unit3/L5" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Linked List Queue
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Circular Queue Array</h2>
                        <Link href="/unit4/L1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Unit 4: Trees <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Modulo Magic" icon={RotateCw}>
                        <p>
                            In Lecture 4, we saw that a linear array queue wastes space at the front as elements are dequeued. We can fix this by treating the array as a circle!
                        </p>
                        <p>
                            Instead of doing <code>rear = rear + 1</code>, we do:
                            <br/><code>rear = (rear + 1) % MAX_SIZE</code>
                        </p>
                        <p>
                            This allows the <code>rear</code> pointer to wrap around to index 0 if there is empty space at the beginning of the array.
                        </p>
                    </TheoryCard>

                    <CircularQueueVisualizer />

                    <TheoryCard title="Key Conditions" icon={Code}>
                        <ul className="list-disc pl-6 space-y-4 text-slate-300">
                            <li>
                                <strong>Queue Full Condition:</strong><br/>
                                <code>(rear + 1) % capacity == front</code><br/>
                                <span className="text-sm text-slate-400">If the next spot for rear is where front is sitting, the queue is full.</span>
                            </li>
                            <li>
                                <strong>Queue Empty Condition:</strong><br/>
                                <code>front == -1</code>
                            </li>
                        </ul>
                    </TheoryCard>

                    <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Unit 3 Complete!</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Congratulations on completing Stacks and Queues! You now understand LIFO and FIFO structures, expression evaluations, and how to implement these efficiently using both static arrays and dynamic linked lists. Next up: Non-Linear Data Structures in <strong>Unit 4: Trees</strong>.
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
