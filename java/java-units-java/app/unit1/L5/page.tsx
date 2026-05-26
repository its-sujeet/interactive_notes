"use client";

import React, { useState } from 'react';
import {
    Terminal, Code, Play, Layers, Globe, Zap, LayoutGrid, Info, Server,
    Shield, Shapes, Lock, Database, Coffee, Sun, Moon, ArrowRight, ArrowDown, Split
} from 'lucide-react';

// --- INTERACTIVE 1: Ternary Router ---
const TernaryRouter = () => {
    const [condition, setCondition] = useState<boolean>(true);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Split className="text-orange-400"/> Ternary Logic Router</h3>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl max-w-3xl mx-auto font-mono text-xl text-center relative">
                
                <div className="mb-8">
                    <span className="text-slate-500 text-sm block mb-2 uppercase tracking-widest">Condition</span>
                    <button 
                        onClick={() => setCondition(!condition)}
                        className={`px-8 py-3 rounded-xl font-bold border-2 transition-all shadow-lg ${condition ? 'bg-green-500/20 border-green-500 text-green-400 shadow-green-500/20' : 'bg-red-500/20 border-red-500 text-red-400 shadow-red-500/20'}`}
                    >
                        {condition ? 'isLoggedIn == true' : 'isLoggedIn == false'}
                    </button>
                </div>

                <div className="text-3xl text-slate-500 font-bold mb-8">?</div>

                <div className="flex justify-center gap-16 relative">
                    {/* Path lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-1 bg-slate-800 -z-10"></div>
                    
                    {/* True Path */}
                    <div className={`p-6 rounded-xl border-2 transition-all w-48 ${condition ? 'bg-green-500/20 border-green-500 text-green-400 scale-110 shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10' : 'bg-slate-900 border-slate-800 text-slate-700 opacity-50 scale-90'}`}>
                        <div className="text-xs mb-2">TRUE ROUTE</div>
                        <div className="font-bold">"Dashboard"</div>
                    </div>

                    <div className="text-3xl text-slate-500 font-bold self-center">:</div>

                    {/* False Path */}
                    <div className={`p-6 rounded-xl border-2 transition-all w-48 ${!condition ? 'bg-red-500/20 border-red-500 text-red-400 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.3)] z-10' : 'bg-slate-900 border-slate-800 text-slate-700 opacity-50 scale-90'}`}>
                        <div className="text-xs mb-2">FALSE ROUTE</div>
                        <div className="font-bold">"Login Page"</div>
                    </div>
                </div>
                
                <div className="mt-12 p-4 bg-black border border-slate-800 rounded-lg text-slate-400 text-sm text-left">
                    <span className="text-orange-400">String</span> route = ({condition ? 'true' : 'false'}) <span className="text-yellow-400">?</span> "Dashboard" <span className="text-yellow-400">:</span> "Login Page";
                    <br/><br/>
                    <span className="text-slate-500">// Result: route is set to "{condition ? 'Dashboard' : 'Login Page'}"</span>
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE 2: Precedence Arena ---
const PrecedenceArena = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { code: 'int x = 5 + 3 * 2 - 8 / 4;', desc: 'Initial Expression. Operators: +, *, -, /' },
        { code: 'int x = 5 + (3 * 2) - 8 / 4;', desc: 'Step 1: Multiplication (*) and Division (/) have highest precedence. Evaluated left-to-right.' },
        { code: 'int x = 5 + 6 - (8 / 4);', desc: 'Step 2: Division (/) executes next.' },
        { code: 'int x = (5 + 6) - 2;', desc: 'Step 3: Addition (+) and Subtraction (-) have lower precedence. Evaluated left-to-right.' },
        { code: 'int x = 11 - 2;', desc: 'Step 4: Subtraction executes.' },
        { code: 'int x = 9;', desc: 'Step 5: Assignment (=) has the lowest precedence. The final value 9 is stored in x.' },
    ];

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Precedence Battle Arena</h3>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl max-w-2xl mx-auto flex flex-col gap-6">
                
                <div className="bg-black p-6 rounded-lg border border-slate-700 font-mono text-xl text-center text-orange-400 shadow-inner min-h-[100px] flex items-center justify-center">
                    {steps[step].code}
                </div>

                <div className="text-slate-400 text-center min-h-[60px]">
                    {steps[step].desc}
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button 
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-300 disabled:opacity-50 hover:bg-slate-700"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                        disabled={step === steps.length - 1}
                        className="px-6 py-2 rounded-lg font-bold bg-orange-600 text-white disabled:opacity-50 hover:bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                    >
                        Next Step
                    </button>
                    <button 
                        onClick={() => setStep(0)}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-400 hover:bg-slate-700"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 3: Unary Increment Trap ---
const UnaryTrap = () => {
    const [mode, setMode] = useState<'post'|'pre'>('post');
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Prefix vs Postfix (x++ vs ++x)</h3>
            <div className="flex gap-4 mb-4">
                <button onClick={() => setMode('post')} className={`px-4 py-2 rounded font-bold ${mode === 'post' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>int y = x++;</button>
                <button onClick={() => setMode('pre')} className={`px-4 py-2 rounded font-bold ${mode === 'pre' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>int y = ++x;</button>
            </div>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex gap-8">
                <div className="flex-1">
                    <h4 className="text-slate-500 mb-2 font-bold uppercase text-xs">Initial Memory</h4>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded text-center text-slate-300 font-mono">x = 5</div>
                </div>
                <div className="flex-1">
                    <h4 className="text-slate-500 mb-2 font-bold uppercase text-xs">Execution Order</h4>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded text-sm text-slate-300">
                        {mode === 'post' ? '1. Read x (5) and assign to y. \n 2. Increment x to 6.' : '1. Increment x to 6. \n 2. Read new x (6) and assign to y.'}
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="text-slate-500 mb-2 font-bold uppercase text-xs">Final Memory</h4>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded text-center text-white font-mono font-bold bg-green-500/10 border-green-500/50">
                        y = {mode === 'post' ? '5' : '6'}, x = 6
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 4: Compound Assignment Secrets ---
const CompoundAssignment = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Hidden Cast in +=</h3>
            <p className="text-slate-400 mb-6">Compound operators (+=, -=, *=) do not just shorten code. They inject an invisible explicit type cast, preventing compilation errors on narrow types like bytes.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
                    <div className="text-slate-400 mb-2">// The Standard Approach</div>
                    <div className="text-blue-400">byte</div> x = 10;

                    <div className="text-red-400">x = x + 5; <span className="text-red-500 text-xs italic">// ERROR! 5 is an int. Cannot cast int to byte.</span></div>
                </div>
                <div className="bg-green-500/10 border border-green-500/50 p-6 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                    <div className="text-slate-400 mb-2">// The Compound Approach</div>
                    <div className="text-blue-400">byte</div> x = 10;

                    <div className="text-green-400">x += 5; <span className="text-slate-500 text-xs italic">// Valid! Automatically compiles as: x = (byte)(x + 5);</span></div>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 5: Logical Not Toggle ---
const LogicalNotToggle = () => {
    const [isOn, setIsOn] = useState(false);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6">The Unary Not (!) Toggle</h3>
            <p className="text-slate-400 mb-6">The logical NOT operator flips a boolean. It's the standard way to build a toggle switch in Java.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center gap-6">
                <button 
                    onClick={() => setIsOn(!isOn)}
                    className={`px-8 py-4 rounded-full font-bold text-xl border-4 transition-all duration-300 ${isOn ? 'bg-green-500 border-green-400 text-black shadow-[0_0_40px_rgba(34,197,94,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                >
                    {isOn ? 'POWER ON' : 'POWER OFF'}
                </button>
                <div className="text-mono font-bold text-orange-400 bg-black p-4 rounded border border-slate-800">
                    isPowerOn = !isPowerOn;
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 6: Nested Ternary Nightmare ---
const NestedTernary = () => {
    const [age, setAge] = useState(25);
    const [isVip, setIsVip] = useState(false);

    // logic: age >= 18 ? (isVip ? "Free VIP Drink" : "Pay $10") : "Too Young"
    const result = age >= 18 ? (isVip ? "Free VIP Drink" : "Pay $10") : "Too Young";

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Nested Ternary Nightmare</h3>
            <p className="text-slate-400 mb-6">You can nest ternaries inside ternaries. This is a great way to show off your skills, and an even better way to make your senior developer yell at you for unreadable code.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl font-mono text-sm">
                <div className="flex gap-6 mb-8 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400">age:</span>
                        <input type="range" min="10" max="30" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-32"/>
                        <span className="text-orange-400 font-bold">{age}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400">isVip:</span>
                        <button onClick={() => setIsVip(!isVip)} className={`px-4 py-1 rounded font-bold ${isVip ? 'bg-green-500 text-black' : 'bg-slate-700 text-white'}`}>{isVip ? 'true' : 'false'}</button>
                    </div>
                </div>

                <div className="text-center text-xl text-slate-300 leading-loose">
                    String msg = <span className={`transition-colors ${age >= 18 ? 'text-green-400 font-bold' : 'text-slate-500'}`}>age &gt;= 18</span> ? <br/>
                    (<span className={`transition-colors ${age >= 18 ? (isVip ? 'text-green-400 font-bold' : 'text-slate-500') : 'text-slate-700'}`}>isVip</span> ? <span className={`text-purple-400 ${result === 'Free VIP Drink' ? 'bg-purple-500/20 underline' : ''}`}>"Free VIP Drink"</span> : <span className={`text-yellow-400 ${result === 'Pay $10' ? 'bg-yellow-500/20 underline' : ''}`}>"Pay $10"</span>) <br/>
                    : <span className={`text-red-400 ${result === 'Too Young' ? 'bg-red-500/20 underline' : ''}`}>"Too Young"</span>;
                </div>
            </div>
        </div>
    );
};

export default function JavaLecture5() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-orange-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Advanced Operators</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 5</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-6">Shortcuts & Rules of Engagement</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Beyond basic math, Java provides specialized unary and ternary operators to compress code. But when combining multiple operators, the JVM strictly follows the Precedence Table.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Deep Theory: Branch Prediction</h4>
                    <p className="text-slate-400 text-sm">While the Ternary operator shrinks code visually, it compiles to standard branching instructions just like an if-else. Deep down at the CPU level, your processor uses an algorithm called <strong>Branch Prediction</strong> to guess which path (true or false) will execute, pre-loading those instructions to save nanoseconds. If it guesses wrong, it flushes the pipeline (a massive performance hit in high-frequency trading apps).</p>
                </div>
<TernaryRouter />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    
                <div className="bg-[#161b22] border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Code size={20} className="text-orange-500" /> Mini-Challenge: Brain Teaser</h4>
                    <div className="font-mono text-sm mb-4">
                        <span className="text-orange-400">int</span> x = 5;<br/>
                        System.out.println(x++ + ++x);
                    </div>
                    <p className="text-slate-400 text-sm mb-4">Can you calculate the output?</p>
                    <details className="cursor-pointer group">
                        <summary className="text-orange-400 font-bold mb-2 outline-none">Reveal Answer</summary>
                        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded mt-2">
                            <strong>Output: 12</strong><br/>
                            1. <code className="text-orange-400">x++</code> evaluates to 5 (post-increment), then x becomes 6.<br/>
                            2. <code className="text-orange-400">++x</code> increments x to 7 (pre-increment), and evaluates to 7.<br/>
                            3. Final addition: 5 + 7 = 12.
                        </div>
                    </details>
                </div>
<PrecedenceArena />
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><UnaryTrap /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><CompoundAssignment /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><LogicalNotToggle /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><NestedTernary /></section>
            </div>
        </div>
    );
}
