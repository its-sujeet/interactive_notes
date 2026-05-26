const fs = require('fs');

const path = '/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx';

// Ensure directory exists
const dir = '/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const content = `
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity, Zap, ShieldAlert, Binary, Cpu, MemoryStick } from 'lucide-react';

const ExplainerCard = ({ title, text, icon: Icon = Zap, color = "text-blue-400" }: { title: string, text: React.ReactNode, icon?: any, color?: string }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden mt-8">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="flex items-start gap-4">
            <div className={\`p-3 bg-black rounded-lg \${color}\`}>
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
                        className={\`px-6 py-2 rounded-lg font-bold border transition-all \${dataType === t ? \`\${types[t].bg} \${types[t].border} \${types[t].color} shadow-[0_0_15px_currentColor]\` : 'bg-slate-900 border-slate-800 text-slate-500'}\`}
                    >
                        {types[t].name} ({types[t].size} Bytes)
                    </button>
                ))}
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl overflow-x-auto">
                <div className="flex gap-2 min-w-max pb-4">
                    {Array.from({ length: 8 }).map((_, i) => {
                        const addr = baseAddress + (i * currentType.size);
                        const isAllocated = i < arraySize;
                        
                        return (
                            <div key={i} className="flex flex-col items-center animate-in fade-in zoom-in duration-300" style={{ animationDelay: \`\${i * 50}ms\` }}>
                                {/* Index */}
                                <div className={\`font-mono text-xs mb-2 \${isAllocated ? 'text-white font-bold' : 'text-slate-600'}\`}>
                                    {isAllocated ? \`arr[\${i}]\` : 'Unused'}
                                </div>
                                
                                {/* Memory Block */}
                                <div 
                                    className={\`w-24 h-24 flex flex-col items-center justify-center border-2 rounded transition-all duration-300 \${isAllocated ? \`\${currentType.bg} \${currentType.border} \${currentType.color} shadow-lg\` : 'bg-black border-slate-800 text-slate-700 border-dashed'}\`}
                                    style={{ width: \`\${Math.max(80, currentType.size * 15 + 40)}px\` }}
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
                                <div className={\`font-mono text-xs mt-3 \${isAllocated ? 'text-slate-300' : 'text-slate-600'}\`}>
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


export default function DSALecture3() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Activity className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Linear Arrays: Memory Layout</h1>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Unit 1 • Lecture 3</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/unit1/L2" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Previous
                        </Link>
                        <Link href="/unit1/L4" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Next <ArrowRight size={16} />
                        </Link>
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
                            <div className="text-blue-400">int</div> arr[5] = {'{'}1, 2, 3, 4, 5{'}'};<br/>
                            <div className="text-slate-500">// Valid: 0 to 4</div>
                            std::cout &lt;&lt; arr[0]; <span className="text-green-500">// Outputs: 1</span><br/>
                            <br/>
                            <div className="text-slate-500">// Invalid: CPU jumps to Base + (100 * 4)</div>
                            std::cout &lt;&lt; arr[100]; <span className="text-red-500">// Outputs: 19481940 (Garbage Data) or CRASH</span>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
`;

fs.writeFileSync(path, content);
console.log('L3 created');
