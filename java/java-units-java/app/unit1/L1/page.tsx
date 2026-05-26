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
    Coffee,
    Sun,
    Moon,
    FileCode2,
    Binary,
    Laptop2
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const ExplainerCard = ({ title, text }: { title?: string, text: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-8 border-t border-slate-800 pt-6">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-400 transition-colors uppercase tracking-widest">
                <Info size={16} className={open ? "text-orange-500" : ""} />
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


const CodeBlock = ({ code, language = 'java', explanation, title }: { code: string, language?: string, explanation?: string, title?: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700/50 my-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-orange-500/30 w-full relative">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/90 backdrop-blur-md border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                    </div>
                    {title && <span className="text-xs font-medium text-slate-400 tracking-wider uppercase bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">{title}</span>}
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                        <Code size={14} className="text-orange-400" />
                        <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">{language}</span>
                    </div>
                </div>
                {explanation && (
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${showExplanation ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-orange-400 hover:bg-slate-700'}`}
                    >
                        <Info size={14} />
                        {showExplanation ? 'HIDE EXPLANATION' : 'EXPLAIN CODE'}
                    </button>
                )}
            </div>

            <div className="relative">
                <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
                    <code>
                        {code.split('\n').map((line, i) => (
                            <div key={i} className="flex hover:bg-slate-800/30 px-2 -mx-2 rounded transition-colors group/line">
                                <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-4 text-xs mt-0.5 group-hover/line:text-orange-500/50 transition-colors">{i + 1}</span>
                                <span className="flex-1 whitespace-pre">{line || ' '}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>

            {showExplanation && explanation && (
                <div className="bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/50 p-6 text-sm text-slate-300 leading-relaxed animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-500/20 rounded-lg shrink-0 mt-0.5">
                            <Zap size={16} className="text-orange-400" />
                        </div>
                        <div>
                            <h4 className="text-orange-400 font-bold mb-1 uppercase tracking-wider text-xs">How it works</h4>
                            <p className="opacity-90">{explanation}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TheoryCard = ({ icon: Icon, title, content, isImportant = false }: { icon: any, title: string, content: React.ReactNode, isImportant?: boolean }) => (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${isImportant ? 'bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-500/50' : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'}`}>
        <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${isImportant ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-700/50 text-blue-400'}`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
        </div>
        <div className="text-slate-300 leading-relaxed space-y-3">
            {content}
        </div>
    </div>
);

// --- INTERACTIVE SIMULATOR 1: JVM Architecture ---
const JVMArchitectureVisualizer = () => {
    const [step, setStep] = useState(0);
    const [isCompiling, setIsCompiling] = useState(false);
    
    const runCompilation = () => {
        setIsCompiling(true);
        setStep(1); // Writing code
        setTimeout(() => setStep(2), 1500); // javac compiling
        setTimeout(() => setStep(3), 3000); // Bytecode generated
        setTimeout(() => setStep(4), 4500); // JVM reading
        setTimeout(() => {
            setStep(5); // Output running
            setIsCompiling(false);
        }, 6000);
    };

    const reset = () => {
        setStep(0);
        setIsCompiling(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Server className="text-orange-400" />
                            JVM Architecture Visualizer
                        </h3>
                        <p className="text-slate-400 mt-2">Java's "Write Once, Run Anywhere" secret weapon.</p>
                    </div>
                    <button 
                        onClick={step === 5 ? reset : runCompilation}
                        disabled={isCompiling}
                        className="px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] disabled:shadow-none flex items-center gap-2"
                    >
                        {isCompiling ? <RotateCcw className="animate-spin" /> : (step === 5 ? <RotateCcw /> : <Play />)}
                        {isCompiling ? 'Executing Flow...' : (step === 5 ? 'Reset Simulator' : 'Compile & Run')}
                    </button>
                </div>

                {/* VISUALIZER GRID */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 mb-8">
                    
                    {/* Source Code */}
                    <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center border-2 ${step === 1 ? 'border-orange-400 bg-orange-400/20 shadow-[0_0_30px_rgba(234,88,12,0.4)] animate-pulse' : 'border-slate-700 bg-slate-800'}`}>
                            <FileCode2 size={40} className={step === 1 ? 'text-orange-400' : 'text-slate-400'} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-white">Main.java</p>
                            <p className="text-xs text-slate-500">Source Code</p>
                        </div>
                    </div>

                    {/* Arrow 1 */}
                    <div className={`h-1 flex-1 bg-slate-700 relative transition-all duration-1000 ${step >= 2 ? 'opacity-100' : 'opacity-20'}`}>
                        <div className={`absolute top-0 left-0 h-full bg-orange-500 transition-all duration-1000 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-400 bg-[#0d1117] px-2 whitespace-nowrap">javac Compiler</div>
                    </div>

                    {/* Bytecode */}
                    <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center border-2 ${step === 3 ? 'border-blue-400 bg-blue-400/20 shadow-[0_0_30px_rgba(96,165,250,0.4)] animate-pulse' : 'border-slate-700 bg-slate-800'}`}>
                            <Binary size={40} className={step === 3 ? 'text-blue-400' : 'text-slate-400'} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-white">Main.class</p>
                            <p className="text-xs text-slate-500">Bytecode</p>
                        </div>
                    </div>

                    {/* Arrow 2 */}
                    <div className={`h-1 flex-1 bg-slate-700 relative transition-all duration-1000 ${step >= 4 ? 'opacity-100' : 'opacity-20'}`}>
                        <div className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ${step >= 4 ? 'w-full' : 'w-0'}`}></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-400 bg-[#0d1117] px-2 whitespace-nowrap">JVM (Interpreter/JIT)</div>
                    </div>

                    {/* Output */}
                    <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${step >= 5 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center border-2 ${step === 5 ? 'border-green-400 bg-green-400/20 shadow-[0_0_30px_rgba(74,222,128,0.4)] animate-pulse' : 'border-slate-700 bg-slate-800'}`}>
                            <Laptop2 size={40} className={step === 5 ? 'text-green-400' : 'text-slate-400'} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-white">Machine Code</p>
                            <p className="text-xs text-slate-500">Native OS Exec</p>
                        </div>
                    </div>

                </div>

                {/* Console Output */}
                <div className="mt-8 bg-black rounded-xl p-4 border border-slate-800 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                        <Terminal size={14} className="text-slate-500" />
                        <span className="text-slate-500">Compilation Logs</span>
                    </div>
                    <div className="space-y-1 h-32 overflow-y-auto flex flex-col justify-end">
                        {step >= 1 && <p className="text-slate-300"><span className="text-orange-500">❯</span> Initializing Java environment...</p>}
                        {step >= 2 && <p className="text-slate-300"><span className="text-orange-500">❯</span> javac Main.java</p>}
                        {step >= 3 && <p className="text-blue-400"><span className="text-orange-500">❯</span> Bytecode 'Main.class' generated successfully.</p>}
                        {step >= 4 && <p className="text-slate-300"><span className="text-orange-500">❯</span> java Main</p>}
                        {step >= 4 && <p className="text-slate-400 ml-4">Loading classes into JVM Memory...</p>}
                        {step >= 4 && <p className="text-slate-400 ml-4">JIT Compiler converting bytecode to Native Machine Code...</p>}
                        {step >= 5 && <p className="text-green-400 font-bold mt-2"><span className="text-orange-500">❯</span> Hello, World!</p>}
                        {step >= 5 && <p className="text-slate-500 italic mt-2">Process finished with exit code 0</p>}
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- INTERACTIVE SIMULATOR 2: Main Method Deconstructor ---
const MainMethodDeconstructor = () => {
    const [activePart, setActivePart] = useState<string | null>(null);

    const parts = [
        { id: 'public', text: 'public', type: 'keyword', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/50', desc: "Access Modifier: Allows the JVM to access and execute this method from anywhere outside the class." },
        { id: 'static', text: 'static', type: 'keyword', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50', desc: "Memory Allocation: The method belongs to the Class, not an Object. JVM can invoke it without creating an instance of the class first." },
        { id: 'void', text: 'void', type: 'keyword', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/50', desc: "Return Type: The main method doesn't return any value to the JVM once it finishes executing." },
        { id: 'main', text: 'main', type: 'method', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', desc: "Method Name: The exact signature the JVM searches for as the starting point of the application." },
        { id: 'args', text: '(String[] args)', type: 'params', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50', desc: "Command Line Arguments: An array of strings that stores arguments passed via the terminal when running the program." }
    ];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
                <div className="mb-8 pb-6 border-b border-slate-800">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Scan className="text-blue-400" />
                        The God-Tier "main" Signature
                    </h3>
                    <p className="text-slate-400 mt-2">Click each keyword to deconstruct exactly why Java forces you to type this long sentence.</p>
                </div>

                <div className="bg-[#161b22] p-8 rounded-xl border border-slate-700 flex flex-wrap gap-2 items-center justify-center font-mono text-xl md:text-2xl shadow-inner">
                    {parts.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setActivePart(p.id)}
                            className={`px-3 py-2 rounded-lg border transition-all duration-300 font-bold ${activePart === p.id ? `${p.bg} ${p.border} ${p.color} scale-110 shadow-[0_0_20px_currentColor]` : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'}`}
                        >
                            {p.text}
                        </button>
                    ))}
                    <span className="text-slate-300">{` {`}</span>
                </div>

                {/* Description Panel */}
                <div className="mt-6 h-32">
                    {activePart ? (
                        <div className={`p-6 rounded-xl border backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in ${parts.find(p => p.id === activePart)?.bg} ${parts.find(p => p.id === activePart)?.border}`}>
                            <h4 className={`text-lg font-bold mb-2 uppercase tracking-widest ${parts.find(p => p.id === activePart)?.color}`}>
                                {parts.find(p => p.id === activePart)?.text}
                            </h4>
                            <p className="text-slate-200 text-lg">
                                {parts.find(p => p.id === activePart)?.desc}
                            </p>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center border border-dashed border-slate-700 rounded-xl text-slate-500 bg-slate-800/20">
                            Click a highlighted keyword above to reveal its core purpose.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

// --- INTERACTIVE SIMULATOR 3: Program Structure Visualizer ---
const ProgramStructureVisualizer = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const structure = [
        { id: 'package', title: 'Package Declaration', code: 'package com.myapp.core;', desc: 'Optional but highly recommended. Groups related classes together and prevents name collisions.', color: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-500/10' },
        { id: 'import', title: 'Import Statements', code: 'import java.util.Scanner;\nimport java.util.List;', desc: 'Pulls in classes from other packages so you don\'t have to type out their full absolute paths every time.', color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10' },
        { id: 'class', title: 'Class Definition', code: 'public class UserProfile {', desc: 'The blueprint. Every single line of executable Java code MUST live inside a class.', color: 'text-orange-400', border: 'border-orange-500/50', bg: 'bg-orange-500/10' },
        { id: 'fields', title: 'Instance Variables (Fields)', code: '    private String username;\n    private int age;', desc: 'The internal state or data belonging to the class or its objects.', color: 'text-green-400', border: 'border-green-500/50', bg: 'bg-green-500/10' },
        { id: 'constructor', title: 'Constructor', code: '    public UserProfile(String u) {\n        this.username = u;\n    }', desc: 'A special method called automatically when an object is instantiated (using the new keyword).', color: 'text-yellow-400', border: 'border-yellow-500/50', bg: 'bg-yellow-500/10' },
        { id: 'method', title: 'Methods', code: '    public void display() {\n        System.out.println(username);\n    }\n}', desc: 'The behavior or actions that the class can perform.', color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-500/10' },
    ];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
                {/* Code View */}
                <div className="flex-1 bg-[#161b22] rounded-xl border border-slate-800 p-6 font-mono text-sm shadow-inner overflow-hidden">
                    <h4 className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest flex items-center gap-2"><LayoutGrid size={14} /> Java File Structure</h4>
                    <div className="space-y-1">
                        {structure.map((node) => (
                            <div 
                                key={node.id}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                className={`p-3 rounded transition-all duration-300 cursor-pointer whitespace-pre ${hoveredNode === node.id ? `${node.bg} border-l-4 ${node.border} ${node.color}` : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}
                            >
                                {node.code}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explanation View */}
                <div className="flex-1 flex flex-col justify-center">
                    {hoveredNode ? (
                        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className={`inline-flex p-3 rounded-xl mb-4 ${structure.find(n => n.id === hoveredNode)?.bg} ${structure.find(n => n.id === hoveredNode)?.color}`}>
                                <Info size={24} />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${structure.find(n => n.id === hoveredNode)?.color}`}>
                                {structure.find(n => n.id === hoveredNode)?.title}
                            </h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                {structure.find(n => n.id === hoveredNode)?.desc}
                            </p>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-slate-800/20">
                            <Layers size={48} className="mb-4 opacity-50" />
                            <p className="font-bold text-lg">Hover over the code block</p>
                            <p className="text-sm">Explore the anatomy of a standard Java file.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 4: Compiler Lifecycle ---
const CompilerLifecycle = () => {
    const [stage, setStage] = useState(0);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Java Compilation Lifecycle</h3>
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-6 items-center justify-between text-sm">
                <div onClick={() => setStage(0)} className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all text-center ${stage===0 ? 'bg-orange-500/20 border-orange-500 text-orange-400 scale-105' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                    <div className="font-bold text-lg mb-2">Main.java</div>
                    <p>Human-readable source code.</p>
                </div>
                <div className="text-slate-600 font-bold hidden md:block">→ javac →</div>
                <div onClick={() => setStage(1)} className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all text-center ${stage===1 ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-105' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                    <div className="font-bold text-lg mb-2">Main.class</div>
                    <p>Bytecode. Platform independent.</p>
                </div>
                <div className="text-slate-600 font-bold hidden md:block">→ java →</div>
                <div onClick={() => setStage(2)} className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all text-center ${stage===2 ? 'bg-green-500/20 border-green-500 text-green-400 scale-105' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                    <div className="font-bold text-lg mb-2">JVM</div>
                    <p>OS-specific execution engine.</p>
                </div>
            </div>
            <div className="mt-6 text-center text-slate-400">
                {stage === 0 && "You write this. It's strictly typed and must follow syntax rules."}
                {stage === 1 && "The compiler translates your code into a .class file. This bytecode is the secret to 'Write Once, Run Anywhere'."}
                {stage === 2 && "The JVM translates the bytecode into native machine instructions (1s and 0s) for your specific CPU (Windows, Mac, Linux)."}
            </div>
        </div>
    );
};


// --- INTERACTIVE 5: History & Features Matrix ---
const FeaturesMatrix = () => {
    const [activeFeature, setActiveFeature] = useState<'history'|'oop'|'platform'|'secure'>('history');

    const features = {
        history: { title: "The Oak Project (1995)", desc: "Originally named 'Oak' by James Gosling at Sun Microsystems. Built for interactive television, it was too advanced for the time and pivoted to the World Wide Web.", icon: Coffee, color: "text-orange-400 border-orange-500", bg: "bg-orange-500/20" },
        oop: { title: "Strictly Object-Oriented", desc: "Everything is an Object. Except for 8 primitive types, all code must reside inside a Class blueprint. This enforces modularity and code reuse.", icon: Shapes, color: "text-blue-400 border-blue-500", bg: "bg-blue-500/20" },
        platform: { title: "Platform Independent", desc: "Write Once, Run Anywhere (WORA). The compiler generates bytecode, and the JVM translates it for the specific OS. You don't need to recompile for Mac, Windows, or Linux.", icon: Globe, color: "text-green-400 border-green-500", bg: "bg-green-500/20" },
        secure: { title: "Secure & Robust", desc: "No explicit pointers. Automatic Garbage Collection. A strict bytecode verifier that checks for unauthorized memory access before execution.", icon: Shield, color: "text-red-400 border-red-500", bg: "bg-red-500/20" }
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">History & Core Features</h3>
            
            <div className="flex flex-wrap gap-4 mb-8">
                {(Object.keys(features) as Array<keyof typeof features>).map(key => {
                    const feat = features[key];
                    const Icon = feat.icon;
                    const isActive = activeFeature === key;
                    return (
                        <button 
                            key={key}
                            onClick={() => setActiveFeature(key)}
                            className={`flex-1 min-w-[150px] p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${isActive ? `${feat.bg} ${feat.color}` : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                        >
                            <Icon size={24} />
                            <span className="font-bold text-sm">{key.toUpperCase()}</span>
                        </button>
                    );
                })}
            </div>

            <div className={`p-8 border-2 rounded-xl transition-all ${features[activeFeature].bg} ${features[activeFeature].color.split(' ')[1]}`}>
                <h4 className={`text-2xl font-bold mb-4 ${features[activeFeature].color.split(' ')[0]}`}>{features[activeFeature].title}</h4>
                <p className="text-slate-200 text-lg leading-relaxed">{features[activeFeature].desc}</p>
            </div>
        </div>
    );
};


// --- INTERACTIVE 6: Garbage Collection Visualizer ---
const GCVisualizer = () => {
    const [objects, setObjects] = useState([true, true, false, true, false]);
    
    const runGC = () => {
        setObjects(objects.map(o => o ? true : null as any)); // Nullify the unreachable ones
    };

    const reset = () => {
        setObjects([true, true, false, true, false]);
    }

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Automatic Garbage Collection (GC)</h3>
            <p className="text-slate-400 mb-6">In C++, you must manually delete memory. In Java, the Garbage Collector automatically hunts down and destroys objects that are no longer reachable.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl">
                <div className="flex gap-4 mb-8 justify-center">
                    {objects.map((reachable, idx) => (
                        <div key={idx} className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-1000 ${reachable === null ? 'opacity-0 scale-50' : reachable ? 'bg-green-500/20 border-2 border-green-500 text-green-400' : 'bg-red-500/20 border-2 border-red-500 text-red-400'}`}>
                            {reachable === null ? '' : reachable ? 'Linked' : 'Orphan'}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={runGC} className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)]">Trigger System.gc()</button>
                    <button onClick={reset} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold transition-all">Reset Memory Heap</button>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 7: Java Keyword Highlighter ---
const KeywordHighlighter = () => {
    const [activeKeyword, setActiveKeyword] = useState<'public'|'class'|'static'|'void'|'main'|'String'|'args'|null>(null);

    const definitions: any = {
        public: "Access Modifier: Anyone can access this. The JVM needs it to be public to execute it from outside.",
        class: "Blueprint: Everything in Java must reside inside a class.",
        static: "Memory Allocation: Means the method belongs to the class itself, not an instance. The JVM can run it without using 'new'.",
        void: "Return Type: This method returns nothing to the OS when it finishes.",
        main: "Entry Point: The exact method name the JVM looks for to start the program.",
        String: "Data Type: An array of characters. Note the capital 'S', meaning it's a Class, not a primitive.",
        args: "Parameter: The variable name for command-line arguments. You could technically name this 'tacos' and it would still work."
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Syntax Deconstructor</h3>
            <p className="text-slate-400 mb-6">Hover or tap on any word in the main method signature to reveal exactly why Java forces you to type it.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center min-h-[250px]">
                <div className="font-mono text-xl md:text-2xl font-bold flex flex-wrap justify-center gap-x-2 gap-y-4 mb-8">
                    <span onMouseEnter={() => setActiveKeyword('public')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">public</span>
                    <span onMouseEnter={() => setActiveKeyword('class')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">class</span>
                    <span className="text-slate-300">Main</span>
                    <span className="text-slate-300">{'{'}</span>
                    <br className="w-full"/>
                    &nbsp;&nbsp;
                    <span onMouseEnter={() => setActiveKeyword('public')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">public</span>
                    <span onMouseEnter={() => setActiveKeyword('static')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">static</span>
                    <span onMouseEnter={() => setActiveKeyword('void')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">void</span>
                    <span onMouseEnter={() => setActiveKeyword('main')} onMouseLeave={() => setActiveKeyword(null)} className="text-blue-400 cursor-help hover:bg-blue-500/20 px-1 rounded transition-colors">main</span>
                    <span className="text-slate-300">(</span>
                    <span onMouseEnter={() => setActiveKeyword('String')} onMouseLeave={() => setActiveKeyword(null)} className="text-green-400 cursor-help hover:bg-green-500/20 px-1 rounded transition-colors">String</span>
                    <span className="text-slate-300">[]</span>
                    <span onMouseEnter={() => setActiveKeyword('args')} onMouseLeave={() => setActiveKeyword(null)} className="text-purple-400 cursor-help hover:bg-purple-500/20 px-1 rounded transition-colors">args</span>
                    <span className="text-slate-300">)</span>
                </div>
                
                <div className="h-20 w-full max-w-2xl text-center">
                    {activeKeyword ? (
                        <div className="text-white text-lg bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-in fade-in zoom-in duration-200">
                            <strong>{activeKeyword}</strong>: {definitions[activeKeyword]}
                        </div>
                    ) : (
                        <div className="text-slate-600 text-sm uppercase tracking-widest font-bold mt-4">Hover over the code...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function JavaLecture1() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-orange-500/30">
                {/* HEADER */}
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Introduction to Java Basics</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 1</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setIsLightMode(!isLightMode)}
                        className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center shadow-lg"
                        style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}
                        title="Toggle Light/Dark Mode"
                    >
                        {isLightMode ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-400" />}
                    </button>
                </header>

                {/* HERO */}
                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Coffee size={14} />
                        Java Basics
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-red-500 mb-6 tracking-tight">
                        Write Once, Run Anywhere.
                    </h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
                        Java is a high-level, object-oriented programming language designed to have as few implementation dependencies as possible. It revolutionized the software industry by introducing the JVM—allowing compiled code to run on any operating system.
                    </p>
                </section>

                {/* THEORY CARDS */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <TheoryCard 
                        icon={Globe}
                        title="Platform Independent"
                        content={
                            <>
                                <p>C/C++ compile directly to native machine code specific to the OS (Windows, Linux, macOS). Java takes a different approach.</p>
                                <p>Java compiles to an intermediate <strong>Bytecode</strong>. This bytecode is entirely agnostic to the operating system.</p>
                            </>
                        }
                    />
                    <TheoryCard 
                        icon={Shield}
                        title="Secure & Robust"
                        isImportant={true}
                        content={
                            <>
                                <p>Java was built with security and reliability in mind from day one. It eliminates dangerous C++ features like explicit pointers.</p>
                                <p>It implements strict compile-time checking and a powerful <strong>Garbage Collector</strong> to automatically manage memory and prevent memory leaks.</p>
                            </>
                        }
                    />
                </section>

                {/* JVM ARCHITECTURE VISUALIZER */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">The JVM Flow</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        To understand Java, you must understand the JVM (Java Virtual Machine). It is the translator that sits between your code and the computer hardware. Watch the compilation and execution flow in real-time below.
                    </p>

                    
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Why Should I Care About JVM Architecture?</h4>
                    <p className="text-slate-400 text-sm">If your application crashes with an <code className="text-red-400">OutOfMemoryError</code> or runs painfully slow, you cannot fix it without knowing whether the bottleneck is in the Classloader, the Execution Engine, or the Memory Areas.</p>
                </div>
<JVMArchitectureVisualizer />

                    {/* THE MAIN METHOD */}
                    <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Anatomy of a Java Program</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            In Java, absolutely everything must live inside a Class. The general structure follows a strict hierarchy from packages down to methods.
                        </p>

                        <ProgramStructureVisualizer />

                        <h3 className="text-2xl font-bold text-white mt-16 mb-8">The Executable Entry Point</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            To actually execute code, the JVM requires a very specific, strictly formatted <code>main</code> method inside your class.
                        </p>

                        <CodeBlock 
                            title="Main.java"
                            language="java"
                            code={`public class Main {\n    // The entry point of the application\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`}
                            explanation="The JVM searches for a class containing 'public static void main'. If it finds it, it begins executing code line by line from inside that block."
                        />

                        <MainMethodDeconstructor />

                    </section>
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><CompilerLifecycle /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><FeaturesMatrix /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Zap size={20}/> PRO-TIP: GC Tuning</h4>
                    <p className="text-slate-300 text-sm">While the JVM manages memory automatically, enterprise applications often tune the Garbage Collector. For example, using <code className="text-orange-400">java -XX:+UseZGC Main</code> switches the JVM to the ultra-low latency Z Garbage Collector designed for multi-terabyte heaps.</p>
                </div>
<GCVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><KeywordHighlighter /></section>
            </div>
        </div>
    );
}
