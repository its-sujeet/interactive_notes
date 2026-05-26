const fs = require('fs');

let l2 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', 'utf8');

const replacement = `// --- INTERACTIVE 4: IDE vs CLI Sandbox ---
const IDEvsCLISandbox = () => {
    const [mode, setMode] = useState<'ide'|'cli'>('ide');
    const [cliStep, setCliStep] = useState(0);
    const [ideRun, setIdeRun] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">IDE Magic vs CLI Reality</h3>
            <p className="text-slate-400 mb-6">IDEs like IntelliJ or Eclipse are incredibly powerful, but they hide the true mechanics of Java behind a "Run" button. Understanding what happens in the CLI is essential for debugging enterprise servers.</p>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => { setMode('ide'); setIdeRun(false); }} className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${mode === 'ide' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}\`}>The IDE Illusion</button>
                <button onClick={() => { setMode('cli'); setCliStep(0); }} className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${mode === 'cli' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}\`}>The CLI Reality</button>
            </div>
            
            <div className="bg-[#161b22] border border-slate-800 rounded-xl overflow-hidden min-h-[350px]">
                {mode === 'ide' ? (
                    <div className="flex flex-col h-full animate-in fade-in duration-500">
                        {/* IDE Header */}
                        <div className="bg-[#1e1e1e] border-b border-slate-800 p-2 flex justify-between items-center">
                            <div className="flex gap-2 px-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <button 
                                onClick={() => setIdeRun(true)}
                                className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded flex items-center gap-2 font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                            >
                                <Play size={14} className="fill-white"/> Run Main
                            </button>
                        </div>
                        {/* IDE Body */}
                        <div className="flex flex-1">
                            <div className="w-48 border-r border-slate-800 p-4 bg-[#1e1e1e]">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Project</div>
                                <div className="text-slate-300 text-sm flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Main.java</div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="p-4 font-mono text-sm text-slate-300 flex-1">
                                    <span className="text-orange-400">public class</span> Main {'{'}<br/>
                                    &nbsp;&nbsp;<span className="text-orange-400">public static void</span> main(String[] args) {'{'}<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;System.<span className="text-blue-300">out</span>.println(<span className="text-green-400">"Hello World!"</span>);<br/>
                                    &nbsp;&nbsp;{'}'}<br/>
                                    {'}'}
                                </div>
                                <div className="h-32 bg-black border-t border-slate-800 p-4 font-mono text-sm">
                                    <div className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Console Output</div>
                                    {ideRun ? (
                                        <div className="text-green-400 animate-in slide-in-from-left-4 fade-in duration-300">
                                            /usr/lib/jvm/java-17-openjdk-amd64/bin/java -javaagent:/opt/intellij/idea_rt.jar=... Main<br/><br/>
                                            Hello World!<br/>
                                            <span className="text-slate-500 italic mt-2 block">Process finished with exit code 0</span>
                                        </div>
                                    ) : (
                                        <div className="text-slate-600 italic">Click Run to execute...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full animate-in fade-in duration-500 p-6 font-mono">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Terminal Interface</div>
                            <button onClick={() => setCliStep((prev) => (prev < 2 ? prev + 1 : 0))} className="bg-orange-500 text-black font-bold px-4 py-1 rounded text-sm hover:bg-orange-400 transition-all">
                                {cliStep === 0 ? 'Compile Code' : cliStep === 1 ? 'Run JVM' : 'Reset'}
                            </button>
                        </div>
                        
                        <div className="flex gap-8">
                            <div className="flex-1 bg-black p-4 rounded-xl border border-slate-800 text-sm">
                                <div className="flex gap-2 mb-2">
                                    <span className="text-green-400 font-bold">anon@linux:~$</span>
                                    <span className="text-slate-300">ls</span>
                                </div>
                                <div className="text-blue-400 mb-4">Main.java</div>
                                
                                {cliStep >= 1 && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-green-400 font-bold">anon@linux:~$</span>
                                            <span className="text-slate-300">javac Main.java</span>
                                        </div>
                                        <div className="text-slate-500 italic mb-4">// Compiles to bytecode (Main.class)</div>
                                    </div>
                                )}
                                
                                {cliStep >= 2 && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-green-400 font-bold">anon@linux:~$</span>
                                            <span className="text-slate-300">java Main</span>
                                        </div>
                                        <div className="text-slate-500 italic mb-2">// Starts JVM and runs bytecode</div>
                                        <div className="text-white font-bold">Hello World!</div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="w-48 bg-slate-900 border border-slate-800 rounded-xl p-4">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Directory Contents</div>
                                <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Main.java
                                </div>
                                {cliStep >= 1 && (
                                    <div className="flex items-center gap-2 text-slate-300 text-sm animate-in zoom-in duration-300 text-orange-400 font-bold">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div> Main.class
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};`;

const startIndex = l2.indexOf('// --- INTERACTIVE 4: IDE vs CLI Sandbox ---');
const endIndex = l2.indexOf('// --- INTERACTIVE 5: JIT Compiler Visualizer ---');

if (startIndex !== -1 && endIndex !== -1) {
    const updatedL2 = l2.substring(0, startIndex) + replacement + '\n\n' + l2.substring(endIndex);
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', updatedL2);
}
