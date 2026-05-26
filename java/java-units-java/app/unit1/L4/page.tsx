"use client";

import React, { useState } from 'react';
import {
    Terminal, Code, Play, Layers, Globe, Zap, LayoutGrid, Info, Server,
    Shield, Shapes, Lock, Database, Coffee, Sun, Moon, ArrowRight, Activity, ToggleLeft
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

// --- INTERACTIVE 1: Bitwise Workbench ---
const BitwiseWorkbench = () => {
    const [numA, setNumA] = useState<number>(12); // 00001100
    const [numB, setNumB] = useState<number>(10); // 00001010
    const [operator, setOperator] = useState<'AND' | 'OR' | 'XOR' | 'LSHIFT' | 'RSHIFT'>('AND');

    const toBinaryString = (num: number) => num.toString(2).padStart(8, '0');

    let result = 0;
    if (operator === 'AND') result = numA & numB;
    if (operator === 'OR') result = numA | numB;
    if (operator === 'XOR') result = numA ^ numB;
    if (operator === 'LSHIFT') result = numA << 1;
    if (operator === 'RSHIFT') result = numA >> 1;

    const opSymbol = { 'AND': '&', 'OR': '|', 'XOR': '^', 'LSHIFT': '<<', 'RSHIFT': '>>' }[operator];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Bitwise Workbench</h3>
            
            <div className="flex gap-4 mb-8 justify-center flex-wrap">
                {(['AND', 'OR', 'XOR', 'LSHIFT', 'RSHIFT'] as const).map(op => (
                    <button
                        key={op}
                        onClick={() => setOperator(op)}
                        className={`px-4 py-2 rounded-lg font-bold font-mono transition-all border-2 ${operator === op ? `border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]` : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                        {op}
                    </button>
                ))}
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl max-w-2xl mx-auto flex flex-col gap-6 font-mono text-xl">
                {/* Input A */}
                <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Input A: <span className="text-white ml-2">{numA}</span></span>
                    <div className="flex gap-1">
                        {toBinaryString(numA).split('').map((bit, i) => (
                            <div key={i} className={`w-8 h-10 flex items-center justify-center rounded border ${bit === '1' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                                {bit}
                            </div>
                        ))}
                    </div>
                    <input type="range" min="0" max="255" value={numA} onChange={e => setNumA(parseInt(e.target.value))} className="w-24 accent-orange-500" />
                </div>

                {/* Operator Symbol */}
                <div className="text-center text-4xl font-bold text-slate-600">
                    {opSymbol} {operator === 'LSHIFT' || operator === 'RSHIFT' ? '1' : ''}
                </div>

                {/* Input B (Hidden for shifts) */}
                {operator !== 'LSHIFT' && operator !== 'RSHIFT' && (
                    <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                        <span className="text-slate-500 text-sm">Input B: <span className="text-white ml-2">{numB}</span></span>
                        <div className="flex gap-1">
                            {toBinaryString(numB).split('').map((bit, i) => (
                                <div key={i} className={`w-8 h-10 flex items-center justify-center rounded border ${bit === '1' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                                    {bit}
                                </div>
                            ))}
                        </div>
                        <input type="range" min="0" max="255" value={numB} onChange={e => setNumB(parseInt(e.target.value))} className="w-24 accent-blue-500" />
                    </div>
                )}

                {/* Result */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-green-400 text-sm font-bold">Result: <span className="text-white ml-2">{result}</span></span>
                    <div className="flex gap-1">
                        {toBinaryString(result).split('').map((bit, i) => (
                            <div key={i} className={`w-8 h-10 flex items-center justify-center rounded border ${bit === '1' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-110' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                                {bit}
                            </div>
                        ))}
                    </div>
                    <div className="w-24"></div> {/* Spacer to align visually */}
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 2: Short-Circuit Visualizer ---
const ShortCircuitVisualizer = () => {
    const [crash, setCrash] = useState(false);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">Short-Circuit Evaluation (&& vs &)</h3>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-4 font-mono">
                <p className="text-slate-400 text-sm">If obj is null, checking obj.length() will throw a NullPointerException. Short-circuiting prevents this.</p>
                <div className="flex gap-4">
                    <button onClick={() => setCrash(false)} className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded hover:bg-green-500/40">if (obj != null && obj.length() &gt; 0)</button>
                    <button onClick={() => setCrash(true)} className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded hover:bg-red-500/40">if (obj != null &amp; obj.length() &gt; 0)</button>
                </div>
                <div className={`p-4 mt-4 rounded-xl border ${crash ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400'}`}>
                    {crash ? 'NullPointerException! A single & forces Java to evaluate both sides.' : 'Safe! The && operator saw obj == null (false) and immediately skipped evaluating the right side.'}
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 3: Modulo Arithmetic ---
const ModuloSandbox = () => {
    const [num, setNum] = useState(10);
    const [divisor, setDivisor] = useState(3);
    const remainder = num % divisor;
    
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Modulo (%) Operator</h3>
            <p className="text-slate-400 mb-6">Modulo returns the remainder of a division. It's the secret to finding odd/even numbers and looping logic around boundaries.</p>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex items-center justify-center gap-6 font-mono text-3xl">
                <input type="number" value={num} onChange={e=>setNum(Number(e.target.value))} className="w-24 bg-black border border-slate-700 text-orange-400 text-center rounded p-2" />
                <span className="text-slate-500">%</span>
                <input type="number" value={divisor} onChange={e=>setDivisor(Math.max(1, Number(e.target.value)))} className="w-24 bg-black border border-slate-700 text-blue-400 text-center rounded p-2" />
                <span className="text-slate-500">=</span>
                <div className="w-24 bg-green-500/20 border border-green-500 text-green-400 text-center rounded p-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    {remainder}
                </div>
            </div>
            <div className="mt-6 flex gap-4 text-sm justify-center">
                <button onClick={()=>{setNum(5); setDivisor(2);}} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-300 hover:text-white hover:border-slate-500">Odd vs Even (5 % 2)</button>
                <button onClick={()=>{setNum(14); setDivisor(12);}} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-300 hover:text-white hover:border-slate-500">Clock Math (14 % 12)</button>
            </div>
        </div>
    );
};


// --- INTERACTIVE 4: Bitwise Masking Visualizer ---
const BitwiseMasking = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Real World: Bitwise Masking (Color Codes)</h3>
            <p className="text-slate-400 mb-6">Bitwise operators aren't just theory. They are used to extract RGB color values from a single 32-bit integer! Using bitwise AND (&) and Right Shift (&gt;&gt;).</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm">
                <div className="text-slate-400 mb-2">// 32-bit ARGB Color (A=255, R=255, G=165, B=0)</div>
                <div className="text-orange-400 mb-6">int color = 0xFFFFA500;</div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded text-red-400">
                        <div className="mb-2 text-xs uppercase font-bold text-slate-500">Extract Red</div>
                        int r = (color &gt;&gt; 16) & 0xFF;
                        <div className="mt-2 text-white font-bold">Result: 255</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-4 rounded text-green-400">
                        <div className="mb-2 text-xs uppercase font-bold text-slate-500">Extract Green</div>
                        int g = (color &gt;&gt; 8) & 0xFF;
                        <div className="mt-2 text-white font-bold">Result: 165</div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded text-blue-400">
                        <div className="mb-2 text-xs uppercase font-bold text-slate-500">Extract Blue</div>
                        int b = color & 0xFF;
                        <div className="mt-2 text-white font-bold">Result: 0</div>
                    </div>
                </div>
            </div>
            <ExplainerCard text="Bitwise masking is used heavily in graphics, networking, and embedded systems. In a 32-bit ARGB color, 8 bits are used for Alpha, 8 for Red, 8 for Green, 8 for Blue. By bit-shifting right and using an AND mask (& 0xFF), we can extract individual color channels from a single integer." />
        </div>
    );
};


// --- INTERACTIVE 5: Floating Point Precision ---
const FloatingPointPrecision = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Floating Point Lie</h3>
            <p className="text-slate-400 mb-6">Never use <code className="text-orange-400">double</code> or <code className="text-orange-400">float</code> for currency. Computers use Base-2 (binary) fractions, which cannot perfectly represent Base-10 decimals like 0.1.</p>
            
            <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-xl font-mono text-center flex flex-col items-center justify-center min-h-[200px]">
                <div className="text-orange-400 text-2xl font-bold mb-4">
                    double result = 0.1 + 0.2;
                </div>
                <div className="text-slate-400 text-sm mb-4">System.out.println(result);</div>
                <div className="text-red-400 text-4xl font-black bg-black px-6 py-2 rounded-lg border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    0.30000000000000004
                </div>
                <div className="mt-6 text-slate-500 text-xs tracking-widest uppercase font-bold">Use BigDecimal for Money!</div>
            </div>
            <ExplainerCard text="Computers operate in Base-2 (binary). They cannot perfectly represent all Base-10 (decimal) fractions. Just like 1/3 is 0.33333... in decimal, 0.1 is an infinite repeating fraction in binary. This causes tiny rounding errors. Never use float or double for precise values like currency; use BigDecimal." />
        </div>
    );
};


// --- INTERACTIVE 6: Compound Assignment Trap ---
const CompoundAssignmentTrap = () => {
    const [mode, setMode] = useState<'standard'|'compound'>('standard');

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Compound Assignment Trap</h3>
            <p className="text-slate-400 mb-6">Most developers think <code className="text-orange-400">s += 1</code> is exactly the same as <code className="text-orange-400">s = s + 1</code>. In Java, this is a lie. Compound assignment operators automatically cast the result back to the original type!</p>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => setMode('standard')} className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${mode === 'standard' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}>Standard (s = s + 1)</button>
                <button onClick={() => setMode('compound')} className={`px-6 py-2 rounded-lg font-bold border-2 transition-all ${mode === 'compound' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}>Compound (s += 1)</button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm min-h-[220px]">
                <div className="text-purple-400 mb-4">short s = 10;</div>
                
                {mode === 'standard' ? (
                    <div className="animate-in fade-in duration-300">
                        <div className="text-orange-400 mb-4">s = s + 1;</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Compiler Response:</div>
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded">
                            <strong>Compilation Error!</strong><br/>
                            <span className="text-xs">incompatible types: possible lossy conversion from int to short.</span><br/>
                            <span className="text-slate-500 italic text-xs mt-2 block">// Explanation: Adding 1 (an int) to a short promotes the entire result to an int. You cannot shove an int back into a short variable without an explicit cast!</span>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-300">
                        <div className="text-green-400 mb-4">s += 1;</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Compiler Response:</div>
                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded">
                            <strong>Success! (s is now 11)</strong><br/>
                            <span className="text-slate-500 italic text-xs mt-2 block">// Explanation: The JVM secretly translates this into s = (short)(s + 1). The implicit cast saves you from compilation errors, but can cause silent integer overflow bugs!</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function JavaLecture4() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-orange-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Basic Operators</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 4</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-6">Down to the Metal</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Java provides a rich set of operators. While arithmetic (+, -) and logical (&&, ||) operators are common, Bitwise operators allow you to manipulate raw memory at the 1s and 0s level.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <BitwiseWorkbench />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Standard Arithmetic & Logical</h2>
                    <CodeBlock 
                        code={`int a = 10;\nint b = 20;\n\n// Arithmetic\nint sum = a + b;\nint mod = b % a;\n\n// Relational & Logical\nif (a < b && b > 0) {\n    System.out.println("Valid condition!");\n}`}
                        explanation="Standard mathematical operations and boolean logic used for control flow."
                    />
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-green-400 font-bold mb-2">PRO-TIP: Safe Navigation</h4>
                    <p className="text-slate-300 text-sm">Always place your null-checks on the left side of a <code className="text-orange-400">&amp;&amp;</code> operator. The JVM evaluates left-to-right, so if the left side is null, the short-circuit triggers immediately, preventing a <code className="text-red-400">NullPointerException</code> on the right side.</p>
                </div>
<ShortCircuitVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><ModuloSandbox /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Real World Context: Network Subnetting</h4>
                    <p className="text-slate-400 text-sm">Beyond color graphics, Bitwise AND (<code className="text-orange-400">&amp;</code>) is actively used in networking to calculate Subnet Routing. Routers apply a bitwise AND operation between an IP address and a Subnet Mask to instantly determine if a packet belongs to the local network or needs to be forwarded to the internet.</p>
                </div>
<BitwiseMasking /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><FloatingPointPrecision /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><CompoundAssignmentTrap /></section>
            </div>
        </div>
    );
}
