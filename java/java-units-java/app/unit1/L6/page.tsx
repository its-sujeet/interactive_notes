"use client";

import React, { useState } from 'react';
import {
    Terminal, Code, Play, Layers, Globe, Zap, LayoutGrid, Info, Server,
    Shield, Shapes, Lock, Database, Coffee, Sun, Moon, ArrowRight, ArrowDown, Split, AlertTriangle
} from 'lucide-react';


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

// --- INTERACTIVE 1: Switch-Case Fallthrough Trap ---
const FallthroughTrap = () => {
    const [selectedCase, setSelectedCase] = useState<number>(2);
    const [includeBreak, setIncludeBreak] = useState<boolean>(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionPath, setExecutionPath] = useState<number[]>([]);
    const [output, setOutput] = useState<string[]>([]);

    const runSimulation = () => {
        setIsExecuting(true);
        setExecutionPath([]);
        setOutput([]);
        
        let path: number[] = [];
        let logs: string[] = [];
        
        // Simulating the switch logic with timers for visual effect
        let currentStep = selectedCase;
        
        const executeStep = () => {
            if (currentStep > 4) {
                // Done
                setTimeout(() => setIsExecuting(false), 500);
                return;
            }

            path.push(currentStep);
            setExecutionPath([...path]);
            
            if (currentStep === 1) logs.push("Initializing system...");
            if (currentStep === 2) logs.push("Loading user data...");
            if (currentStep === 3) logs.push("Rendering UI...");
            if (currentStep === 4) logs.push("Starting main loop...");
            
            setOutput([...logs]);

            if (includeBreak) {
                // Break hit! End simulation
                setTimeout(() => setIsExecuting(false), 500);
            } else {
                // Fallthrough!
                currentStep++;
                setTimeout(executeStep, 800);
            }
        };

        // Start execution
        setTimeout(executeStep, 500);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <AlertTriangle className="text-red-500" />
                    The Fallthrough Trap
                </h3>
                <button 
                    onClick={runSimulation}
                    disabled={isExecuting}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold transition-all flex items-center gap-2"
                >
                    <Play size={18} /> {isExecuting ? 'Executing...' : 'Run Simulation'}
                </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Control Panel & Code */}
                <div className="flex-1">
                    <div className="flex gap-4 mb-6">
                        <div className="bg-[#161b22] p-4 rounded-xl border border-slate-800 flex-1">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Input Value (level)</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(val => (
                                    <button 
                                        key={val}
                                        onClick={() => !isExecuting && setSelectedCase(val)}
                                        className={`flex-1 py-2 rounded-lg font-bold border transition-all ${selectedCase === val ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#161b22] p-4 rounded-xl border border-slate-800 flex flex-col justify-center items-center cursor-pointer hover:border-slate-600 transition-colors" onClick={() => !isExecuting && setIncludeBreak(!includeBreak)}>
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Include `break;`?</span>
                            <div className={`px-4 py-1 rounded font-bold border ${includeBreak ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}>
                                {includeBreak ? 'YES' : 'NO'}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#161b22] border border-slate-800 rounded-xl p-6 font-mono text-sm shadow-inner relative">
                        <span className="text-blue-400">switch</span> (level) {'{\n'}
                        
                        {[1, 2, 3, 4].map(val => (
                            <div key={val} className={`pl-8 py-2 transition-all duration-300 relative ${executionPath.includes(val) ? 'bg-orange-500/10' : ''}`}>
                                {executionPath.includes(val) && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]"></div>}
                                <span className="text-purple-400">case</span> <span className="text-orange-400">{val}</span>:\n
                                <div className="pl-8 text-slate-300">
                                    System.out.println("Executing level {val}");
                                    {includeBreak && <div className="text-red-400 mt-1 font-bold">break;</div>}
                                    {!includeBreak && executionPath.includes(val) && val < 4 && <div className="text-red-500 mt-1 text-xs italic">{'// Fallthrough!'}</div>}
                                </div>
                            </div>
                        ))}
                        
                        {'}'}
                    </div>
                </div>

                {/* Console Output */}
                <div className="w-full md:w-80 bg-black rounded-xl border border-slate-800 p-4 font-mono text-sm flex flex-col shadow-inner">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                        <Terminal size={14} className="text-slate-500" />
                        <span className="text-slate-500">Console Output</span>
                    </div>
                    <div className="flex-1 space-y-2">
                        {output.length === 0 && <span className="text-slate-700 italic">Waiting for execution...</span>}
                        {output.map((log, i) => (
                            <div key={i} className="text-green-400 animate-in fade-in slide-in-from-left-2 duration-300">
                                <span className="text-slate-600 mr-2">❯</span>{log}
                            </div>
                        ))}
                        {!isExecuting && output.length > 0 && !includeBreak && (
                            <div className="mt-4 p-2 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs leading-relaxed animate-in fade-in zoom-in duration-500">
                                <strong>BUG DETECTED:</strong> Because `break` was omitted, the code "fell through" and executed cases you didn't ask for!
                            </div>
                        )}
                        {!isExecuting && output.length > 0 && includeBreak && (
                            <div className="mt-4 p-2 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-xs leading-relaxed animate-in fade-in zoom-in duration-500">
                                <strong>CLEAN EXECUTION:</strong> The `break` statement successfully escaped the switch block after executing the correct case.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};


// --- INTERACTIVE 2: Block Scope Visualizer ---
const ScopeVisualizer = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Block Scope Trap</h3>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm">
                <p className="text-slate-400 mb-4">Variables declared inside an if-block die when the block closes.</p>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded relative group">
                    <span className="text-purple-400">if</span> (userExists) {'{'}
                    <br/>
                    <div className="pl-8 text-slate-300 relative">
                        <span className="text-orange-400">int</span> id = 1234;
                        <div className="absolute top-0 right-0 p-1 bg-green-500/20 text-green-400 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">id is created here</div>
                    </div>
                    {'}'}
                    <br/>
                    <div className="text-red-400 mt-2 bg-red-500/10 border border-red-500/30 p-2 rounded">
                        System.out.println(id); // ERROR: Cannot resolve symbol 'id'
                    </div>
                </div>
            </div>
            <ExplainerCard text="Variables in Java have Block Scope. They are born when their declaring block '{' opens, and they die when that block '}' closes. You cannot access a variable outside of the block it was declared in. This forces you to declare variables at the correct level of visibility." />
        </div>
    );
};


// --- INTERACTIVE 3: Code Golf (If vs Ternary) ---
const CodeGolf = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Code Golf: Shrinking the Logic</h3>
            <p className="text-slate-400 mb-6 relative z-10">Why use ternary operators? Because they turn 6 lines of branching logic into a single elegant expression.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm relative">
                    <div className="absolute top-2 right-2 text-[10px] text-slate-500 border border-slate-800 px-2 py-1 rounded bg-black">6 Lines</div>
                    <span className="text-orange-400">String</span> result;

                    <span className="text-purple-400">if</span> (score &gt; 50) {'{'}
                    <br/>
                    <span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;result = "Pass";</span>
                    <br/>
                    {'}'} <span className="text-purple-400">else</span> {'{'}
                    <br/>
                    <span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;result = "Fail";</span>
                    <br/>
                    {'}'}
                </div>
                
                <div className="bg-[#161b22] border border-orange-500/30 p-6 rounded-xl font-mono text-sm relative flex items-center justify-center">
                    <div className="absolute top-2 right-2 text-[10px] text-orange-400 border border-orange-500/30 px-2 py-1 rounded bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]">1 Line</div>
                    <div>
                        <span className="text-orange-400">String</span> result = (score &gt; 50) <span className="text-yellow-400">?</span> "Pass" <span className="text-yellow-400">:</span> "Fail";
                    </div>
                </div>
            </div>
            <ExplainerCard text="Ternary operators allow for 'Code Golf' - writing code in as few keystrokes as possible. While elegant for simple assignments, overusing them can harm readability. The goal of a programmer isn't to write the shortest code, but the most readable and maintainable code." />
        </div>
    );
};


// --- INTERACTIVE 4: Dangling Else Trap ---
const DanglingElse = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Dangling Else Trap</h3>
            <p className="text-slate-400 mb-6">Whitespace in Java means absolutely nothing. If you omit curly braces, an 'else' block will bind to the NEAREST 'if', regardless of how you indented the code!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500 text-black font-bold px-3 py-1 text-xs">WHAT IT LOOKS LIKE</div>
                    <span className="text-purple-400 mt-4 block">if</span> (user != null)

                    <div className="pl-4">
                        <span className="text-purple-400">if</span> (user.isAdmin())

                        <div className="pl-4 text-slate-300">grantAccess();</div>
                    </div>
                    <span className="text-purple-400 text-red-400">else</span> <span className="text-slate-500 italic">// Looks tied to outer if!</span>

                    <div className="pl-4 text-slate-300">throwError();</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-black font-bold px-3 py-1 text-xs">WHAT JAVA SEES</div>
                    <span className="text-purple-400 mt-4 block">if</span> (user != null) {'{'}

                    <div className="pl-4">
                        <span className="text-purple-400">if</span> (user.isAdmin()) {'{'}

                        <div className="pl-4 text-slate-300">grantAccess();</div>
                        {'}'} <span className="text-purple-400 text-green-400">else</span> {'{'} <span className="text-slate-500 italic">// Binds to nearest if!</span>

                        <div className="pl-4 text-slate-300">throwError();</div>
                        {'}'}
                    </div>
                    {'}'}
                </div>
            </div>
            <div className="mt-6 text-center text-orange-400 font-bold uppercase tracking-widest text-xs">
                Always use curly braces {} to prevent the Dangling Else!
            </div>
            <ExplainerCard text="Indentation means nothing to the Java compiler. An 'else' statement always binds to the nearest unmatched 'if' statement in its scope. If you don't use curly braces '{}', you can easily trick yourself into thinking an 'else' belongs to an outer 'if' based on visual indentation, leading to severe logical bugs." />
        </div>
    );
};


// --- INTERACTIVE 5: Logical XOR Gate ---
const XORGate = () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const result = a !== b; // Java ^ operator

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Exclusive OR (^) Gate</h3>
            <p className="text-slate-400 mb-6">The <code className="text-orange-400">^</code> (XOR) operator is rarely used but extremely powerful. It only returns true if A and B are DIFFERENT.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex items-center justify-center gap-8">
                <div className="flex flex-col gap-4">
                    <button onClick={() => setA(!a)} className={`w-20 h-20 rounded-xl font-bold text-2xl border-4 transition-all ${a ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-slate-700 text-slate-500'}`}>
                        {a ? 'T' : 'F'}
                    </button>
                    <button onClick={() => setB(!b)} className={`w-20 h-20 rounded-xl font-bold text-2xl border-4 transition-all ${b ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-slate-700 text-slate-500'}`}>
                        {b ? 'T' : 'F'}
                    </button>
                </div>
                
                <div className="text-4xl text-slate-500 font-bold">➜</div>
                
                <div className={`w-32 h-32 rounded-full flex items-center justify-center font-black text-3xl border-8 transition-all duration-500 ${result ? 'bg-green-500 border-green-400 text-white shadow-[0_0_50px_rgba(34,197,94,0.6)]' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                    {result ? 'TRUE' : 'FALSE'}
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 6: Enhanced Switch Visualizer ---
const EnhancedSwitchVisualizer = () => {
    const [mode, setMode] = useState<'old'|'new'>('new');
    const [day, setDay] = useState(6);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Modern Java: The Enhanced Switch</h3>
            <p className="text-slate-400 mb-6">Tired of the Fallthrough Trap and writing <code className="text-orange-400">break;</code> 50 times? Java 14 introduced the Arrow Switch. It doesn't fall through, and it can return values directly!</p>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => setMode('old')} className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${mode === 'old' ? 'bg-slate-700/50 border-slate-500 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Old Switch (Pre-Java 14)</button>
                <button onClick={() => setMode('new')} className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${mode === 'new' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Arrow Switch (Java 14+)</button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm min-h-[300px] flex flex-col md:flex-row gap-8">
                
                <div className="flex-1">
                    <div className="mb-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Day: {day}</div>
                    <input type="range" min="1" max="7" value={day} onChange={e => setDay(Number(e.target.value))} className="w-full accent-orange-500 mb-6"/>
                    
                    <div className="p-4 bg-black border border-slate-700 rounded-lg text-center shadow-inner">
                        <div className="text-slate-500 text-xs mb-2">Evaluated Result:</div>
                        <div className={`text-2xl font-black ${day >= 6 ? 'text-green-400' : 'text-slate-300'}`}>
                            {day >= 6 ? 'Weekend' : 'Weekday'}
                        </div>
                    </div>
                </div>

                <div className="flex-[2] bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-inner">
                    {mode === 'old' ? (
                        <div className="animate-in fade-in duration-300 text-slate-300">
                            <span className="text-orange-400">String</span> type;<br/>
                            <span className="text-purple-400">switch</span> (day) {'{'}
                            <br/>
                            <div className="pl-4">
                                <span className="text-purple-400">case</span> 1:<br/>
                                <span className="text-purple-400">case</span> 2:<br/>
                                <span className="text-purple-400">case</span> 3:<br/>
                                <span className="text-purple-400">case</span> 4:<br/>
                                <span className="text-purple-400">case</span> 5:<br/>
                                <div className="pl-4">type = "Weekday"; <span className="text-red-400 font-bold">break;</span></div>
                                <span className="text-purple-400">case</span> 6:<br/>
                                <span className="text-purple-400">case</span> 7:<br/>
                                <div className="pl-4">type = "Weekend"; <span className="text-red-400 font-bold">break;</span></div>
                            </div>
                            {'}'}
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 text-slate-300">
                            <span className="text-orange-400">String</span> type = <span className="text-purple-400">switch</span> (day) {'{'}
                            <br/>
                            <div className="pl-4">
                                <span className="text-purple-400">case</span> 1, 2, 3, 4, 5 <span className="text-green-400 font-bold">-&gt;</span> "Weekday";<br/>
                                <span className="text-purple-400">case</span> 6, 7 <span className="text-green-400 font-bold">-&gt;</span> "Weekend";<br/>
                                <span className="text-purple-400">default</span> <span className="text-green-400 font-bold">-&gt;</span> "Invalid";
                            </div>
                            {'};'}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};


// --- INTERACTIVE 7: Guard Clauses (Anti-Arrow Code) ---
const GuardClauseVisualizer = () => {
    const [refactored, setRefactored] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6">Refactoring: The Arrow Code Trap</h3>
            <p className="text-slate-400 mb-6">Deeply nested if-statements create a shape known as "Arrow Code". It makes code unreadable and hard to maintain. Professional developers invert the logic and use <strong>Guard Clauses</strong> (early returns) to keep the code flat.</p>
            
            <div className="flex justify-center mb-6">
                <button 
                    onClick={() => setRefactored(!refactored)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all border flex items-center gap-2 ${refactored ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}
                >
                    <Split size={18} />
                    {refactored ? 'Revert to Arrow Code' : 'Refactor with Guard Clauses'}
                </button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm overflow-hidden relative min-h-[300px]">
                
                {!refactored ? (
                    <div className="animate-in slide-in-from-left-8 fade-in duration-500 text-slate-300 relative">
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                            <span className="text-[200px] font-black text-red-500">➜</span>
                        </div>
                        <span className="text-purple-400">public void</span> processUser(User user) {'{'}<br/>

                        <div className="pl-4 border-l-2 border-red-500/30 ml-2 py-1 transition-all hover:bg-red-500/10">
                            <span className="text-purple-400">if</span> (user != null) {'{'}<br/>

                            <div className="pl-4 border-l-2 border-red-500/50 ml-2 py-1 transition-all hover:bg-red-500/10">
                                <span className="text-purple-400">if</span> (user.isActive()) {'{'}<br/>

                                <div className="pl-4 border-l-2 border-red-500/70 ml-2 py-1 transition-all hover:bg-red-500/10">
                                    <span className="text-purple-400">if</span> (user.hasPermission()) {'{'}<br/>

                                    <div className="pl-4 border-l-2 border-red-500 ml-2 py-1 bg-red-500/10 shadow-inner">
                                        <span className="text-green-400 font-bold">// Execute core logic</span><br/>
                                        executeSystemAction();
                                    </div>
                                    {'}'}<br/>

                                </div>
                                {'}'}<br/>

                            </div>
                            {'}'}<br/>

                        </div>
                        {'}'}
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-right-8 fade-in duration-500 text-slate-300">
                        <span className="text-purple-400">public void</span> processUser(User user) {'{'}<br/>

                        <div className="pl-4">
                            <span className="text-slate-500 italic">// Guard Clauses (Fail Fast)</span><br/>
                            <span className="text-purple-400">if</span> (user == null) <span className="text-purple-400 font-bold">return</span>;<br/>
                            <span className="text-purple-400">if</span> (!user.isActive()) <span className="text-purple-400 font-bold">return</span>;<br/>
                            <span className="text-purple-400">if</span> (!user.hasPermission()) <span className="text-purple-400 font-bold">return</span>;<br/>
                            <br/>
                            <span className="text-green-400 font-bold">// Execute core logic</span><br/>
                            executeSystemAction();
                        </div>
                        {'}'}
                    </div>
                )}
                
            </div>
            
            <ExplainerCard 
                title="Early Returns"
                text="Arrow code happens when developers try to check everything that MUST be true before running the code. By inverting the logic—checking what makes the execution INVALID and immediately returning—you keep your code flat (0 levels of nesting). Flat code is infinitely easier to read, debug, and maintain than deeply nested if-blocks." 
            />
        </div>
    );
};

export default function JavaLecture6() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-orange-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Conditional Statements</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 6</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-6">Controlling the Flow</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Programs aren't just top-to-bottom. Using <code>if/else</code> and <code>switch</code> statements, we can dynamically branch our application's logic based on data.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">The Standard if/else</h2>
                    <CodeBlock 
                        code={`int score = 85;\n\nif (score >= 90) {\n    System.out.println("Grade: A");\n} else if (score >= 80) {\n    System.out.println("Grade: B");\n} else {\n    System.out.println("Grade: C");\n}`}
                        explanation="Java evaluates conditions from top to bottom. Once a true condition is met, its block executes and the rest are ignored."
                    />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <FallthroughTrap />
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><ScopeVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><CodeGolf /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Real World Context: CI/CD Pipelines</h4>
                    <p className="text-slate-400 text-sm">Because the Dangling Else trap causes silent bugs, modern software teams use automated formatting tools (like <strong>Checkstyle</strong> or <strong>SonarQube</strong>). These tools will automatically reject your code commit if you write an if-statement without curly braces.</p>
                </div>
<DanglingElse /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><XORGate /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><EnhancedSwitchVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><GuardClauseVisualizer /></section>
            </div>
        </div>
    );
}
