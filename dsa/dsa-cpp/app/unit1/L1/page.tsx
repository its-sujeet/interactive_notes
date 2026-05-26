"use client";

import React, { useState } from 'react';
import {
    Activity, Clock, HardDrive, Cpu, Zap, ArrowRight, Sun, Moon, Database,
    Info, Globe
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

// --- INTERACTIVE 1: Time vs Space Trade-off Visualizer ---
const TimeSpaceTradeoff = () => {
    const [strategy, setStrategy] = useState<'bruteforce'|'caching'>('bruteforce');

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Golden Rule: Time vs Space</h3>
            <p className="text-slate-400 mb-6">In Computer Science, you can almost always buy speed by spending memory, or save memory by spending time. This is the ultimate trade-off in algorithmic design.</p>

            <div className="flex gap-4 mb-8 justify-center">
                <button 
                    onClick={() => setStrategy('bruteforce')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all border flex flex-col items-center gap-1 ${strategy === 'bruteforce' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                    <Cpu size={24}/>
                    Recompute Everything (Slow)
                </button>
                <button 
                    onClick={() => setStrategy('caching')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all border flex flex-col items-center gap-1 ${strategy === 'caching' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                    <HardDrive size={24}/>
                    Cache Results (Memory Heavy)
                </button>
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center">
                {/* Time Gauge */}
                <div className="flex-1 w-full p-6 bg-black rounded-xl border border-slate-800 flex flex-col items-center shadow-inner">
                    <span className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-4">Time Complexity (CPU)</span>
                    <div className="h-40 w-8 bg-slate-900 rounded-full border border-slate-700 relative overflow-hidden flex flex-col justify-end">
                        <div className={`w-full transition-all duration-1000 ${strategy === 'bruteforce' ? 'h-[90%] bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]' : 'h-[20%] bg-green-500 shadow-[0_0_20px_rgba(34,197,94,1)]'}`}></div>
                    </div>
                    <span className={`mt-4 font-black ${strategy === 'bruteforce' ? 'text-red-500' : 'text-green-500'}`}>{strategy === 'bruteforce' ? 'HIGH (O(N²))' : 'LOW (O(N))'}</span>
                </div>

                <ArrowRight size={32} className="text-slate-700 hidden md:block" />

                {/* Space Gauge */}
                <div className="flex-1 w-full p-6 bg-black rounded-xl border border-slate-800 flex flex-col items-center shadow-inner">
                    <span className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-4">Space Complexity (RAM)</span>
                    <div className="h-40 w-8 bg-slate-900 rounded-full border border-slate-700 relative overflow-hidden flex flex-col justify-end">
                        <div className={`w-full transition-all duration-1000 ${strategy === 'caching' ? 'h-[90%] bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]' : 'h-[10%] bg-green-500 shadow-[0_0_20px_rgba(34,197,94,1)]'}`}></div>
                    </div>
                    <span className={`mt-4 font-black ${strategy === 'caching' ? 'text-red-500' : 'text-green-500'}`}>{strategy === 'caching' ? 'HIGH (O(N))' : 'LOW (O(1))'}</span>
                </div>
            </div>
            
            <ExplainerCard 
                title="Caching vs Computation"
                text="Think of calculating the Fibonacci sequence. If you use standard recursion (Brute Force), you use very little memory, but the CPU has to redundantly calculate the same numbers millions of times (O(2^N) time). If you use an Array to 'memoize' or cache previously calculated answers, you burn RAM to store the array (O(N) space), but the calculation becomes blindingly fast (O(N) time). This is the Time-Space Tradeoff." 
            />
        </div>
    );
};


// --- INTERACTIVE 2: Stack vs Heap Memory Allocator ---
const MemoryAllocator = () => {
    const [memoryType, setMemoryType] = useState<'stack'|'heap'>('stack');
    const [arraySize, setArraySize] = useState(10);
    const stackLimit = 1000; // Simulated stack limit

    const isStackOverflow = memoryType === 'stack' && arraySize > stackLimit;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Memory Control: Stack vs Heap</h3>
            <p className="text-slate-400 mb-6">In C++, you dictate exactly where memory is allocated. The <strong>Stack</strong> is fast, automatically managed, but extremely small. The <strong>Heap</strong> is massive, but you must manually allocate (<code className="text-blue-400">new</code>) and deallocate (<code className="text-blue-400">delete</code>) the memory.</p>

            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setMemoryType('stack')}
                    className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${memoryType === 'stack' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                >
                    Stack Allocation
                </button>
                <button 
                    onClick={() => setMemoryType('heap')}
                    className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${memoryType === 'heap' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                >
                    Heap Allocation
                </button>
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl min-h-[250px] flex flex-col md:flex-row gap-8">
                
                {/* Control Panel */}
                <div className="flex-1 font-mono text-sm">
                    <div className="mb-6">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Array Size (Elements)</span>
                        <input 
                            type="range" 
                            min="10" 
                            max="2000" 
                            step="10"
                            value={arraySize} 
                            onChange={(e) => setArraySize(Number(e.target.value))} 
                            className={`w-full ${memoryType === 'stack' ? 'accent-orange-500' : 'accent-purple-500'}`} 
                        />
                        <div className="mt-2 text-white font-bold">{arraySize} integers</div>
                    </div>

                    <div className="p-4 bg-black border border-slate-800 rounded-lg">
                        {memoryType === 'stack' ? (
                            <div>
                                <span className="text-blue-400">void</span> createArray() {'{'}<br/>
                                <div className="pl-4">
                                    <span className="text-blue-400">int</span> arr[{arraySize}];
                                </div>
                                {'}'}
                            </div>
                        ) : (
                            <div>
                                <span className="text-blue-400">void</span> createArray() {'{'}<br/>
                                <div className="pl-4">
                                    <span className="text-blue-400">int*</span> arr = <span className="text-blue-400">new</span> <span className="text-blue-400">int</span>[{arraySize}];<br/>
                                    <span className="text-slate-500 italic">// ... use array ...</span><br/>
                                    <span className="text-red-400">delete[]</span> arr;
                                </div>
                                {'}'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Visualizer */}
                <div className="flex-1 border-l border-slate-800 pl-8 flex flex-col justify-center">
                    {isStackOverflow ? (
                        <div className="animate-in fade-in zoom-in duration-300 p-6 bg-red-500/10 border border-red-500 rounded-xl text-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                            <h4 className="text-red-500 font-black text-xl mb-2">STACK OVERFLOW!</h4>
                            <p className="text-red-400 text-sm">You attempted to allocate {arraySize * 4} bytes on the stack. The stack is limited to roughly 1MB - 8MB. The OS forcefully terminated your program.</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 flex flex-col items-center">
                            <div className={`w-full p-4 rounded-xl border-2 flex items-center justify-center font-bold text-xl ${memoryType === 'stack' ? 'bg-orange-500/10 border-orange-500 text-orange-400 h-32' : 'bg-purple-500/10 border-purple-500 text-purple-400 h-48'}`}>
                                {memoryType === 'stack' ? 'Stack Memory' : 'Heap Memory'}
                            </div>
                            <div className="mt-4 text-center">
                                <div className="text-slate-300 font-bold mb-1">
                                    {arraySize * 4} Bytes Allocated
                                </div>
                                <div className="text-slate-500 text-xs uppercase tracking-widest">
                                    {memoryType === 'stack' ? 'Fast Allocation / Automatic Cleanup' : 'Slower Allocation / Manual Cleanup'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <ExplainerCard 
                title="Pointers and new/delete"
                text="In C++, when you declare 'int arr[100];', the memory is pushed onto the thread's Execution Stack. It is instantly reclaimed when the function returns. However, the stack is very small. If you need a massive array, you must use 'new int[1000000]'. This asks the OS to find space in the massive system Heap. It returns a POINTER (memory address) to that space. If you forget to call 'delete[]', that memory is permanently locked until the program dies—this is a Memory Leak." 
            />
        </div>
    );
};


// --- INTERACTIVE 3: The Pointer Reality Check ---
const PointerRealityCheck = () => {
    const [selectedElement, setSelectedElement] = useState<number>(0);
    const baseAddress = 0x1000;
    
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Pointer Reality Check</h3>
            <p className="text-slate-400 mb-6">In Java, an array is an object. In C++, an array is just a <strong className="text-blue-400">Pointer</strong> to a contiguous block of memory. The variable name itself holds the memory address of the first element.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl font-mono text-sm flex flex-col items-center">
                
                <div className="text-blue-400 mb-8 font-bold text-lg">
                    int arr[5] = {'{'}10, 20, 30, 40, 50{'}'};
                </div>

                {/* Memory Blocks */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {[0, 1, 2, 3, 4].map(idx => (
                        <div 
                            key={idx}
                            onMouseEnter={() => setSelectedElement(idx)}
                            className={`w-24 border-2 rounded-lg flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ${selectedElement === idx ? 'border-orange-500 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.4)] z-10' : 'border-slate-700 hover:border-slate-500'}`}
                        >
                            <div className={`text-center py-1 text-xs font-bold ${selectedElement === idx ? 'bg-orange-500 text-black' : 'bg-slate-800 text-slate-500'}`}>
                                arr[{idx}]
                            </div>
                            <div className="text-center py-4 text-white font-black text-xl bg-slate-900">
                                {(idx + 1) * 10}
                            </div>
                            <div className="text-center py-1 text-[10px] text-slate-500 bg-black">
                                0x{(baseAddress + (idx * 4)).toString(16).toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Panel */}
                <div className="w-full max-w-2xl bg-black border border-slate-800 rounded-xl p-6 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-slate-400">
                            Value of <code className="text-orange-400">arr[{selectedElement}]</code>
                        </div>
                        <div className="text-white font-bold text-right">
                            {(selectedElement + 1) * 10}
                        </div>
                        
                        <div className="text-slate-400">
                            Memory Address <code className="text-orange-400">&arr[{selectedElement}]</code>
                        </div>
                        <div className="text-white font-bold text-right">
                            0x{(baseAddress + (selectedElement * 4)).toString(16).toUpperCase()}
                        </div>
                        
                        <div className="col-span-2 border-t border-slate-800 my-2"></div>
                        
                        <div className="text-slate-400">
                            Pointer Arithmetic <code className="text-blue-400">*(arr + {selectedElement})</code>
                        </div>
                        <div className="text-green-400 font-bold text-right">
                            {(selectedElement + 1) * 10}
                        </div>
                    </div>
                </div>

            </div>

            <ExplainerCard 
                title="Array Decay and Pointer Arithmetic"
                text="In C++, when you pass 'arr' to a function, it 'decays' into a pointer (int*). This means the function does not know the length of the array! Furthermore, arr[2] is just syntactic sugar for *(arr + 2). The compiler takes the base memory address, adds (2 * sizeof(int)) bytes to it, and dereferences the value at that exact memory cell. This is why array indexing is extremely fast: O(1)." 
            />
        </div>
    );
};

// --- INTERACTIVE 4: Algorithm Characteristics Validator ---
const AlgorithmValidator = () => {
    const [selected, setSelected] = useState<string[]>([]);
    
    const characteristics = [
        { id: 'finiteness', name: 'Finiteness', desc: 'Must eventually terminate.' },
        { id: 'definiteness', name: 'Definiteness', desc: 'Each step must be unambiguously clear.' },
        { id: 'input', name: 'Input', desc: 'Has zero or more inputs.' },
        { id: 'output', name: 'Output', desc: 'Produces at least one output.' },
        { id: 'effectiveness', name: 'Effectiveness', desc: 'Operations must be basic enough to be done exactly.' }
    ];

    const toggle = (id: string) => {
        if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
        else setSelected([...selected, id]);
    };

    const isComplete = selected.length === 5;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Algorithm Characteristics Validator</h3>
            <p className="text-slate-400 mb-6">Not all code is an Algorithm. According to Donald Knuth, a true algorithm must possess five absolute characteristics. Select all 5 to validate a mathematical algorithm.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    {characteristics.map(c => (
                        <div 
                            key={c.id} 
                            onClick={() => toggle(c.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${selected.includes(c.id) ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#161b22] border-slate-700 hover:border-slate-500'}`}
                        >
                            <div>
                                <h4 className={`font-bold ${selected.includes(c.id) ? 'text-blue-400' : 'text-slate-300'}`}>{c.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected.includes(c.id) ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-600'}`}>
                                {selected.includes(c.id) && "✓"}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex items-center justify-center bg-black border border-slate-800 rounded-xl p-8 relative overflow-hidden">
                    {isComplete ? (
                        <div className="animate-in zoom-in duration-500 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.6)] mb-6 text-white">
                                ✓
                            </div>
                            <h3 className="text-2xl font-black text-green-400 tracking-widest uppercase mb-2">VALIDATED</h3>
                            <p className="text-slate-400 text-sm">Your procedure is officially an Algorithm.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center opacity-50">
                            <div className="w-24 h-24 border-4 border-dashed border-slate-700 rounded-full flex items-center justify-center mb-6">
                                <span className="text-slate-600 font-bold text-2xl">{selected.length}/5</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-500 tracking-widest uppercase mb-2">INCOMPLETE</h3>
                            <p className="text-slate-600 text-sm">Select all required characteristics.</p>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
};


// --- INTERACTIVE 5: The Algorithmic Speed Race ---
const SpeedRace = () => {
    const [nValue, setNValue] = useState<number>(10);
    const [racing, setRacing] = useState(false);
    const [progress, setProgress] = useState({ o1: 0, oN: 0, oN2: 0 });

    const startRace = () => {
        if (racing) return;
        setRacing(true);
        setProgress({ o1: 0, oN: 0, oN2: 0 });

        // Calculate relative times (fake ms for simulation)
        // O(1) is always instant (e.g. 50ms)
        // O(N) scales linearly (e.g. N * 5ms)
        // O(N^2) scales quadratically (e.g. N^2 * 0.5ms)

        const t1 = 200;
        const tN = Math.max(200, nValue * 15);
        const tN2 = Math.max(200, Math.pow(nValue, 2) * 0.5);

        const animate = (targetTime: number, key: 'o1' | 'oN' | 'oN2') => {
            let start = performance.now();
            const step = (timestamp: number) => {
                const elapsed = timestamp - start;
                const percent = Math.min(100, (elapsed / targetTime) * 100);
                setProgress(prev => ({ ...prev, [key]: percent }));
                if (percent < 100) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        animate(t1, 'o1');
        animate(tN, 'oN');
        animate(tN2, 'oN2');

        setTimeout(() => setRacing(false), Math.max(t1, tN, tN2) + 100);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Algorithmic Speed Race</h3>
            <p className="text-slate-400 mb-6">Watch how Time Complexity scales with the Input Size (N). For small N, bad algorithms look fine. But crank N up to 100, and watch the O(N²) algorithm completely choke.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl mb-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex-1">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Input Size (N) = {nValue}</span>
                        <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            step="10"
                            value={nValue} 
                            onChange={(e) => setNValue(Number(e.target.value))} 
                            disabled={racing}
                            className="w-full accent-blue-500" 
                        />
                    </div>
                    <button 
                        onClick={startRace}
                        disabled={racing}
                        className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all ${racing ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105'}`}
                    >
                        {racing ? 'Racing...' : 'Start Race'}
                    </button>
                </div>

                <div className="space-y-6">
                    {/* O(1) */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-green-400 font-mono">O(1) - Constant</span>
                            <span className="text-slate-500">{progress.o1 === 100 ? 'Finished' : progress.o1 > 0 ? 'Running' : 'Ready'}</span>
                        </div>
                        <div className="h-4 bg-black rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)] transition-all ease-linear" style={{ width: `${progress.o1}%` }}></div>
                        </div>
                    </div>
                    
                    {/* O(N) */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-yellow-400 font-mono">O(N) - Linear</span>
                            <span className="text-slate-500">{progress.oN === 100 ? 'Finished' : progress.oN > 0 ? 'Running' : 'Ready'}</span>
                        </div>
                        <div className="h-4 bg-black rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,1)] transition-all ease-linear" style={{ width: `${progress.oN}%` }}></div>
                        </div>
                    </div>

                    {/* O(N^2) */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-red-500 font-mono">O(N²) - Quadratic</span>
                            <span className="text-slate-500">{progress.oN2 === 100 ? 'Finished' : progress.oN2 > 0 ? 'Running' : 'Ready'}</span>
                        </div>
                        <div className="h-4 bg-black rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] transition-all ease-linear" style={{ width: `${progress.oN2}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <ExplainerCard 
                title="The Scaling Disaster"
                text="At N=10, O(N^2) does 100 operations. It looks perfectly fine. But at N=100, it does 10,000 operations. If N is 1,000,000 (a small database table), O(N^2) attempts 1 Trillion operations, locking up the CPU completely. This is why algorithmic complexity analysis is the most important skill in computer science." 
            />
        </div>
    );
};


// --- INTERACTIVE 6: Memory Footprint Calculator ---
const MemoryCalculator = () => {
    const [dataType, setDataType] = useState<number>(4); // bytes
    const [elementCount, setElementCount] = useState<number>(1000);

    const totalBytes = dataType * elementCount;
    
    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return bytes + " Bytes";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Space Complexity Calculator</h3>
            <p className="text-slate-400 mb-6">Space complexity isn't just theory—it dictates exactly how much RAM your arrays will burn in production. In C++, you must be hyper-aware of the byte-sizes of your primitives.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center">
                
                <div className="flex-1 w-full space-y-6">
                    <div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Data Type (Primitive Size)</span>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setDataType(1)} className={`py-2 rounded border ${dataType === 1 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}`}>char (1 Byte)</button>
                            <button onClick={() => setDataType(2)} className={`py-2 rounded border ${dataType === 2 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}`}>short (2 Bytes)</button>
                            <button onClick={() => setDataType(4)} className={`py-2 rounded border ${dataType === 4 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}`}>int / float (4 Bytes)</button>
                            <button onClick={() => setDataType(8)} className={`py-2 rounded border ${dataType === 8 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}`}>double / long long (8 Bytes)</button>
                        </div>
                    </div>
                    
                    <div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Array Size (N): {elementCount.toLocaleString('en-US')}</span>
                        <input 
                            type="range" 
                            min="1000" 
                            max="10000000" 
                            step="1000"
                            value={elementCount} 
                            onChange={(e) => setElementCount(Number(e.target.value))} 
                            className="w-full accent-cyan-500" 
                        />
                    </div>
                </div>

                <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-black border border-slate-800 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                        <HardDrive size={120} />
                    </div>
                    <span className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-4 z-10">Total RAM Allocated</span>
                    <div className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10">
                        {formatBytes(totalBytes)}
                    </div>
                    <div className="text-slate-600 font-mono text-sm mt-4 z-10">
                        {elementCount.toLocaleString('en-US')} × {dataType} Bytes
                    </div>
                </div>

            </div>

            <ExplainerCard 
                title="The Cost of Precision"
                text="Notice that using a 'double' (8 bytes) instead of a 'float' (4 bytes) literally doubles your RAM footprint. If you are building an array with 10 Million elements (like rendering pixels on a 4K screen), choosing the wrong primitive type could waste 40 Megabytes of RAM instantly. This is why C++ offers so many specific primitive sizes." 
            />
        </div>
    );
};

export default function DSALecture1() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Basic Concepts and Notations</h1>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 1</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">Welcome to C++ DSA</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Unlike Java where the JVM manages memory, C++ hands you the keys to the kingdom. Data Structures and Algorithms are the fundamental building blocks for solving complex computing problems. A good algorithm optimizes both Time and Space.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">What is an Algorithm?</h2>
                    <p className="text-slate-400 mb-6">An algorithm is a finite set of unambiguous instructions to solve a specific problem. To be valid, it must have inputs, produce outputs, and successfully terminate.</p>
                    <CodeBlock 
                        code={`int sumOfN(int n) {\n    return n * (n + 1) / 2;\n}`}
                        explanation="This algorithm finds the sum of the first N natural numbers in a single mathematical step, regardless of how large N is. This is much faster than looping N times!"
                    />
                </section>

                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Theoretical Foundations: Time and Space</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
                            <h4 className="text-blue-400 font-bold text-xl mb-4">Time Complexity</h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Time complexity is <strong>not</strong> measured in seconds. A supercomputer will always run a bad algorithm faster than an old laptop. Instead, we measure the <strong>growth rate</strong> of an algorithm by counting the number of basic operations (like additions, assignments, and comparisons) relative to the input size <code className="text-orange-400 font-mono">N</code>.
                            </p>
                            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                                <li><strong>Best Case:</strong> Minimum operations needed (e.g., finding item at index 0).</li>
                                <li><strong>Average Case:</strong> Expected operations over all possible inputs.</li>
                                <li><strong>Worst Case:</strong> Maximum operations needed (e.g., item not found). This is what we care about most.</li>
                            </ul>
                        </div>
                        
                        <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl hover:border-purple-500/30 transition-colors">
                            <h4 className="text-purple-400 font-bold text-xl mb-4">Space Complexity</h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Space complexity measures the total amount of memory (RAM) an algorithm needs to run completely. It is composed of two parts:
                            </p>
                            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                                <li><strong>Input Space:</strong> The memory required just to store the input data (you can't usually avoid this).</li>
                                <li><strong>Auxiliary Space:</strong> The <em>extra</em> memory the algorithm needs to do its job (e.g., temporary arrays, variables, or call stack space during recursion).</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-blue-950/20 border border-blue-900/50 p-6 rounded-xl text-slate-300 text-sm leading-relaxed">
                        <strong className="text-blue-400 text-base">The Trade-off Principle:</strong>
                        <p className="mt-2">In engineering, nothing is free. If you want an algorithm to run blazingly fast, you usually have to pre-calculate data and store it in memory (Caching, Memoization, Hash Tables), which drastically increases your Space Complexity. Conversely, if you are memory-constrained (like on an embedded microchip), you must calculate data on the fly (Brute Force), which drastically increases your Time Complexity.</p>
                    </div>
                </section>

<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <TimeSpaceTradeoff />
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><MemoryAllocator /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><PointerRealityCheck /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><AlgorithmValidator /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><SpeedRace /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><MemoryCalculator /></section>
            </div>
        </div>
    );
}
