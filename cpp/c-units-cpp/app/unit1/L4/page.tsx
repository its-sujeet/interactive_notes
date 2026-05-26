"use client";

import React, { useState } from 'react';
import {
    Terminal,
    Code,
    Settings2,
    CheckCircle,
    Play,
    AlignLeft,
    AlignRight,
    AlignCenter,
    Hash,
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
                            const isKeyword = line.includes('void ') || line.includes('int ') || line.includes('double ') || line.includes('string ');
                            const isManipulator = line.includes('setw') || line.includes('setprecision') || line.includes('setfill') || line.includes('fixed');
                            
                            return (
                                <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors whitespace-pre">
                                    <span className="text-slate-600 mr-4 select-none w-6 inline-block text-right">{i + 1}</span>
                                    <span className={isComment ? 'text-slate-500 italic' : isManipulator ? 'text-orange-400 font-bold' : isKeyword ? 'text-blue-400 font-bold' : line.includes('cout') ? 'text-green-400' : ''}>
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

const FunctionCallStackSimulator = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            desc: "Program starts. The OS pushes the main() function onto the Call Stack.",
            stack: [{ name: 'main()', vars: 'int result;' }],
            codeHighlight: 12
        },
        {
            desc: "main() calls calculateSum(5, 3). A new Stack Frame is created for calculateSum() ON TOP of main(). Execution jumps there.",
            stack: [{ name: 'main()', vars: 'int result; (WAITING)' }, { name: 'calculateSum(5, 3)', vars: 'int a=5, int b=3' }],
            codeHighlight: 13
        },
        {
            desc: "calculateSum() executes and returns 8. Its Stack Frame is destroyed (popped) and memory is freed.",
            stack: [{ name: 'main()', vars: 'int result = 8;' }],
            codeHighlight: 9
        },
        {
            desc: "Control returns to main(). It prints the result and then returns 0. The program terminates.",
            stack: [],
            codeHighlight: 15
        }
    ];

    const current = steps[step];

    return (
        <div className="my-12 p-6 md:p-8 bg-indigo-950/20 rounded-2xl border border-indigo-900/30 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Layers size={24} className="text-indigo-400" />
                Function Call Stack Visualizer
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Every time you call a function, C++ creates a <strong>Stack Frame</strong> in memory to store its local variables. When the function finishes, the frame is destroyed (popped). Watch how memory grows and shrinks!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Code Panel */}
                <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col justify-between">
                    <div className="font-mono text-sm text-slate-300 space-y-1 mb-8">
                        <div className={current.codeHighlight >= 1 && current.codeHighlight <= 4 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400" : ""}>
                            <span className="text-slate-600 mr-2">1</span><span className="text-blue-400 font-bold">int</span> calculateSum(<span className="text-blue-400 font-bold">int</span> a, <span className="text-blue-400 font-bold">int</span> b) {'{'}
                        </div>
                        <div className={current.codeHighlight === 8 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400" : ""}>
                            <span className="text-slate-600 mr-2">2</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400 font-bold">return</span> a + b;
                        </div>
                        <div className={current.codeHighlight === 9 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400" : ""}>
                            <span className="text-slate-600 mr-2">3</span>{'}'}
                        </div>
                        <div><span className="text-slate-600 mr-2">4</span></div>
                        <div className={current.codeHighlight === 12 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400" : ""}>
                            <span className="text-slate-600 mr-2">5</span><span className="text-blue-400 font-bold">int</span> main() {'{'}
                        </div>
                        <div className={current.codeHighlight === 13 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400 relative" : "relative"}>
                            <span className="text-slate-600 mr-2">6</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400 font-bold">int</span> result = <span className={current.codeHighlight === 13 ? "text-yellow-400" : ""}>calculateSum(5, 3)</span>;
                            {current.codeHighlight === 13 && <span className="absolute right-2 text-yellow-400 flex items-center gap-1 text-xs animate-pulse"><ArrowUpFromLine size={12}/> JUMP</span>}
                        </div>
                        <div className={current.codeHighlight === 14 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400" : ""}>
                            <span className="text-slate-600 mr-2">7</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">cout</span> &lt;&lt; result;
                        </div>
                        <div className={current.codeHighlight === 15 ? "bg-indigo-900/50 -mx-2 px-2 border-l-2 border-indigo-400" : ""}>
                            <span className="text-slate-600 mr-2">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400 font-bold">return</span> 0;
                        </div>
                        <div><span className="text-slate-600 mr-2">9</span>{'}'}</div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="max-w-[200px] text-xs text-indigo-300 font-bold bg-indigo-900/30 p-2 rounded border border-indigo-500/20">
                            {current.desc}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="p-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"><Minus size={16}/></button>
                            <button onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3} className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 disabled:opacity-50 shadow-lg shadow-indigo-500/20"><StepForward size={16}/></button>
                        </div>
                    </div>
                </div>

                {/* Stack Visualizer Panel */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-end relative h-[350px]">
                    <div className="absolute top-4 left-4 text-slate-500 font-bold text-xs uppercase flex items-center gap-2">
                        <Server size={14}/> Stack Memory (Grows Downward)
                    </div>

                    <div className="w-full max-w-[250px] flex flex-col-reverse gap-2">
                        {current.stack.length === 0 ? (
                            <div className="text-center text-slate-500 text-sm font-bold border-2 border-dashed border-slate-800 rounded-xl p-8 mb-4">
                                STACK IS EMPTY
                            </div>
                        ) : (
                            current.stack.map((frame, i) => (
                                <div key={i} className={`w-full border-2 p-4 rounded-xl shadow-lg transition-all duration-500 animate-in slide-in-from-top-4 ${i === current.stack.length - 1 ? 'border-indigo-500 bg-indigo-900/30 scale-105 shadow-indigo-500/20' : 'border-slate-700 bg-slate-900 opacity-50'}`}>
                                    <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                                        <div className="font-bold font-mono text-white text-sm">{frame.name}</div>
                                        {i === current.stack.length - 1 && <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">Active</span>}
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono">
                                        {frame.vars}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {/* Visual floor of the stack */}
                    <div className="w-full max-w-[300px] h-2 bg-slate-800 rounded-full mt-4"></div>
                </div>
            </div>
        </div>
    );
};

const DefaultArgumentsSimulator = () => {
    const [args, setArgs] = useState<{name: string | null, age: string | null, country: string | null}>({
        name: '"Alice"',
        age: '25',
        country: '"UK"'
    });

    const toggleArg = (key: 'name' | 'age' | 'country', defaultVal: string, providedVal: string) => {
        setArgs(prev => ({
            ...prev,
            [key]: prev[key] === null ? providedVal : null
        }));
    };

    // Validation logic for C++ default arguments (must be trailing)
    const isValid = () => {
        if (args.name === null && (args.age !== null || args.country !== null)) return false;
        if (args.age === null && args.country !== null) return false;
        return true;
    };

    const isLegal = isValid();

    const getCallString = () => {
        const passedArgs = [];
        if (args.name !== null) passedArgs.push(args.name);
        if (args.age !== null) passedArgs.push(args.age);
        if (args.country !== null) passedArgs.push(args.country);
        return `createProfile(${passedArgs.join(', ')});`;
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-blue-950/20 rounded-2xl border border-blue-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Settings2 size={24} className="text-blue-400" />
                Default Arguments Simulator
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                In C++, you can provide default values for function parameters. However, the golden rule is: <strong>default arguments must be filled from right to left</strong>. You cannot skip an argument in the middle!
            </p>

            <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 mb-8">
                <div className="font-mono text-sm mb-4 bg-slate-900 p-4 rounded-lg border border-slate-800 overflow-x-auto">
                    <span className="text-blue-400 font-bold">void</span> <span className="text-yellow-200">createProfile</span>(
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;string name,
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400 font-bold">int age = 18</span>, 
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400 font-bold">string country = "USA"</span>
                    <br/>);
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <button 
                        onClick={() => toggleArg('name', '', '"Alice"')}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${args.name !== null ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-700 opacity-50'}`}
                    >
                        <span className="text-xs text-slate-400 font-mono uppercase">Arg 1: Name</span>
                        <span className="font-bold">{args.name !== null ? '"Alice"' : 'Missing!'}</span>
                    </button>
                    <button 
                        onClick={() => toggleArg('age', '18', '25')}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${args.age !== null ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-700 opacity-50'}`}
                    >
                        <span className="text-xs text-slate-400 font-mono uppercase">Arg 2: Age</span>
                        <span className="font-bold">{args.age !== null ? '25' : 'Missing!'}</span>
                    </button>
                    <button 
                        onClick={() => toggleArg('country', '"USA"', '"UK"')}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${args.country !== null ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-700 opacity-50'}`}
                    >
                        <span className="text-xs text-slate-400 font-mono uppercase">Arg 3: Country</span>
                        <span className="font-bold">{args.country !== null ? '"UK"' : 'Missing!'}</span>
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-widest">main.cpp</div>
                    <div className={`p-6 rounded-xl border-2 transition-all duration-300 font-mono text-lg flex items-center justify-between ${isLegal ? 'bg-green-950/20 border-green-500/50' : 'bg-red-950/20 border-red-500/50'}`}>
                        <span className="text-slate-300">{getCallString()}</span>
                        
                        {isLegal ? (
                            <span className="text-green-400 flex items-center gap-2 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                <CheckCircle size={16}/> Compiler OK
                            </span>
                        ) : (
                            <span className="text-red-400 flex items-center gap-2 text-sm font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                                <AlertTriangle size={16}/> Compilation Error
                            </span>
                        )}
                    </div>
                </div>

                {/* Final Execution Result */}
                {isLegal && (
                    <div className="mt-4 p-4 bg-slate-900 border border-slate-800 rounded-lg animate-in fade-in slide-in-from-top-2">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Variables resolved by Compiler:</div>
                        <div className="flex gap-6 font-mono text-sm">
                            <span className="text-blue-300">name = {args.name || '"Alice"'}</span>
                            <span className={args.age === null ? "text-green-400" : "text-blue-300"}>
                                age = {args.age === null ? '18 (default)' : args.age}
                            </span>
                            <span className={args.country === null ? "text-green-400" : "text-blue-300"}>
                                country = {args.country === null ? '"USA" (default)' : args.country}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ManipulatorVisualizer = () => {
    const [width, setWidth] = useState(0);
    const [fill, setFill] = useState(' ');
    const [precision, setPrecision] = useState(5);
    const [align, setAlign] = useState<'right' | 'left'>('right');
    const [base, setBase] = useState<'dec' | 'hex' | 'oct'>('dec');

    const sampleValue = 255.12345;
    const sampleInt = 255;

    // Simulate formatting
    const simulateFormat = () => {
        let str = "";
        
        // Handle Base
        if(base === 'hex') str = sampleInt.toString(16);
        else if (base === 'oct') str = sampleInt.toString(8);
        else str = sampleValue.toFixed(precision); // dec handles precision for float

        // Handle Width & Fill
        if (width > str.length) {
            const padding = fill.repeat(width - str.length);
            if (align === 'right') str = padding + str;
            else str = str + padding;
        }

        return str;
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-orange-950/20 rounded-2xl border border-orange-900/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <SlidersHorizontal size={24} className="text-orange-400" />
                I/O Manipulators Sandbox
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Manipulators modify the I/O stream formatting. Functions like <code>setw()</code> and <code>setprecision()</code> require <code>#include &lt;iomanip&gt;</code>. Tweak the controls below to see the Live Console Output!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <div>
                        <div className="flex justify-between text-sm mb-2 text-slate-300">
                            <span className="font-bold text-orange-400 font-mono">setw({width})</span>
                            <span>Width (Columns)</span>
                        </div>
                        <input 
                            type="range" min="0" max="20" value={width} 
                            onChange={(e) => setWidth(parseInt(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>
                    
                    <div>
                        <div className="flex justify-between text-sm mb-2 text-slate-300">
                            <span className="font-bold text-orange-400 font-mono">setprecision({precision})</span>
                            <span>Decimal Places</span>
                        </div>
                        <input 
                            type="range" min="0" max="8" value={precision} disabled={base !== 'dec'}
                            onChange={(e) => setPrecision(parseInt(e.target.value))}
                            className="w-full accent-orange-500 disabled:opacity-20"
                        />
                    </div>

                    <div>
                        <div className="text-sm mb-2 text-slate-300 font-bold text-orange-400 font-mono">setfill('{fill}')</div>
                        <div className="flex gap-2">
                            {[' ', '*', '-', '0'].map(char => (
                                <button 
                                    key={char} onClick={() => setFill(char)}
                                    className={`w-10 h-10 rounded text-xl font-mono flex items-center justify-center border transition-all ${fill === char ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                >
                                    {char === ' ' ? '⎵' : char}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm mb-2 text-slate-300 font-bold font-mono">Alignment</div>
                            <div className="flex gap-2">
                                <button onClick={() => setAlign('left')} className={`flex-1 p-2 flex justify-center rounded border ${align === 'left' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}><AlignLeft size={16}/></button>
                                <button onClick={() => setAlign('right')} className={`flex-1 p-2 flex justify-center rounded border ${align === 'right' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}><AlignRight size={16}/></button>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm mb-2 text-slate-300 font-bold font-mono">Base</div>
                            <div className="flex gap-2 text-xs font-mono font-bold">
                                <button onClick={() => setBase('dec')} className={`flex-1 p-2 rounded border ${base === 'dec' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>dec</button>
                                <button onClick={() => setBase('hex')} className={`flex-1 p-2 rounded border ${base === 'hex' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>hex</button>
                                <button onClick={() => setBase('oct')} className={`flex-1 p-2 rounded border ${base === 'oct' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>oct</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulated Output */}
                <div className="bg-[#0f172a] rounded-xl border border-slate-800 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Console.exe</div>
                    
                    <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                        <div className="font-mono text-sm text-slate-400 whitespace-pre overflow-x-auto">
                            <span className="text-blue-400">cout</span> &lt;&lt; <span className="text-orange-400">setw</span>({width}) 
                            {fill !== ' ' && <span> &lt;&lt; <span className="text-orange-400">setfill</span>('{fill}')</span>}
                            {precision !== 5 && base === 'dec' && <span> &lt;&lt; <span className="text-orange-400">fixed</span> &lt;&lt; <span className="text-orange-400">setprecision</span>({precision})</span>}
                            {align === 'left' && <span> &lt;&lt; <span className="text-blue-300">left</span></span>}
                            {base !== 'dec' && <span> &lt;&lt; <span className="text-blue-300">{base}</span></span>}
                            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt; {base === 'dec' ? '255.12345' : '255'} &lt;&lt; <span className="text-blue-400">endl</span>;
                        </div>
                    </div>

                    <div className="flex-1 p-6 bg-black flex items-center justify-center">
                        <div className="relative overflow-x-auto max-w-full">
                            {/* Grid overlay for width visualization */}
                            <div className="absolute inset-0 flex pointer-events-none opacity-20">
                                {Array.from({length: Math.max(20, width)}).map((_, i) => (
                                    <div key={i} className="w-[14px] border-r border-green-500/50 h-full"></div>
                                ))}
                            </div>
                            
                            <div className="font-mono text-[14px] text-green-400 bg-green-900/20 border border-green-500/30 px-1 py-2 tracking-[0em] whitespace-pre min-w-[280px]">
                                {simulateFormat()}<span className="animate-pulse bg-green-400 w-2 h-4 inline-block ml-0.5 align-middle"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReceiptFormatterSimulator = () => {
    const [useManipulators, setUseManipulators] = useState(false);

    const items = [
        { name: "Coffee", price: 4.50 },
        { name: "Sandwich", price: 8.75 },
        { name: "Cake", price: 12.00 }
    ];

    const generateOutput = () => {
        if (!useManipulators) {
            return items.map(item => `${item.name} $${item.price}`).join('\n') + `\nTOTAL $25.25`;
        }

        // Simulating the exact C++ manipulator output
        return items.map(item => {
            const namePadding = '.'.repeat(Math.max(0, 15 - item.name.length));
            const priceStr = item.price.toFixed(2);
            const pricePadding = ' '.repeat(Math.max(0, 6 - priceStr.length));
            return `${item.name}${namePadding}$${pricePadding}${priceStr}`;
        }).join('\n') + `\n${'-'.repeat(22)}\nTOTAL..........$ 25.25`;
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <ShoppingBag size={24} className="text-emerald-400" />
                        Real-World Application: Printing a Receipt
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                        See why manipulators are actually useful. Toggle them on and off to see how we align columns for a retail receipt.
                    </p>
                </div>
                <button 
                    onClick={() => setUseManipulators(!useManipulators)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg ${useManipulators ? 'bg-emerald-600 text-white shadow-emerald-500/20 hover:bg-emerald-500' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                    {useManipulators ? <ToggleRight size={20}/> : <ToggleLeft size={20}/>}
                    {useManipulators ? 'Manipulators ON' : 'Manipulators OFF'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Code Side */}
                <div className="flex-1 space-y-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm relative">
                        {useManipulators ? (
                            <div className="text-slate-300 animate-in fade-in">
                                <span className="text-green-400">// Good Formatting</span><br/>
                                <span className="text-blue-400">cout</span> &lt;&lt; <span className="text-blue-300">left</span> &lt;&lt; <span className="text-orange-400">setfill</span>('.') &lt;&lt; <span className="text-orange-400">setw</span>(15) &lt;&lt; item.name<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt; <span className="text-green-300">"$"</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt; <span className="text-blue-300">right</span> &lt;&lt; <span className="text-orange-400">setfill</span>(' ') &lt;&lt; <span className="text-orange-400">setw</span>(6) &lt;&lt; <span className="text-orange-400">fixed</span> &lt;&lt; <span className="text-orange-400">setprecision</span>(2)<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt; item.price &lt;&lt; <span className="text-blue-400">endl</span>;
                            </div>
                        ) : (
                            <div className="text-slate-300 animate-in fade-in">
                                <span className="text-red-400">// Bad Formatting (No Manipulators)</span><br/>
                                <span className="text-blue-400">cout</span> &lt;&lt; item.name &lt;&lt; <span className="text-green-300">" $"</span> &lt;&lt; item.price &lt;&lt; <span className="text-blue-400">endl</span>;
                            </div>
                        )}
                    </div>
                </div>

                {/* Console Output Side */}
                <div className="w-full md:w-72 bg-[#0a0a0a] rounded-xl border-4 border-slate-800 p-6 flex flex-col justify-center relative shadow-2xl">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800 rounded-full"></div>
                    <div className={`font-mono text-sm leading-loose whitespace-pre transition-colors duration-500 ${useManipulators ? 'text-green-400' : 'text-slate-500'}`}>
                        {generateOutput()}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function CppLecture4() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src="/cpp/logo.png" alt="C-Units Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"  style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Function Basics</h1>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 4</p>
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
                <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-in-up shadow-sm">
                    <Wrench size={14} /> Core Programming Mechanics
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-white mb-8 leading-[1.1] tracking-tight">
                    Powering Up <br/>Functions
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-light">
                    Functions are the building blocks of any C++ program. We'll explore how to make them smarter with default arguments, and how to format their output like a pro using I/O manipulators.
                </p>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                        <ArrowDownToLine size={28} className="text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">The Function Call Stack</h2>
                </div>

                <TheoryCard title="How Functions Actually Work in Memory" icon={<Database size={20} />} variant="purple">
                    <p className="text-base mb-4">When a function is called, the OS pauses the current function and creates a <strong>Stack Frame</strong> in memory for the new function to hold its local variables. When the new function finishes, its Stack Frame is destroyed and the OS resumes the previous function exactly where it left off.</p>
                </TheoryCard>

                {/* INTERACTIVE 0 */}
                <FunctionCallStackSimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Settings2 size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Default Parameters</h2>
                </div>

                <TheoryCard title="Smart Fallbacks for Missing Data" icon={<Database size={20} />} variant="blue">
                    <p className="text-base mb-4">You can assign default values to function parameters in the function declaration. If the caller doesn't provide a value for that argument, the compiler automatically plugs in the default!</p>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg mt-4 border-l-4 border-l-yellow-500">
                        <h5 className="font-bold text-yellow-500 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> The Golden Rule</h5>
                        <p className="text-sm text-slate-300">Default arguments <strong>must be added from right to left</strong>. Once you give a parameter a default value, all parameters to the right of it MUST also have default values.</p>
                    </div>
                </TheoryCard>

                {/* INTERACTIVE 1 */}
                <DefaultArgumentsSimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                        <Zap size={28} className="text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Inline Functions (Refresher)</h2>
                </div>

                <TheoryCard title="Compile-Time Substitution" icon={<Play size={20} />} variant="purple">
                    <p className="text-base mb-4">We covered this in Lecture 3, but remember: the <code>inline</code> keyword asks the compiler to replace the function call with the actual function code. It's a request, not a command—the compiler will ignore it if the function is too large, contains loops, or is recursive!</p>
                    <CodeBlock 
                        language="cpp"
                        code={`inline int max(int a, int b) {\n    return (a > b) ? a : b;\n}`}
                    />
                </TheoryCard>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                        <SlidersHorizontal size={28} className="text-orange-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">I/O Manipulator Functions</h2>
                </div>

                <TheoryCard title="Formatting the Console" icon={<Terminal size={20} />} variant="orange">
                    <p className="text-base mb-4">C++ provides special functions called manipulators to change how data is displayed in the console via <code>cout</code>. Most of these require you to include the <code>&lt;iomanip&gt;</code> header file.</p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-orange-500/20 p-2 rounded text-orange-400 shrink-0"><Code size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">setw(n)</strong>
                                <span className="text-slate-400 text-sm">Sets the width of the next output field to <code>n</code> characters. It only affects the very next item printed!</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-orange-500/20 p-2 rounded text-orange-400 shrink-0"><Type size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">setfill(c)</strong>
                                <span className="text-slate-400 text-sm">Fills the empty space created by <code>setw()</code> with the character <code>c</code> instead of spaces.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-orange-500/20 p-2 rounded text-orange-400 shrink-0"><Hash size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">setprecision(n)</strong>
                                <span className="text-slate-400 text-sm">Sets the number of decimal places for floating-point numbers. (Often paired with <code>fixed</code>).</span>
                            </div>
                        </li>
                    </ul>
                </TheoryCard>

                {/* INTERACTIVE 2 */}
                <ManipulatorVisualizer />

                {/* NEW INTERACTIVE 3 */}
                <ReceiptFormatterSimulator />

            </section>
            </div>
        </div>
    );
}
