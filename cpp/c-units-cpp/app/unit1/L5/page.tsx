"use client";

import React, { useState } from 'react';
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
    Sun,
    Moon
} from 'lucide-react';

// --- SHARED COMPONENTS ---
const CodeBlock = ({ code, language = 'cpp', explanation, title }: { code: string, language?: string, explanation?: string, title?: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700/50 my-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-purple-500/30 w-full relative">
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
                                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
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
                                    <span className={isComment ? 'text-slate-500 italic' : isAccess ? 'text-orange-400 font-bold' : isKeyword ? 'text-purple-400 font-bold' : line.includes('cout') ? 'text-green-400' : ''}>
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
                    <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
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

const FunctionOverloadSimulator = () => {
    const [selectedArgs, setSelectedArgs] = useState<'int' | 'double' | 'string' | 'int_int'>('int');

    const routing = {
        'int': { call: 'print(42);', target: 0, reason: 'Exact match: Integer parameter' },
        'double': { call: 'print(3.14);', target: 1, reason: 'Exact match: Double parameter' },
        'string': { call: 'print("Hello");', target: 2, reason: 'Exact match: String parameter' },
        'int_int': { call: 'print(10, 20);', target: 3, reason: 'Exact match: Two integer parameters' }
    };

    const targetIndex = routing[selectedArgs].target;

    return (
        <div className="my-12 p-6 md:p-8 bg-blue-950/20 rounded-2xl border border-blue-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Waypoints size={24} className="text-blue-400" />
                Function Overload Router
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                In C++, you can have multiple functions with the <strong>exact same name</strong>, as long as their parameters are different. The compiler uses the arguments you pass to route the call to the correct function!
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Caller Block */}
                <div className="flex-1 bg-slate-900 border border-slate-800 p-6 rounded-xl w-full relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">main.cpp</div>
                    
                    <h4 className="text-xs text-slate-500 font-mono font-bold uppercase mb-4 tracking-widest">1. Make a Function Call</h4>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button 
                            onClick={() => setSelectedArgs('int')}
                            className={`py-2 px-3 rounded-lg border font-mono text-xs transition-all ${selectedArgs === 'int' ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                        >
                            Pass Integer
                        </button>
                        <button 
                            onClick={() => setSelectedArgs('double')}
                            className={`py-2 px-3 rounded-lg border font-mono text-xs transition-all ${selectedArgs === 'double' ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                        >
                            Pass Double
                        </button>
                        <button 
                            onClick={() => setSelectedArgs('string')}
                            className={`py-2 px-3 rounded-lg border font-mono text-xs transition-all ${selectedArgs === 'string' ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                        >
                            Pass String
                        </button>
                        <button 
                            onClick={() => setSelectedArgs('int_int')}
                            className={`py-2 px-3 rounded-lg border font-mono text-xs transition-all ${selectedArgs === 'int_int' ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                        >
                            Pass Int, Int
                        </button>
                    </div>

                    <div className="bg-black/50 p-4 rounded-lg font-mono text-lg text-yellow-300 border border-slate-800 text-center relative overflow-hidden group">
                        <span className="relative z-10">{routing[selectedArgs].call}</span>
                    </div>

                    <div className="mt-4 bg-blue-950/40 border border-blue-500/30 p-3 rounded-lg text-xs text-blue-300 font-mono flex items-start gap-2">
                        <CheckCircle size={14} className="shrink-0 mt-0.5 text-blue-400"/>
                        {routing[selectedArgs].reason}
                    </div>
                </div>

                <div className="hidden md:flex text-blue-500/50">
                    <ArrowRight size={48} className="animate-pulse" />
                </div>

                {/* Receiver Block */}
                <div className="flex-[1.5] bg-slate-900 border border-slate-800 p-6 rounded-xl w-full relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">Library.cpp</div>
                    
                    <h4 className="text-xs text-slate-500 font-mono font-bold uppercase mb-4 tracking-widest">2. Compiler Routes to Signature</h4>

                    <div className="space-y-3 font-mono text-sm relative">
                        {/* Function 1 */}
                        <div className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${targetIndex === 0 ? 'bg-blue-900/40 border-blue-500 scale-[1.02] shadow-lg shadow-blue-500/20' : 'bg-slate-800/50 border-transparent opacity-40 grayscale'}`}>
                            <div><span className="text-blue-400">void</span> print(<span className="text-blue-300">int</span> i) {'{...}'}</div>
                            {targetIndex === 0 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-in fade-in zoom-in">EXECUTING</span>}
                        </div>
                        {/* Function 2 */}
                        <div className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${targetIndex === 1 ? 'bg-blue-900/40 border-blue-500 scale-[1.02] shadow-lg shadow-blue-500/20' : 'bg-slate-800/50 border-transparent opacity-40 grayscale'}`}>
                            <div><span className="text-blue-400">void</span> print(<span className="text-blue-300">double</span> d) {'{...}'}</div>
                            {targetIndex === 1 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-in fade-in zoom-in">EXECUTING</span>}
                        </div>
                        {/* Function 3 */}
                        <div className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${targetIndex === 2 ? 'bg-blue-900/40 border-blue-500 scale-[1.02] shadow-lg shadow-blue-500/20' : 'bg-slate-800/50 border-transparent opacity-40 grayscale'}`}>
                            <div><span className="text-blue-400">void</span> print(<span className="text-blue-300">string</span> s) {'{...}'}</div>
                            {targetIndex === 2 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-in fade-in zoom-in">EXECUTING</span>}
                        </div>
                        {/* Function 4 */}
                        <div className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${targetIndex === 3 ? 'bg-blue-900/40 border-blue-500 scale-[1.02] shadow-lg shadow-blue-500/20' : 'bg-slate-800/50 border-transparent opacity-40 grayscale'}`}>
                            <div><span className="text-blue-400">void</span> print(<span className="text-blue-300">int</span> x, <span className="text-blue-300">int</span> y) {'{...}'}</div>
                            {targetIndex === 3 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-in fade-in zoom-in">EXECUTING</span>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const OverloadAmbiguitySimulator = () => {
    const [call, setCall] = useState<'int_double' | 'double_int' | 'int_int'>('int_double');

    const state = {
        'int_double': { 
            code: 'calc(5, 3.14);', 
            target: 0, 
            status: 'ok', 
            msg: 'Matches Signature #1 exactly.' 
        },
        'double_int': { 
            code: 'calc(3.14, 5);', 
            target: 1, 
            status: 'ok', 
            msg: 'Matches Signature #2 exactly.' 
        },
        'int_int': { 
            code: 'calc(5, 5);', 
            target: null, 
            status: 'error', 
            msg: "AMBIGUITY ERROR! The compiler doesn't know if it should cast the second '5' to a double for Signature #1, or cast the first '5' to a double for Signature #2!" 
        }
    };

    const current = state[call];

    return (
        <div className="my-12 p-6 md:p-8 bg-red-950/20 rounded-2xl border border-red-900/30 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <AlertTriangle size={24} className="text-red-400" />
                The Ambiguity Trap Visualizer
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Function overloading can be dangerous! If the compiler can't figure out <em>exactly</em> which function you meant to call, it will throw an <strong>Ambiguity Error</strong> and refuse to compile.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Available Signatures */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest font-mono border-b border-slate-800 pb-2">Available Signatures</h4>
                    <div className="space-y-4 font-mono text-sm">
                        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${current.target === 0 ? 'bg-blue-900/30 border-blue-500' : current.status === 'error' ? 'bg-red-900/20 border-red-500/50 animate-pulse' : 'bg-slate-800 border-slate-700'}`}>
                            <span className="text-slate-500 text-xs block mb-1">Signature #1</span>
                            <span className="text-blue-400">void</span> calc(<span className="text-yellow-300">int</span> x, <span className="text-purple-300">double</span> y);
                        </div>
                        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${current.target === 1 ? 'bg-blue-900/30 border-blue-500' : current.status === 'error' ? 'bg-red-900/20 border-red-500/50 animate-pulse' : 'bg-slate-800 border-slate-700'}`}>
                            <span className="text-slate-500 text-xs block mb-1">Signature #2</span>
                            <span className="text-blue-400">void</span> calc(<span className="text-purple-300">double</span> x, <span className="text-yellow-300">int</span> y);
                        </div>
                    </div>
                </div>

                {/* You Try It */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest font-mono border-b border-slate-800 pb-2">Your Function Call</h4>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            <button onClick={() => setCall('int_double')} className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${call === 'int_double' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>calc(int, double)</button>
                            <button onClick={() => setCall('double_int')} className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${call === 'double_int' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>calc(double, int)</button>
                            <button onClick={() => setCall('int_int')} className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${call === 'int_int' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>calc(int, int)</button>
                        </div>

                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xl text-yellow-300 border border-slate-800 text-center mb-6">
                            {current.code}
                        </div>
                    </div>

                    {current.status === 'ok' ? (
                        <div className="bg-green-950/40 border border-green-500/30 p-4 rounded-lg flex gap-3 animate-in fade-in">
                            <CheckCircle className="text-green-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-green-400 font-bold mb-1">Compilation Successful</span>
                                <span className="text-green-300/80 text-sm">{current.msg}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-lg flex gap-3 animate-in fade-in">
                            <XCircle className="text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-red-400 font-bold mb-1">Fatal Compiler Error</span>
                                <span className="text-red-300/80 text-sm leading-relaxed">{current.msg}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const ScopeRulesVisualizer = () => {
    const [hoveredZone, setHoveredZone] = useState<'global' | 'local' | 'block' | null>(null);
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);

    const getOutputValue = () => {
        if (hoveredLine === 1) return "50"; // global
        if (hoveredLine === 4) return "10"; // shadowed local
        if (hoveredLine === 7) return "99"; // block local
        if (hoveredLine === 10) return "10"; // outer local
        return "?";
    };
    
    const getResolutionMethod = () => {
        if (hoveredLine === 1) return "Direct access to Global Scope";
        if (hoveredLine === 4) return "Local scope SHADOWS global scope";
        if (hoveredLine === 7) return "Block scope SHADOWS local scope";
        if (hoveredLine === 10) return "Block destroyed. Returns to Local scope";
        return "Hover over a 'cout' statement to see resolution";
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-green-950/20 rounded-2xl border border-green-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Scan size={24} className="text-green-400" />
                Scope & Shadowing Visualizer
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                A variable's <strong>scope</strong> determines where it can be accessed. C++ searches for variables from the innermost scope outwards. If an inner variable has the same name as an outer variable, it <strong>shadows</strong> (hides) the outer one!
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Code Side */}
                <div className="flex-[1.5] bg-[#0d1117] rounded-xl border border-slate-800 p-6 font-mono text-sm relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">main.cpp</div>
                    
                    {/* GLOBAL SCOPE */}
                    <div 
                        className={`transition-all duration-300 rounded p-2 ${hoveredZone === 'global' ? 'bg-orange-900/30 border-l-2 border-orange-500' : 'border-l-2 border-transparent hover:bg-white/5'}`}
                        onMouseEnter={() => setHoveredZone('global')}
                        onMouseLeave={() => setHoveredZone(null)}
                    >
                        <span className="text-slate-500 italic">// Global Scope</span><br/>
                        <span className="text-blue-400 font-bold">int</span> x = <span className="text-green-400">50</span>;
                    </div>

                    <div className="mt-4">
                        <span className="text-blue-400 font-bold">void</span> <span className="text-yellow-200">printNumbers</span>() {'{'}
                        
                        {/* FUNCTION LOCAL SCOPE */}
                        <div 
                            className={`ml-4 transition-all duration-300 rounded p-2 mt-2 border-l-2 ${hoveredZone === 'local' ? 'bg-blue-900/30 border-blue-500' : 'border-slate-800 hover:bg-white/5'}`}
                            onMouseEnter={() => setHoveredZone('local')}
                            onMouseLeave={() => setHoveredZone(null)}
                        >
                            <span className="text-slate-500 italic">// Local Scope</span><br/>
                            <span className="text-blue-400 font-bold">int</span> x = <span className="text-green-400">10</span>; 
                            
                            <div 
                                className={`mt-2 p-1 rounded cursor-crosshair transition-colors ${hoveredLine === 4 ? 'bg-blue-500/20 text-white font-bold' : ''}`}
                                onMouseEnter={() => setHoveredLine(4)}
                                onMouseLeave={() => setHoveredLine(null)}
                            >
                                <span className="text-green-400">cout</span> &lt;&lt; x; <span className="text-slate-500 italic text-xs ml-2">&lt;-- Hover me</span>
                            </div>

                            {/* BLOCK SCOPE */}
                            <div className="mt-4 text-slate-300">{'if (true) {'}</div>
                            <div 
                                className={`ml-4 transition-all duration-300 rounded p-2 border-l-2 ${hoveredZone === 'block' ? 'bg-purple-900/30 border-purple-500' : 'border-slate-700 hover:bg-white/5'}`}
                                onMouseEnter={() => setHoveredZone('block')}
                                onMouseLeave={() => setHoveredZone(null)}
                            >
                                <span className="text-slate-500 italic">// Block Scope</span><br/>
                                <span className="text-blue-400 font-bold">int</span> x = <span className="text-green-400">99</span>;
                                
                                <div 
                                    className={`mt-2 p-1 rounded cursor-crosshair transition-colors ${hoveredLine === 7 ? 'bg-purple-500/20 text-white font-bold' : ''}`}
                                    onMouseEnter={() => setHoveredLine(7)}
                                    onMouseLeave={() => setHoveredLine(null)}
                                >
                                    <span className="text-green-400">cout</span> &lt;&lt; x; <span className="text-slate-500 italic text-xs ml-2">&lt;-- Hover me</span>
                                </div>
                                <div 
                                    className={`mt-1 p-1 rounded cursor-crosshair transition-colors ${hoveredLine === 1 ? 'bg-orange-500/20 text-white font-bold' : ''}`}
                                    onMouseEnter={() => setHoveredLine(1)}
                                    onMouseLeave={() => setHoveredLine(null)}
                                >
                                    <span className="text-green-400">cout</span> &lt;&lt; ::x; <span className="text-slate-500 italic text-xs ml-2">// Scope Resolution bypass</span>
                                </div>
                            </div>
                            <div className="text-slate-300">{'}'}</div>

                            <div 
                                className={`mt-2 p-1 rounded cursor-crosshair transition-colors ${hoveredLine === 10 ? 'bg-blue-500/20 text-white font-bold' : ''}`}
                                onMouseEnter={() => setHoveredLine(10)}
                                onMouseLeave={() => setHoveredLine(null)}
                            >
                                <span className="text-green-400">cout</span> &lt;&lt; x; <span className="text-slate-500 italic text-xs ml-2">&lt;-- Hover me</span>
                            </div>
                        </div>
                        {'}'}
                    </div>
                </div>

                {/* Info Panel Side */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* Live Output */}
                    <div className="bg-slate-900 border-2 border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[150px]">
                        <div className="absolute top-2 left-3 text-xs font-bold text-slate-500 font-mono">Console Output</div>
                        <div className="text-6xl font-bold font-mono text-green-400">
                            {getOutputValue()}
                        </div>
                        <div className="text-xs text-slate-400 mt-4 text-center">
                            {getResolutionMethod()}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h4 className="text-sm font-bold text-slate-300 mb-3 border-b border-slate-800 pb-2">Scope Hierarchy</h4>
                        <div className="space-y-3 font-mono text-xs">
                            <div 
                                className={`flex items-center gap-3 p-2 rounded transition-colors ${hoveredZone === 'block' ? 'bg-purple-900/30' : ''}`}
                                onMouseEnter={() => setHoveredZone('block')}
                                onMouseLeave={() => setHoveredZone(null)}
                            >
                                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                <div className="flex-1"><span className="font-bold text-purple-300">Block Scope</span> (Highest Prio)</div>
                            </div>
                            <div 
                                className={`flex items-center gap-3 p-2 rounded transition-colors ${hoveredZone === 'local' ? 'bg-blue-900/30' : ''}`}
                                onMouseEnter={() => setHoveredZone('local')}
                                onMouseLeave={() => setHoveredZone(null)}
                            >
                                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <div className="flex-1"><span className="font-bold text-blue-300">Local Scope</span></div>
                            </div>
                            <div 
                                className={`flex items-center gap-3 p-2 rounded transition-colors ${hoveredZone === 'global' ? 'bg-orange-900/30' : ''}`}
                                onMouseEnter={() => setHoveredZone('global')}
                                onMouseLeave={() => setHoveredZone(null)}
                            >
                                <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                                <div className="flex-1"><span className="font-bold text-orange-300">Global Scope</span> (Lowest Prio)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FriendClassVisualizer = () => {
    const [isFriend, setIsFriend] = useState(false);
    const [hackAttempt, setHackAttempt] = useState<string | null>(null);

    const tryHack = (actor: 'Hacker' | 'Auditor') => {
        setHackAttempt(actor);
        setTimeout(() => setHackAttempt(null), 2500);
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-purple-950/20 rounded-2xl border border-purple-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Shield size={24} className="text-purple-400" />
                Friend Class Permissions Sandbox
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                By default, private members are strictly locked inside a class. However, a class can explicitly declare another class as a <code>friend</code>. Friends bypass encapsulation and get full VIP access to private data.
            </p>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* Vault (The target class) */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Target Class</div>
                    
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Database size={32} className="text-slate-500" />
                            <div>
                                <h4 className="font-bold text-white text-lg font-mono">class BankAccount</h4>
                                <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">Strict Encapsulation</span>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 font-mono text-sm border border-slate-800 mb-6">
                            <span className="text-orange-400 font-bold">private:</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">double</span> balance = <span className="text-green-400">1000000.00</span>;
                        </div>

                        {/* FRIEND DECLARATION UI */}
                        <div className={`p-4 rounded-lg border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center text-center ${isFriend ? 'border-purple-500 bg-purple-900/20' : 'border-slate-700 bg-slate-800/30'}`}>
                            {isFriend ? (
                                <div className="text-purple-400 font-mono text-sm">
                                    <span className="text-purple-300 font-bold">friend class</span> Auditor;
                                </div>
                            ) : (
                                <div className="text-slate-500 text-sm mb-2">No friends declared.</div>
                            )}
                            <button 
                                onClick={() => setIsFriend(!isFriend)}
                                className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg ${isFriend ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-500/20'}`}
                            >
                                {isFriend ? 'Remove Friend Status' : 'Declare Auditor as Friend'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actors trying to access the vault */}
                <div className="space-y-4 flex flex-col justify-between">
                    
                    {/* Hacker */}
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <UserX size={20} className="text-red-400"/>
                                <span className="font-bold text-slate-300 font-mono">class Hacker</span>
                            </div>
                            <button onClick={() => tryHack('Hacker')} disabled={hackAttempt !== null} className="bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 px-3 py-1 text-xs rounded font-bold transition-colors disabled:opacity-50">
                                Access Balance
                            </button>
                        </div>
                        <div className="font-mono text-xs text-slate-500">
                            account.balance = 0;
                        </div>

                        {/* HACK RESULT UI */}
                        {hackAttempt === 'Hacker' && (
                            <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200 backdrop-blur-sm z-20">
                                <Lock size={32} className="text-red-500 mb-2"/>
                                <span className="text-red-400 font-bold text-sm">COMPILER ERROR</span>
                                <span className="text-xs text-red-300 mt-1 max-w-[80%] text-center">'balance' is a private member</span>
                            </div>
                        )}
                    </div>

                    {/* Auditor */}
                    <div className={`bg-slate-900 border p-4 rounded-xl relative overflow-hidden transition-all duration-500 ${isFriend ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'border-slate-800'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <UserCheck size={20} className={isFriend ? "text-purple-400" : "text-slate-500"}/>
                                <span className="font-bold text-slate-300 font-mono">class Auditor</span>
                                {isFriend && <Key size={14} className="text-yellow-400 ml-1 animate-pulse"/>}
                            </div>
                            <button onClick={() => tryHack('Auditor')} disabled={hackAttempt !== null} className={`px-3 py-1 text-xs rounded font-bold transition-colors disabled:opacity-50 border ${isFriend ? 'bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border-purple-500/30' : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'}`}>
                                Access Balance
                            </button>
                        </div>
                        <div className="font-mono text-xs text-slate-500">
                            cout &lt;&lt; account.balance;
                        </div>

                        {/* HACK RESULT UI */}
                        {hackAttempt === 'Auditor' && (
                            <div className={`absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200 backdrop-blur-sm z-20 ${isFriend ? 'bg-purple-950/90' : 'bg-red-950/90'}`}>
                                {isFriend ? (
                                    <>
                                        <Unlock size={32} className="text-green-400 mb-2"/>
                                        <span className="text-green-400 font-bold text-sm">ACCESS GRANTED</span>
                                        <span className="text-xs text-green-300 mt-1">Bypassed encapsulation via friend status!</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock size={32} className="text-red-500 mb-2"/>
                                        <span className="text-red-400 font-bold text-sm">COMPILER ERROR</span>
                                        <span className="text-xs text-red-300 mt-1 max-w-[80%] text-center">Auditor is not a friend.</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CppLecture5() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-purple-500/30">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src="/cpp/logo.png" alt="C-Units Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)]"  style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Function Overloading & Friends</h1>
                        <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 5</p>
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
                <div className="inline-flex items-center gap-2 bg-purple-900/20 border border-purple-500/30 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-in-up shadow-sm">
                    <Lock size={14} /> Advanced Class Architecture
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white mb-8 leading-[1.1] tracking-tight">
                    Signatures & <br/>Alliances
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-light">
                    Learn how the compiler distinguishes between identically-named functions, understand how variable scoping forces priority, and discover how to bypass strict class security using Friend constructs.
                </p>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Waypoints size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Function Overloading</h2>
                </div>

                <TheoryCard title="Same Name, Different Behavior" icon={<GitMerge size={20} />} variant="blue">
                    <p className="text-base mb-4">In C, if you wanted to print an integer and print a string, you had to name your functions <code>printInt()</code> and <code>printStr()</code>. C++ introduces <strong>Function Overloading</strong>, allowing multiple functions to share the exact same name, as long as their parameters (arguments) are different in type or number.</p>
                    <p className="text-base text-slate-400">The combination of a function's name and its parameters is called its <strong>Signature</strong>. The compiler uses the signature to determine which version of the function to execute at compile-time.</p>
                </TheoryCard>

                {/* INTERACTIVE 1 */}
                <FunctionOverloadSimulator />

                {/* INTERACTIVE 2 */}
                <OverloadAmbiguitySimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                        <Scan size={28} className="text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Scope Rules & Shadowing</h2>
                </div>

                <TheoryCard title="Variable Lifetime and Precedence" icon={<Focus size={20} />} variant="green">
                    <p className="text-base mb-4">A variable's scope is the region of code where it can be seen and used. If you declare a variable with the same name in an inner scope, it <strong>shadows</strong> the outer variable.</p>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg mt-4 border-l-4 border-l-green-500">
                        <h5 className="font-bold text-green-400 mb-2 flex items-center gap-2"><Scan size={18}/> Scope Resolution Operator (::)</h5>
                        <p className="text-sm text-slate-300">If a local variable shadows a global variable, you can still access the global variable by prefixing it with the scope resolution operator <code>::</code> (e.g., <code>::x</code>).</p>
                    </div>
                </TheoryCard>

                {/* INTERACTIVE 3 */}
                <ScopeRulesVisualizer />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                        <Shield size={28} className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Friends of a Class</h2>
                </div>

                <TheoryCard title="Bypassing Encapsulation" icon={<Key size={20} />} variant="purple">
                    <p className="text-base mb-4">Data hiding is the core of OOP. Private variables cannot be accessed by external functions or other classes. However, what if a specific external function <em>needs</em> access for a valid reason? You declare it as a <strong>Friend</strong>.</p>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg mt-4 border-l-4 border-l-purple-500">
                        <h5 className="font-bold text-purple-400 mb-2 flex items-center gap-2"><Info size={18}/> Key Rules</h5>
                        <ul className="text-sm text-slate-300 space-y-2 list-disc ml-5">
                            <li>Friendship is granted, not taken. A class must explicitly declare who its friends are.</li>
                            <li>Friend functions are not members of the class. They don't have a <code>this</code> pointer.</li>
                            <li>Friendship is not mutual (If A is a friend of B, B is not automatically a friend of A).</li>
                            <li>Friendship is not transitive (Friend of a friend is not your friend).</li>
                        </ul>
                    </div>
                </TheoryCard>

                <CodeBlock 
                    language="cpp"
                    title="Friend Function Syntax"
                    code={`class Vault {\nprivate:\n    int secretCode = 1234;\n\npublic:\n    // We grant access to the external function 'hackSystem'\n    friend void hackSystem(Vault v);\n};\n\n// This function is NOT part of the class!\nvoid hackSystem(Vault v) {\n    // Normally this would cause a compiler error.\n    // Because it's a friend, it works perfectly.\n    cout << "The code is: " << v.secretCode;\n}`}
                />

                {/* INTERACTIVE 4 */}
                <FriendClassVisualizer />

            </section>
            </div>
        </div>
    );
}
