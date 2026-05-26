"use client";

import React, { useState, useEffect } from 'react';
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
                            const isInclude = line.includes('#include');
                            const isUsing = line.includes('using namespace');
                            
                            return (
                                <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors whitespace-pre">
                                    <span className="text-slate-600 mr-4 select-none w-6 inline-block text-right">{i + 1}</span>
                                    <span className={isComment ? 'text-slate-500 italic' : isInclude ? 'text-purple-400' : isUsing ? 'text-orange-400' : line.includes('std::') ? 'text-blue-400' : ''}>
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

const ParadigmComparison = () => {
    const [mode, setMode] = useState<'procedural' | 'oop'>('oop');

    return (
        <div className="my-12 bg-slate-900/40 p-1 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="bg-slate-950 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6 border-b border-slate-800 pb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ArrowLeftRight size={24} className="text-orange-400" />
                        Paradigm Shift Visualizer
                    </h3>
                    <div className="flex bg-[#0f172a] p-1.5 rounded-xl border border-slate-800">
                        <button 
                            onClick={() => setMode('procedural')} 
                            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${mode === 'procedural' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Procedural (C-Style)
                        </button>
                        <button 
                            onClick={() => setMode('oop')} 
                            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${mode === 'oop' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Object-Oriented (C++)
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="flex flex-col h-full justify-center">
                        <div className="relative h-72 bg-[#0d1117] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                            {mode === 'procedural' ? (
                                <div className="z-10 animate-in fade-in zoom-in duration-500 flex flex-col items-center w-full">
                                    <p className="text-slate-300 text-center text-sm mb-8 font-medium bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">Top-Down Approach: Functions act on loose data.</p>
                                    <div className="flex items-center justify-between w-full max-w-sm px-4 relative">
                                        <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-orange-500/30 border-dashed"></div>
                                        <div className="flex flex-col gap-4 relative z-10">
                                            <div className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-xs text-slate-400 shadow-lg text-center font-mono">Global Data</div>
                                            <div className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-xs text-slate-400 shadow-lg text-center font-mono">Local Data</div>
                                        </div>
                                        <div className="flex flex-col items-center relative z-10">
                                            <ArrowRight className="text-orange-500 mb-4 animate-pulse" />
                                            <ArrowRight className="text-orange-500 animate-pulse" />
                                        </div>
                                        <div className="flex flex-col gap-2 relative z-10">
                                            <div className="px-6 py-2 bg-orange-500/20 border-2 border-orange-500 rounded-xl text-orange-400 font-bold shadow-[0_0_30px_rgba(249,115,22,0.2)] text-xs text-center">
                                                withdraw()
                                            </div>
                                            <div className="px-6 py-2 bg-orange-500/20 border-2 border-orange-500 rounded-xl text-orange-400 font-bold shadow-[0_0_30px_rgba(249,115,22,0.2)] text-xs text-center">
                                                deposit()
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="z-10 animate-in fade-in zoom-in duration-500 flex flex-col items-center w-full">
                                    <p className="text-slate-300 text-center text-sm mb-6 font-medium bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">Bottom-Up Approach: Data & Functions bound securely.</p>
                                    <div className="w-full max-w-xs bg-purple-900/20 border-2 border-purple-500/50 rounded-2xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute top-3 left-4 flex items-center gap-2">
                                            <Box size={14} className="text-purple-400" />
                                            <span className="text-xs text-purple-400 font-bold tracking-widest uppercase">Class: Account</span>
                                        </div>
                                        <div className="mt-8 flex flex-col gap-4 relative z-10">
                                            <div className="bg-slate-950 border border-red-500/30 px-4 py-3 rounded-lg text-xs text-slate-300 flex justify-between items-center">
                                                <span className="font-bold text-red-400">Private</span>
                                                <span className="font-mono text-slate-400">balance</span>
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="h-4 w-px bg-purple-500/50"></div>
                                            </div>
                                            <div className="bg-purple-600 px-4 py-3 rounded-lg text-xs text-white font-bold flex justify-between items-center shadow-lg">
                                                <span>Public</span>
                                                <span className="font-mono">withdraw(), deposit()</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <CodeBlock 
                            language="cpp" 
                            code={mode === 'procedural' 
                                ? `// C-Style Procedural Architecture\nint balance = 100; // Unsecured global data\n\n// Any part of the program can modify balance\n// directly, leading to severe security risks.\n\nvoid withdraw(int* bal, int amt) {\n    if (*bal >= amt) {\n        *bal -= amt;\n    }\n}\n\nint main() {\n    withdraw(&balance, 50);\n    \n    balance = -9999; // DANGER! Allowed!\n    return 0;\n}` 
                                : `// C++ Object-Oriented Architecture\nclass Account {\nprivate:\n    int balance = 100; // Secured hidden data\npublic:\n    void withdraw(int amt) {\n        if (balance >= amt) {\n            balance -= amt;\n        }\n    }\n};\n\nint main() {\n    Account myAcc;\n    myAcc.withdraw(50);\n    \n    // myAcc.balance = -9999; // ERROR! Compiler stops this!\n    return 0;\n}`
                            }
                            explanation={mode === 'procedural' ? "Procedural code relies on passing raw memory addresses (pointers) to functions. Since the data is separate from the function, it is completely exposed to malicious or accidental modification by other parts of the code." : "Object-Oriented code places an impenetrable shield (private) around sensitive data. The only way to interact with the balance is by requesting the object to run its authorized (public) methods. This is Data Hiding / Encapsulation."}
                        />
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-12 overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-900 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-lg">Feature</th>
                                <th className="px-6 py-4">Procedural Programming (C)</th>
                                <th className="px-6 py-4 rounded-tr-lg">Object-Oriented (C++)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-[#0f172a] border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">Approach</td>
                                <td className="px-6 py-4 text-orange-200">Top-down (Decompose main problem into functions)</td>
                                <td className="px-6 py-4 text-purple-200">Bottom-up (Build independent objects, then combine)</td>
                            </tr>
                            <tr className="bg-slate-900 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">Data Security</td>
                                <td className="px-6 py-4 text-orange-200">Poor. Data moves freely around the system.</td>
                                <td className="px-6 py-4 text-purple-200">Excellent. Data is hidden via access specifiers.</td>
                            </tr>
                            <tr className="bg-[#0f172a] hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-white rounded-bl-lg">Primary Focus</td>
                                <td className="px-6 py-4 text-orange-200">Functions / Algorithms (How to do it)</td>
                                <td className="px-6 py-4 text-purple-200 rounded-br-lg">Data / Objects (Who is doing it)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PillarsOfOOPInteractive = () => {
    const [activePillar, setActivePillar] = useState<'encap' | 'abstr' | 'inher' | 'poly'>('encap');

    const pillars = {
        encap: {
            title: 'Encapsulation',
            icon: Shield,
            color: 'text-blue-400',
            bg: 'bg-blue-500/20 border-blue-500/50',
            desc: 'Wrapping data and functions into a single unit (class). It restricts direct access to some components, preventing accidental modification.',
            analogy: 'A Capsule. The medicine inside is hidden and protected by the outer shell.',
            code: `class Vault {\nprivate:\n    int secretCode;\npublic:\n    void setCode(int code) {\n        secretCode = code;\n    }\n};`
        },
        abstr: {
            title: 'Abstraction',
            icon: EyeOff,
            color: 'text-purple-400',
            bg: 'bg-purple-500/20 border-purple-500/50',
            desc: 'Hiding complex implementation details and showing only the essential features of the object.',
            analogy: 'A Car Steering Wheel. You turn it to steer without needing to understand the rack and pinion mechanism underneath.',
            code: `class CoffeeMachine {\npublic:\n    void brew() {\n        grindBeans(); // Hidden complexity\n        heatWater();  // Hidden complexity\n    }\nprivate:\n    void grindBeans() { ... }\n    void heatWater() { ... }\n};`
        },
        inher: {
            title: 'Inheritance',
            icon: GitMerge,
            color: 'text-green-400',
            bg: 'bg-green-500/20 border-green-500/50',
            desc: 'Allowing a new class to absorb properties and methods of an existing class, promoting massive code reusability.',
            analogy: 'A Child and Parent. The child inherits genetics (properties) from the parent but can also develop unique traits.',
            code: `class Animal {\npublic: void eat() { ... }\n};\n\n// Dog inherits eat() from Animal\nclass Dog : public Animal {\npublic: void bark() { ... }\n};`
        },
        poly: {
            title: 'Polymorphism',
            icon: Shapes,
            color: 'text-orange-400',
            bg: 'bg-orange-500/20 border-orange-500/50',
            desc: 'The ability to call the same function name but execute different logic depending on the object invoking it.',
            analogy: 'A Smartphone. The "Play" button does different things if you are in a Music app vs a Video app.',
            code: `class Shape {\npublic: virtual void draw() { ... }\n};\n\nclass Circle : public Shape {\npublic: void draw() override { /* Draws Circle */ }\n};`
        }
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Box size={24} className="text-purple-400" />
                The 4 Pillars Explorer
            </h3>
            
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Tabs */}
                <div className="flex flex-col gap-3">
                    {(Object.keys(pillars) as Array<keyof typeof pillars>).map(key => {
                        const pillar = pillars[key];
                        const isActive = activePillar === key;
                        const Icon = pillar.icon;
                        
                        return (
                            <button
                                key={key}
                                onClick={() => setActivePillar(key)}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border text-left ${isActive ? `${pillar.bg} shadow-lg scale-[1.02]` : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-400'}`}
                            >
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-black/20' : 'bg-slate-900'} ${pillar.color}`}>
                                    <Icon size={20} />
                                </div>
                                <span className={`font-bold ${isActive ? 'text-white' : ''}`}>{pillar.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 h-full flex flex-col relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-12 opacity-5 ${pillars[activePillar].color}`}>
                            {React.createElement(pillars[activePillar].icon, { size: 120 })}
                        </div>
                        
                        <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h4 className={`text-3xl font-extrabold mb-4 ${pillars[activePillar].color}`}>
                                {pillars[activePillar].title}
                            </h4>
                            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                {pillars[activePillar].desc}
                            </p>
                            
                            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700/50 mb-6 flex items-start gap-4">
                                <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Real-World Analogy</span>
                                    <span className="text-slate-300 text-sm italic">{pillars[activePillar].analogy}</span>
                                </div>
                            </div>

                            <CodeBlock 
                                code={pillars[activePillar].code} 
                                language="cpp" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NamespaceSimulator = () => {
    const [fixed, setFixed] = useState(false);

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertTriangle size={24} className="text-yellow-400" />
                The Namespace Collision Simulator
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Imagine two libraries (Standard Library and Custom Math Library) both have a function called <code className="text-purple-400">print()</code>. 
                If you just call <code className="text-white">print()</code>, the compiler panics because it doesn't know which one you mean! Click below to fix the collision.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Visualizer */}
                <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[300px]">
                    {!fixed ? (
                        <div className="flex flex-col items-center animate-in zoom-in duration-300">
                            <div className="flex gap-12 mb-8">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">std</div>
                                    <span className="text-xs text-slate-500">print()</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold mb-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]">math</div>
                                    <span className="text-xs text-slate-500">print()</span>
                                </div>
                            </div>
                            
                            <MessageSquareWarning size={48} className="text-red-500 animate-bounce mb-4" />
                            <div className="text-center">
                                <span className="text-red-400 font-bold text-lg block">COMPILER ERROR!</span>
                                <span className="text-slate-400 text-xs">"Call to 'print' is ambiguous"</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center animate-in zoom-in duration-300 w-full px-4">
                            <div className="w-full bg-slate-900 rounded-lg p-4 mb-4 border border-blue-500/30 flex justify-between items-center relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                <span className="text-white font-mono text-sm">std::print()</span>
                                <CheckCircle size={20} className="text-blue-500" />
                            </div>
                            <div className="w-full bg-slate-900 rounded-lg p-4 border border-purple-500/30 flex justify-between items-center relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                                <span className="text-white font-mono text-sm">math::print()</span>
                                <CheckCircle size={20} className="text-purple-500" />
                            </div>
                            <div className="mt-8 text-green-400 font-bold text-center flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
                                <CheckCircle size={16} /> Conflict Resolved successfully
                            </div>
                        </div>
                    )}
                </div>

                {/* Code Panel */}
                <div className="flex flex-col justify-center">
                    <CodeBlock 
                        language="cpp"
                        code={!fixed ? `namespace std { void print() {} }\nnamespace math { void print() {} }\n\n// using namespace std;\n// using namespace math;\n\nint main() {\n    print(); // 🔥 ERROR HERE\n    return 0;\n}` : `namespace std { void print() {} }\nnamespace math { void print() {} }\n\nint main() {\n    std::print();  // ✅ Works\n    math::print(); // ✅ Works\n    return 0;\n}`}
                    />
                    <div className="mt-4 text-center">
                        <button 
                            onClick={() => setFixed(!fixed)}
                            className={`px-8 py-3 font-bold rounded-lg transition-all duration-300 shadow-lg ${!fixed ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/50' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/50'}`}
                        >
                            {!fixed ? "Resolve with Scope Resolution (::)" : "Break it again"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StreamInteractive = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="my-12 bg-slate-900/40 p-1 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-md">
            <div className="bg-slate-950 rounded-xl p-6 md:p-10">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                        <RefreshCw size={24} className="text-blue-400" /> C++ Stream Visualizer
                    </h3>
                    <p className="text-slate-400 text-sm">Visualize how data flows seamlessly between devices and memory.</p>
                </div>
                
                <div className="flex flex-col items-center justify-center relative mb-12">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl justify-between relative z-10">
                        
                        {/* Keyboard */}
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-5 rounded-2xl border-2 transition-all duration-500 ${step === 1 ? 'border-green-400 bg-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.3)] scale-110' : 'border-slate-700 bg-slate-900 shadow-lg'}`}>
                                <Keyboard size={40} className={step === 1 ? 'text-green-400' : 'text-slate-500'} />
                            </div>
                            <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${step === 1 ? 'text-green-400' : 'text-slate-500'}`}>Keyboard</span>
                        </div>

                        {/* Input Stream */}
                        <div className="flex flex-col items-center gap-2 flex-1 w-full md:w-auto h-20 md:h-auto justify-center">
                            <span className={`text-sm font-mono font-bold transition-all duration-300 ${step === 1 ? 'text-green-400 translate-y-0 opacity-100' : 'opacity-0 translate-y-4'}`}>cin &gt;&gt;</span>
                            <div className="h-2 w-1 w-full bg-slate-800 rounded-full overflow-hidden relative rotate-90 md:rotate-0">
                                {step === 1 && (
                                    <div className="absolute top-0 left-0 h-full bg-green-400 w-full animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_15px_rgba(74,222,128,1)]"></div>
                                )}
                            </div>
                        </div>

                        {/* Memory */}
                        <div className="flex flex-col items-center gap-3 z-20">
                            <div className={`w-32 h-32 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${step > 0 ? 'border-blue-400 bg-blue-500/10 shadow-[0_0_40px_rgba(96,165,250,0.2)]' : 'border-slate-700 bg-slate-900 shadow-lg'}`}>
                                <Box size={32} className={step > 0 ? 'text-blue-400 mb-2 animate-pulse' : 'text-slate-500 mb-2'} />
                                <span className="text-xs font-mono text-slate-400 mb-1">int age</span>
                                <span className={`font-mono font-bold text-3xl transition-all duration-700 ${step > 0 ? 'text-white scale-110' : 'text-transparent scale-50'}`}>25</span>
                            </div>
                            <span className="text-xs text-blue-400 font-bold tracking-widest uppercase">RAM / Memory</span>
                        </div>

                        {/* Output Stream */}
                        <div className="flex flex-col items-center gap-2 flex-1 w-full md:w-auto h-20 md:h-auto justify-center">
                            <span className={`text-sm font-mono font-bold transition-all duration-300 ${step === 2 ? 'text-orange-400 translate-y-0 opacity-100' : 'opacity-0 translate-y-4'}`}>cout &lt;&lt;</span>
                            <div className="h-2 w-1 w-full bg-slate-800 rounded-full overflow-hidden relative rotate-90 md:rotate-0">
                                {step === 2 && (
                                    <div className="absolute top-0 left-0 h-full bg-orange-400 w-full animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_15px_rgba(251,146,60,1)]"></div>
                                )}
                            </div>
                        </div>

                        {/* Monitor */}
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-5 rounded-2xl border-2 transition-all duration-500 ${step === 2 ? 'border-orange-400 bg-orange-500/20 shadow-[0_0_30px_rgba(251,146,60,0.3)] scale-110' : 'border-slate-700 bg-slate-900 shadow-lg'}`}>
                                <Monitor size={40} className={step === 2 ? 'text-orange-400' : 'text-slate-500'} />
                            </div>
                            <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${step === 2 ? 'text-orange-400' : 'text-slate-500'}`}>Screen</span>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                    <button 
                        onClick={() => setStep(1)} 
                        className={`flex-1 flex items-center justify-center gap-2 font-mono text-sm px-6 py-4 rounded-xl border-2 transition-all duration-300 ${step === 1 ? 'bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-green-500/50 hover:text-green-400'}`}
                    >
                        <Keyboard size={16} /> cin &gt;&gt; age;
                    </button>
                    <button 
                        onClick={() => setStep(2)} 
                        className={`flex-1 flex items-center justify-center gap-2 font-mono text-sm px-6 py-4 rounded-xl border-2 transition-all duration-300 ${step === 2 ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-orange-500/50 hover:text-orange-400'}`}
                    >
                        cout &lt;&lt; age; <Monitor size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const CinVsGetlineVisualizer = () => {
    const [action, setAction] = useState<'none' | 'cin' | 'getline'>('none');

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <UserCircle2 size={24} className="text-green-400" />
                The String Space Dilemma
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Watch what happens when a user types a full name containing spaces.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Visualizer */}
                <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-full max-w-sm">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Keyboard Input Buffer</span>
                            <div className="bg-slate-900 border-2 border-slate-700 p-3 rounded-lg font-mono text-white text-lg tracking-widest text-center shadow-inner">
                                J o h n &nbsp; D o e \n
                            </div>
                        </div>

                        <div className="flex justify-center my-6">
                            <ArrowRight size={24} className="text-slate-600 rotate-90" />
                        </div>

                        <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block text-center">Variable: string name;</span>
                            
                            {action === 'none' && (
                                <div className="bg-slate-900 border-2 border-slate-700 p-4 rounded-lg flex items-center justify-center min-h-[60px]">
                                    <span className="text-slate-600 italic text-sm">Empty Memory</span>
                                </div>
                            )}

                            {action === 'cin' && (
                                <div className="bg-red-500/10 border-2 border-red-500/50 p-4 rounded-lg flex flex-col items-center justify-center min-h-[60px] animate-in zoom-in">
                                    <span className="font-mono text-white text-xl font-bold">John</span>
                                    <span className="text-red-400 text-xs mt-2 text-center bg-red-950 px-2 py-1 rounded">" Doe" is left stuck in the buffer!</span>
                                </div>
                            )}

                            {action === 'getline' && (
                                <div className="bg-green-500/10 border-2 border-green-500/50 p-4 rounded-lg flex flex-col items-center justify-center min-h-[60px] animate-in zoom-in">
                                    <span className="font-mono text-white text-xl font-bold">John Doe</span>
                                    <span className="text-green-400 text-xs mt-2 text-center bg-green-950 px-2 py-1 rounded">Perfect! Read until '\n'</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col justify-center gap-4">
                    <button 
                        onClick={() => setAction('cin')}
                        className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${action === 'cin' ? 'bg-red-500/10 border-red-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                    >
                        <code className="text-red-400 font-bold mb-1">cin &gt;&gt; name;</code>
                        <span className="text-sm text-slate-400">Stops reading at the first whitespace. Fails for full names.</span>
                    </button>

                    <button 
                        onClick={() => setAction('getline')}
                        className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${action === 'getline' ? 'bg-green-500/10 border-green-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                    >
                        <code className="text-green-400 font-bold mb-1">getline(cin, name);</code>
                        <span className="text-sm text-slate-400">Reads the entire line until the user hits Enter (newline).</span>
                    </button>
                    
                    <button 
                        onClick={() => setAction('none')}
                        className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest font-bold"
                    >
                        Reset Buffer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function CppLecture1() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src="/cpp/logo.png" alt="C-Units Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"  style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Intro to OOP & Basic I/O</h1>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 1</p>
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
                    <Terminal size={14} /> System-Level Mastery
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8 leading-[1.1] tracking-tight">
                    A New Paradigm <br/>of Programming
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-light">
                    Created by <strong>Bjarne Stroustrup</strong> in 1979 at Bell Labs, C++ was originally named <em>"C with Classes"</em>. It extends C with powerful Object-Oriented features, providing the mechanisms to manage complexity in massive codebases.
                </p>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Server size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">High Performance</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Retains the raw memory access and extreme speed of C. It powers major game engines (Unreal Engine), high-frequency trading servers, and operating systems.</p>
                    </div>
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Box size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Object-Oriented</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Introduces Classes and Objects, allowing developers to model real-world entities directly in code via Encapsulation, Inheritance, and Polymorphism.</p>
                    </div>
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-4 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Multi-Paradigm</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Unlike strict OOP languages like Java, C++ allows you to mix procedural, object-oriented, and generic (template) programming in the same file.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                        <History size={28} className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Procedural vs Object-Oriented</h2>
                </div>

                <ParadigmComparison />

                {/* NEW INTERACTIVE COMPONENT */}
                <PillarsOfOOPInteractive />

                <div className="h-12"></div>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-16">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Terminal size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Standard Input and Output</h2>
                </div>

                <TheoryCard title="The iostream library and std namespace" icon={<Code size={20} />} variant="blue">
                    <p className="text-base mb-4">Instead of relying on <code>stdio.h</code> and format specifiers like <code>%d</code> and <code>%f</code>, C++ introduces the highly robust <code>&lt;iostream&gt;</code> header.</p>
                    
                    <h4 className="font-bold text-white mt-6 mb-2">What is a Namespace?</h4>
                    <p className="text-base text-slate-400 mb-4">When writing massive applications, different libraries might use the exact same variable or function names. A namespace defines a declarative region that provides a scope to the identifiers inside it, preventing naming collisions. All C++ standard library features are stored inside the <code>std</code> namespace.</p>
                </TheoryCard>

                {/* NEW INTERACTIVE COMPONENT */}
                <NamespaceSimulator />

                <CodeBlock 
                    title="Basic I/O Program"
                    code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    float height;\n    \n    cout << "Enter age and height: ";\n    // Cascading input: reading multiple variables at once\n    cin >> age >> height;\n    \n    // Cascading output\n    cout << "You are " << age << " years old.\\n";\n    cout << "Height: " << height << endl;\n    \n    return 0;\n}`}
                    explanation="Notice we don't need &age or %d anymore! The compiler automatically infers the data types passing through the stream operators based on function overloading.\n\nAlso note 'Cascading': You can chain << and >> operators to process multiple variables in a single line."
                />

                <StreamInteractive />

                <TheoryCard title="Stream Architecture Deep Dive" icon={<Layers size={20} />} variant="orange">
                    <p className="text-base mb-4">In C++, I/O operations are based on <strong>streams</strong>—a logical sequence of bytes flowing in or out of the program.</p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-green-500/20 p-2 rounded text-green-400 shrink-0"><ArrowRight size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">cin (Console Input)</strong>
                                <span className="text-slate-400 text-sm">An object of the <code>istream</code> class. Uses the Extraction Operator <code>&gt;&gt;</code> to pull data from the keyboard buffer into variables. Note: <code>cin</code> stops reading when it encounters whitespace (space, tab, or newline).</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-orange-500/20 p-2 rounded text-orange-400 shrink-0"><ArrowRight size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">cout (Console Output)</strong>
                                <span className="text-slate-400 text-sm">An object of the <code>ostream</code> class. Uses the Insertion Operator <code>&lt;&lt;</code> to push data from variables into the display buffer.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-red-500/20 p-2 rounded text-red-400 shrink-0"><AlertTriangle size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">cerr and clog</strong>
                                <span className="text-slate-400 text-sm"><code>cerr</code> is the standard error stream (unbuffered, prints immediately). <code>clog</code> is the standard logging stream (buffered). Both output to the monitor but are used to separate normal logs from critical errors.</span>
                            </div>
                        </li>
                    </ul>
                </TheoryCard>

                <div className="h-12"></div>
                
                {/* NEW INTERACTIVE COMPONENT */}
                <CinVsGetlineVisualizer />
                
            </section>
            </div>
        </div>
    );
}
