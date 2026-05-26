const fs = require('fs');

let l6 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 7: Guard Clauses (Anti-Arrow Code) ---
const GuardClauseVisualizer = () => {
    const [refactored, setRefactored] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6">Refactoring: The Arrow Code Trap</h3>
            <p className="text-slate-400 mb-6">Deeply nested if-statements create a shape known as "Arrow Code". It makes code unreadable and hard to maintain. Professional developers invert the logic and use <strong>Guard Clauses</strong> (early returns) to keep the code flat.</p>
            
            <div className="flex justify-center mb-6">
                <button 
                    onClick={() => setRefactored(!refactored)}
                    className={\`px-6 py-3 rounded-xl font-bold transition-all border flex items-center gap-2 \${refactored ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'}\`}
                >
                    <Split size={18} />
                    {refactored ? 'Revert to Arrow Code' : 'Refactor with Guard Clauses'}
                </button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm overflow-hidden relative min-h-[300px]">
                
                {!refactored ? (
                    <div className="animate-in slide-in-from-left-8 fade-in duration-500 text-slate-300 relative">
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                            <span className="text-[200px] font-black text-red-500">➜</span>
                        </div>
                        <span className="text-purple-400">public void</span> processUser(User user) {'{\n'}
                        <div className="pl-4 border-l-2 border-red-500/30 ml-2 py-1 transition-all hover:bg-red-500/10">
                            <span className="text-purple-400">if</span> (user != null) {'{\n'}
                            <div className="pl-4 border-l-2 border-red-500/50 ml-2 py-1 transition-all hover:bg-red-500/10">
                                <span className="text-purple-400">if</span> (user.isActive()) {'{\n'}
                                <div className="pl-4 border-l-2 border-red-500/70 ml-2 py-1 transition-all hover:bg-red-500/10">
                                    <span className="text-purple-400">if</span> (user.hasPermission()) {'{\n'}
                                    <div className="pl-4 border-l-2 border-red-500 ml-2 py-1 bg-red-500/10 shadow-inner">
                                        <span className="text-green-400 font-bold">// Execute core logic</span><br/>
                                        executeSystemAction();
                                    </div>
                                    {'}\n'}
                                </div>
                                {'}\n'}
                            </div>
                            {'}\n'}
                        </div>
                        {'}'}
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-right-8 fade-in duration-500 text-slate-300">
                        <span className="text-purple-400">public void</span> processUser(User user) {'{\n'}
                        <div className="pl-4">
                            <span className="text-slate-500 italic">// Guard Clauses (Fail Fast)</span><br/>
                            <span className="text-purple-400">if</span> (user == null) <span className="text-purple-400 font-bold">return</span>;<br/>
                            <span className="text-purple-400">if</span> (!user.isActive()) <span className="text-purple-400 font-bold">return</span>;<br/>
                            <span className="text-purple-400">if</span> (!user.hasPermission()) <span className="text-purple-400 font-bold">return</span>;<br/>
                            <br/>
                            <span className="text-green-400 font-bold">// Execute core logic</span><br/>
                            executeSystemAction();
                        </div>
                        {'}'}
                    </div>
                )}
                
            </div>
            
            <ExplainerCard 
                title="Early Returns"
                text="Arrow code happens when developers try to check everything that MUST be true before running the code. By inverting the logic—checking what makes the execution INVALID and immediately returning—you keep your code flat (0 levels of nesting). Flat code is infinitely easier to read, debug, and maintain than deeply nested if-blocks." 
            />
        </div>
    );
};
`;

if(l6.includes('export default function JavaLecture6() {')) {
    l6 = l6.replace('export default function JavaLecture6() {', comp + '\nexport default function JavaLecture6() {');
    l6 = l6.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><GuardClauseVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', l6);
}

