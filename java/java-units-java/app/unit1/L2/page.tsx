"use client";

import React, { useState } from 'react';
import {
    Terminal, Code, Play, Layers, Globe, Zap, LayoutGrid, Info, Server,
    Shield, Shapes, Lock, Database, Coffee, Sun, Moon, Box, Package, Cpu
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
                </div>
                {explanation && (
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${showExplanation ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-orange-400 hover:bg-slate-700'}`}
                    >
                        <Info size={14} /> {showExplanation ? 'HIDE EXPLANATION' : 'EXPLAIN CODE'}
                    </button>
                )}
            </div>
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
            {showExplanation && explanation && (
                <div className="bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/50 p-6 text-sm text-slate-300 leading-relaxed animate-in slide-in-from-top-4 fade-in duration-300">
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
};

const TheoryCard = ({ icon: Icon, title, content, isImportant = false }: { icon: any, title: string, content: React.ReactNode, isImportant?: boolean }) => (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${isImportant ? 'bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-500/50' : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'}`}>
        <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${isImportant ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700/50 text-blue-400'}`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
        </div>
        <div className="text-slate-300 leading-relaxed space-y-3">{content}</div>
    </div>
);

// --- INTERACTIVE 1: Matryoshka ---
const JavaMatryoshka = () => {
    const [selectedLayer, setSelectedLayer] = useState<'jdk' | 'jre' | 'jvm'>('jdk');

    const content = {
        jdk: { title: 'JDK (Java Development Kit)', desc: 'The full toolkit. Contains everything you need to WRITE and COMPILE Java programs. Includes the compiler (javac), debuggers, and the entire JRE.', icon: Package, color: 'border-orange-500 text-orange-400', bg: 'bg-orange-500/20' },
        jre: { title: 'JRE (Java Runtime Environment)', desc: 'The runtime environment. Contains everything you need to RUN compiled Java programs. Includes core libraries (java.lang, java.util) and the JVM.', icon: Box, color: 'border-blue-500 text-blue-400', bg: 'bg-blue-500/20' },
        jvm: { title: 'JVM (Java Virtual Machine)', desc: 'The engine. Translates bytecode into native machine code for the specific OS. Provides memory management and garbage collection.', icon: Cpu, color: 'border-green-500 text-green-400', bg: 'bg-green-500/20' },
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The JDK / JRE / JVM Hierarchy</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Visualizer */}
                <div className="flex-1 relative w-full aspect-square max-w-sm cursor-pointer select-none">
                    {/* JDK Layer */}
                    <div onClick={() => setSelectedLayer('jdk')} className={`absolute inset-0 rounded-3xl border-4 ${selectedLayer === 'jdk' ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.3)] z-30' : 'border-slate-700 hover:border-slate-500 z-10'} transition-all flex items-start justify-center p-4`}>
                        <span className={`font-bold ${selectedLayer === 'jdk' ? 'text-orange-400' : 'text-slate-500'}`}>JDK</span>
                    </div>
                    {/* JRE Layer */}
                    <div onClick={() => setSelectedLayer('jre')} className={`absolute inset-12 rounded-2xl border-4 ${selectedLayer === 'jre' ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] z-30' : 'border-slate-600 hover:border-slate-400 z-20'} transition-all flex items-start justify-center p-4`}>
                        <span className={`font-bold ${selectedLayer === 'jre' ? 'text-blue-400' : 'text-slate-400'}`}>JRE</span>
                    </div>
                    {/* JVM Layer */}
                    <div onClick={() => setSelectedLayer('jvm')} className={`absolute inset-24 rounded-xl border-4 ${selectedLayer === 'jvm' ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.3)] z-30' : 'border-slate-500 hover:border-slate-300 z-30'} transition-all flex items-center justify-center`}>
                        <span className={`font-bold ${selectedLayer === 'jvm' ? 'text-green-400' : 'text-slate-300'}`}>JVM</span>
                    </div>
                </div>

                {/* Explanation */}
                <div className={`flex-1 p-8 rounded-2xl border backdrop-blur-md ${content[selectedLayer].bg} ${content[selectedLayer].color.split(' ')[0]} animate-in slide-in-from-right-4`}>
                    <h4 className={`text-2xl font-bold mb-4 ${content[selectedLayer].color.split(' ')[1]}`}>{content[selectedLayer].title}</h4>
                    <p className="text-slate-200 text-lg leading-relaxed">{content[selectedLayer].desc}</p>
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE 2: CLI Args ---
const CLIArgsSimulator = () => {
    const [args, setArgs] = useState('admin 8080 prod');
    
    const argArray = args.trim().split(' ').filter(a => a.length > 0);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">CLI Arguments Sandbox</h3>
            
            <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono text-sm flex items-center gap-4 mb-8 focus-within:border-orange-500/50 transition-colors">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-slate-300">java Main</span>
                <input 
                    type="text" 
                    value={args} 
                    onChange={e => setArgs(e.target.value)}
                    className="bg-transparent border-none outline-none text-orange-400 font-bold flex-1"
                    placeholder="Enter arguments separated by space..."
                />
            </div>

            <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800">
                <h4 className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">String[] args (Memory Mapping)</h4>
                
                {argArray.length === 0 ? (
                    <div className="text-slate-500 text-center py-8">No arguments passed. Array is empty.</div>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {argArray.map((arg, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="bg-slate-800 border border-slate-600 px-4 py-3 rounded-t-lg font-mono text-orange-400 font-bold min-w-[80px] text-center">
                                    "{arg}"
                                </div>
                                <div className="bg-slate-900 border-x border-b border-slate-600 px-4 py-1 rounded-b-lg font-mono text-slate-500 text-xs text-center w-full">
                                    args[{idx}]
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- INTERACTIVE 3: PATH Variable Simulator ---
const PathVariableSimulator = () => {
    const [pathVal, setPathVal] = useState('');
    const pathValid = pathVal.includes('C:\\Program Files\\Java\\jdk\\bin') || pathVal.includes('/usr/lib/jvm/');

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">The PATH Variable Trap</h3>
                <button 
                    onClick={() => setPathVal('C:\\Program Files\\Java\\jdk\\bin')}
                    className="px-4 py-2 bg-orange-500/20 border border-orange-500 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors font-bold text-sm"
                >
                    Auto-Fill Path
                </button>
            </div>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
                <p className="text-slate-400">If you type 'javac' in the terminal and get 'command not found', your OS doesn't know where the JDK is. You must add the JDK bin directory to your OS PATH.</p>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-orange-400">PATH=</span>
                    <input 
                        type="text" 
                        value={pathVal}
                        onChange={(e) => setPathVal(e.target.value)} 
                        className="bg-black border border-slate-700 rounded p-2 flex-1 text-white font-mono" 
                        placeholder="Enter path (e.g. C:\Program Files\Java\jdk\bin)" 
                    />
                </div>
                <div className={`p-4 rounded-xl border ${pathValid ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}>
                    Terminal output: {pathValid ? 'javac 17.0.2 (Success!)' : 'bash: javac: command not found'}
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 4: IDE vs CLI Sandbox ---
const IDEvsCLISandbox = () => {
    const [mode, setMode] = useState<'ide'|'cli'>('ide');
    const [cliStep, setCliStep] = useState(0);
    const [ideRun, setIdeRun] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">IDE Magic vs CLI Reality</h3>
            <p className="text-slate-400 mb-6">IDEs like IntelliJ or Eclipse are incredibly powerful, but they hide the true mechanics of Java behind a "Run" button. Understanding what happens in the CLI is essential for debugging enterprise servers.</p>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => { setMode('ide'); setIdeRun(false); }} className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${mode === 'ide' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}>The IDE Illusion</button>
                <button onClick={() => { setMode('cli'); setCliStep(0); }} className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${mode === 'cli' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}>The CLI Reality</button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 rounded-xl overflow-hidden min-h-[350px]">
                {mode === 'ide' ? (
                    <div className="flex flex-col h-full animate-in fade-in duration-500">
                        {/* IDE Header */}
                        <div className="bg-[#1e1e1e] border-b border-slate-800 p-2 flex justify-between items-center">
                            <div className="flex gap-2 px-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <button 
                                onClick={() => setIdeRun(true)}
                                className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded flex items-center gap-2 font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                            >
                                <Play size={14} className="fill-white"/> Run Main
                            </button>
                        </div>
                        {/* IDE Body */}
                        <div className="flex flex-1">
                            <div className="w-48 border-r border-slate-800 p-4 bg-[#1e1e1e]">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Project</div>
                                <div className="text-slate-300 text-sm flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Main.java</div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="p-4 font-mono text-sm text-slate-300 flex-1">
                                    <span className="text-orange-400">public class</span> Main {'{'}<br/>
                                    &nbsp;&nbsp;<span className="text-orange-400">public static void</span> main(String[] args) {'{'}<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;System.<span className="text-blue-300">out</span>.println(<span className="text-green-400">"Hello World!"</span>);<br/>
                                    &nbsp;&nbsp;{'}'}<br/>
                                    {'}'}
                                </div>
                                <div className="h-32 bg-black border-t border-slate-800 p-4 font-mono text-sm">
                                    <div className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Console Output</div>
                                    {ideRun ? (
                                        <div className="text-green-400 animate-in slide-in-from-left-4 fade-in duration-300">
                                            /usr/lib/jvm/java-17-openjdk-amd64/bin/java -javaagent:/opt/intellij/idea_rt.jar=... Main<br/><br/>
                                            Hello World!<br/>
                                            <span className="text-slate-500 italic mt-2 block">Process finished with exit code 0</span>
                                        </div>
                                    ) : (
                                        <div className="text-slate-600 italic">Click Run to execute...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full animate-in fade-in duration-500 p-6 font-mono">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Terminal Interface</div>
                            <button onClick={() => setCliStep((prev) => (prev < 2 ? prev + 1 : 0))} className="bg-orange-500 text-black font-bold px-4 py-1 rounded text-sm hover:bg-orange-400 transition-all">
                                {cliStep === 0 ? 'Compile Code' : cliStep === 1 ? 'Run JVM' : 'Reset'}
                            </button>
                        </div>
                        
                        <div className="flex gap-8">
                            <div className="flex-1 bg-black p-4 rounded-xl border border-slate-800 text-sm">
                                <div className="flex gap-2 mb-2">
                                    <span className="text-green-400 font-bold">anon@linux:~$</span>
                                    <span className="text-slate-300">ls</span>
                                </div>
                                <div className="text-blue-400 mb-4">Main.java</div>
                                
                                {cliStep >= 1 && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-green-400 font-bold">anon@linux:~$</span>
                                            <span className="text-slate-300">javac Main.java</span>
                                        </div>
                                        <div className="text-slate-500 italic mb-4">// Compiles to bytecode (Main.class)</div>
                                    </div>
                                )}
                                
                                {cliStep >= 2 && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-green-400 font-bold">anon@linux:~$</span>
                                            <span className="text-slate-300">java Main</span>
                                        </div>
                                        <div className="text-slate-500 italic mb-2">// Starts JVM and runs bytecode</div>
                                        <div className="text-white font-bold">Hello World!</div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="w-48 bg-slate-900 border border-slate-800 rounded-xl p-4">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Directory Contents</div>
                                <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Main.java
                                </div>
                                {cliStep >= 1 && (
                                    <div className="flex items-center gap-2 text-slate-300 text-sm animate-in zoom-in duration-300 text-orange-400 font-bold">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div> Main.class
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- INTERACTIVE 5: JIT Compiler Visualizer ---
const JITVisualizer = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The JIT (Just-In-Time) Compiler</h3>
            <p className="text-slate-400 mb-6">The JVM does not just interpret bytecode line-by-line. It watches for "Hot Code" (loops running thousands of times) and compiles it into pure machine code on the fly for massive speed boosts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
                    <h4 className="text-slate-500 font-bold mb-4 uppercase">1. Interpreter (Slow)</h4>
                    <p className="text-orange-400 mb-2">while (count &lt; 1000) {'{'} ... {'}'}</p>
                    <p className="text-slate-400">Reads bytecode line-by-line, translating to machine code 1000 separate times.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)] relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 bg-green-500 text-black font-bold px-8 py-2 rotate-45">JIT ACTIVE</div>
                    <h4 className="text-slate-500 font-bold mb-4 uppercase">2. JIT Compiler (Fast)</h4>
                    <p className="text-green-400 mb-2">Detected "Hot Code"!</p>
                    <p className="text-slate-400">Compiles the entire loop into native CPU instructions <span className="text-white font-bold">once</span> and caches it. Execution speed becomes similar to C++.</p>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 6: Classpath Simulator ---
const ClasspathSimulator = () => {
    const [libIncluded, setLibIncluded] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Classpath (-cp) Trap</h3>
            <p className="text-slate-400 mb-6">If you use an external library (like a JSON parser or database driver), the JVM has no idea where it is unless you tell it using the <code>-cp</code> (classpath) flag.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-6 font-mono text-sm">
                
                <div className="flex gap-4">
                    <button onClick={() => setLibIncluded(false)} className={`px-4 py-2 rounded font-bold border-2 ${!libIncluded ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>java Main</button>
                    <button onClick={() => setLibIncluded(true)} className={`px-4 py-2 rounded font-bold border-2 ${libIncluded ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>java -cp .:mysql.jar Main</button>
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="text-slate-500 mb-2 uppercase text-xs tracking-widest font-bold">Execution Result</div>
                    {!libIncluded ? (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded text-red-400">
                            Exception in thread "main" java.lang.NoClassDefFoundError: com/mysql/jdbc/Driver
                            <br/><br/>
                            <span className="text-slate-400">// The JVM checked the current directory (.) but could not find the external MySQL classes!</span>
                        </div>
                    ) : (
                        <div className="bg-green-500/10 border border-green-500/50 p-4 rounded text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            MySQL Database Connected Successfully!
                            <br/><br/>
                            <span className="text-slate-400">// The JVM checked both the current directory (.) AND the mysql.jar file because of -cp!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 7: JVM Memory Architecture ---
const JVMMemoryVisualizer = () => {
    const [selectedArea, setSelectedArea] = useState<'heap'|'stack'|'method'|'pc'>('heap');

    const areas = {
        method: { title: "Method Area (Metaspace)", desc: "Stores class structures, method data, static variables, and the runtime constant pool. It is shared across all threads.", color: "border-purple-500 text-purple-400", bg: "bg-purple-500/20" },
        heap: { title: "Heap Memory", desc: "Where all Objects (using the 'new' keyword) and instance variables are allocated. Managed by the Garbage Collector. Shared across all threads.", color: "border-green-500 text-green-400", bg: "bg-green-500/20" },
        stack: { title: "JVM Stacks", desc: "Stores local variables, method calls, and partial results. Each thread has its own private Stack. Memory is automatically freed when methods return.", color: "border-blue-500 text-blue-400", bg: "bg-blue-500/20" },
        pc: { title: "PC Registers", desc: "Program Counter. Stores the address of the currently executing JVM instruction. Each thread has its own private PC Register.", color: "border-orange-500 text-orange-400", bg: "bg-orange-500/20" }
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">JVM Runtime Data Areas</h3>
            <p className="text-slate-400 mb-6">When the JVM runs a program, it carves up your system's RAM into specific operational zones.</p>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Interactive Diagram */}
                <div className="flex-1 bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex gap-4 h-32">
                        <button onClick={() => setSelectedArea('method')} className={`flex-1 rounded-xl border-4 transition-all font-bold flex items-center justify-center ${selectedArea === 'method' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>
                            Method Area
                        </button>
                        <button onClick={() => setSelectedArea('heap')} className={`flex-[2] rounded-xl border-4 transition-all font-bold flex items-center justify-center ${selectedArea === 'heap' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>
                            Heap
                        </button>
                    </div>
                    <div className="flex gap-4 h-32">
                        <button onClick={() => setSelectedArea('stack')} className={`flex-[2] rounded-xl border-4 transition-all font-bold flex items-center justify-center ${selectedArea === 'stack' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>
                            Thread Stacks
                        </button>
                        <button onClick={() => setSelectedArea('pc')} className={`flex-1 rounded-xl border-4 transition-all font-bold flex items-center justify-center text-center ${selectedArea === 'pc' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>
                            PC Regs
                        </button>
                    </div>
                    <div className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 border-t border-slate-800 pt-4">JVM Memory Architecture Map</div>
                </div>

                {/* Explanation Panel */}
                <div className={`flex-1 p-8 rounded-xl border-2 transition-all ${areas[selectedArea].bg} ${areas[selectedArea].color.split(' ')[0]}`}>
                    <h4 className={`text-2xl font-bold mb-4 ${areas[selectedArea].color.split(' ')[1]}`}>{areas[selectedArea].title}</h4>
                    <p className="text-slate-200 text-lg leading-relaxed">{areas[selectedArea].desc}</p>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 8: Bytecode Viewer ---
const BytecodeViewer = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Inside the .class File (Bytecode)</h3>
            <p className="text-slate-400 mb-6">When you run <code className="text-orange-400">javac</code>, it doesn't create binary 1s and 0s. It creates JVM Bytecode. You can actually read this using the <code className="text-orange-400">javap -c</code> command!</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-700 rounded-xl overflow-hidden font-mono text-sm">
                <div className="bg-[#1e1e1e] p-6 border-b lg:border-b-0 lg:border-r border-slate-700">
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Source Code (Main.java)</div>
                    <div className="text-slate-300 leading-relaxed">
                        <span className="text-orange-400">public class</span> Main {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-orange-400">public static void</span> main(String[] args) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">int</span> x = <span className="text-green-400">5</span>;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(x);<br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </div>
                <div className="bg-black p-6">
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">javap -c Main.class</div>
                    <div className="text-green-400/80 leading-relaxed">
                        0: iconst_5 <span className="text-slate-600 ml-4">// Load int 5</span><br/>
                        1: istore_1 <span className="text-slate-600 ml-4">// Store into local var 1 (x)</span><br/>
                        2: getstatic #7 <span className="text-slate-600 ml-4">// Get System.out</span><br/>
                        5: iload_1  <span className="text-slate-600 ml-4">// Load local var 1</span><br/>
                        6: invokevirtual #13 <span className="text-slate-600 ml-2">// Call println()</span><br/>
                        9: return   <span className="text-slate-600 ml-4">// Void return</span>
                    </div>
                </div>
            </div>
            <ExplainerCard text="Bytecode is the intermediate language of Java. It's not machine code, and it's not source code. It's a highly optimized set of instructions that the JVM understands. The 'javap -c' command allows us to disassemble a .class file and see exactly what the compiler generated." />
        </div>
    );
};

export default function JavaLecture2() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-orange-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Java Environment</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 2</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-6">The Java Ecosystem</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Understanding the difference between the JDK, JRE, and JVM is critical for configuring environments and deploying applications.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <JavaMatryoshka />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Command Line Arguments</h2>
                    <p className="text-slate-400 mb-8">When executing a Java application, you can pass runtime data directly into the `main` method. These parameters are parsed as an array of Strings.</p>
                    <CLIArgsSimulator />
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><PathVariableSimulator /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><IDEvsCLISandbox /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><JITVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Real World Context: Build Tools</h4>
                    <p className="text-slate-400 text-sm">In professional environments, nobody types <code className="text-orange-400">javac -cp ...</code> by hand. We use build tools like <strong>Maven</strong> or <strong>Gradle</strong> which automatically download dependencies (like MySQL drivers) from the internet and construct the massive classpath string for the compiler automatically.</p>
                </div>
<ClasspathSimulator /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-purple-500/10 border-l-4 border-purple-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-purple-400 font-bold mb-2">Deep Theory: The Death of PermGen</h4>
                    <p className="text-slate-300 text-sm">Prior to Java 8, class metadata was stored in a fixed-size memory area called <strong>PermGen (Permanent Generation)</strong>. If you loaded too many classes dynamically, it would throw <code className="text-red-400">OutOfMemoryError: PermGen space</code>. Java 8 replaced this with <strong>Metaspace</strong>, which automatically scales using native OS memory, eliminating this notorious crash.</p>
                </div>
<JVMMemoryVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><BytecodeViewer /></section>
            </div>
        </div>
    );
}
