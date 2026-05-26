const fs = require('fs');
const path = require('path');

const cppJsonPath = path.join(__dirname, 'cpp.json');
const appPath = path.join(__dirname, 'c-units-cpp', 'app');
const pageTsxPath = path.join(appPath, 'page.tsx');

const data = JSON.parse(fs.readFileSync(cppJsonPath, 'utf8'));

// 1. Update page.tsx
const icons = ['Terminal', 'Code', 'Layers', 'ArrowRight', 'BookOpen', 'FileCode'];
let unitsArrayString = 'const units = [\n';
data.units.forEach((unit, index) => {
    unitsArrayString += `  { id: ${unit.unit_number}, title: ${JSON.stringify(unit.unit_name)}, description: 'Lectures: ${unit.lectures.length}', icon: ${icons[index % icons.length]} },\n`;
});
unitsArrayString += '];';

let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

// Replace the units array
pageContent = pageContent.replace(/const units = \[[\s\S]*?\];/, unitsArrayString);

// Add missing icon
if (!pageContent.includes('FileCode')) {
    pageContent = pageContent.replace('import { BookOpen, ArrowRight, Code, Terminal, Layers }', 'import { BookOpen, ArrowRight, Code, Terminal, Layers, FileCode }');
}

// Replace welcome text
pageContent = pageContent.replace(/Welcome to C-Units/g, 'Welcome to C++ Units');
pageContent = pageContent.replace(/Master C programming/g, 'Master C++ programming');

fs.writeFileSync(pageTsxPath, pageContent);

// 2. Generate unit folders and lecture pages
data.units.forEach(unit => {
    const unitFolder = path.join(appPath, `unit${unit.unit_number}`);
    if (!fs.existsSync(unitFolder)) {
        fs.mkdirSync(unitFolder, { recursive: true });
    }
    
    unit.lectures.forEach(lecture => {
        const lectureFolder = path.join(unitFolder, `L${lecture.lecture_number}`);
        if (!fs.existsSync(lectureFolder)) {
            fs.mkdirSync(lectureFolder, { recursive: true });
        }
        
        const topicsList = lecture.topics.map(t => `<li>${t}</li>`).join('\n                        ');
        
        const pageTemplate = `"use client";
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
        <div className={\`border-l-4 \${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm\`}>
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
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">C++</div>
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">${lecture.lecture_name.replace(/`/g, "'")}</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit ${unit.unit_number} • Lecture ${lecture.lecture_number}</p>
                    </div>
                </div>
                <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800 overflow-x-auto">
                    <button onClick={() => scrollTo('intro')} className={\`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold \${activeSection === 'intro' ? 'bg-blue-600 text-white' : 'text-slate-400'}\`}>Intro</button>
                    <button onClick={() => scrollTo('topics')} className={\`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold \${activeSection === 'topics' ? 'bg-purple-600 text-white' : 'text-slate-400'}\`}>Topics</button>
                </nav>
            </header>

            <section id="intro" className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-6">
                    <Terminal size={14} /> ${unit.unit_name.replace(/`/g, "'")}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white mb-6 leading-tight">
                    ${lecture.lecture_name.replace(/`/g, "'")}
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-12">
                    Welcome to Unit ${unit.unit_number}, Lecture ${lecture.lecture_number}. This interactive note will cover the foundational concepts for this topic.
                </p>
            </section>

            <section id="topics" className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Hash size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Topics Covered</h2>
                </div>
                <TheoryCard title="Core Topics" icon={<BookOpen size={18} />} variant="purple">
                    <ul className="list-disc pl-4 mt-2 space-y-2 marker:text-purple-500">
                        ${topicsList}
                    </ul>
                </TheoryCard>
            </section>
        </div>
    );
}
`;
        fs.writeFileSync(path.join(lectureFolder, 'page.tsx'), pageTemplate);
    });
});
console.log('Successfully generated all C++ units and lectures!');
