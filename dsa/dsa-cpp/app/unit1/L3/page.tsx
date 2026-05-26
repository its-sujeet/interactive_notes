"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity, Zap, ShieldAlert, MemoryStick } from 'lucide-react';

const ExplainerCard = ({ title, text, icon: Icon = Zap, color = "text-blue-400" }: { title: string, text: React.ReactNode, icon?: any, color?: string }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden mt-8">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="flex items-start gap-4">
            <div className={`p-3 bg-black rounded-lg ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{text}</p>
            </div>
        </div>
    </div>
);

// --- INTERACTIVE 1: Memory Layout Visualizer ---
const MemoryLayoutVisualizer = () => {
    const [dataType, setDataType] = useState<'char' | 'short' | 'int' | 'double'>('int');
    const [arraySize, setArraySize] = useState(5);
    const baseAddress = 0x7ffd5e3a;

    const types = {
        char: { size: 1, name: 'char', color: 'text-yellow-400', border: 'border-yellow-500', bg: 'bg-yellow-500/20' },
        short: { size: 2, name: 'short', color: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-500/20' },
        int: { size: 4, name: 'int', color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/20' },
        double: { size: 8, name: 'double', color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/20' }
    };

    const currentType = types[dataType];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Contiguous Memory Visualizer</h3>
            <p className="text-slate-400 mb-6">An array is a collection of items of the same data type stored at <strong>contiguous memory locations</strong>. Change the data type below to see how the memory allocation jumps in bytes based on the size of the type.</p>

            <div className="flex gap-4 mb-8 flex-wrap">
                {(Object.keys(types) as Array<keyof typeof types>).map(t => (
                    <button 
                        key={t}
                        onClick={() => setDataType(t)} 
                        className={`px-6 py-2 rounded-lg font-bold border transition-all ${dataType === t ? `${types[t].bg} ${types[t].border} ${types[t].color} shadow-[0_0_15px_currentColor]` : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                    >
                        {types[t].name} ({types[t].size} Bytes)
                    </button>
                ))}
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl overflow-x-auto">
                <div className="flex gap-0 min-w-max pb-4 px-4">
                    {Array.from({ length: 8 }).map((_, i) => {
                        const addr = baseAddress + (i * currentType.size);
                        const isAllocated = i < arraySize;
                        
                        return (
                            <div key={i} className="flex flex-col items-center animate-in fade-in zoom-in duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                                {/* Index */}
                                <div className={`font-mono text-xs mb-2 ${isAllocated ? 'text-white font-bold' : 'text-slate-600'}`}>
                                    {isAllocated ? `arr[${i}]` : 'Unused'}
                                </div>
                                
                                {/* Memory Block */}
                                <div 
                                    className={`w-24 h-24 flex flex-col items-center justify-center border-2 rounded transition-all duration-300 ${isAllocated ? `${currentType.bg} ${currentType.border} ${currentType.color} shadow-lg` : 'bg-black border-slate-800 text-slate-700 border-dashed'}`}
                                    style={{ width: `${Math.max(80, currentType.size * 15 + 40)}px` }}
                                >
                                    {isAllocated ? (
                                        <div className="font-black text-2xl truncate px-2 text-white">
                                            {dataType === 'char' ? String.fromCharCode(65 + i) : (i + 1) * 10}
                                        </div>
                                    ) : (
                                        <div className="text-xs font-mono text-slate-700">GARBAGE</div>
                                    )}
                                    <div className="text-[10px] font-mono opacity-60 mt-1">{currentType.size} Byte(s)</div>
                                </div>

                                {/* Address */}
                                <div className={`font-mono text-xs mt-3 ${isAllocated ? 'text-slate-300' : 'text-slate-600'}`}>
                                    0x{addr.toString(16)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ExplainerCard 
                title="The Magic of O(1) Access"
                icon={MemoryStick}
                text="Because arrays are strictly contiguous, the CPU never has to 'search' for an element. It just uses a mathematical formula to jump instantly to the exact memory address. This is why accessing arr[1000] is exactly as fast as accessing arr[0]." 
            />
        </div>
    );
};

// --- INTERACTIVE 2: Address Calculation Engine ---
const AddressCalculator = () => {
    const [index, setIndex] = useState(3);
    const [base, setBase] = useState(2000);
    const [size, setSize] = useState(4);

    const result = base + (index * size);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">O(1) Access Formula Engine</h3>
            <p className="text-slate-400 mb-6">How exactly does the CPU find <code className="text-blue-400">arr[i]</code> instantly? It calculates the physical RAM address using a strict algebraic formula. Try it yourself.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center mb-8 shadow-inner">
                
                <div className="flex-1 flex flex-col gap-6 w-full">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Base Address (RAM)</label>
                        <input type="range" min="1000" max="9000" step="1000" value={base} onChange={e => setBase(Number(e.target.value))} className="w-full accent-purple-500" />
                        <div className="font-mono text-purple-400 mt-1">{base}</div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Element Index (i)</label>
                        <input type="range" min="0" max="100" step="1" value={index} onChange={e => setIndex(Number(e.target.value))} className="w-full accent-blue-500" />
                        <div className="font-mono text-blue-400 mt-1">{index}</div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Data Size (Bytes)</label>
                        <input type="range" min="1" max="8" step="1" value={size} onChange={e => setSize(Number(e.target.value))} className="w-full accent-green-500" />
                        <div className="font-mono text-green-400 mt-1">{size}</div>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                    <ArrowRight size={32} className="text-slate-700" />
                </div>

                <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="text-center font-mono text-sm text-slate-500 mb-4">Formula: Base + (Index × Size)</div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-2 font-mono text-2xl font-bold mb-6">
                        <span className="text-purple-400">{base}</span>
                        <span className="text-slate-500">+</span>
                        <span className="text-slate-500">(</span>
                        <span className="text-blue-400">{index}</span>
                        <span className="text-slate-500">×</span>
                        <span className="text-green-400">{size}</span>
                        <span className="text-slate-500">)</span>
                    </div>

                    <div className="border-t border-slate-800 pt-6 text-center">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Final Address Target</div>
                        <div className="text-5xl font-black text-white font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            {result}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};



// --- INTERACTIVE 3: 2D Array Memory Mapping ---
const TwoDimensionalMemoryVisualizer = () => {
    const [mapping, setMapping] = useState<'row' | 'col'>('row');
    const rows = 3;
    const cols = 4;
    
    // Create matrix data
    const matrix = [];
    let counter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            matrix.push({ r, c, val: counter++ });
        }
    }

    const flattened = mapping === 'row' 
        ? matrix 
        : [...matrix].sort((a, b) => a.c === b.c ? a.r - b.r : a.c - b.c);

    const getIndex = (r: number, c: number) => {
        return mapping === 'row' ? r * cols + c : c * rows + r;
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">2D Array Flattening (Row-Major)</h3>
            <p className="text-slate-400 mb-6">RAM is strictly 1-Dimensional. There is no such thing as a "grid" of memory. When you create a 2D matrix <code className="text-blue-400">arr[3][4]</code>, C++ flattens it into a 1D array using <strong>Row-Major Order</strong>.</p>
            
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setMapping('row')}
                    className={`px-6 py-2 rounded-lg font-bold border transition-all ${mapping === 'row' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                    Row-Major Order (C/C++)
                </button>
                <button 
                    onClick={() => setMapping('col')}
                    className={`px-6 py-2 rounded-lg font-bold border transition-all ${mapping === 'col' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                    Column-Major Order (Fortran)
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start mb-8">
                {/* 2D View */}
                <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl">
                    <div className="text-center font-mono text-xs text-slate-500 mb-4 uppercase tracking-widest">Mental Model (2D Grid)</div>
                    <div className="grid grid-cols-4 gap-2">
                        {matrix.map((cell, i) => {
                            const flatIdx = getIndex(cell.r, cell.c);
                            const hue = (flatIdx * 30) % 360;
                            return (
                                <div 
                                    key={i} 
                                    className="w-16 h-16 flex flex-col items-center justify-center border rounded-lg transition-all"
                                    style={{ 
                                        backgroundColor: `hsla(${hue}, 70%, 50%, 0.1)`, 
                                        borderColor: `hsla(${hue}, 70%, 50%, 0.5)` 
                                    }}
                                >
                                    <div className="text-white font-bold">{cell.val}</div>
                                    <div className="text-[9px] font-mono opacity-50">[{cell.r}][{cell.c}]</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="hidden xl:flex items-center justify-center">
                    <ArrowRight size={32} className="text-slate-700" />
                </div>
                <div className="flex xl:hidden items-center justify-center">
                    <ArrowRight size={32} className="text-slate-700 rotate-90" />
                </div>

                {/* 1D View */}
                <div className="bg-black border border-slate-800 p-6 rounded-xl flex-1 w-full overflow-x-auto">
                    <div className="text-center font-mono text-xs text-slate-500 mb-4 uppercase tracking-widest">Physical RAM (1D Memory)</div>
                    <div className="flex gap-0 min-w-max">
                        {flattened.map((cell, i) => {
                            const hue = (i * 30) % 360;
                            return (
                                <div 
                                    key={i}
                                    className="w-12 h-20 flex flex-col items-center justify-center border animate-in slide-in-from-left duration-300"
                                    style={{ 
                                        backgroundColor: `hsla(${hue}, 70%, 50%, 0.1)`, 
                                        borderColor: `hsla(${hue}, 70%, 50%, 0.5)`,
                                        borderRightWidth: i === flattened.length - 1 ? '1px' : '0px'
                                    }}
                                >
                                    <div className="text-white font-bold">{cell.val}</div>
                                    <div className="text-[8px] font-mono opacity-50 mt-1">idx:{i}</div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-400 font-mono text-center">
                        Address Formula: <br/>
                        <span className="text-white">Base + (Row × Num_Cols + Col) × Size</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};


// --- INTERACTIVE 4: Pointer Arithmetic Sandbox ---
const PointerArithmeticSandbox = () => {
    const [ptrType, setPtrType] = useState<'int' | 'double'>('int');
    const [ptrOffset, setPtrOffset] = useState(0);
    const baseAddr = 0x1000;
    
    const types = {
        int: { size: 4, color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/20' },
        double: { size: 8, color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/20' }
    };
    
    const currentType = types[ptrType];
    const currentAddr = baseAddr + (ptrOffset * currentType.size);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Pointer Arithmetic Sandbox</h3>
            <p className="text-slate-400 mb-6">In C++, the array variable itself is just a <strong>pointer</strong> to the first element's memory address. When you add <code className="text-blue-400">+1</code> to a pointer, it doesn't add 1 byte. It adds <strong>1 unit of the data type's size</strong>. This is called Pointer Arithmetic.</p>
            
            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                {/* Pointer Code Simulation */}
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8 font-mono text-sm shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                        <Zap size={48} />
                    </div>
                    <div className="text-slate-400 mb-2">// 1. Declare pointer</div>
                    <div><span className="text-blue-400">{ptrType}</span>* ptr = arr; <span className="text-slate-500">// Points to 0x{baseAddr.toString(16)}</span></div>
                    
                    <div className="text-slate-400 mt-4 mb-2">// 2. Perform arithmetic</div>
                    <div className="flex items-center gap-4">
                        <div className="text-white">ptr = ptr + <span className="text-green-400">{ptrOffset}</span>;</div>
                        <div className="flex gap-2 ml-auto z-10">
                            <button onClick={() => setPtrOffset(Math.max(0, ptrOffset - 1))} className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded text-white">-</button>
                            <button onClick={() => setPtrOffset(Math.min(5, ptrOffset + 1))} className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded text-white">+</button>
                        </div>
                    </div>
                </div>

                {/* Memory Visualization */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <button onClick={() => { setPtrType('int'); setPtrOffset(0); }} className={`px-4 py-1 text-xs rounded border transition-all ${ptrType === 'int' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>int* (4 Bytes)</button>
                            <button onClick={() => { setPtrType('double'); setPtrOffset(0); }} className={`px-4 py-1 text-xs rounded border transition-all ${ptrType === 'double' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>double* (8 Bytes)</button>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-12 relative flex justify-center">
                    <div className="flex gap-1 relative pt-8">
                        {Array.from({length: 6}).map((_, i) => {
                            const isTarget = i === ptrOffset;
                            const addr = baseAddr + (i * currentType.size);
                            return (
                                <div key={i} className="flex flex-col items-center relative">
                                    {isTarget && (
                                        <div className="absolute -top-12 flex flex-col items-center animate-bounce text-red-500">
                                            <div className="font-mono text-xs font-bold mb-1">ptr</div>
                                            <ArrowRight className="rotate-90" size={20} />
                                        </div>
                                    )}
                                    <div className={`w-20 h-16 border-2 flex items-center justify-center transition-all duration-300 ${isTarget ? `${currentType.bg} ${currentType.border} ${currentType.color} scale-110 z-10 shadow-[0_0_20px_currentColor]` : 'bg-[#161b22] border-slate-800 text-slate-600'}`}>
                                        arr[{i}]
                                    </div>
                                    <div className={`mt-3 font-mono text-[10px] transition-colors ${isTarget ? 'text-white font-bold' : 'text-slate-500'}`}>
                                        0x{addr.toString(16)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 5: Stack vs Heap Allocation ---
const StackVsHeapVisualizer = () => {
    const [allocation, setAllocation] = useState<'none' | 'stack' | 'heap'>('none');
    const [isDeleted, setIsDeleted] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Static vs Dynamic Allocation (Stack vs Heap)</h3>
            <p className="text-slate-400 mb-6">In C++, where your array lives determines how it behaves. <strong>Static Arrays</strong> live on the Stack (fast, auto-cleanup, but fixed size). <strong>Dynamic Arrays</strong> live on the Heap (flexible size, but requires manual <code className="text-red-400">delete[]</code> cleanup).</p>

            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => { setAllocation('stack'); setIsDeleted(false); }}
                    className={`px-6 py-2 rounded-lg font-bold border transition-all ${allocation === 'stack' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                    int arr[5]; (Stack)
                </button>
                <button 
                    onClick={() => { setAllocation('heap'); setIsDeleted(false); }}
                    className={`px-6 py-2 rounded-lg font-bold border transition-all ${allocation === 'heap' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                    int* arr = new int[5]; (Heap)
                </button>
            </div>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 shadow-inner">
                {/* The Stack */}
                <div className="flex-1 border border-slate-800 rounded-xl bg-[#161b22] overflow-hidden flex flex-col">
                    <div className="bg-blue-900/30 border-b border-blue-900/50 p-3 text-center font-bold text-blue-400 tracking-widest text-xs uppercase">
                        The Stack (Auto Memory)
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-end gap-2 min-h-[250px]">
                        {allocation !== 'none' && (
                            <div className="bg-slate-800/50 border-l-4 border-slate-600 p-3 text-xs text-slate-400 font-mono">
                                function_call_frame()
                            </div>
                        )}
                        {allocation === 'stack' && (
                            <div className="bg-blue-500/20 border-l-4 border-blue-500 p-4 animate-in slide-in-from-bottom duration-300">
                                <div className="text-white font-bold mb-2">int arr[5]</div>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-8 h-8 border border-blue-500/50 flex items-center justify-center text-xs text-blue-300 bg-blue-950/50">0</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {allocation === 'heap' && (
                            <div className="bg-purple-500/20 border-l-4 border-purple-500 p-4 animate-in slide-in-from-bottom duration-300 relative">
                                <div className="text-white font-bold mb-2">int* arr</div>
                                <div className="w-full h-8 border border-purple-500/50 flex items-center justify-center text-xs text-purple-300 bg-purple-950/50 font-mono truncate">
                                    0xHeapAddr
                                </div>
                                <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-purple-500 -mr-8"></div>
                            </div>
                        )}
                        <div className="bg-slate-800 border-l-4 border-slate-600 p-3 text-xs text-slate-500 font-mono">
                            main()
                        </div>
                    </div>
                </div>

                {/* The Heap */}
                <div className="flex-1 border border-slate-800 rounded-xl bg-[#161b22] overflow-hidden flex flex-col">
                    <div className="bg-purple-900/30 border-b border-purple-900/50 p-3 text-center font-bold text-purple-400 tracking-widest text-xs uppercase">
                        The Heap (Dynamic Memory)
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center items-center min-h-[250px] relative">
                        {allocation === 'heap' && !isDeleted && (
                            <div className="bg-purple-500/10 border border-purple-500 p-6 rounded-lg animate-in zoom-in duration-300">
                                <div className="text-white font-bold mb-4 text-center">Allocated Memory Block</div>
                                <div className="flex gap-2">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-10 h-10 border-2 border-purple-500 flex items-center justify-center text-sm font-bold text-purple-300 bg-purple-900/50">0</div>
                                    ))}
                                </div>
                                <div className="font-mono text-xs text-purple-400 text-center mt-4">Address: 0xHeapAddr</div>
                            </div>
                        )}
                        {allocation === 'heap' && isDeleted && (
                            <div className="text-slate-600 font-mono text-sm italic animate-in fade-in">Memory Freed Successfully.</div>
                        )}
                        {allocation === 'stack' && (
                            <div className="text-slate-700 font-mono text-sm italic">Empty</div>
                        )}
                        {allocation === 'none' && (
                            <div className="text-slate-700 font-mono text-sm italic">Empty</div>
                        )}
                    </div>
                    
                    {/* Actions */}
                    <div className="p-4 bg-black border-t border-slate-800">
                        {allocation === 'heap' ? (
                            <div className="flex items-center justify-between">
                                {!isDeleted ? (
                                    <>
                                        <div className="text-xs text-red-400 font-bold flex items-center gap-2 animate-pulse"><ShieldAlert size={14}/> MEMORY LEAK RISK</div>
                                        <button onClick={() => setIsDeleted(true)} className="px-4 py-2 bg-red-950 hover:bg-red-900 border border-red-500 text-red-300 text-xs font-bold rounded transition-colors">
                                            execute: delete[] arr;
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-2"><Zap size={14}/> SAFE: MEMORY RETURNED</div>
                                )}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-500 text-center">No manual cleanup required.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function DSALecture3() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="DSA Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Linear Arrays: Memory Layout</h1>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Unit 1 • Lecture 3</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                    </div>
                </div>
            </header>

            <div className="py-12">
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Array</span> Architecture
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        An array is the simplest and most heavily used data structure in C++. But beneath the simple <code className="text-blue-400">[]</code> brackets lies strict, unforgiving memory management. Arrays demand contiguous blocks of RAM and offer blazing fast O(1) random access.
                    </p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <MemoryLayoutVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <AddressCalculator />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <div className="bg-red-950/20 border border-red-900/50 p-8 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <ShieldAlert className="text-red-500" size={32} />
                            <h3 className="text-2xl font-bold text-white">The Danger of Out-of-Bounds</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Unlike languages like Java or Python, C++ arrays <strong>do not check boundaries</strong>. If you declare an array of size 5, and try to access <code className="text-red-400">arr[10]</code>, the CPU will blindly run the O(1) access formula and jump to that memory address. It will then read whatever random garbage data happens to be there, or trigger a <strong>Segmentation Fault</strong> if the OS catches you accessing memory you don't own.
                        </p>
                        <div className="bg-black border border-slate-800 p-4 rounded-lg font-mono text-sm text-slate-400">
                            <span className="text-blue-400">int</span> arr[5] = {'{'}1, 2, 3, 4, 5{'}'};<br/>
                            <span className="text-slate-500">// Valid: 0 to 4</span><br/>
                            std::cout &lt;&lt; arr[0]; <span className="text-green-500">// Outputs: 1</span><br/>
                            <br/>
                            <span className="text-slate-500">// Invalid: CPU jumps to Base + (100 * 4)</span><br/>
                            std::cout &lt;&lt; arr[100]; <span className="text-red-500">// Outputs: 19481940 (Garbage Data) or CRASH</span>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <TwoDimensionalMemoryVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <PointerArithmeticSandbox />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <StackVsHeapVisualizer />
                </section>

            </div>
        </div>
    );
}