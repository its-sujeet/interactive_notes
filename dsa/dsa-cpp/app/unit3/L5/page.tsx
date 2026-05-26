"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Link as LinkIcon, Database } from 'lucide-react';

const TheoryCard = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 hover:border-slate-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {Icon && <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Icon size={20} /></span>}
            {title}
        </h3>
        <div className="text-slate-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden mb-8 my-4 shadow-xl">
        {title && (
            <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Code size={14} className="text-emerald-400" />
                <span className="text-xs font-mono text-slate-300">{title}</span>
            </div>
        )}
        <div className="p-4 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

export default function LecturePage() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none', transition: 'filter 0.5s ease' }}>
            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />
                        <div>
                            <h1 className="font-bold text-white text-sm md:text-base leading-tight tracking-wide">Queue using Linked List</h1>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Unit 3 • Lecture 5</p>
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
                        <Link href="/unit3/L4" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Array Queue
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Linked List Implementation of Queue</h2>
                        <Link href="/unit3/L6" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            Circular Queue <ArrowRight size={16} />
                        </Link>
                    </div>

                    <TheoryCard title="Dynamic Queues" icon={LinkIcon}>
                        <p>
                            To solve the wasted space problem of Array-based Queues, we can use a Singly Linked List.
                        </p>
                        <p>
                            In a Linked List Queue, we maintain two pointers:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>front</strong>: Points to the head of the linked list (where we Dequeue).</li>
                            <li><strong>rear</strong>: Points to the tail of the linked list (where we Enqueue).</li>
                        </ul>
                        <p className="mt-4">
                            <strong>Enqueue</strong> is an <code>InsertAtTail</code> operation. <br/>
                            <strong>Dequeue</strong> is a <code>DeleteHead</code> operation.
                        </p>
                    </TheoryCard>

                    <CodeBlock 
                        title="QueueLL.cpp"
                        code={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) { data = val; next = nullptr; }
};

class Queue {
    Node *front, *rear;

public:
    Queue() {
        front = rear = nullptr;
    }

    void enqueue(int x) {
        Node* newNode = new Node(x);
        
        // If queue is empty, new node is both front and rear
        if (rear == nullptr) {
            front = rear = newNode;
            return;
        }
        
        // Add new node to the end and change rear
        rear->next = newNode;
        rear = newNode;
    }

    void dequeue() {
        if (front == nullptr) return; // Empty queue
        
        Node* temp = front;
        front = front->next; // Move front pointer
        
        // If front becomes NULL, change rear to NULL too
        if (front == nullptr) {
            rear = nullptr;
        }
        
        delete temp; // Free memory
    }
};`}
                    />

                </main>
            </div>
        </div>
    );
}
