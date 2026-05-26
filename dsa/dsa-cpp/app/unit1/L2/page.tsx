"use client";

import React, { useState } from 'react';
import {
    Activity, Clock, HardDrive, Cpu, Zap, ArrowRight, Sun, Moon, Database,
    Info, Globe, TrendingUp, Maximize2, Minimize2, CheckCircle2
} from 'lucide-react';

const CodeBlock = ({ code, language = 'cpp', explanation, title }: { code: string, language?: string, explanation?: string, title?: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);
    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700/50 my-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-blue-500/30 w-full relative">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/90 backdrop-blur-md border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    {title && <span className="text-xs font-medium text-slate-400 tracking-wider uppercase bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">{title}</span>}
                </div>
                {explanation && (
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${showExplanation ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700'}`}
                    >
                        <Info size={14} /> {showExplanation ? 'HIDE EXPLANATION' : 'EXPLAIN CODE'}
                    </button>
                )}
            </div>
            <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>
                    {code.split('\n').map((line, i) => (
                        <div key={i} className="flex hover:bg-slate-800/30 px-2 -mx-2 rounded transition-colors group/line">
                            <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-4 text-xs mt-0.5 group-hover/line:text-blue-500/50 transition-colors">{i + 1}</span>
                            <span className="flex-1 whitespace-pre">{line || ' '}</span>
                        </div>
                    ))}
                </code>
            </pre>
            {showExplanation && explanation && (
                <div className="bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/50 p-6 text-sm text-slate-300 leading-relaxed animate-in slide-in-from-top-4 fade-in duration-300">
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
};

const ExplainerCard = ({ title, text }: { title?: string, text: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-8 border-t border-slate-800 pt-6">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors uppercase tracking-widest">
                <Info size={16} className={open ? "text-blue-500" : ""} />
                {open ? 'Hide Deep Dive' : 'Read Deep Dive Explanation'}
            </button>
            {open && (
                <div className="mt-4 p-6 bg-blue-950/20 border border-blue-900/50 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Globe size={16}/> Under The Hood {title ? `- ${title}` : ''}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
                </div>
            )}
        </div>
    );
};


// --- INTERACTIVE 1: Asymptotic Notation Bounds ---
const AsymptoticBoundsVisualizer = () => {
    const [notation, setNotation] = useState<'bigO' | 'omega' | 'theta'>('bigO');

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Asymptotic Bounds Simulator</h3>
            <p className="text-slate-400 mb-6">How do we measure algorithm performance? We don't use seconds, because computers have different speeds. We use <strong>Asymptotic Notations</strong> to describe how the algorithm scales as the input size (N) grows towards infinity.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button 
                    onClick={() => setNotation('bigO')}
                    className={`p-4 rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-2 ${notation === 'bigO' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                    <Maximize2 size={24}/>
                    <span>Big O <span className="font-mono">(O)</span></span>
                    <span className="text-xs font-normal opacity-80 uppercase tracking-wider">Upper Bound (Worst Case)</span>
                </button>
                <button 
                    onClick={() => setNotation('omega')}
                    className={`p-4 rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-2 ${notation === 'omega' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                    <Minimize2 size={24}/>
                    <span>Omega <span className="font-mono">(Ω)</span></span>
                    <span className="text-xs font-normal opacity-80 uppercase tracking-wider">Lower Bound (Best Case)</span>
                </button>
                <button 
                    onClick={() => setNotation('theta')}
                    className={`p-4 rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-2 ${notation === 'theta' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                    <CheckCircle2 size={24}/>
                    <span>Theta <span className="font-mono">(Θ)</span></span>
                    <span className="text-xs font-normal opacity-80 uppercase tracking-wider">Tight Bound (Average Case)</span>
                </button>
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl min-h-[300px] flex items-center justify-center relative overflow-hidden">
                {/* Simulated Graph Lines */}
                
                {/* The f(n) Line - The actual algorithm */}
                <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
                    <path d="M 0 300 Q 150 250 300 200 T 800 50" fill="none" stroke="#e2e8f0" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </svg>

                {notation === 'bigO' && (
                    <div className="animate-in fade-in zoom-in duration-500 absolute inset-0 w-full h-full pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <path d="M 0 300 Q 150 200 300 100 T 800 0" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 8" className="drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                        </svg>
                        <div className="absolute top-8 right-16 bg-red-950 border border-red-500 p-4 rounded-xl text-red-400 shadow-xl max-w-sm backdrop-blur-md">
                            <h4 className="font-bold text-lg mb-2">Big O: The Ceiling</h4>
                            <p className="text-sm">O(g(n)) guarantees the algorithm will NEVER take longer than this line as N gets huge. We use Big O the most because we care about the absolute worst-case scenario.</p>
                        </div>
                    </div>
                )}

                {notation === 'omega' && (
                    <div className="animate-in fade-in zoom-in duration-500 absolute inset-0 w-full h-full pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <path d="M 0 300 Q 150 280 300 250 T 800 150" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8 8" className="drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                        </svg>
                        <div className="absolute bottom-16 right-16 bg-blue-950 border border-blue-500 p-4 rounded-xl text-blue-400 shadow-xl max-w-sm backdrop-blur-md">
                            <h4 className="font-bold text-lg mb-2">Omega Ω: The Floor</h4>
                            <p className="text-sm">Ω(g(n)) guarantees the algorithm will take AT LEAST this long. This is the absolute best-case scenario. (e.g. Finding the target on the very first try in an array).</p>
                        </div>
                    </div>
                )}

                {notation === 'theta' && (
                    <div className="animate-in fade-in zoom-in duration-500 absolute inset-0 w-full h-full pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <path d="M 0 300 Q 150 200 300 100 T 800 0" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                            <path d="M 0 300 Q 150 280 300 250 T 800 150" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                            <path d="M 0 300 Q 150 240 300 170 T 800 40" fill="none" stroke="#22c55e" strokeWidth="6" className="drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950 border border-green-500 p-4 rounded-xl text-green-400 shadow-xl max-w-sm backdrop-blur-md text-center">
                            <h4 className="font-bold text-lg mb-2">Theta Θ: The Sandwich</h4>
                            <p className="text-sm">Θ(g(n)) means the algorithm is bounded strictly from above AND below by the same function. It is a precise, tight bound. The exact average case.</p>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-4 left-4 text-white font-bold tracking-widest text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">f(n)</div>
                <div className="absolute bottom-2 right-4 text-slate-500 font-mono text-xs">Input Size (N) ➜</div>
                <div className="absolute top-4 left-2 text-slate-500 font-mono text-xs" style={{ writingMode: 'vertical-rl' }}>Operations (Time) ➜</div>
            </div>

            <ExplainerCard 
                title="Constant Factors"
                text="In Asymptotic notation, we drop constants. O(2N) becomes O(N). O(N/2) becomes O(N). O(N^2 + 500N + 9999) becomes O(N^2). Why? Because as N approaches infinity, the largest term completely dominates the growth rate. A machine running a slow O(N) algorithm will always eventually beat a supercomputer running an O(N^2) algorithm if the input is large enough." 
            />
        </div>
    );
};



// --- INTERACTIVE 2: Big O Hierarchy Chart ---
const BigOHierarchy = () => {
    const [nValue, setNValue] = useState<number>(10);

    const calc = (type: string, n: number) => {
        switch(type) {
            case 'O(1)': return 1;
            case 'O(log N)': return Math.max(1, Math.floor(Math.log2(n)));
            case 'O(N)': return n;
            case 'O(N log N)': return Math.floor(n * Math.log2(n));
            case 'O(N²)': return Math.pow(n, 2);
            case 'O(2^N)': return n > 40 ? 'Infinity (Crash)' : Math.pow(2, n);
            case 'O(N!)': return n > 15 ? 'Infinity (Crash)' : Array.from({length: n}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
            default: return 0;
        }
    };

    const complexities = [
        { name: 'O(1)', desc: 'Constant - Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500' },
        { name: 'O(log N)', desc: 'Logarithmic - Great', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500' },
        { name: 'O(N)', desc: 'Linear - Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' },
        { name: 'O(N log N)', desc: 'Linearithmic - Bad', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500' },
        { name: 'O(N²)', desc: 'Quadratic - Horrible', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500' },
        { name: 'O(2^N)', desc: 'Exponential - Disaster', color: 'text-rose-500', bg: 'bg-rose-500/20', border: 'border-rose-500' },
        { name: 'O(N!)', desc: 'Factorial - Armageddon', color: 'text-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500' }
    ];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Big O Hierarchy Calculator</h3>
            <p className="text-slate-400 mb-6">Adjust the Input Size (N) to see exactly how many operations different time complexities require. Notice how <code className="text-rose-500">O(2^N)</code> and <code className="text-purple-500">O(N!)</code> practically destroy the computer at extremely low values of N.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl mb-6">
                <div className="mb-8">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Input Size (N) = {nValue}</span>
                    <input 
                        type="range" 
                        min="1" 
                        max="1000" 
                        step="1"
                        value={nValue} 
                        onChange={(e) => setNValue(Number(e.target.value))} 
                        className="w-full accent-blue-500" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {complexities.map(c => {
                        const ops = calc(c.name, nValue);
                        const isCrash = typeof ops === 'string';
                        return (
                            <div key={c.name} className={`p-4 rounded-xl border ${c.bg} ${c.border}`}>
                                <div className={`font-black text-xl ${c.color}`}>{c.name}</div>
                                <div className="text-slate-400 text-xs uppercase tracking-widest mb-4">{c.desc}</div>
                                <div className="bg-black/50 p-2 rounded-lg text-center border border-slate-800/50">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Operations</div>
                                    <div className={`font-mono font-bold truncate ${isCrash ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                                        {isCrash ? ops : ops.toLocaleString('en-US')}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <ExplainerCard 
                title="Logarithmic Time (O(log N))"
                text="O(log N) is the holy grail of search algorithms (like Binary Search). If N is 1,000,000, O(N) takes 1,000,000 operations. O(log N) takes exactly 20 operations. It essentially means 'the number of times you can divide N in half before reaching 1'. This is why Binary Search is so infinitely scalable." 
            />
        </div>
    );
};

// --- INTERACTIVE 3: Complexity Equation Reducer ---
const EquationReducer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "1. The Raw Function",
            eq: <>f(n) = 5N² + 200N + 9999</>,
            desc: "This is the exact number of operations an algorithm performs."
        },
        {
            title: "2. Drop Lower Order Terms",
            eq: <>f(n) = 5N² + <span className="line-through decoration-red-500 decoration-4">200N</span> + <span className="line-through decoration-red-500 decoration-4">9999</span></>,
            desc: "As N approaches infinity, N² becomes so massive that the N and constant terms become mathematically irrelevant. We drop them."
        },
        {
            title: "3. Drop Constant Multipliers",
            eq: <>f(n) = <span className="line-through decoration-red-500 decoration-4">5</span>N²</>,
            desc: "Whether it's 5N² or 1000N², it still scales quadratically. In asymptotic analysis, we ignore hardware speeds, so constant multipliers are dropped."
        },
        {
            title: "4. Final Big O Notation",
            eq: <>O(N²)</>,
            desc: "The algorithm is bounded quadratically. This is the worst-case time complexity."
        }
    ];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Complexity Equation Reducer</h3>
            <p className="text-slate-400 mb-6">How do we convert a raw mathematical operation count into Big O Notation? We follow two absolute rules: <strong>Drop Lower Order Terms</strong>, and <strong>Drop Constants</strong>.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="w-full max-w-2xl bg-black border border-slate-800 rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-slate-500 font-bold uppercase tracking-widest text-xs">{steps[step].title}</div>
                    
                    <div className={`text-4xl md:text-5xl font-black font-mono tracking-wider transition-all duration-500 ${step === 3 ? 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-125' : 'text-blue-400'}`}>
                        {steps[step].eq}
                    </div>
                    
                    <p className="mt-8 text-slate-400 text-sm max-w-md h-12">
                        {steps[step].desc}
                    </p>
                </div>

                <div className="flex gap-4 mt-8">
                    <button 
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-50 transition-all"
                    >
                        Previous Step
                    </button>
                    <button 
                        onClick={() => setStep(Math.min(3, step + 1))}
                        disabled={step === 3}
                        className="px-6 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-50 transition-all"
                    >
                        Next Step
                    </button>
                </div>

            </div>
        </div>
    );
};


// --- INTERACTIVE 4: Data Structure Sandbox ---
const DataStructureSandbox = () => {
    const [ds, setDs] = useState<'array' | 'linkedlist' | 'stack' | 'queue'>('array');
    const [elements, setElements] = useState<number[]>([10, 20, 30, 40]);

    const addElement = () => {
        if (elements.length >= 6) return;
        const val = Math.floor(Math.random() * 100);
        if (ds === 'stack') setElements([...elements, val]); // Push to end (top)
        else if (ds === 'queue') setElements([...elements, val]); // Push to end (back)
        else setElements([...elements, val]);
    };

    const removeElement = () => {
        if (elements.length === 0) return;
        if (ds === 'stack') {
            setElements(elements.slice(0, -1)); // Pop from end (top)
        } else if (ds === 'queue') {
            setElements(elements.slice(1)); // Dequeue from start (front)
        } else {
            setElements(elements.slice(0, -1));
        }
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Basic Data Structures Visualizer</h3>
            <p className="text-slate-400 mb-6">Before we dive deep into specific structures, let's visualize the fundamental differences in how data is stored and accessed. Select a structure and modify the data.</p>

            <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setDs('array')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${ds === 'array' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Array</button>
                <button onClick={() => setDs('linkedlist')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${ds === 'linkedlist' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Linked List</button>
                <button onClick={() => setDs('stack')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${ds === 'stack' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Stack (LIFO)</button>
                <button onClick={() => setDs('queue')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${ds === 'queue' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Queue (FIFO)</button>
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8">
                
                {/* Controls */}
                <div className="w-full md:w-48 flex flex-col gap-4">
                    <button 
                        onClick={addElement}
                        disabled={elements.length >= 6}
                        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-lg transition-colors"
                    >
                        {ds === 'stack' ? 'Push' : ds === 'queue' ? 'Enqueue' : 'Add'}
                    </button>
                    <button 
                        onClick={removeElement}
                        disabled={elements.length === 0}
                        className="w-full px-4 py-3 bg-red-600/80 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-lg transition-colors"
                    >
                        {ds === 'stack' ? 'Pop' : ds === 'queue' ? 'Dequeue' : 'Remove'}
                    </button>
                    
                    <div className="mt-4 p-4 bg-black border border-slate-800 rounded-lg text-xs text-slate-400">
                        {ds === 'array' && "Contiguous memory. Fixed size in C++ (unless dynamic). O(1) Access."}
                        {ds === 'linkedlist' && "Scattered memory nodes. Dynamic size. O(N) Access."}
                        {ds === 'stack' && "Last-In, First-Out (LIFO). Elements are pushed and popped from the TOP only."}
                        {ds === 'queue' && "First-In, First-Out (FIFO). Elements are enqueued at the BACK, dequeued from the FRONT."}
                    </div>
                </div>

                {/* Visualization Area */}
                <div className="flex-1 bg-black border border-slate-800 rounded-xl p-8 flex items-center justify-center min-h-[300px] overflow-hidden relative">
                    
                    {ds === 'array' && (
                        <div className="flex items-center gap-1">
                            {elements.map((el, i) => (
                                <div key={i} className="animate-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold text-xl rounded shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                        {el}
                                    </div>
                                    <div className="text-center mt-2 text-slate-500 font-mono text-xs">arr[{i}]</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {ds === 'linkedlist' && (
                        <div className="flex items-center flex-wrap gap-y-8">
                            {elements.map((el, i) => (
                                <div key={i} className="flex items-center animate-in slide-in-from-left duration-300">
                                    <div className="flex">
                                        <div className="w-12 h-16 bg-purple-500/20 border-2 border-r-0 border-purple-500 flex items-center justify-center text-purple-400 font-bold rounded-l">
                                            {el}
                                        </div>
                                        <div className="w-8 h-16 bg-purple-950 border-2 border-purple-500 flex items-center justify-center rounded-r relative">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            {i < elements.length - 1 && (
                                                <div className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-purple-500 -translate-y-1/2 flex justify-end items-center">
                                                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-purple-500 border-b-4 border-b-transparent translate-x-1"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {i < elements.length - 1 && <div className="w-12"></div>}
                                </div>
                            ))}
                            {elements.length > 0 && (
                                <div className="animate-in fade-in duration-500 text-slate-500 font-mono text-xs font-bold bg-slate-900 px-3 py-1 rounded ml-4 border border-slate-700">NULL</div>
                            )}
                        </div>
                    )}

                    {ds === 'stack' && (
                        <div className="flex flex-col-reverse justify-start items-center w-32 border-b-4 border-x-4 border-orange-500/50 rounded-b-xl pb-2 relative h-[250px]">
                            {elements.map((el, i) => (
                                <div key={i} className="w-28 h-12 bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center text-orange-400 font-bold mb-1 rounded animate-in slide-in-from-top-8 fade-in duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                                    {el}
                                </div>
                            ))}
                            {elements.length > 0 && (
                                <div className="absolute top-0 right-[-60px] animate-bounce text-orange-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                    <ArrowRight size={16} className="rotate-180" /> TOP
                                </div>
                            )}
                        </div>
                    )}

                    {ds === 'queue' && (
                        <div className="flex items-center w-full max-w-lg border-y-4 border-green-500/50 h-24 px-4 overflow-hidden relative">
                            {elements.map((el, i) => (
                                <div key={i} className="w-16 h-16 shrink-0 bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 font-bold mr-2 rounded animate-in slide-in-from-right-16 fade-in duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                    {el}
                                </div>
                            ))}
                            
                            {elements.length > 0 && (
                                <>
                                    <div className="absolute bottom-1 right-4 text-green-400 font-bold uppercase tracking-widest text-xs flex flex-col items-center">
                                        <ArrowRight size={12} className="-rotate-90" /> BACK
                                    </div>
                                    <div className="absolute bottom-1 left-4 text-green-400 font-bold uppercase tracking-widest text-xs flex flex-col items-center">
                                        <ArrowRight size={12} className="-rotate-90" /> FRONT
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>
            
        </div>
    );
};


// --- INTERACTIVE 5: Code Complexity Analyzer ---
const CodeComplexityAnalyzer = () => {
    const [snippet, setSnippet] = useState<'linear' | 'quadratic' | 'sequential' | 'logarithmic'>('linear');

    const snippets = {
        linear: {
            name: 'Single Loop',
            code: `for (int i = 0; i < N; i++) {
    // Basic operation
    count++;
}`,
            complexity: 'O(N)',
            desc: 'A single loop that runs N times. The number of operations grows linearly with N.'
        },
        quadratic: {
            name: 'Nested Loops',
            code: `for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        // Basic operation
        count++;
    }
}`,
            complexity: 'O(N²)',
            desc: 'For every 1 step of the outer loop, the inner loop runs N times. N * N = N². Extremely dangerous for large N.'
        },
        sequential: {
            name: 'Sequential Loops',
            code: `for (int i = 0; i < N; i++) {
    count++;
}
for (int j = 0; j < N; j++) {
    count++;
}`,
            complexity: 'O(N)',
            desc: 'The operations are N + N = 2N. Since we drop constants in Asymptotic analysis, O(2N) simplifies to O(N).'
        },
        logarithmic: {
            name: 'Halving Loop',
            code: `for (int i = 1; i < N; i = i * 2) {
    // Basic operation
    count++;
}`,
            complexity: 'O(log N)',
            desc: 'The variable i doubles every iteration (1, 2, 4, 8, 16...). It takes very few steps to reach N. Blazingly fast.'
        }
    };

    const current = snippets[snippet];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Code Complexity Analyzer</h3>
            <p className="text-slate-400 mb-6">How do we determine Big O from actual C++ code? We look at the loops. Select a code pattern below to analyze its Asymptotic Time Complexity.</p>

            <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setSnippet('linear')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${snippet === 'linear' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Single Loop</button>
                <button onClick={() => setSnippet('quadratic')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${snippet === 'quadratic' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Nested Loops</button>
                <button onClick={() => setSnippet('sequential')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${snippet === 'sequential' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Sequential Loops</button>
                <button onClick={() => setSnippet('logarithmic')} className={`px-4 py-2 rounded-lg font-bold border transition-all ${snippet === 'logarithmic' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Halving Loop</button>
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col lg:flex-row gap-8">
                
                <div className="flex-1">
                    <div className="bg-black border border-slate-800 rounded-xl p-6 font-mono text-sm text-blue-400 relative overflow-hidden shadow-inner min-h-[250px]">
                        <pre className="relative z-10">
                            {current.code.split('\n').map((line, i) => (
                                <div key={i} className="mb-1">{line}</div>
                            ))}
                        </pre>
                        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Final Complexity</div>
                    <div className="text-5xl font-black text-white font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6">
                        {current.complexity}
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                        {current.desc}
                    </p>
                </div>

            </div>
            
            <ExplainerCard 
                title="The O(1) Trap"
                text="What if you have a massive loop that always runs exactly 1,000,000 times, no matter what the input N is? For example: for(int i=0; i<1000000; i++). Since it does not scale with N, it is considered O(1) Constant Time in Asymptotic Analysis! It will take a long time, but the time never grows." 
            />
        </div>
    );
};


// --- INTERACTIVE 6: Recursive Space Complexity Visualizer ---
const RecursiveSpaceVisualizer = () => {
    const [step, setStep] = useState(0);
    const maxSteps = 5;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Space Complexity: The Hidden Cost</h3>
            <p className="text-slate-400 mb-6">Time Complexity gets all the glory, but Space Complexity kills servers. When evaluating recursive algorithms, you MUST count the <strong>Call Stack</strong>. Let's compare an Iterative vs Recursive approach to counting down from 5.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-50 transition-all"
                    >
                        Step Back
                    </button>
                    <button 
                        onClick={() => setStep(Math.min(maxSteps, step + 1))}
                        disabled={step === maxSteps}
                        className="px-6 py-2 rounded-lg font-bold bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50 transition-all"
                    >
                        Execute Next Step
                    </button>
                    <button 
                        onClick={() => setStep(0)}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
                    >
                        Reset
                    </button>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-8">
                    
                    {/* Iterative O(1) */}
                    <div className="flex-1 bg-black border border-slate-800 rounded-xl p-6 flex flex-col shadow-inner">
                        <div className="text-center mb-6">
                            <h4 className="font-bold text-green-400 text-xl">Iterative Approach</h4>
                            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Space Complexity: O(1)</p>
                        </div>
                        
                        <div className="font-mono text-xs text-slate-400 mb-4 bg-slate-900 p-4 rounded border border-slate-700">
                            <span className="text-blue-400">void</span> countDown(<span className="text-blue-400">int</span> n) {'{'}<br/>
                            <div className="pl-4">
                                <span className="text-purple-400">while</span> (n &gt; 0) {'{'}<br/>
                                <div className="pl-4">n--;</div>
                                {'}'}
                            </div>
                            {'}'}
                        </div>

                        <div className="flex-1 border-t border-slate-800 pt-6">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Memory Stack (Variables)</div>
                            <div className="h-16 bg-slate-900 border-2 border-green-500/50 rounded flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500/10"></div>
                                <div className="font-mono font-bold text-green-400 text-2xl z-10">
                                    n = {5 - step}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 text-center mt-4">Only 1 variable updated in place. No extra memory used regardless of N.</p>
                        </div>
                    </div>

                    {/* Recursive O(N) */}
                    <div className="flex-1 bg-black border border-slate-800 rounded-xl p-6 flex flex-col shadow-inner">
                        <div className="text-center mb-6">
                            <h4 className="font-bold text-red-400 text-xl">Recursive Approach</h4>
                            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Space Complexity: O(N)</p>
                        </div>
                        
                        <div className="font-mono text-xs text-slate-400 mb-4 bg-slate-900 p-4 rounded border border-slate-700">
                            <span className="text-blue-400">void</span> countDown(<span className="text-blue-400">int</span> n) {'{'}<br/>
                            <div className="pl-4">
                                <span className="text-purple-400">if</span> (n == 0) <span className="text-purple-400">return</span>;<br/>
                                countDown(n - 1);
                            </div>
                            {'}'}
                        </div>

                        <div className="flex-1 border-t border-slate-800 pt-6">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Execution Call Stack</div>
                            <div className="h-[300px] bg-slate-900 border-2 border-red-500/50 rounded p-4 flex flex-col-reverse gap-2 overflow-hidden">
                                {Array.from({ length: step + 1 }).map((_, i) => (
                                    <div key={i} className="h-10 shrink-0 bg-red-500/20 border border-red-500 rounded flex items-center justify-center animate-in slide-in-from-bottom fade-in duration-300">
                                        <div className="font-mono font-bold text-red-400">
                                            countDown({5 - i})
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 text-center mt-4">Every recursive call pushes a new frame to the stack. Memory grows linearly with N.</p>
                        </div>
                    </div>

                </div>
            </div>
            
            <ExplainerCard 
                title="The Silent Killer: Stack Overflow"
                text="In the Iterative approach, if N = 1,000,000, the variable 'n' just updates in place. Space used = 4 Bytes. O(1) Space. In the Recursive approach, if N = 1,000,000, the CPU pushes 1,000,000 function frames onto the Execution Stack. This requires Megabytes of RAM. Since the execution stack is usually limited to 1MB-8MB by the OS, your program will crash instantly with a STACK OVERFLOW error. This is why you must calculate Auxiliary Space Complexity." 
            />
        </div>
    );
};

export default function DSALecture2() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Complexity Notation & Basic Structures</h1>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 2</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">Measuring Infinity</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Hardware differs. A loop that takes 1 second on a 1990s computer might take 1 millisecond on a modern processor. We need a hardware-independent way to measure algorithms. Welcome to Asymptotic Analysis.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <AsymptoticBoundsVisualizer />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Basic Data Structures Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
                            <h4 className="text-blue-400 font-bold text-xl mb-4">Linear Structures</h4>
                            <p className="text-slate-400 text-sm mb-4">Elements are arranged sequentially. Every element (except the first and last) has a single predecessor and successor.</p>
                            <ul className="text-slate-300 space-y-2 list-disc list-inside">
                                <li><strong>Arrays:</strong> Contiguous memory blocks.</li>
                                <li><strong>Linked Lists:</strong> Scattered memory nodes connected by pointers.</li>
                                <li><strong>Stacks:</strong> LIFO (Last-In, First-Out).</li>
                                <li><strong>Queues:</strong> FIFO (First-In, First-Out).</li>
                            </ul>
                        </div>
                        <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-colors">
                            <h4 className="text-cyan-400 font-bold text-xl mb-4">Non-Linear Structures</h4>
                            <p className="text-slate-400 text-sm mb-4">Elements are connected in a hierarchical or network format. An element can have multiple predecessors or successors.</p>
                            <ul className="text-slate-300 space-y-2 list-disc list-inside">
                                <li><strong>Trees:</strong> Hierarchical structure (Root, Branches, Leaves).</li>
                                <li><strong>Binary Search Trees:</strong> Fast O(log N) lookups.</li>
                                <li><strong>Graphs:</strong> Networks of nodes (Vertices and Edges).</li>
                                <li><strong>Heaps:</strong> Specialized tree-based priority queues.</li>
                            </ul>
                        </div>
                    </div>
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><BigOHierarchy /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><EquationReducer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><CodeComplexityAnalyzer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><RecursiveSpaceVisualizer /></section>
            </div>
        </div>
    );
}
