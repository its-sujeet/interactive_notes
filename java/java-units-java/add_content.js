const fs = require('fs');

// L2: Path Variable Simulator
let l2 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', 'utf8');
const l2Comp = `
// --- INTERACTIVE 3: PATH Variable Simulator ---
const PathVariableSimulator = () => {
    const [pathValid, setPathValid] = useState(false);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The PATH Variable Trap</h3>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
                <p className="text-slate-400">If you type 'javac' in the terminal and get 'command not found', your OS doesn't know where the JDK is. You must add the JDK bin directory to your OS PATH.</p>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-orange-400">PATH=</span>
                    <input type="text" onChange={(e) => setPathValid(e.target.value.includes('C:\\\\Program Files\\\\Java\\\\jdk\\\\bin') || e.target.value.includes('/usr/lib/jvm/'))} className="bg-black border border-slate-700 rounded p-2 flex-1 text-white font-mono" placeholder="Enter path (e.g. C:\\Program Files\\Java\\jdk\\bin)" />
                </div>
                <div className={\`p-4 rounded-xl border \${pathValid ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}\`}>
                    Terminal output: {pathValid ? 'javac 17.0.2 (Success!)' : 'bash: javac: command not found'}
                </div>
            </div>
        </div>
    );
};
`;
l2 = l2.replace('export default function JavaLecture2() {', l2Comp + '\nexport default function JavaLecture2() {');
l2 = l2.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><PathVariableSimulator /></section>\n            </div>\n        </div>\n    );\n}');
fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', l2);

// L3: Wrapper Class Auto-Boxing Sandbox
let l3 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L3/page.tsx', 'utf8');
const l3Comp = `
// --- INTERACTIVE 3: Autoboxing Sandbox ---
const AutoboxingSandbox = () => {
    const [primitive, setPrimitive] = useState(42);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Autoboxing & Unboxing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800">
                    <div className="text-orange-400 font-bold mb-2">Primitive Stack (int)</div>
                    <input type="number" value={primitive} onChange={(e) => setPrimitive(Number(e.target.value))} className="bg-black text-white p-2 rounded w-full border border-slate-700" />
                    <div className="mt-4 text-xs text-slate-500">Fast, lives on stack. No methods.</div>
                </div>
                <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800 flex flex-col justify-center items-center">
                    <div className="text-blue-400 font-bold mb-2">Wrapper Heap Object (Integer)</div>
                    <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-xl text-blue-300 font-mono text-2xl w-full text-center">
                        {primitive}
                    </div>
                    <div className="mt-4 text-xs text-slate-500 text-center">JVM automatically 'boxes' the primitive into an Object when added to Collections (like ArrayList).</div>
                </div>
            </div>
        </div>
    );
};
`;
l3 = l3.replace('export default function JavaLecture3() {', l3Comp + '\nexport default function JavaLecture3() {');
l3 = l3.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><AutoboxingSandbox /></section>\n            </div>\n        </div>\n    );\n}');
fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L3/page.tsx', l3);

// L4: Short-Circuit Logic Evaluator
let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', 'utf8');
const l4Comp = `
// --- INTERACTIVE 2: Short-Circuit Visualizer ---
const ShortCircuitVisualizer = () => {
    const [crash, setCrash] = useState(false);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">Short-Circuit Evaluation (&& vs &)</h3>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex flex-col gap-4 font-mono">
                <p className="text-slate-400 text-sm">If obj is null, checking obj.length() will throw a NullPointerException. Short-circuiting prevents this.</p>
                <div className="flex gap-4">
                    <button onClick={() => setCrash(false)} className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded hover:bg-green-500/40">if (obj != null && obj.length() > 0)</button>
                    <button onClick={() => setCrash(true)} className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded hover:bg-red-500/40">if (obj != null & obj.length() > 0)</button>
                </div>
                <div className={\`p-4 mt-4 rounded-xl border \${crash ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400'}\`}>
                    {crash ? 'NullPointerException! A single & forces Java to evaluate both sides.' : 'Safe! The && operator saw obj == null (false) and immediately skipped evaluating the right side.'}
                </div>
            </div>
        </div>
    );
};
`;
l4 = l4.replace('export default function JavaLecture4() {', l4Comp + '\nexport default function JavaLecture4() {');
l4 = l4.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><ShortCircuitVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', l4);

// L5: Unary Increment/Decrement Visualizer
let l5 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L5/page.tsx', 'utf8');
const l5Comp = `
// --- INTERACTIVE 3: Unary Increment Trap ---
const UnaryTrap = () => {
    const [mode, setMode] = useState<'post'|'pre'>('post');
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Prefix vs Postfix (x++ vs ++x)</h3>
            <div className="flex gap-4 mb-4">
                <button onClick={() => setMode('post')} className={\`px-4 py-2 rounded font-bold \${mode === 'post' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}\`}>int y = x++;</button>
                <button onClick={() => setMode('pre')} className={\`px-4 py-2 rounded font-bold \${mode === 'pre' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}\`}>int y = ++x;</button>
            </div>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex gap-8">
                <div className="flex-1">
                    <h4 className="text-slate-500 mb-2 font-bold uppercase text-xs">Initial Memory</h4>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded text-center text-slate-300 font-mono">x = 5</div>
                </div>
                <div className="flex-1">
                    <h4 className="text-slate-500 mb-2 font-bold uppercase text-xs">Execution Order</h4>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded text-sm text-slate-300">
                        {mode === 'post' ? '1. Read x (5) and assign to y. \\n 2. Increment x to 6.' : '1. Increment x to 6. \\n 2. Read new x (6) and assign to y.'}
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="text-slate-500 mb-2 font-bold uppercase text-xs">Final Memory</h4>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded text-center text-white font-mono font-bold bg-green-500/10 border-green-500/50">
                        y = {mode === 'post' ? '5' : '6'}, x = 6
                    </div>
                </div>
            </div>
        </div>
    );
};
`;
l5 = l5.replace('export default function JavaLecture5() {', l5Comp + '\nexport default function JavaLecture5() {');
l5 = l5.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><UnaryTrap /></section>\n            </div>\n        </div>\n    );\n}');
fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L5/page.tsx', l5);

// L6: If-Else Scope Trap Visualizer
let l6 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', 'utf8');
const l6Comp = `
// --- INTERACTIVE 2: Block Scope Visualizer ---
const ScopeVisualizer = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Block Scope Trap</h3>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm">
                <p className="text-slate-400 mb-4">Variables declared inside an if-block die when the block closes.</p>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded relative group">
                    <span className="text-purple-400">if</span> (userExists) {'{\n'}
                    <div className="pl-8 text-slate-300 relative">
                        <span className="text-orange-400">int</span> id = 1234;
                        <div className="absolute top-0 right-0 p-1 bg-green-500/20 text-green-400 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">id is created here</div>
                    </div>
                    {'}\n'}
                    <div className="text-red-400 mt-2 bg-red-500/10 border border-red-500/30 p-2 rounded">
                        System.out.println(id); // ERROR: Cannot resolve symbol 'id'
                    </div>
                </div>
            </div>
        </div>
    );
};
`;
l6 = l6.replace('export default function JavaLecture6() {', l6Comp + '\nexport default function JavaLecture6() {');
l6 = l6.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><ScopeVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', l6);

