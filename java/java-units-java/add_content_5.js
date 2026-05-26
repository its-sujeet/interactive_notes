const fs = require('fs');

// L2: Classpath Simulator
let l2 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', 'utf8');
const l2Comp = `
// --- INTERACTIVE 6: Classpath Simulator ---
const ClasspathSimulator = () => {
    const [libIncluded, setLibIncluded] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Classpath (-cp) Trap</h3>
            <p className="text-slate-400 mb-6">If you use an external library (like a JSON parser or database driver), the JVM has no idea where it is unless you tell it using the <code>-cp</code> (classpath) flag.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-6 font-mono text-sm">
                
                <div className="flex gap-4">
                    <button onClick={() => setLibIncluded(false)} className={\`px-4 py-2 rounded font-bold border-2 \${!libIncluded ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-slate-900 border-slate-700 text-slate-500'}\`}>java Main</button>
                    <button onClick={() => setLibIncluded(true)} className={\`px-4 py-2 rounded font-bold border-2 \${libIncluded ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-700 text-slate-500'}\`}>java -cp .:mysql.jar Main</button>
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="text-slate-500 mb-2 uppercase text-xs tracking-widest font-bold">Execution Result</div>
                    {!libIncluded ? (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded text-red-400">
                            Exception in thread "main" java.lang.NoClassDefFoundError: com/mysql/jdbc/Driver
                            <br/><br/>
                            <span className="text-slate-400">// The JVM checked the current directory (.) but could not find the external MySQL classes!</span>
                        </div>
                    ) : (
                        <div className="bg-green-500/10 border border-green-500/50 p-4 rounded text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            MySQL Database Connected Successfully!
                            <br/><br/>
                            <span className="text-slate-400">// The JVM checked both the current directory (.) AND the mysql.jar file because of -cp!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
`;
if(l2.includes('export default function JavaLecture2() {')) {
    l2 = l2.replace('export default function JavaLecture2() {', l2Comp + '\nexport default function JavaLecture2() {');
    l2 = l2.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><ClasspathSimulator /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', l2);
}

