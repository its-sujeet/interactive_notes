"use client";
import React, { useState } from 'react';
import { BookOpen, Layers, Terminal, ChevronRight, Hash, Code } from 'lucide-react';

const TheoryCard = ({ title, icon, children, variant = 'blue' }: any) => {
    const colors: any = {
        blue: 'border-blue-500 bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-900/10',
        red: 'border-red-500 bg-red-900/10',
        green: 'border-green-500 bg-green-900/10'
    };
    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                {icon} {title}
            </h4>
            <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

export default function LecturePage() {
    const [activeSection, setActiveSection] = useState('intro');
    const scrollTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cpp/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">Pointer Problems & References</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 2 • Lecture 2</p>
                    </div>
                </div>
                <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800 overflow-x-auto">
                    <button onClick={() => scrollTo('intro')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${activeSection === 'intro' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Intro</button>
                    <button onClick={() => scrollTo('topics')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${activeSection === 'topics' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Topics</button>
                </nav>
            </header>

            <section id="intro" className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-6">
                    <Terminal size={14} /> Pointers, Reference Variables, Arrays and String Concepts
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white mb-6 leading-tight">
                    Pointer Problems & References
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-12">
                    Welcome to Unit 2, Lecture 2. This interactive note will cover the foundational concepts for this topic.
                </p>
            </section>

            <section id="topics" className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Hash size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Topics Covered</h2>
                </div>
                <TheoryCard title="Detailed Lecture Content" icon={<BookOpen size={18} />} variant="purple">
                    
                    <div className="mb-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-300 mb-3 border-b border-slate-800 pb-2">Possible problems with the use of pointers - Dangling pointer, Wild pointer, Null pointer assignment</h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">A dangling pointer points to memory that has been deallocated. A wild pointer is uninitialized and points to a random memory location. A null pointer points to `nullptr` (0), and dereferencing it causes a crash. Proper initialization and setting pointers to `nullptr` after deletion prevents these severe bugs.</p>
                    </div>
                    <div className="mb-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-300 mb-3 border-b border-slate-800 pb-2">Differences between pointer and reference variables</h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">Pointers store memory addresses, can be reassigned, can be null, and require dereferencing (`*`). References are constant aliases for an existing variable, cannot be null, must be initialized upon declaration, and share the exact same syntax as normal variables once established.</p>
                    </div>
                </TheoryCard>
            </section>
        </div>
    );
}
