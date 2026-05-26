"use client";

import React, { useState, useEffect } from 'react';
import {
    Terminal,
    Code,
    CheckCircle,
    Play,
    Layers,
    ArrowRight,
    Globe,
    Zap,
    LayoutGrid,
    Info,
    Server,
    BookOpen,
    AlertTriangle,
    Shield,
    GitMerge,
    Shapes,
    Lock,
    Unlock,
    Database,
    Network,
    Plus,
    Minus,
    Calculator,
    ZapIcon,
    Share2,
    StepForward,
    MemoryStick,
    Type,
    Wrench,
    SlidersHorizontal,
    ShoppingBag,
    ToggleLeft,
    ToggleRight,
    ArrowDownToLine,
    ArrowUpFromLine,
    EyeOff,
    UserX,
    UserCheck,
    Key,
    DollarSign,
    Waypoints,
    Focus,
    Eye,
    Scan,
    XCircle,
    Cpu,
    GitBranch,
    RotateCcw,
    Link,
    Unlink,
    Flame,
    Sun,
    Moon
} from 'lucide-react';

// --- SHARED COMPONENTS ---
const CodeBlock = ({ code, language = 'cpp', explanation, title }: { code: string, language?: string, explanation?: string, title?: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700/50 my-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-emerald-500/30 w-full relative">
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
                                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
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
                            const isKeyword = line.includes('void ') || line.includes('int ') || line.includes('double ') || line.includes('string ') || line.includes('class ') || line.includes('friend ');
                            const isAccess = line.includes('private:') || line.includes('public:');
                            
                            return (
                                <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors whitespace-pre">
                                    <span className="text-slate-600 mr-4 select-none w-6 inline-block text-right">{i + 1}</span>
                                    <span className={isComment ? 'text-slate-500 italic' : isAccess ? 'text-orange-400 font-bold' : isKeyword ? 'text-blue-400 font-bold' : line.includes('cout') ? 'text-green-400' : ''}>
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
                    <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
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

const TheoryCard = ({ title, icon, children, variant = 'blue' }: { title: string, icon: React.ReactNode, children: React.ReactNode, variant?: 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'emerald' }) => {
    const colors = {
        blue: 'border-blue-500/50 bg-blue-900/10 hover:bg-blue-900/20 shadow-blue-900/20',
        purple: 'border-purple-500/50 bg-purple-900/10 hover:bg-purple-900/20 shadow-purple-900/20',
        orange: 'border-orange-500/50 bg-orange-900/10 hover:bg-orange-900/20 shadow-orange-900/20',
        green: 'border-green-500/50 bg-green-900/10 hover:bg-green-900/20 shadow-green-900/20',
        emerald: 'border-emerald-500/50 bg-emerald-900/10 hover:bg-emerald-900/20 shadow-emerald-900/20',
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

const ReferenceAliasingSimulator = () => {
    const [action, setAction] = useState<'start' | 'uninitialized' | 'valid' | 'reassign'>('start');

    const stateMap = {
        'start': {
            code: '// Choose an action below',
            valA: 10, valB: 20, refTarget: null,
            status: 'neutral',
            msg: 'Memory initialized with two distinct variables.'
        },
        'uninitialized': {
            code: 'int& ref;',
            valA: 10, valB: 20, refTarget: null,
            status: 'error',
            msg: "COMPILER ERROR: 'ref' declared as reference but not initialized. References CANNOT be null."
        },
        'valid': {
            code: 'int& ref = a;\nref = 99;',
            valA: 99, valB: 20, refTarget: 'a',
            status: 'ok',
            msg: "SUCCESS! 'ref' is an alias for 'a'. Modifying 'ref' directly changes 'a'."
        },
        'reassign': {
            code: 'int& ref = a;\nref = b;',
            valA: 20, valB: 20, refTarget: 'a', // Key detail: refTarget doesn't change!
            status: 'warning',
            msg: "TRICK QUESTION! This does NOT make 'ref' point to 'b'. It takes the VALUE of 'b' (20) and assigns it to 'a' through 'ref'."
        }
    };

    const s = stateMap[action];

    return (
        <div className="my-12 p-6 md:p-8 bg-blue-950/20 rounded-2xl border border-blue-900/30 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Link size={24} className="text-blue-400" />
                The Reference Rules Sandbox
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                References in C++ have very strict rules. They must be assigned immediately, and they can never be "re-seated" to point to another variable. Test the scenarios below to see how the compiler reacts!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Code & Controls */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="font-mono text-sm text-slate-400 mb-4 bg-[#0a0a0a] p-4 rounded-lg border border-slate-800">
                            <span className="text-blue-400 font-bold">int</span> a = <span className="text-green-400">10</span>;<br/>
                            <span className="text-blue-400 font-bold">int</span> b = <span className="text-green-400">20</span>;
                        </div>
                        
                        <div className="space-y-2 mb-6">
                            <button onClick={() => setAction('uninitialized')} className={`w-full text-left p-3 rounded-lg border text-sm font-mono transition-all ${action === 'uninitialized' ? 'bg-red-900/30 border-red-500 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                                <span className="text-blue-400">int</span>&amp; ref;
                            </button>
                            <button onClick={() => setAction('valid')} className={`w-full text-left p-3 rounded-lg border text-sm font-mono transition-all ${action === 'valid' ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                                <span className="text-blue-400">int</span>&amp; ref = a;<br/>ref = <span className="text-green-400">99</span>;
                            </button>
                            <button onClick={() => setAction('reassign')} className={`w-full text-left p-3 rounded-lg border text-sm font-mono transition-all ${action === 'reassign' ? 'bg-yellow-900/30 border-yellow-500 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                                <span className="text-blue-400">int</span>&amp; ref = a;<br/>ref = b; <span className="text-slate-500 italic">// Try to reassign?</span>
                            </button>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border flex gap-3 items-start
                        ${s.status === 'error' ? 'bg-red-950/40 border-red-500/50' : 
                          s.status === 'ok' ? 'bg-green-950/40 border-green-500/50' : 
                          s.status === 'warning' ? 'bg-yellow-950/40 border-yellow-500/50' : 
                          'bg-slate-800 border-slate-700'}`}
                    >
                        {s.status === 'error' && <XCircle className="text-red-400 shrink-0 mt-0.5" />}
                        {s.status === 'ok' && <CheckCircle className="text-green-400 shrink-0 mt-0.5" />}
                        {s.status === 'warning' && <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" />}
                        {s.status === 'neutral' && <Info className="text-slate-400 shrink-0 mt-0.5" />}
                        <p className={`text-sm leading-relaxed ${s.status === 'error' ? 'text-red-300' : s.status === 'ok' ? 'text-green-300' : s.status === 'warning' ? 'text-yellow-300' : 'text-slate-400'}`}>
                            {s.msg}
                        </p>
                    </div>
                </div>

                {/* Memory View */}
                <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col justify-center items-center relative min-h-[300px]">
                    <div className="absolute top-4 left-4 text-slate-500 font-bold text-xs uppercase flex items-center gap-2">
                        <Server size={14}/> Stack Memory
                    </div>

                    <div className="flex gap-8 items-end relative w-full justify-center">
                        {/* Variable A */}
                        <div className="flex flex-col items-center gap-2 relative z-10">
                            <span className="text-blue-400 font-mono font-bold">int a</span>
                            <div className={`w-24 h-24 rounded-xl border-2 flex items-center justify-center text-3xl font-bold font-mono transition-all duration-500 
                                ${action === 'valid' ? 'bg-green-900/30 border-green-500 text-green-400 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 
                                  action === 'reassign' ? 'bg-yellow-900/30 border-yellow-500 text-yellow-400 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 
                                  'bg-slate-800 border-slate-600 text-white'}`}
                            >
                                {s.valA}
                            </div>
                        </div>

                        {/* Variable B */}
                        <div className="flex flex-col items-center gap-2 relative z-10">
                            <span className="text-blue-400 font-mono font-bold">int b</span>
                            <div className="w-24 h-24 rounded-xl border-2 border-slate-600 bg-slate-800 flex items-center justify-center text-3xl font-bold font-mono text-white transition-all duration-500">
                                {s.valB}
                            </div>
                        </div>
                        
                        {/* Reference Alias indicator */}
                        {s.refTarget && (
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 flex items-center gap-2 font-bold font-mono px-3 py-1 rounded-full border-2 bg-[#0f172a] z-20 transition-all duration-500
                                ${s.refTarget === 'a' ? '-ml-[70px] border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'ml-[70px] border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'}`}
                            >
                                <Link size={14}/> ref
                            </div>
                        )}

                        {s.status === 'error' && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 flex items-center gap-2 font-bold font-mono px-3 py-1 rounded-full border-2 border-red-500 text-red-400 bg-red-950 shadow-[0_0_15px_rgba(239,68,68,0.3)] z-20 animate-bounce">
                                <Unlink size={14}/> NULL REF
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PassBySimulator = () => {
    const [action, setAction] = useState<'init' | 'call' | 'modify' | 'return'>('init');

    const stateMap = {
        'init': {
            mainVal: 50,
            funcVal_value: null, funcRef_value: null, funcAddr_value: null,
            desc: "1. Variables declared in main(). They live in main's stack memory.",
            codeMain: 2, codeFunc: null
        },
        'call': {
            mainVal: 50,
            funcVal_value: 50, funcRef_value: 50, funcAddr_value: "0xABC",
            desc: "2. Functions are called. Call-by-Value copies the data. Call-by-Reference aliases it. Call-by-Address passes the pointer.",
            codeMain: 5, codeFunc: 1
        },
        'modify': {
            mainVal: 50, // Reference modifies it live, so we'll handle this in the render
            funcVal_value: 99, funcRef_value: 99, funcAddr_value: "0xABC",
            desc: "3. The function modifies the variable it received to 99.",
            codeMain: 5, codeFunc: 2
        },
        'return': {
            mainVal: 50, // Handled in render
            funcVal_value: null, funcRef_value: null, funcAddr_value: null,
            desc: "4. Function ends. Local stack is destroyed. Notice who survived in main()!",
            codeMain: 8, codeFunc: null
        }
    };

    const s = stateMap[action];

    // Compute main memory values dynamically based on what modifies it
    const mainMemoryValue = action === 'modify' || action === 'return' ? 50 : 50; 
    const mainMemoryRef = action === 'modify' || action === 'return' ? 99 : 50; 
    const mainMemoryAddr = action === 'modify' || action === 'return' ? 99 : 50; 

    return (
        <div className="my-12 p-6 md:p-8 bg-purple-950/20 rounded-2xl border border-purple-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <MemoryStick size={24} className="text-purple-400" />
                Pass By Value vs Reference vs Address
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Watch exactly what happens in memory when you pass arguments to a function using the three different methods. Step through the execution to see who actually modifies the original data!
            </p>

            {/* Controls */}
            <div className="flex gap-2 mb-8 bg-slate-900 p-2 rounded-xl border border-slate-800 w-fit">
                <button onClick={() => setAction('init')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${action === 'init' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>1. Init</button>
                <button onClick={() => setAction('call')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${action === 'call' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>2. Call</button>
                <button onClick={() => setAction('modify')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${action === 'modify' ? 'bg-yellow-600 text-white shadow-[0_0_15px_rgba(202,138,4,0.4)]' : 'text-slate-400 hover:bg-slate-800'}`}>3. Modify</button>
                <button onClick={() => setAction('return')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${action === 'return' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>4. Return</button>
            </div>

            <div className="text-purple-300 font-bold mb-6 flex items-center gap-2">
                <Info size={16}/> {s.desc}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                
                {/* CALL BY VALUE */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">Call By Value</div>
                    
                    {/* Function Memory */}
                    <div className="mb-6">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono flex items-center gap-2"><Cpu size={14}/> Function Stack</div>
                        <div className={`p-4 rounded-xl border-2 transition-all duration-500 font-mono flex items-center justify-between ${s.funcVal_value !== null ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800/30 border-slate-700/50 grayscale opacity-50'}`}>
                            <div><span className="text-blue-400">int</span> v</div>
                            <div className={`text-2xl font-bold ${action === 'modify' ? 'text-yellow-400 scale-125 transition-transform' : 'text-white'}`}>{s.funcVal_value !== null ? s.funcVal_value : '---'}</div>
                        </div>
                    </div>

                    <div className="flex justify-center my-4 text-slate-600"><ArrowDownToLine size={24} /></div>

                    {/* Main Memory */}
                    <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono flex items-center gap-2"><Server size={14}/> main() Stack</div>
                        <div className={`p-4 rounded-xl border-2 border-slate-600 bg-slate-800 transition-all duration-500 font-mono flex items-center justify-between`}>
                            <div><span className="text-blue-400">int</span> x</div>
                            <div className="text-2xl font-bold text-white">{mainMemoryValue}</div>
                        </div>
                    </div>
                </div>

                {/* CALL BY REFERENCE */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-0 right-0 bg-green-900/50 text-green-400 border-b border-l border-green-500/30 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">Call By Reference</div>
                    
                    {/* Function Memory */}
                    <div className="mb-6">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono flex items-center gap-2"><Cpu size={14}/> Function Stack</div>
                        <div className={`p-4 rounded-xl border-2 transition-all duration-500 font-mono flex items-center justify-between ${s.funcRef_value !== null ? 'bg-green-900/30 border-green-500' : 'bg-slate-800/30 border-slate-700/50 grayscale opacity-50'}`}>
                            <div><span className="text-blue-400">int</span>&amp; ref</div>
                            <div className={`text-2xl font-bold ${action === 'modify' ? 'text-yellow-400 scale-125 transition-transform' : 'text-white'}`}>{s.funcRef_value !== null ? s.funcRef_value : '---'}</div>
                        </div>
                    </div>

                    <div className="flex justify-center my-4 text-green-500/50 relative">
                        {action === 'modify' ? (
                            <ArrowDownToLine size={24} className="text-yellow-500 animate-pulse" />
                        ) : (
                            <ArrowDownToLine size={24} />
                        )}
                        {s.funcRef_value !== null && <span className="absolute left-1/2 ml-4 -mt-2 text-[10px] font-bold text-green-400 uppercase tracking-widest bg-green-500/20 px-2 py-1 rounded-full">Alias</span>}
                    </div>

                    {/* Main Memory */}
                    <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono flex items-center gap-2"><Server size={14}/> main() Stack</div>
                        <div className={`p-4 rounded-xl border-2 transition-all duration-500 font-mono flex items-center justify-between ${action === 'modify' || action === 'return' ? 'bg-green-900/20 border-green-500' : 'bg-slate-800 border-slate-600'}`}>
                            <div><span className="text-blue-400">int</span> y</div>
                            <div className={`text-2xl font-bold ${action === 'modify' ? 'text-yellow-400' : 'text-white'}`}>{mainMemoryRef}</div>
                        </div>
                    </div>
                </div>

                {/* CALL BY ADDRESS */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">Call By Address</div>
                    
                    {/* Function Memory */}
                    <div className="mb-6">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono flex items-center gap-2"><Cpu size={14}/> Function Stack</div>
                        <div className={`p-4 rounded-xl border-2 transition-all duration-500 font-mono flex items-center justify-between ${s.funcAddr_value !== null ? 'bg-purple-900/30 border-purple-500' : 'bg-slate-800/30 border-slate-700/50 grayscale opacity-50'}`}>
                            <div><span className="text-blue-400">int</span>* ptr</div>
                            <div className={`text-xl font-bold ${action === 'modify' ? 'text-yellow-400 scale-110 transition-transform' : 'text-purple-300'}`}>{s.funcAddr_value !== null ? s.funcAddr_value : '---'}</div>
                        </div>
                    </div>

                    <div className="flex justify-center my-4 text-purple-500/50 relative">
                        {action === 'modify' ? (
                            <ArrowDownToLine size={24} className="text-yellow-500 animate-pulse" />
                        ) : (
                            <ArrowDownToLine size={24} />
                        )}
                        {s.funcAddr_value !== null && <span className="absolute left-1/2 ml-4 -mt-2 text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/20 px-2 py-1 rounded-full">Pointer</span>}
                    </div>

                    {/* Main Memory */}
                    <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono flex items-center gap-2"><Server size={14}/> main() Stack</div>
                        <div className={`p-4 rounded-xl border-2 transition-all duration-500 font-mono flex items-center justify-between ${action === 'modify' || action === 'return' ? 'bg-purple-900/20 border-purple-500' : 'bg-slate-800 border-slate-600'}`}>
                            <div>
                                <span className="text-blue-400">int</span> z 
                                <span className="block text-[10px] text-purple-400">&amp;z = 0xABC</span>
                            </div>
                            <div className={`text-2xl font-bold ${action === 'modify' ? 'text-yellow-400' : 'text-white'}`}>{mainMemoryAddr}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const RecursionStackVisualizer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { desc: "Initial call: factorial(3)", stack: [{ call: "factorial(3)", n: 3, return: "3 * factorial(2)", status: "waiting" }] },
        { desc: "n is not 1. Calls factorial(2). Stack grows.", stack: [{ call: "factorial(3)", n: 3, return: "3 * factorial(2)", status: "waiting" }, { call: "factorial(2)", n: 2, return: "2 * factorial(1)", status: "waiting" }] },
        { desc: "n is not 1. Calls factorial(1). Stack grows.", stack: [{ call: "factorial(3)", n: 3, return: "3 * factorial(2)", status: "waiting" }, { call: "factorial(2)", n: 2, return: "2 * factorial(1)", status: "waiting" }, { call: "factorial(1)", n: 1, return: "1 (BASE CASE)", status: "base" }] },
        { desc: "BASE CASE HIT! Returns 1 to the caller.", stack: [{ call: "factorial(3)", n: 3, return: "3 * factorial(2)", status: "waiting" }, { call: "factorial(2)", n: 2, return: "2 * 1", status: "resolving" }] },
        { desc: "factorial(2) resolves to 2. Returns to caller.", stack: [{ call: "factorial(3)", n: 3, return: "3 * 2", status: "resolving" }] },
        { desc: "factorial(3) resolves to 6. Stack is empty.", stack: [{ call: "Final Result", n: "-", return: "6", status: "done" }] },
    ];

    const current = steps[step];

    return (
        <div className="my-12 p-6 md:p-8 bg-emerald-950/20 rounded-2xl border border-emerald-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <RotateCcw size={24} className="text-emerald-400" />
                Recursion Stack Visualizer: factorial(3)
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Recursion relies heavily on the Function Call Stack. Every recursive call pushes a new frame onto the stack. It keeps growing until it hits the <strong>Base Case</strong>, then the stack unwinds and resolves!
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Code Block */}
                <div className="flex-1 bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col justify-between">
                    <div>
                        <div className="font-mono text-sm text-slate-300 space-y-2 mb-6">
                            <div><span className="text-blue-400 font-bold">int</span> factorial(<span className="text-blue-400 font-bold">int</span> n) {'{'}</div>
                            <div className="ml-4 p-1 rounded transition-colors bg-emerald-900/30 border-l-2 border-emerald-500">
                                <span className="text-slate-500 italic">// Base Case</span><br/>
                                <span className="text-purple-400 font-bold">if</span> (n &lt;= 1) <span className="text-purple-400 font-bold">return</span> <span className="text-green-400">1</span>;
                            </div>
                            <div className="ml-4 p-1 rounded transition-colors bg-orange-900/30 border-l-2 border-orange-500">
                                <span className="text-slate-500 italic">// Recursive Call</span><br/>
                                <span className="text-purple-400 font-bold">return</span> n * <span className="text-yellow-300">factorial</span>(n - 1);
                            </div>
                            <div>{'}'}</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-bold text-emerald-400 mb-4 bg-emerald-950/50 p-3 rounded-lg border border-emerald-500/30">
                            <Info size={16} className="inline mr-2"/>
                            {current.desc}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="p-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"><Minus size={16}/></button>
                            <button onClick={() => setStep(Math.min(5, step + 1))} disabled={step === 5} className="flex-1 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500 disabled:opacity-50 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2">
                                {step === 5 ? 'Done!' : 'Step Forward'} <StepForward size={16}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stack Visualizer */}
                <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-6 relative flex flex-col items-center justify-end h-[400px]">
                    <div className="absolute top-4 left-4 text-slate-500 font-bold text-xs uppercase flex items-center gap-2">
                        <Layers size={14}/> Stack Memory
                    </div>

                    <div className="w-full max-w-[300px] flex flex-col-reverse gap-2">
                        {current.stack.map((frame, i) => (
                            <div key={i} className={`w-full border-2 p-4 rounded-xl shadow-lg transition-all duration-500 animate-in slide-in-from-top-4 
                                ${frame.status === 'base' ? 'border-emerald-500 bg-emerald-900/30 scale-105 shadow-emerald-500/20' : 
                                  frame.status === 'resolving' ? 'border-yellow-500 bg-yellow-900/30 scale-105 shadow-yellow-500/20' :
                                  frame.status === 'done' ? 'border-blue-500 bg-blue-900/40 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-110' :
                                  'border-slate-700 bg-slate-900 opacity-50'}`}
                            >
                                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                                    <div className="font-bold font-mono text-white text-sm">{frame.call}</div>
                                    <span className={`text-[9px] text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-widest
                                        ${frame.status === 'base' ? 'bg-emerald-500' : frame.status === 'resolving' ? 'bg-yellow-600' : frame.status === 'done' ? 'bg-blue-500' : 'bg-slate-600'}`}
                                    >
                                        {frame.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="text-slate-400">n: <span className="text-white">{frame.n}</span></span>
                                    <span className="text-slate-400">returns: <span className="text-yellow-300 font-bold">{frame.return}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Visual floor of the stack */}
                    <div className="w-full max-w-[350px] h-2 bg-slate-800 rounded-full mt-4"></div>
                </div>
            </div>
        </div>
    );
};

const StackOverflowSimulator = () => {
    const [running, setRunning] = useState(false);
    const [frames, setFrames] = useState<number[]>([]);
    const [crashed, setCrashed] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (running && !crashed) {
            interval = setInterval(() => {
                setFrames(prev => {
                    if (prev.length > 25) {
                        setCrashed(true);
                        setRunning(false);
                        return prev;
                    }
                    return [...prev, prev.length];
                });
            }, 100); // Super fast to simulate crash
        }
        return () => clearInterval(interval);
    }, [running, crashed]);

    const handleRun = () => {
        setFrames([]);
        setCrashed(false);
        setRunning(true);
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-red-950/20 rounded-2xl border border-red-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Flame size={24} className="text-red-400" />
                Stack Overflow Detonator
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                What happens if you write a recursive function, but you <strong>forget the base case?</strong> The function will infinitely call itself, piling stack frames into memory until the operating system violently kills the program. This is called a Stack Overflow!
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Code Panel */}
                <div className="flex-1 bg-[#0f172a] rounded-xl border border-slate-800 p-6">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">bad_code.cpp</div>
                    
                    <div className="font-mono text-sm text-slate-300 space-y-2 mb-8 bg-black/40 p-4 rounded-lg border border-slate-800">
                        <div><span className="text-blue-400 font-bold">void</span> neverEnds() {'{'}</div>
                        <div className="ml-4 text-slate-500 italic">// Oh no... I forgot the base case!</div>
                        <div className="ml-4 p-1 rounded transition-colors bg-red-900/20 border-l-2 border-red-500">
                            <span className="text-yellow-300">neverEnds</span>(); <span className="text-slate-500 italic">// Infinite recursion</span>
                        </div>
                        <div>{'}'}</div>
                        <br/>
                        <div><span className="text-blue-400 font-bold">int</span> main() {'{'}</div>
                        <div className="ml-4">
                            <span className="text-yellow-300">neverEnds</span>();
                        </div>
                        <div>{'}'}</div>
                    </div>

                    {!running && !crashed && (
                        <button onClick={handleRun} className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2">
                            <Play size={18}/> Execute Code
                        </button>
                    )}
                    {running && (
                        <button disabled className="w-full py-3 bg-slate-800 text-slate-400 font-bold rounded-lg animate-pulse flex items-center justify-center gap-2">
                            <Flame size={18} className="text-red-500"/> Executing...
                        </button>
                    )}
                    {crashed && (
                        <button onClick={handleRun} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                            <RotateCcw size={18}/> Reset Memory
                        </button>
                    )}
                </div>

                {/* Visualizer Panel */}
                <div className={`flex-1 rounded-xl border p-6 relative flex flex-col justify-end h-[400px] overflow-hidden transition-all duration-500
                    ${crashed ? 'bg-red-950/80 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.6)]' : 'bg-slate-950 border-slate-800'}`}
                >
                    <div className="absolute top-4 left-4 text-slate-500 font-bold text-xs uppercase flex items-center gap-2 z-20">
                        <Layers size={14}/> Stack Memory Limit: {frames.length}/25
                    </div>

                    {/* The crashing UI overlay */}
                    {crashed && (
                        <div className="absolute inset-0 bg-red-900/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-in zoom-in duration-300">
                            <XCircle size={64} className="text-white mb-4 animate-bounce" />
                            <h2 className="text-4xl font-extrabold text-white tracking-tight">STACK OVERFLOW</h2>
                            <p className="text-red-200 mt-2 font-mono">Process terminated with exit code 139 (SIGSEGV)</p>
                        </div>
                    )}

                    <div className="w-full flex flex-col-reverse gap-1 z-10 relative">
                        {frames.map((f, i) => (
                            <div key={i} className="w-full bg-slate-800 border border-slate-700 p-2 rounded flex justify-between items-center animate-in slide-in-from-top-2">
                                <span className="text-xs font-mono text-slate-300">neverEnds()</span>
                                <span className="text-[10px] text-slate-500 font-mono">ADDR: 0x{Math.floor(Math.random() * 10000).toString(16)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CppLecture6() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-emerald-500/30">
                {/* HEADER */}
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/cpp/logo.png" alt="C-Units Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Reference Variables & Recursion</h1>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 6</p>
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
                <div className="inline-flex items-center gap-2 bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-in-up shadow-sm">
                    <GitBranch size={14} /> Advanced Memory & Flow Control
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-white mb-8 leading-[1.1] tracking-tight">
                    Aliases & <br/>Recursion
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-light">
                    Discover how to create aliases for variables using References, understand the three ways to pass arguments to functions, and master the mind-bending concept of functions calling themselves.
                </p>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Type size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Reference Variables</h2>
                </div>

                <TheoryCard title="Two Names, One Memory Location" icon={<Waypoints size={20} />} variant="blue">
                    <p className="text-base mb-4">A reference variable is an <strong>alias</strong>, or an alternate name, for an existing variable. Once a reference is initialized to a variable, it cannot be changed to refer to another variable.</p>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg mt-4 border-l-4 border-l-yellow-500">
                        <h5 className="font-bold text-yellow-500 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Crucial Rules</h5>
                        <ul className="text-sm text-slate-300 space-y-2 list-disc ml-5">
                            <li>You must use the <code>&amp;</code> symbol when declaring a reference (e.g., <code>int&amp; ref = var;</code>).</li>
                            <li>References <strong>must be initialized</strong> when they are created.</li>
                            <li>A reference does not take up extra memory. It literally uses the exact same memory address as the original variable.</li>
                        </ul>
                    </div>
                </TheoryCard>

                {/* NEW INTERACTIVE 1 */}
                <ReferenceAliasingSimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                        <Server size={28} className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Passing Arguments to Functions</h2>
                </div>

                <TheoryCard title="Value vs Address vs Reference" icon={<Cpu size={20} />} variant="purple">
                    <p className="text-base mb-4">When you pass data to a function, you are strict choosing how memory is handled between the caller and the function.</p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-blue-500/20 p-2 rounded text-blue-400 shrink-0"><Code size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Call by Value</strong>
                                <span className="text-slate-400 text-sm">A full <strong>copy</strong> of the variable is created. Modifications inside the function DO NOT affect the original. Very safe, but slow for large objects.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-purple-500/20 p-2 rounded text-purple-400 shrink-0"><Database size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Call by Address (Pointers)</strong>
                                <span className="text-slate-400 text-sm">Passes the memory address using pointers (<code>*</code> and <code>&amp;</code>). Modifications DO affect the original. Requires dereferencing inside the function.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800 border-l-4 border-l-green-500">
                            <div className="bg-green-500/20 p-2 rounded text-green-400 shrink-0"><Waypoints size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Call by Reference (C++ Only)</strong>
                                <span className="text-slate-400 text-sm">Passes an alias (<code>&amp;</code>) to the function. Modifications DO affect the original. Syntax is much cleaner than pointers—you use it like a normal variable!</span>
                            </div>
                        </li>
                    </ul>
                </TheoryCard>

                {/* INTERACTIVE 2 */}
                <PassBySimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                        <RotateCcw size={28} className="text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Recursion</h2>
                </div>

                <TheoryCard title="The Function That Calls Itself" icon={<Layers size={20} />} variant="emerald">
                    <p className="text-base mb-4">Recursion occurs when a function calls itself to solve a smaller piece of a problem. Every recursive function MUST have two components to prevent an infinite loop (Stack Overflow):</p>
                    <ol className="list-decimal space-y-2 ml-5 text-slate-300 font-mono text-sm">
                        <li><span className="font-bold text-white">Base Case:</span> The condition where the function stops calling itself and returns a definitive value.</li>
                        <li><span className="font-bold text-white">Recursive Call:</span> The part where the function calls itself with a modified parameter moving towards the base case.</li>
                    </ol>
                </TheoryCard>

                {/* INTERACTIVE 3 */}
                <RecursionStackVisualizer />

                {/* INTERACTIVE 4 */}
                <StackOverflowSimulator />

            </section>
            </div>
        </div>
    );
}
