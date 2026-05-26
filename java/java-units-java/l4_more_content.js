const fs = require('fs');

let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 6: Compound Assignment Trap ---
const CompoundAssignmentTrap = () => {
    const [mode, setMode] = useState<'standard'|'compound'>('standard');

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Compound Assignment Trap</h3>
            <p className="text-slate-400 mb-6">Most developers think <code className="text-orange-400">s += 1</code> is exactly the same as <code className="text-orange-400">s = s + 1</code>. In Java, this is a lie. Compound assignment operators automatically cast the result back to the original type!</p>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => setMode('standard')} className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${mode === 'standard' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}\`}>Standard (s = s + 1)</button>
                <button onClick={() => setMode('compound')} className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${mode === 'compound' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}\`}>Compound (s += 1)</button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm min-h-[220px]">
                <div className="text-purple-400 mb-4">short s = 10;</div>
                
                {mode === 'standard' ? (
                    <div className="animate-in fade-in duration-300">
                        <div className="text-orange-400 mb-4">s = s + 1;</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Compiler Response:</div>
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded">
                            <strong>Compilation Error!</strong><br/>
                            <span className="text-xs">incompatible types: possible lossy conversion from int to short.</span><br/>
                            <span className="text-slate-500 italic text-xs mt-2 block">// Explanation: Adding 1 (an int) to a short promotes the entire result to an int. You cannot shove an int back into a short variable without an explicit cast!</span>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-300">
                        <div className="text-green-400 mb-4">s += 1;</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Compiler Response:</div>
                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded">
                            <strong>Success! (s is now 11)</strong><br/>
                            <span className="text-slate-500 italic text-xs mt-2 block">// Explanation: The JVM secretly translates this into s = (short)(s + 1). The implicit cast saves you from compilation errors, but can cause silent integer overflow bugs!</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
`;

if(l4.includes('export default function JavaLecture4() {')) {
    l4 = l4.replace('export default function JavaLecture4() {', comp + '\nexport default function JavaLecture4() {');
    l4 = l4.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><CompoundAssignmentTrap /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', l4);
}

