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
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">Overriding & Composition</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 4 • Lecture 6</p>
                    </div>
                </div>
                <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800 overflow-x-auto">
                    <button onClick={() => scrollTo('intro')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${activeSection === 'intro' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Intro</button>
                    <button onClick={() => scrollTo('topics')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${activeSection === 'topics' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Topics</button>
                </nav>
            </header>

            <section id="intro" className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-6">
                    <Terminal size={14} /> Operator Overloading and Inheritance
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white mb-6 leading-tight">
                    Overriding & Composition
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-12">
                    Welcome to Unit 4, Lecture 6. This interactive note will cover the foundational concepts for this topic.
                </p>
            </section>

            <section id="topics" className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Hash size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Topics Covered</h2>
                </div>
                <TheoryCard title="Detailed Lecture Content" icon={<BookOpen size={18} />} variant="purple">
                    
                    <div className="mb-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-300 mb-3 border-b border-slate-800 pb-2">Overriding member functions</h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">Function Overriding occurs when a derived class provides a specific implementation for a function already defined in its base class. It has the exact same signature. When called on a derived object, the derived version completely shadows the base version.</p>
                    </div>
                    <div className="mb-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-300 mb-3 border-b border-slate-800 pb-2">Order of execution of constructors and destructors</h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">When a derived object is created, the Base class constructor executes FIRST, followed by the Derived class constructor. When the object is destroyed, the order is strictly reversed: the Derived class destructor executes FIRST, followed by the Base destructor.</p>
                    </div>
                    <div className="mb-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-300 mb-3 border-b border-slate-800 pb-2">Aggregation and Composition</h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">These model the &apos;HAS-A&apos; relationship. Aggregation is a weak association where the contained object can exist independently of the container (e.g., Department has Teachers). Composition is a strong lifecycle binding where the contained object dies with the container (e.g., Car has an Engine).</p>
                    </div>
                </TheoryCard>
            </section>
        </div>
    );
}
