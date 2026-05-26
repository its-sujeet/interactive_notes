"use client";

import React, { useState } from 'react';
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
    Lock,
    Unlock,
    Key,
    Database,
    Car,
    Factory,
    Network,
    Plus,
    Minus,
    Calculator,
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
                            const isClass = line.includes('class ');
                            const isPublicPrivate = line.includes('public:') || line.includes('private:');
                            
                            return (
                                <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors whitespace-pre">
                                    <span className="text-slate-600 mr-4 select-none w-6 inline-block text-right">{i + 1}</span>
                                    <span className={isComment ? 'text-slate-500 italic' : isClass ? 'text-purple-400 font-bold' : isPublicPrivate ? 'text-orange-400 font-bold' : line.includes('std::') ? 'text-blue-400' : ''}>
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

const ClassBlueprintSimulator = () => {
    const [cars, setCars] = useState<any[]>([]);

    const createCar = (color: string, speed: number) => {
        if(cars.length >= 3) return;
        setCars([...cars, { id: cars.length + 1, color, speed }]);
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Factory size={24} className="text-blue-400" />
                The Factory Simulator (Class vs Object)
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                A <strong>Class</strong> is just a blueprint. It takes up no memory until you use it to instantiate an <strong>Object</strong>. Click the buttons to spawn objects from the <code>Car</code> class blueprint.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Blueprint / Class */}
                <div className="bg-blue-900/10 border-2 border-blue-500/30 border-dashed rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Blueprint</div>
                    <div className="flex items-center gap-3 mb-6 border-b border-blue-500/20 pb-4">
                        <Code size={24} className="text-blue-400" />
                        <h4 className="text-lg font-bold text-white font-mono">class Car</h4>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm font-mono text-slate-300">
                            <span className="text-orange-400">string</span> color;
                        </div>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm font-mono text-slate-300">
                            <span className="text-orange-400">int</span> speed;
                        </div>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm font-mono text-slate-300">
                            <span className="text-purple-400">void</span> drive();
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button 
                            onClick={() => createCar('Red', 120)}
                            disabled={cars.length >= 3}
                            className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors shadow-lg text-sm"
                        >
                            Instantiate Red
                        </button>
                        <button 
                            onClick={() => createCar('Green', 90)}
                            disabled={cars.length >= 3}
                            className="flex-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors shadow-lg text-sm"
                        >
                            Instantiate Green
                        </button>
                    </div>
                </div>

                {/* RAM / Objects */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 relative min-h-[300px]">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Memory (RAM)</div>
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Database size={24} className="text-slate-400" />
                        <h4 className="text-lg font-bold text-white">Instantiated Objects</h4>
                    </div>

                    <div className="flex flex-col gap-4">
                        {cars.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-600">
                                <Box size={48} className="mb-4 opacity-50" />
                                <p className="text-sm font-bold uppercase tracking-widest">No Objects in Memory</p>
                            </div>
                        )}
                        
                        {cars.map((car, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex items-center gap-4 animate-in slide-in-from-left-4 fade-in">
                                <div className={`p-3 rounded-lg ${car.color === 'Red' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                    <Car size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Car Object {car.id}</div>
                                    <div className="flex gap-4">
                                        <div className="text-sm font-mono text-slate-300">color = "{car.color}"</div>
                                        <div className="text-sm font-mono text-slate-300">speed = {car.speed}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {cars.length > 0 && (
                        <button 
                            onClick={() => setCars([])}
                            className="absolute bottom-4 right-4 text-xs text-slate-500 hover:text-white transition-colors"
                        >
                            [ Clear Memory ]
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SizeOfSimulator = () => {
    const [members, setMembers] = useState<{type: string, name: string, size: number}[]>([]);

    const addMember = (type: string, size: number) => {
        setMembers([...members, { type, name: `var${members.length + 1}`, size }]);
    };

    const clearMembers = () => setMembers([]);

    const totalBytes = members.reduce((sum, m) => sum + m.size, 0) || 1; // Empty class is 1 byte in C++

    return (
        <div className="my-12 p-6 md:p-8 bg-[#0f172a] rounded-2xl border border-blue-900/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Calculator size={24} className="text-blue-400" />
                Memory Allocation (sizeof)
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Add data members to the class blueprint and observe how much memory an instantiated object will consume. 
                <em> Note: Member functions (methods) take 0 bytes per object because they are shared!</em>
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Editor */}
                <div>
                    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden mb-6">
                        <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                            <span className="font-mono text-sm text-blue-300">class MyClass {'{'}</span>
                            <button onClick={clearMembers} className="text-xs text-slate-500 hover:text-red-400"><RefreshCw size={14}/></button>
                        </div>
                        <div className="p-4 space-y-2 min-h-[150px]">
                            {members.map((m, i) => (
                                <div key={i} className="font-mono text-sm pl-4 flex items-center justify-between group">
                                    <span><span className="text-purple-400">{m.type}</span> <span className="text-slate-300">{m.name};</span></span>
                                    <span className="text-xs text-slate-600 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{m.size} bytes</span>
                                </div>
                            ))}
                            {members.length === 0 && <div className="text-slate-600 italic text-sm pl-4">// Empty class</div>}
                            <div className="font-mono text-sm text-green-400 pl-4 mt-4">// Methods take 0 bytes</div>
                            <div className="font-mono text-sm text-green-400 pl-4">void doSomething() {'{}'}</div>
                        </div>
                        <div className="bg-slate-800/50 px-4 py-2 border-t border-slate-700">
                            <span className="font-mono text-sm text-blue-300">{'};'}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => addMember('int', 4)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-lg py-2 text-xs font-bold transition-colors">
                            + Add int (4b)
                        </button>
                        <button onClick={() => addMember('double', 8)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-lg py-2 text-xs font-bold transition-colors">
                            + Add double (8b)
                        </button>
                        <button onClick={() => addMember('char', 1)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-lg py-2 text-xs font-bold transition-colors">
                            + Add char (1b)
                        </button>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="flex flex-col items-center justify-center bg-slate-950 rounded-xl border border-slate-800 p-8 relative">
                    <div className="text-center mb-6">
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Object Size in RAM</div>
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500">
                            {totalBytes} <span className="text-2xl text-slate-600">bytes</span>
                        </div>
                        {members.length === 0 && (
                            <div className="mt-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full inline-block">
                                Empty classes are 1 byte in C++ to guarantee a unique memory address!
                            </div>
                        )}
                    </div>

                    <div className="w-full bg-slate-900 rounded-lg border border-slate-700 overflow-hidden flex h-12 shadow-inner">
                        {members.length === 0 ? (
                            <div className="w-full bg-slate-800/50 flex items-center justify-center text-xs text-slate-500">1 byte placeholder</div>
                        ) : (
                            members.map((m, i) => (
                                <div 
                                    key={i} 
                                    style={{ width: `${(m.size / totalBytes) * 100}%` }}
                                    className={`h-full border-r border-slate-950 flex items-center justify-center text-[10px] font-bold text-white shadow-inner ${
                                        m.type === 'int' ? 'bg-blue-600' : m.type === 'double' ? 'bg-purple-600' : 'bg-green-600'
                                    }`}
                                    title={`${m.type} ${m.name} (${m.size} bytes)`}
                                >
                                    {m.size > 2 && m.name}
                                </div>
                            ))
                        )}
                    </div>
                    <p className="mt-4 text-xs text-slate-500 text-center">
                        Every single object you instantiate will consume this much memory. A fleet of 1,000 objects = {totalBytes * 1000} bytes.
                    </p>
                </div>
            </div>
        </div>
    );
};

const ArrayOfObjectsSimulator = () => {
    const [arraySize, setArraySize] = useState(3);
    const maxSize = 8;

    return (
        <div className="my-12 p-6 md:p-8 bg-orange-950/20 rounded-2xl border border-orange-900/30 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <LayoutGrid size={24} className="text-orange-400" />
                Array of Objects Visualizer
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                When you create an array of objects, C++ allocates contiguous memory for them. Modify the array size below to see how memory scales instantly.
            </p>

            <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-8">
                <div className="font-mono text-sm md:text-base text-slate-300 flex-1 text-center md:text-left">
                    <span className="text-purple-400">Car</span> dealership[<span className="text-orange-400 font-bold">{arraySize}</span>];
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setArraySize(Math.max(1, arraySize - 1))}
                        className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg border border-slate-700 transition-colors"
                    >
                        <Minus size={20} />
                    </button>
                    <button 
                        onClick={() => setArraySize(Math.min(maxSize, arraySize + 1))}
                        className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg border border-slate-700 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto pb-4">
                <div className="flex gap-2 min-w-max">
                    {Array.from({ length: arraySize }).map((_, i) => (
                        <div key={i} className="bg-[#0f172a] border border-orange-500/30 rounded-xl p-4 w-32 flex flex-col items-center animate-in zoom-in duration-300">
                            <div className="text-xs text-slate-500 font-mono mb-3 bg-slate-900 px-2 py-1 rounded w-full text-center border border-slate-800">
                                index [{i}]
                            </div>
                            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 mb-3 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                                <Car size={24} />
                            </div>
                            <div className="w-full space-y-2">
                                <div className="h-2 bg-slate-800 rounded w-full"></div>
                                <div className="h-2 bg-slate-800 rounded w-4/5 mx-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-between text-xs font-mono text-slate-500 px-4">
                    <span>Memory Address: 0x1000</span>
                    <span>Contiguous Memory Block</span>
                    <span>Address: 0x10{arraySize * 2}0</span>
                </div>
            </div>
        </div>
    );
};

const AccessModifierVisualizer = () => {
    const [hackerPos, setHackerPos] = useState<'outside' | 'inside'>('outside');
    const [attempt, setAttempt] = useState<string | null>(null);

    const tryAccess = (type: 'public' | 'private') => {
        setAttempt(type);
        setTimeout(() => setAttempt(null), 2000);
    };

    return (
        <div className="my-12 p-6 md:p-8 bg-slate-900/60 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Shield size={24} className="text-purple-400" />
                Access Modifiers Simulator
            </h3>
            <p className="text-slate-400 mb-8 max-w-3xl text-sm leading-relaxed">
                By default, everything in a C++ class is <strong>Private</strong>. This enforces Encapsulation. Try accessing the data from `main()` (outside the class).
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Security Box */}
                <div className="flex-1 relative bg-slate-950 border-2 border-slate-800 rounded-2xl p-8 overflow-hidden min-h-[300px]">
                    <div className="absolute top-4 left-4 font-bold text-slate-500 uppercase tracking-widest text-xs">Class Body</div>
                    
                    {/* Private Zone */}
                    <div className={`mt-8 border-2 ${attempt === 'private' ? 'border-red-500 bg-red-500/10' : 'border-red-900/30 bg-red-950/20'} rounded-xl p-6 relative transition-colors duration-300`}>
                        <div className="absolute -top-3 left-4 bg-slate-950 px-2 flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
                            <Lock size={12} /> Private Sector
                        </div>
                        <div className="text-center font-mono text-white text-lg mt-2">
                            int bankBalance = 10000;
                        </div>
                        {attempt === 'private' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-950/80 backdrop-blur-sm animate-in zoom-in">
                                <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-full shadow-lg shadow-red-500/50 flex items-center gap-2">
                                    <AlertTriangle size={16}/> ACCESS DENIED
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Public Zone */}
                    <div className={`mt-8 border-2 ${attempt === 'public' ? 'border-green-500 bg-green-500/10' : 'border-green-900/30 bg-green-950/20'} rounded-xl p-6 relative transition-colors duration-300`}>
                        <div className="absolute -top-3 left-4 bg-slate-950 px-2 flex items-center gap-2 text-green-400 text-xs font-bold uppercase">
                            <Unlock size={12} /> Public Sector
                        </div>
                        <div className="text-center font-mono text-white text-lg mt-2">
                            void checkBalance()
                        </div>
                        {attempt === 'public' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-950/80 backdrop-blur-sm animate-in zoom-in">
                                <span className="bg-green-600 text-white font-bold px-4 py-2 rounded-full shadow-lg shadow-green-500/50 flex items-center gap-2">
                                    <CheckCircle size={16}/> ACCESS GRANTED
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Function Controls */}
                <div className="w-full md:w-64 bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col justify-center">
                    <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                        <Terminal size={16} /> int main()
                    </h4>
                    
                    <button 
                        onClick={() => tryAccess('private')}
                        className="bg-slate-900 border border-slate-700 hover:border-red-500 hover:text-red-400 text-slate-300 font-mono text-sm p-4 rounded-lg mb-4 transition-all text-left group"
                    >
                        myObj.<span className="text-red-400 group-hover:underline">bankBalance</span>;
                    </button>

                    <button 
                        onClick={() => tryAccess('public')}
                        className="bg-slate-900 border border-slate-700 hover:border-green-500 hover:text-green-400 text-slate-300 font-mono text-sm p-4 rounded-lg transition-all text-left group"
                    >
                        myObj.<span className="text-green-400 group-hover:underline">checkBalance()</span>;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function CppLecture2() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src="/cpp/logo.png" alt="C-Units Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"  style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Classes and Objects</h1>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Unit 1 • Lecture 2</p>
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
                    <Box size={14} /> Object-Oriented Core
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white mb-8 leading-[1.1] tracking-tight">
                    The Blueprint <br/>of Reality
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-light">
                    In C++, a <strong>Class</strong> is a user-defined data type that acts as a blueprint. An <strong>Object</strong> is the physical manifestation of that blueprint in your computer's memory. This is the cornerstone of building massive, scalable applications.
                </p>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Code size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Class (The Blueprint)</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Declared using the <code>class</code> keyword. It consumes exactly 0 bytes of memory because it is purely a definition of what data and methods will exist. You can think of it as a custom data type.</p>
                    </div>
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Box size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Object (The Instance)</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Created from a class. Once instantiated, the operating system allocates actual RAM for the object's variables. You can create millions of objects from a single class blueprint.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Server size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Member Variables and Memory</h2>
                </div>

                <TheoryCard title="Terminology Translation" icon={<BookOpen size={20} />} variant="blue">
                    <p className="text-base mb-4">When transitioning from procedural C to Object-Oriented C++, the terminology changes to reflect the fact that data and behavior are bound together:</p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-blue-500/20 p-2 rounded text-blue-400 shrink-0"><Database size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Data Members (Attributes)</strong>
                                <span className="text-slate-400 text-sm">Variables declared inside a class. They define the <strong>State</strong> of the object. Every object gets its own unique copy of these variables in RAM.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="bg-purple-500/20 p-2 rounded text-purple-400 shrink-0"><Terminal size={18} /></div>
                            <div>
                                <strong className="text-white block mb-1">Member Functions (Methods)</strong>
                                <span className="text-slate-400 text-sm">Functions declared inside a class. They define the <strong>Behavior</strong> of the object. To save memory, methods are stored only once in RAM, and all objects share them.</span>
                            </div>
                        </li>
                    </ul>
                </TheoryCard>

                {/* NEW INTERACTIVE COMPONENT 1: Sizeof Simulator */}
                <SizeOfSimulator />

                <ClassBlueprintSimulator />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                        <Shield size={28} className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Access Modifiers & Data Hiding</h2>
                </div>

                <TheoryCard title="Public, Private, and Protected" icon={<Lock size={20} />} variant="purple">
                    <p className="text-base mb-4">C++ allows you to strictly control who can read or write to your class's data using access modifiers. This is the foundation of <strong>Encapsulation</strong>.</p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800 border-l-4 border-l-red-500">
                            <div>
                                <strong className="text-white block mb-1">private:</strong>
                                <span className="text-slate-400 text-sm">The default state in C++. Members cannot be accessed or viewed from outside the class. Only the class's own member functions can touch them. This prevents hackers or junior developers from breaking the internal state of your objects.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800 border-l-4 border-l-green-500">
                            <div>
                                <strong className="text-white block mb-1">public:</strong>
                                <span className="text-slate-400 text-sm">Members are completely accessible from outside the class. Usually, we make our Data Members private, and provide public Member Functions (Getters and Setters) so other code can interact with the object safely.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-800 border-l-4 border-l-orange-500">
                            <div>
                                <strong className="text-white block mb-1">protected:</strong>
                                <span className="text-slate-400 text-sm">Similar to private, but members can be accessed by child classes. Used heavily in Inheritance.</span>
                            </div>
                        </li>
                    </ul>
                </TheoryCard>

                <AccessModifierVisualizer />

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Code size={28} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Writing Your First Class</h2>
                </div>

                <CodeBlock 
                    title="Car Class Example with Getters and Setters"
                    code={`#include <iostream>\nusing namespace std;\n\n// 1. Defining the Blueprint\nclass Car {\nprivate:\n    // Data is completely hidden from main()\n    int speed;\n\npublic:\n    // "Setter" Method: Safely write data\n    void setSpeed(int s) {\n        // Encapsulation allows us to add validation logic!\n        if(s >= 0 && s < 300) {\n            speed = s;\n        } else {\n            cout << "Invalid speed!" << endl;\n        }\n    }\n\n    // "Getter" Method: Safely read data\n    int getSpeed() {\n        return speed;\n    }\n\n    void honk() {\n        cout << "Beep! My speed is " << speed << endl;\n    }\n};\n\nint main() {\n    // 2. Instantiating the Object\n    Car myPorsche;\n    \n    // 3. Accessing members via the Dot (.) Operator\n    myPorsche.setSpeed(120);\n    myPorsche.honk();\n    \n    // cout << myPorsche.speed; // COMPILER ERROR! Cannot access private data.\n    \n    return 0;\n}`}
                    explanation="1. We define the 'Car' class. The 'speed' variable is private. This means NO ONE outside the class can accidentally set the speed to a negative number.\n2. We create an object named 'myPorsche' inside main(). This is when memory is actually allocated.\n3. We use the Dot Operator (.) to call the public methods setSpeed() and honk(). Notice how setSpeed() validates the input before modifying the private variable. This is the true power of Encapsulation!"
                />

                <TheoryCard title="The Dot Operator (.)" icon={<CheckCircle size={20} />} variant="green">
                    <p className="text-base mb-4">Once an object is created, you access its public members (variables or methods) using the <strong>Dot Operator</strong>. Example: <code>objectName.methodName()</code>.</p>
                </TheoryCard>

                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 mt-20">
                    <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                        <Network size={28} className="text-orange-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Arrays of Objects</h2>
                </div>

                <TheoryCard title="Scaling Object Creation" icon={<Layers size={20} />} variant="orange">
                    <p className="text-base mb-4">Just like you can create an array of integers (<code>int numbers[10];</code>), you can create an array of objects. Because a Class is literally a custom data type, the syntax is identical!</p>
                    
                    <CodeBlock 
                        language="cpp"
                        title="Creating an Object Array"
                        code={`int main() {\n    // Create an array that holds 5 Car objects\n    Car dealership[5];\n\n    // Accessing a specific object in the array\n    dealership[0].setSpeed(50);\n    dealership[1].setSpeed(80);\n\n    for(int i = 0; i < 2; i++) {\n        dealership[i].honk();\n    }\n\n    return 0;\n}`}
                    />
                </TheoryCard>

                {/* NEW INTERACTIVE COMPONENT 2: Array Sandbox */}
                <ArrayOfObjectsSimulator />

            </section>
            </div>
        </div>
    );
}
