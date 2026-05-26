"use client";

import React, { useState } from 'react';
import {
    Terminal,
    Code,
    Cpu,
    CheckCircle,
    Play,
    Layers,
    ArrowRight,
    Monitor,
    Box,
    Globe,
    Zap,
    LayoutGrid,
    Keyboard,
    RefreshCw,
    Info,
    ArrowLeftRight,
    Server,
    BookOpen,
    AlertTriangle,
    History,
    Shield,
    EyeOff,
    GitMerge,
    Shapes,
    MessageSquareWarning,
    UserCircle2,
    Lock,
    Unlock,
    Key,
    Database,
    Car,
    Factory,
    Network,
    Plus,
    Minus,
    Calculator,
    ZapIcon,
    Share2,
    StepForward,
    MemoryStick,
    Sun,
    Moon
} from 'lucide-react';

// --- SHARED COMPONENTS ---
const CodeBlock = ({ code, language = 'cpp', explanation, title }: { code: string, language?: string, explanation?: string, title?: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700/50 my-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-blue-500/30 w-full relative">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/90 backdrop-blur-md border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                    </div>
                    {title && <span className="text-sm font-medium text-slate-300 border-l border-slate-700 pl-4">{title}</span>}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">{language}</span>
                    {explanation && (
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all font-bold ${showExplanation
                                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <Info size={14} />
                            {showExplanation ? 'Hide Notes' : 'Explain Logic'}
                        </button>
                    )}
                </div>
            </div>
            <div className="relative">
                <div className="p-5 overflow-x-auto">
                    <pre className="font-mono text-sm leading-loose text-slate-300">
                        {code.split('\n').map((line, i) => {
                            let coloredLine = line;
                            const isComment = line.trim().startsWith('//');
                            const isKeyword = line.includes('class ') || line.includes('struct ') || line.includes('enum ') || line.includes('union ');
                            const isPublicPrivate = line.includes('public:') || line.includes('private:');
                            const isStatic = line.includes('static ');
                            const isInline = line.includes('inline ');
                            
                            return (
                                <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors whitespace-pre">
                                    <span className="text-slate-600 mr-4 select-none w-6 inline-block text-right">{i + 1}</span>
                                    <span className={isComment ? 'text-slate-500 italic' : isKeyword ? 'text-purple-400 font-bold' : isStatic ? 'text-pink-400 font-bold' : isInline ? 'text-cyan-400 font-bold' : isPublicPrivate ? 'text-orange-400 font-bold' : line.includes('std::') ? 'text-blue-400' : ''}>
                                        {coloredLine}
                                    </span>
                                </div>
                            );
                        })}
                    </pre>
                </div>
                
                <div className={`
                    absolute inset-0 bg-[#0f172a]/95 backdrop-blur-md p-6 overflow-y-auto transition-all duration-300
                    ${showExplanation ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible pointer-events-none'}
                `}>
                    <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <Terminal size={16} /> Logic Breakdown
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                        {explanation}
                    </p>
                </div>
            </div>
        </div>
    );
};

const TheoryCard = ({ title, icon, children, variant = 'blue' }: { title: string, icon: React.ReactNode, children: React.ReactNode, variant?: 'blue' | 'purple' | 'orange' | 'green' | 'red' }) => {
    const colors = {
        blue: 'border-blue-500/50 bg-blue-900/10 hover:bg-blue-900/20 shadow-blue-900/20',
        purple: 'border-purple-500/50 bg-purple-900/10 hover:bg-purple-900/20 shadow-purple-900/20',
        orange: 'border-orange-500/50 bg-orange-900/10 hover:bg-orange-900/20 shadow-orange-900/20',
        green: 'border-green-500/50 bg-green-900/10 hover:bg-green-900/20 shadow-green-900/20',
        red: 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20 shadow-red-900/20'
    };

    return (
        <div className={`border border-slate-800 border-l-4 ${colors[variant]} rounded-r-xl rounded-l-md p-6 my-8 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl group`}>
            <h4 className="text-xl font-bold text-white flex items-center gap-3 mb-4 group-hover:translate-x-1 transition-transform">
                <span className="p-2 rounded-lg bg-slate-900/50">{icon}</span> {title}
            </h4>
            <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-3">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const StepByStepUnionVisualizer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "1. Declaration",
            desc: "We declare a Union with an int (4 bytes) and a float (4 bytes). The compiler only allocates 4 bytes TOTAL, not 8.",
            code: "union Data {\n  int i;\n  float f;\n};\nData myData;",
            memory: "00000000 00000000 00000000 00000000",
            activeVars: "None (Uninitialized)"
        },
        {
            title: "2. Write to Integer",
            desc: "We assign the value 65 to myData.i. The 4 bytes of memory now hold the binary representation of the integer 65.",
            code: "myData.i = 65;",
            memory: "00000000 00000000 00000000 01000001", // 65 in binary
            activeVars: "myData.i = 65"
        },
        {
            title: "3. Read from Float",
            desc: "We try to read myData.f! Because they share the same memory, the CPU tries to interpret the integer binary as a float, resulting in garbage data.",
            code: "cout << myData.f; // Output: 9.10844e-44",
            memory: "00000000 00000000 00000000 01000001",
            activeVars: "myData.f = 9.10844e-44 (Garbage!)"
        },
        {
            title: "4. Overwrite with Float",
            desc: "We assign a value to myData.f. This entirely overwrites the 4 bytes. The integer value 65 is destroyed forever.",
            code: "myData.f = 3.14;",
            memory: "01000000 01001000 11110101 11000011", // float 3.14 in binary (approx)
            activeVars: "myData.f = 3.14"
        }
    ];

    const current = steps[step];

    return (
        <div className="my-12 p-6 md:p-8 bg-red-950/20 rounded-2xl border border-red-900/30 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <GitMerge size={24} className="text-red-400" />
                Step-by-Step: The Danger of Unions
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Because all members of a <code>union</code> share the exact same memory space, overwriting one member destroys the data of the others. Walk through this timeline to see how memory corruption happens if you aren't careful.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Col: Code & Controls */}
                <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full">{current.title}</span>
                            <span className="text-slate-500 text-xs font-mono">Step {step + 1} of 4</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-6 min-h-[60px]">{current.desc}</p>
                        
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm text-blue-300 min-h-[120px] whitespace-pre">
                            {current.code}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button 
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors border border-slate-700"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => setStep(Math.min(3, step + 1))}
                            disabled={step === 3}
                            className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                        >
                            Next Step <StepForward size={16}/>
                        </button>
                    </div>
                </div>

                {/* Right Col: Memory Visualizer */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-slate-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <MemoryStick size={14}/> Physical RAM (4 Bytes)
                    </div>

                    <div className="w-full mt-12 mb-8">
                        <div className={`grid grid-cols-4 gap-1 p-2 rounded-lg bg-slate-900 border ${step === 2 ? 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'border-slate-700'} transition-all duration-500`}>
                            {current.memory.split(' ').map((byte, idx) => (
                                <div key={idx} className="bg-slate-800 py-3 text-center rounded">
                                    <span className="font-mono text-[10px] sm:text-xs text-green-400 tracking-widest">{byte}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 px-2 text-[10px] text-slate-500 font-mono">
                            <span>Byte 0</span>
                            <span>Byte 1</span>
                            <span>Byte 2</span>
                            <span>Byte 3</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-700 w-full p-4 rounded-xl text-center">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Current Variable State</div>
                        <div className={`font-mono font-bold ${step === 2 ? 'text-orange-400' : 'text-white'}`}>
                            {current.activeVars}
                        </div>
                        {step === 2 && (
                            <div className="text-xs text-orange-400 mt-2 flex items-center justify-center gap-1">
                                <AlertTriangle size={12}/> Interpreting Int binary as Float!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StructVsClassVisualizer = () => {
    const [mode, setMode] = useState<'struct' | 'class'>('struct');

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <ArrowLeftRight size={24} className="text-blue-400" />
                Struct vs Class Simulator
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                In C++, <code>struct</code> and <code>class</code> are nearly identical. The <strong>ONLY</strong> difference is the default access modifier. Toggle between them to see how the compiler treats unlabelled members.
            </p>

            <div className="flex justify-center mb-8">
                <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
                    <button 
                        onClick={() => setMode('struct')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'struct' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:text-white'}`}
                    >
                        Struct Mode
                    </button>
                    <button 
                        onClick={() => setMode('class')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'class' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-500 hover:text-white'}`}
                    >
                        Class Mode
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* Code View */}
                <div className={`p-6 rounded-xl border-2 transition-colors duration-500 ${mode === 'struct' ? 'border-blue-500/50 bg-blue-950/20' : 'border-purple-500/50 bg-purple-950/20'}`}>
                    <div className="font-mono text-lg text-slate-300">
                        <span className={mode === 'struct' ? 'text-blue-400 font-bold' : 'text-purple-400 font-bold'}>
                            {mode}
                        </span> Player {'{'}
                    </div>
                    
                    <div className="pl-8 py-4 relative">
                        {/* Default Label injected by visualizer */}
                        <div className={`absolute left-2 top-2 bottom-2 w-1 rounded-full ${mode === 'struct' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        
                        <div className="flex items-center gap-3 mb-2 font-mono text-slate-400">
                            int health;
                            {mode === 'struct' ? (
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded flex items-center gap-1"><Unlock size={12}/> implicitly public</span>
                            ) : (
                                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded flex items-center gap-1"><Lock size={12}/> implicitly private</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 font-mono text-slate-400">
                            void attack();
                            {mode === 'struct' ? (
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded flex items-center gap-1"><Unlock size={12}/> implicitly public</span>
                            ) : (
                                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded flex items-center gap-1"><Lock size={12}/> implicitly private</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="font-mono text-lg text-slate-300">
                        {'};'}
                    </div>
                </div>

                {/* Main View */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-center">
                    <div className="font-mono text-blue-300 mb-4">int main() {'{'}</div>
                    <div className="pl-4 font-mono text-slate-400 mb-4">Player p1;</div>
                    
                    <div className={`pl-4 p-4 rounded-lg border-2 transition-all duration-500 ${mode === 'struct' ? 'border-green-500/30 bg-green-950/30' : 'border-red-500/30 bg-red-950/30'}`}>
                        <div className="font-mono text-slate-300 mb-2">p1.health = 100;</div>
                        {mode === 'struct' ? (
                            <div className="text-green-400 flex items-center gap-2 text-sm font-bold">
                                <CheckCircle size={16}/> Compiler: OK. Members are public by default.
                            </div>
                        ) : (
                            <div className="text-red-400 flex items-center gap-2 text-sm font-bold">
                                <AlertTriangle size={16}/> Compiler Error: 'health' is a private member of 'Player'
                            </div>
                        )}
                    </div>
                    <div className="font-mono text-blue-300 mt-4">{'}'}</div>
                </div>
            </div>
        </div>
    );
};

const StaticMemberSimulator = () => {
    const [globalCount, setGlobalCount] = useState(0);
    const [objs, setObjs] = useState([{ id: 0, val: 0 }]);

    const addObj = () => {
        if(objs.length >= 3) return;
        setObjs([...objs, { id: objs.length, val: 0 }]);
    };

    const incrementInstance = (id: number) => {
        setObjs(objs.map(obj => obj.id === id ? { ...obj, val: obj.val + 1 } : obj));
    };

    const incrementStatic = () => {
        setGlobalCount(globalCount + 1);
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-[#0f172a] rounded-2xl border border-pink-900/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Share2 size={24} className="text-pink-400" />
                Static Data Members Simulator
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                A <code>static</code> data member is created exactly once in memory and shared across <strong>all</strong> objects of the class. It lives in the Data Segment, not inside the object's instance memory.
            </p>

            <div className="mb-6 flex gap-3">
                <button 
                    onClick={addObj} 
                    disabled={objs.length >= 3}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-slate-700 disabled:opacity-50 flex items-center gap-2"
                >
                    <Plus size={16}/> Instantiate Object
                </button>
                <button 
                    onClick={incrementStatic}
                    className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-pink-500/30 flex items-center gap-2"
                >
                    <ZapIcon size={16}/> Increment static count (Shared)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Instance Memory (Heap/Stack) */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-6">
                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Instance Memory (Unique per Object)</h4>
                    <div className="space-y-4">
                        {objs.map((obj) => (
                            <div key={obj.id} className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                        Obj{obj.id + 1}
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-mono mb-1">int val;</div>
                                        <div className="text-xl font-bold text-white">{obj.val}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => incrementInstance(obj.id)}
                                    className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                >
                                    Increment val
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Segment (Static Memory) */}
                <div className="bg-pink-950/20 rounded-xl border border-pink-500/30 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-pink-500/50 font-bold uppercase tracking-widest text-xs">Data Segment</div>
                    
                    <div className="text-center z-10">
                        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-8 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
                            <div className="text-xs text-pink-400 font-mono font-bold mb-2">static int count;</div>
                            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500">
                                {globalCount}
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-400 max-w-xs mx-auto">
                            Notice how updating this value affects the shared state for every single object instantly.
                        </p>
                    </div>

                    {/* Laser beams pointing to objects */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <svg className="w-full h-full">
                            <line x1="100%" y1="50%" x2="0" y2="20%" stroke="pink" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="100%" y1="50%" x2="0" y2="50%" stroke="pink" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="100%" y1="50%" x2="0" y2="80%" stroke="pink" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InlineFunctionVisualizer = () => {
    const [compiled, setCompiled] = useState(false);

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Cpu size={24} className="text-cyan-400" />
                        Inline Functions (Compile Time)
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                        An <code>inline</code> function requests the compiler to literally copy-paste the function body into the calling code to save the overhead of a function jump.
                    </p>
                </div>
                <button 
                    onClick={() => setCompiled(!compiled)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                    {compiled ? <RefreshCw size={16}/> : <Play size={16}/>}
                    {compiled ? 'Reset' : 'Compile Code'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Source Code */}
                <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-6 relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Source.cpp</div>
                    
                    <div className="font-mono text-sm space-y-1">
                        <div className="text-cyan-400 font-bold">inline int square(int x) {'{'}</div>
                        <div className="text-slate-300 pl-4 bg-cyan-900/30 border border-cyan-500/30 rounded py-1 px-2 my-1 inline-block">return x * x;</div>
                        <div className="text-cyan-400 font-bold">{'}'}</div>
                        <br/>
                        <div className="text-blue-300 font-bold">int main() {'{'}</div>
                        <div className="text-slate-400 pl-4">int a = 5;</div>
                        <div className="text-slate-300 pl-4">
                            int result = <span className={`transition-all duration-1000 ${compiled ? 'opacity-0 absolute' : 'opacity-100 relative text-yellow-400'}`}>square(a)</span>
                            <span className={`transition-all duration-1000 bg-cyan-900/30 border border-cyan-500/30 rounded py-0.5 px-2 text-cyan-300 ${compiled ? 'opacity-100 relative ml-1' : 'opacity-0 absolute'}`}>
                                (a * a)
                            </span>;
                        </div>
                        <div className="text-blue-300 font-bold">{'}'}</div>
                    </div>
                </div>

                {/* Explanation */}
                <div className="w-full md:w-64 bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-center text-center">
                    {compiled ? (
                        <div className="animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h4 className="font-bold text-white mb-2">Inlined Successfully!</h4>
                            <p className="text-xs text-slate-400">
                                The compiler literally replaced the function call with the actual logic. No function stack frame is created, saving CPU cycles!
                            </p>
                        </div>
                    ) : (
                        <div className="opacity-50">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-4">
                                <History size={32} />
                            </div>
                            <h4 className="font-bold text-slate-300 mb-2">Waiting for Compilation...</h4>
                            <p className="text-xs text-slate-500">
                                Click "Compile Code" to see the inline replacement happen.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function CppLecture3() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-pink-500/30">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src="/cpp/logo.png" alt="C-Units Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"  style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Advanced Class Concepts</h1>
                        <p className="text-[10px] text-pink-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 3</p>
                    </div>
                </div>
                <button 
                        onClick={() => setIsLightMode(!isLightMode)}
                        className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center shadow-lg"
                        style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }}
                        title="Toggle Light/Dark Mode"
                    >
                        {isLightMode ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-400" />}
                    </button>
                </header>

            {/* HERO */}
            <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-pink-900/20 border border-pink-500/30 text-pink-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-in-up shadow-sm">
                    <Zap size={14} /> Power User Techniques
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-white mb-8 leading-[1.1] tracking-tight">
                    Beyond the <br/>Basics
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-light">
                    Now that you understand what classes and objects are, it's time to explore the advanced mechanics: how C++ structures compare to classes, how static memory works, and how to optimize execution time with inline functions.
                </p>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Shapes size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Structures vs Unions vs Enums vs Classes</h2>
                </div>

                <TheoryCard title="The Data Structure Family Tree" icon={<Database size={20} />} variant="blue">
                    <p className="text-base mb-4">C++ inherited several data structures from C, and then added Classes. Understanding the differences is crucial for memory optimization and object-oriented design.</p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-blue-500/20 p-2 rounded text-blue-400 shrink-0"><Layers size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Structures (struct)</strong>
                                <span className="text-slate-400 text-sm">Groups different data types together. In C++, they are identical to classes EXCEPT that all members are <strong>Public</strong> by default instead of Private.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-red-500/20 p-2 rounded text-red-400 shrink-0"><GitMerge size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Unions (union)</strong>
                                <span className="text-slate-400 text-sm">Groups different data types, but they all <strong>share the exact same memory location</strong>. The size of the union is the size of its largest member. You can only safely use one member at a time. High-risk, extreme memory optimization.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-green-500/20 p-2 rounded text-green-400 shrink-0"><LayoutGrid size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Enumerations (enum)</strong>
                                <span className="text-slate-400 text-sm">Creates custom integer types with named constants (e.g., <code>enum Color {'{'} RED, GREEN, BLUE {'}'}</code>). Makes code highly readable instead of using raw magic numbers.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-purple-500/20 p-2 rounded text-purple-400 shrink-0"><Box size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Classes (class)</strong>
                                <span className="text-slate-400 text-sm">The ultimate structure. Groups data and functions. Everything is <strong>Private</strong> by default, enforcing strict encapsulation and security.</span>
                            </div>
                        </li>
                    </ul>
                </TheoryCard>

                <StructVsClassVisualizer />

                {/* NEW COMPONENT HERE */}
                <StepByStepUnionVisualizer />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-pink-500/20 rounded-xl border border-pink-500/30">
                        <Share2 size={28} className="text-pink-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Static Members</h2>
                </div>

                <TheoryCard title="Shared State Across All Objects" icon={<ZapIcon size={20} />} variant="purple">
                    <p className="text-base mb-4">Normally, if you create 100 objects, you get 100 copies of its variables. But what if you want to keep track of the total number of objects created? You need a variable that is shared by all of them.</p>
                    
                    <CodeBlock 
                        language="cpp"
                        title="Static Data Member Example"
                        code={`class Player {\npublic:\n    int health;                // Instance Variable: Unique to each player\n    static int totalPlayers;   // Static Variable: Shared across all players\n\n    Player() {                 // Constructor (called when object is created)\n        totalPlayers++;\n    }\n};\n\n// IMPORTANT: Static variables must be defined OUTSIDE the class!\nint Player::totalPlayers = 0;\n\nint main() {\n    Player p1;\n    Player p2;\n    \n    // Output will be 2!\n    cout << Player::totalPlayers;\n    return 0;\n}`}
                        explanation="The 'static' keyword tells the compiler to place the variable in the Data Segment of memory, not on the heap/stack with the object instances.\nBecause it doesn't belong to any specific object, we access it using the Class Name and Scope Resolution Operator: 'Player::totalPlayers'."
                    />
                </TheoryCard>

                <StaticMemberSimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                        <Cpu size={28} className="text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Inline Functions</h2>
                </div>

                <TheoryCard title="Trading Memory for Speed" icon={<Play size={20} />} variant="blue">
                    <p className="text-base mb-4">Calling a function requires CPU overhead (saving registers, jumping to a new memory address, pushing variables to the stack). If a function is extremely small, this overhead takes longer than executing the function itself!</p>
                    <p className="text-base mb-4">By adding the <code>inline</code> keyword, you ask the compiler to replace the function call directly with the function's code during compilation. This makes execution blazing fast, but slightly increases the size of your final <code>.exe</code> file.</p>
                </TheoryCard>

                <InlineFunctionVisualizer />

            </section>
            </div>
        </div>
    );
}
