"use client";

import React, { useState } from 'react';
import {
    Terminal, Code, Play, Layers, Globe, Zap, LayoutGrid, Info, Server,
    Shield, Shapes, Lock, Database, Coffee, Sun, Moon, ArrowRight, ArrowDown,
    Unlock, Eye, EyeOff
} from 'lucide-react';

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

// --- INTERACTIVE 1: Type Casting Crucible ---
const TypeCastingCrucible = () => {
    const [inputValue, setInputValue] = useState<number>(3.14159);
    
    // Narrowing
    const toInt = Math.trunc(inputValue);
    const toByte = inputValue > 127 ? 127 : inputValue < -128 ? -128 : Math.trunc(inputValue);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Type Casting Crucible (Narrowing Data Loss)</h3>
            
            <div className="flex flex-col gap-6 items-center">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl w-full max-w-lg text-center shadow-inner">
                    <p className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Source (double - 64 bit)</p>
                    <input 
                        type="number" 
                        step="0.00001"
                        value={inputValue}
                        onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                        className="bg-black border border-orange-500/50 text-orange-400 text-3xl font-bold text-center w-full py-4 rounded-lg focus:border-orange-400 outline-none transition-all shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                    />
                </div>

                <div className="flex gap-12 w-full justify-center">
                    <div className="flex flex-col items-center">
                        <ArrowDown size={32} className="text-slate-600 mb-2" />
                        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-48 text-center transition-all hover:border-blue-500/50 group">
                            <p className="text-slate-400 text-xs mb-2 font-bold uppercase">Target (int - 32 bit)</p>
                            <p className="text-blue-400 text-3xl font-mono font-bold group-hover:scale-110 transition-transform">{toInt}</p>
                            <p className="text-red-400 text-xs mt-2 opacity-80">(Decimals truncated)</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <ArrowDown size={32} className="text-slate-600 mb-2" />
                        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-48 text-center transition-all hover:border-red-500/50 group">
                            <p className="text-slate-400 text-xs mb-2 font-bold uppercase">Target (byte - 8 bit)</p>
                            <p className="text-red-400 text-3xl font-mono font-bold group-hover:scale-110 transition-transform">{toByte}</p>
                            <p className="text-red-400 text-xs mt-2 opacity-80">(Overflow clamped)</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-red-400 mt-4 max-w-lg text-sm text-center">
                    <Shield size={16} className="inline mr-2 -mt-1" />
                    <strong>Explicit Casting Required:</strong> Java blocks narrowing conversions automatically to prevent this exact data loss. You must cast explicitly: <code>(int) 3.14</code>.
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE 2: Access Modifier Vault ---
const AccessModifierVault = () => {
    const [modifier, setModifier] = useState<'public' | 'protected' | 'default' | 'private'>('private');

    const rules = {
        public: { class: true, pkg: true, sub: true, world: true, color: 'text-green-400', border: 'border-green-500' },
        protected: { class: true, pkg: true, sub: true, world: false, color: 'text-yellow-400', border: 'border-yellow-500' },
        default: { class: true, pkg: true, sub: false, world: false, color: 'text-blue-400', border: 'border-blue-500' },
        private: { class: true, pkg: false, sub: false, world: false, color: 'text-red-400', border: 'border-red-500' },
    };

    const Status = ({ allowed }: { allowed: boolean }) => (
        allowed 
        ? <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><Unlock size={20} /></div> 
        : <div className="p-2 bg-red-500/20 text-red-400 rounded-lg"><Lock size={20} /></div>
    );

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Access Modifier Vault</h3>
            
            <div className="flex gap-4 mb-8 justify-center">
                {(['public', 'protected', 'default', 'private'] as const).map(m => (
                    <button
                        key={m}
                        onClick={() => setModifier(m)}
                        className={`px-6 py-2 rounded-lg font-bold font-mono transition-all border-2 ${modifier === m ? `${rules[m].border} bg-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white` : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                        {m === 'default' ? '(no modifier)' : m}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`bg-[#161b22] border p-6 rounded-xl flex flex-col items-center gap-4 transition-colors ${rules[modifier].class ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-red-500/50'}`}>
                    <h4 className="font-bold text-slate-300">Same Class</h4>
                    <Status allowed={rules[modifier].class} />
                </div>
                <div className={`bg-[#161b22] border p-6 rounded-xl flex flex-col items-center gap-4 transition-colors ${rules[modifier].pkg ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-red-500/50'}`}>
                    <h4 className="font-bold text-slate-300">Same Package</h4>
                    <Status allowed={rules[modifier].pkg} />
                </div>
                <div className={`bg-[#161b22] border p-6 rounded-xl flex flex-col items-center gap-4 transition-colors ${rules[modifier].sub ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-red-500/50'}`}>
                    <h4 className="font-bold text-slate-300">Subclass</h4>
                    <Status allowed={rules[modifier].sub} />
                </div>
                <div className={`bg-[#161b22] border p-6 rounded-xl flex flex-col items-center gap-4 transition-colors ${rules[modifier].world ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-red-500/50'}`}>
                    <h4 className="font-bold text-slate-300">World</h4>
                    <Status allowed={rules[modifier].world} />
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 3: Autoboxing Sandbox ---
const AutoboxingSandbox = () => {
    const [primitive, setPrimitive] = useState(42);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Autoboxing & Unboxing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800">
                    <div className="text-orange-400 font-bold mb-2">Primitive Stack (int)</div>
                    <input type="number" value={primitive} onChange={(e) => setPrimitive(Number(e.target.value))} className="bg-black text-white p-2 rounded w-full border border-slate-700" />
                    <div className="mt-4 text-xs text-slate-500">Fast, lives on stack. No methods.</div>
                </div>
                <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800 flex flex-col justify-center items-center">
                    <div className="text-blue-400 font-bold mb-2">Wrapper Heap Object (Integer)</div>
                    <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-xl text-blue-300 font-mono text-2xl w-full text-center">
                        {primitive}
                    </div>
                    <div className="mt-4 text-xs text-slate-500 text-center">JVM automatically 'boxes' the primitive into an Object when added to Collections (like ArrayList).</div>
                </div>
            </div>
        </div>
    );
};


// --- INTERACTIVE 4: String Pool Visualizer ---
const StringPoolVisualizer = () => {
    const [creation, setCreation] = useState<'literal'|'new'>('literal');
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">String Constant Pool vs Heap</h3>
            <div className="flex gap-4 mb-6">
                <button onClick={() => setCreation('literal')} className={`px-4 py-2 rounded-lg font-bold border-2 ${creation === 'literal' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>Literal (String s = "Java")</button>
                <button onClick={() => setCreation('new')} className={`px-4 py-2 rounded-lg font-bold border-2 ${creation === 'new' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>Object (new String("Java"))</button>
            </div>
            <div className="grid grid-cols-2 gap-8 font-mono">
                <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl">
                    <h4 className="text-slate-500 uppercase font-bold text-xs mb-4">String Pool (Special Memory)</h4>
                    <div className="p-4 border border-green-500/50 bg-green-500/10 text-green-400 rounded text-center">
                        "Java"
                    </div>
                </div>
                <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl">
                    <h4 className="text-slate-500 uppercase font-bold text-xs mb-4">General Heap Memory</h4>
                    {creation === 'new' ? (
                        <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-400 rounded text-center">
                            new Object("Java")
                        </div>
                    ) : (
                        <div className="p-4 border border-slate-700 text-slate-600 rounded text-center border-dashed">
                            Empty
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-6 text-slate-400 text-sm p-4 bg-black border border-slate-800 rounded-lg">
                {creation === 'literal' ? 'Literals are highly optimized. Java checks the String Pool first. If "Java" exists, it reuses the exact same memory address. This makes == work reliably.' : 'Using the new keyword forces Java to bypass the String Pool and allocate brand new memory on the heap. Using == will fail because memory addresses differ. Use .equals() instead!'}
            </div>
        </div>
    );
};


// --- INTERACTIVE 5: Identifier Validator ---
const IdentifierValidator = () => {
    const [name, setName] = useState("myVariable_1");
    const isValid = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(name) && !['class', 'public', 'static', 'void'].includes(name);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Identifier Rules (Variable Naming)</h3>
            <p className="text-slate-400 mb-6">Java variables must start with a letter, $, or _. They cannot start with a number, contain spaces, or use reserved keywords (like 'class').</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex items-center gap-4">
                <span className="text-orange-400 font-bold font-mono">int</span>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="bg-black border border-slate-700 rounded p-3 flex-1 text-white font-mono focus:border-orange-500 outline-none" 
                    placeholder="Enter variable name..." 
                />
                <span className="text-slate-500 font-bold font-mono">= 10;</span>
            </div>
            
            <div className={`mt-4 p-4 rounded-xl border font-bold text-center ${name.length===0 ? 'bg-slate-900 border-slate-800 text-slate-500' : isValid ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}>
                {name.length === 0 ? 'Start typing...' : isValid ? 'Valid Identifier! Compilation Success.' : 'Invalid Identifier! Compilation Failed.'}
            </div>
        </div>
    );
};


// --- INTERACTIVE 6: Integer Overflow Simulator ---
const OverflowSimulator = () => {
    const [val, setVal] = useState(125);
    // Simulate byte overflow
    const simulatedByte = (val > 127) ? -128 + (val - 128) : val;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Overflow Trap (Ring Buffer)</h3>
            <p className="text-slate-400 mb-6">Primitive types are fixed in size. A <code className="text-orange-400">byte</code> maxes out at 127. If you forcefully add 1 to it, it doesn't crash—it wraps around to the lowest possible negative number (-128)!</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center gap-8">
                <div className="flex items-center gap-6">
                    <button onClick={() => setVal(v => v - 1)} className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-xl hover:bg-slate-700">-</button>
                    <div className="text-4xl font-mono font-bold text-orange-400 w-24 text-center">{val}</div>
                    <button onClick={() => setVal(v => v + 1)} className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-xl hover:bg-slate-700">+</button>
                </div>
                
                <div className="w-full max-w-md h-4 bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300" style={{ width: `${(val / 130) * 100}%`}}></div>
                </div>

                <div className="flex gap-8 font-mono text-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-xs mb-1">Theoretical int</span>
                        <span className="text-white font-bold">{val}</span>
                    </div>
                    <div className="text-slate-600 font-bold">vs</div>
                    <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-xs mb-1">Actual (byte)myNum</span>
                        <span className={`font-bold ${simulatedByte < 0 ? 'text-red-500' : 'text-green-400'}`}>{simulatedByte}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function JavaLecture3() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-orange-500/30">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/java/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base">Data In the Cart</h1>
                            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 3</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLightMode(!isLightMode)} className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }}>
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-6">Variables & Encapsulation</h2>
                    <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">Java is strictly typed. You must declare exactly what data is in the cart, and securely wrap it using Access Modifiers to prevent unauthorized mutation.</p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    
                <div className="bg-[#161b22] border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Zap size={20} className="text-red-500" /> Mini-Challenge: The Byte Barrier</h4>
                    <div className="font-mono text-sm mb-4">
                        <span className="text-blue-400">byte</span> myNum = <span className="text-orange-400">128</span>;<br/>
                        System.out.println(myNum);
                    </div>
                    <p className="text-slate-400 text-sm mb-4">What happens when you compile this code?</p>
                    <details className="cursor-pointer group">
                        <summary className="text-orange-400 font-bold mb-2 outline-none">Reveal Answer</summary>
                        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded">
                            <strong>Compilation Error!</strong> A byte is 8 bits and strictly limited to values between -128 and 127. The compiler detects that 128 exceeds the maximum boundary and refuses to build.
                        </div>
                    </details>
                </div>
<TypeCastingCrucible />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Encapsulation Shield</h2>
                    <p className="text-slate-400 mb-8">Access modifiers control the visibility of variables and methods. This is the foundation of Object-Oriented Encapsulation.</p>
                    <AccessModifierVault />
                </section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><AutoboxingSandbox /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Deep Theory: String Immutability</h4>
                    <p className="text-slate-400 text-sm">Strings in Java are <strong>immutable</strong>. Once a String object is created in memory, its value can NEVER be changed. If you try to concatenate a string (e.g., <code className="text-orange-400">s = s + " World"</code>), Java does not modify the original string; it creates an entirely new String object in the heap. This makes Strings incredibly thread-safe but requires the String Constant Pool to prevent memory bloat.</p>
                </div>
<StringPoolVisualizer /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><IdentifierValidator /></section>
<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><OverflowSimulator /></section>
            </div>
        </div>
    );
}
