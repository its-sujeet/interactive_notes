"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, AlignLeft, Layers } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><Icon size={20} /></span>}
            {title}
        </h3>
        <div className="text-slate-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);
    const [expression, setExpression] = useState("A+B*C");

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Infix, Prefix, Postfix</h1>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Unit 3 • Lecture 3</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsLightMode(!isLightMode)} className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            {isLightMode ? '🌙' : '☀️'}
                        </button>
                    </div>
                </header>

                <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/unit3/L2" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Stack via Linked List
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Expression Evaluations</h2>
                        <Link href="/unit3/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Queue Array <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="The Three Notations" icon={AlignLeft}>
                        <p>
                            Arithmetic expressions can be written in three different notations based on the position of the <strong>Operator</strong> relative to the <strong>Operands</strong>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-orange-400 font-bold text-lg mb-2">Infix</h4>
                                <p className="text-sm mb-4">Operator is IN BETWEEN operands.</p>
                                <div className="text-2xl font-mono text-white text-center py-4 bg-[#0d1117] rounded-lg">A + B</div>
                                <p className="text-xs text-slate-400 mt-4 text-center">Standard human format.</p>
                            </div>
                            
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-emerald-400 font-bold text-lg mb-2">Prefix (Polish)</h4>
                                <p className="text-sm mb-4">Operator is BEFORE operands.</p>
                                <div className="text-2xl font-mono text-white text-center py-4 bg-[#0d1117] rounded-lg">+ A B</div>
                                <p className="text-xs text-slate-400 mt-4 text-center">Read right-to-left.</p>
                            </div>
                            
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 border-t-4 border-t-indigo-500 relative">
                                <span className="absolute -top-3 right-4 bg-indigo-500 text-xs font-bold px-2 py-1 rounded text-white">Most Important!</span>
                                <h4 className="text-blue-400 font-bold text-lg mb-2">Postfix (Reverse Polish)</h4>
                                <p className="text-sm mb-4">Operator is AFTER operands.</p>
                                <div className="text-2xl font-mono text-white text-center py-4 bg-[#0d1117] rounded-lg">A B +</div>
                                <p className="text-xs text-slate-400 mt-4 text-center">Extremely easy for computers.</p>
                            </div>
                        </div>
                    </TheoryCard>

                    <TheoryCard title="Why do computers love Postfix?" icon={Layers}>
                        <p>
                            When a computer evaluates an <strong>Infix</strong> expression like <code>2 + 3 * 4</code>, it has to scan back and forth to respect BODMAS/PEMDAS rules. It must know that <code>*</code> has higher precedence than <code>+</code>.
                        </p>
                        <p>
                            If we convert it to <strong>Postfix</strong>: <code>2 3 4 * +</code>, the computer can evaluate it in a single left-to-right pass using a <strong>Stack</strong> without worrying about parentheses or precedence!
                        </p>
                    </TheoryCard>

                    <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-8 text-center mt-12 mb-20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                        <h3 className="text-2xl font-bold text-white mb-4">Stack Algorithm for Postfix Evaluation</h3>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed text-left">
                            1. Scan expression from left to right.<br/>
                            2. If you see an <strong>Operand</strong> (number), <strong>PUSH</strong> it to the stack.<br/>
                            3. If you see an <strong>Operator</strong> (+, -, *, /), <strong>POP</strong> two operands from the stack.<br/>
                            4. Apply the operator to them (note: <code>val2 operator val1</code>).<br/>
                            5. <strong>PUSH</strong> the result back to the stack.<br/>
                            6. When expression ends, the final answer is sitting at the top of the stack!
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
