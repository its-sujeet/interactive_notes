const fs = require('fs');

let l6 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 6: Enhanced Switch Visualizer ---
const EnhancedSwitchVisualizer = () => {
    const [mode, setMode] = useState<'old'|'new'>('new');
    const [day, setDay] = useState(6);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Modern Java: The Enhanced Switch</h3>
            <p className="text-slate-400 mb-6">Tired of the Fallthrough Trap and writing <code className="text-orange-400">break;</code> 50 times? Java 14 introduced the Arrow Switch. It doesn't fall through, and it can return values directly!</p>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => setMode('old')} className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${mode === 'old' ? 'bg-slate-700/50 border-slate-500 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}>Old Switch (Pre-Java 14)</button>
                <button onClick={() => setMode('new')} className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${mode === 'new' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}>Arrow Switch (Java 14+)</button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm min-h-[300px] flex flex-col md:flex-row gap-8">
                
                <div className="flex-1">
                    <div className="mb-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Day: {day}</div>
                    <input type="range" min="1" max="7" value={day} onChange={e => setDay(Number(e.target.value))} className="w-full accent-orange-500 mb-6"/>
                    
                    <div className="p-4 bg-black border border-slate-700 rounded-lg text-center shadow-inner">
                        <div className="text-slate-500 text-xs mb-2">Evaluated Result:</div>
                        <div className={\`text-2xl font-black \${day >= 6 ? 'text-green-400' : 'text-slate-300'}\`}>
                            {day >= 6 ? 'Weekend' : 'Weekday'}
                        </div>
                    </div>
                </div>

                <div className="flex-[2] bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-inner">
                    {mode === 'old' ? (
                        <div className="animate-in fade-in duration-300 text-slate-300">
                            <span className="text-orange-400">String</span> type;<br/>
                            <span className="text-purple-400">switch</span> (day) {'{\n'}
                            <div className="pl-4">
                                <span className="text-purple-400">case</span> 1:<br/>
                                <span className="text-purple-400">case</span> 2:<br/>
                                <span className="text-purple-400">case</span> 3:<br/>
                                <span className="text-purple-400">case</span> 4:<br/>
                                <span className="text-purple-400">case</span> 5:<br/>
                                <div className="pl-4">type = "Weekday"; <span className="text-red-400 font-bold">break;</span></div>
                                <span className="text-purple-400">case</span> 6:<br/>
                                <span className="text-purple-400">case</span> 7:<br/>
                                <div className="pl-4">type = "Weekend"; <span className="text-red-400 font-bold">break;</span></div>
                            </div>
                            {'}'}
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 text-slate-300">
                            <span className="text-orange-400">String</span> type = <span className="text-purple-400">switch</span> (day) {'{\n'}
                            <div className="pl-4">
                                <span className="text-purple-400">case</span> 1, 2, 3, 4, 5 <span className="text-green-400 font-bold">-&gt;</span> "Weekday";<br/>
                                <span className="text-purple-400">case</span> 6, 7 <span className="text-green-400 font-bold">-&gt;</span> "Weekend";<br/>
                                <span className="text-purple-400">default</span> <span className="text-green-400 font-bold">-&gt;</span> "Invalid";
                            </div>
                            {'};'}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
`;

if(l6.includes('export default function JavaLecture6() {')) {
    l6 = l6.replace('export default function JavaLecture6() {', comp + '\nexport default function JavaLecture6() {');
    l6 = l6.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><EnhancedSwitchVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', l6);
}

