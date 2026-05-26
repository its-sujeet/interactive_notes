const fs = require('fs');

// L2: JVM Memory Visualizer
let l2 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', 'utf8');
const l2Comp = `
// --- INTERACTIVE 7: JVM Memory Architecture ---
const JVMMemoryVisualizer = () => {
    const [selectedArea, setSelectedArea] = useState<'heap'|'stack'|'method'|'pc'>('heap');

    const areas = {
        method: { title: "Method Area (Metaspace)", desc: "Stores class structures, method data, static variables, and the runtime constant pool. It is shared across all threads.", color: "border-purple-500 text-purple-400", bg: "bg-purple-500/20" },
        heap: { title: "Heap Memory", desc: "Where all Objects (using the 'new' keyword) and instance variables are allocated. Managed by the Garbage Collector. Shared across all threads.", color: "border-green-500 text-green-400", bg: "bg-green-500/20" },
        stack: { title: "JVM Stacks", desc: "Stores local variables, method calls, and partial results. Each thread has its own private Stack. Memory is automatically freed when methods return.", color: "border-blue-500 text-blue-400", bg: "bg-blue-500/20" },
        pc: { title: "PC Registers", desc: "Program Counter. Stores the address of the currently executing JVM instruction. Each thread has its own private PC Register.", color: "border-orange-500 text-orange-400", bg: "bg-orange-500/20" }
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">JVM Runtime Data Areas</h3>
            <p className="text-slate-400 mb-6">When the JVM runs a program, it carves up your system's RAM into specific operational zones.</p>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Interactive Diagram */}
                <div className="flex-1 bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex gap-4 h-32">
                        <button onClick={() => setSelectedArea('method')} className={\`flex-1 rounded-xl border-4 transition-all font-bold flex items-center justify-center \${selectedArea === 'method' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}\`}>
                            Method Area
                        </button>
                        <button onClick={() => setSelectedArea('heap')} className={\`flex-[2] rounded-xl border-4 transition-all font-bold flex items-center justify-center \${selectedArea === 'heap' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}\`}>
                            Heap
                        </button>
                    </div>
                    <div className="flex gap-4 h-32">
                        <button onClick={() => setSelectedArea('stack')} className={\`flex-[2] rounded-xl border-4 transition-all font-bold flex items-center justify-center \${selectedArea === 'stack' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}\`}>
                            Thread Stacks
                        </button>
                        <button onClick={() => setSelectedArea('pc')} className={\`flex-1 rounded-xl border-4 transition-all font-bold flex items-center justify-center text-center \${selectedArea === 'pc' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}\`}>
                            PC Regs
                        </button>
                    </div>
                    <div className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 border-t border-slate-800 pt-4">JVM Memory Architecture Map</div>
                </div>

                {/* Explanation Panel */}
                <div className={\`flex-1 p-8 rounded-xl border-2 transition-all \${areas[selectedArea].bg} \${areas[selectedArea].color.split(' ')[0]}\`}>
                    <h4 className={\`text-2xl font-bold mb-4 \${areas[selectedArea].color.split(' ')[1]}\`}>{areas[selectedArea].title}</h4>
                    <p className="text-slate-200 text-lg leading-relaxed">{areas[selectedArea].desc}</p>
                </div>
            </div>
        </div>
    );
};
`;
if(l2.includes('export default function JavaLecture2() {')) {
    l2 = l2.replace('export default function JavaLecture2() {', l2Comp + '\nexport default function JavaLecture2() {');
    l2 = l2.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><JVMMemoryVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', l2);
}

