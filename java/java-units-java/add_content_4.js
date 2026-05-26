const fs = require('fs');

// L1: Garbage Collection Visualization
let l1 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L1/page.tsx', 'utf8');
const l1Comp = `
// --- INTERACTIVE 6: Garbage Collection Visualizer ---
const GCVisualizer = () => {
    const [objects, setObjects] = useState([true, true, false, true, false]);
    
    const runGC = () => {
        setObjects(objects.map(o => o ? true : null as any)); // Nullify the unreachable ones
    };

    const reset = () => {
        setObjects([true, true, false, true, false]);
    }

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Automatic Garbage Collection (GC)</h3>
            <p className="text-slate-400 mb-6">In C++, you must manually delete memory. In Java, the Garbage Collector automatically hunts down and destroys objects that are no longer reachable.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl">
                <div className="flex gap-4 mb-8 justify-center">
                    {objects.map((reachable, idx) => (
                        <div key={idx} className={\`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-1000 \${reachable === null ? 'opacity-0 scale-50' : reachable ? 'bg-green-500/20 border-2 border-green-500 text-green-400' : 'bg-red-500/20 border-2 border-red-500 text-red-400'}\`}>
                            {reachable === null ? '' : reachable ? 'Linked' : 'Orphan'}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={runGC} className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)]">Trigger System.gc()</button>
                    <button onClick={reset} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold transition-all">Reset Memory Heap</button>
                </div>
            </div>
        </div>
    );
};
`;
if(l1.includes('export default function JavaLecture1() {')) {
    l1 = l1.replace('export default function JavaLecture1() {', l1Comp + '\nexport default function JavaLecture1() {');
    l1 = l1.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><GCVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L1/page.tsx', l1);
}

// L2: JIT Compiler Sandbox
let l2 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', 'utf8');
const l2Comp = `
// --- INTERACTIVE 5: JIT Compiler Visualizer ---
const JITVisualizer = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The JIT (Just-In-Time) Compiler</h3>
            <p className="text-slate-400 mb-6">The JVM does not just interpret bytecode line-by-line. It watches for "Hot Code" (loops running thousands of times) and compiles it into pure machine code on the fly for massive speed boosts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
                    <h4 className="text-slate-500 font-bold mb-4 uppercase">1. Interpreter (Slow)</h4>
                    <p className="text-orange-400 mb-2">while (count &lt; 1000) {'{'} ... {'}'}</p>
                    <p className="text-slate-400">Reads bytecode line-by-line, translating to machine code 1000 separate times.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)] relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 bg-green-500 text-black font-bold px-8 py-2 rotate-45">JIT ACTIVE</div>
                    <h4 className="text-slate-500 font-bold mb-4 uppercase">2. JIT Compiler (Fast)</h4>
                    <p className="text-green-400 mb-2">Detected "Hot Code"!</p>
                    <p className="text-slate-400">Compiles the entire loop into native CPU instructions <span className="text-white font-bold">once</span> and caches it. Execution speed becomes similar to C++.</p>
                </div>
            </div>
        </div>
    );
};
`;
if(l2.includes('export default function JavaLecture2() {')) {
    l2 = l2.replace('export default function JavaLecture2() {', l2Comp + '\nexport default function JavaLecture2() {');
    l2 = l2.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><JITVisualizer /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', l2);
}

// L3: Variable Naming Rules
let l3 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L3/page.tsx', 'utf8');
const l3Comp = `
// --- INTERACTIVE 5: Identifier Validator ---
const IdentifierValidator = () => {
    const [name, setName] = useState("myVariable_1");
    const isValid = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(name) && !['class', 'public', 'static', 'void'].includes(name);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Identifier Rules (Variable Naming)</h3>
            <p className="text-slate-400 mb-6">Java variables must start with a letter, $, or _. They cannot start with a number, contain spaces, or use reserved keywords (like 'class').</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl flex items-center gap-4">
                <span className="text-orange-400 font-bold font-mono">int</span>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="bg-black border border-slate-700 rounded p-3 flex-1 text-white font-mono focus:border-orange-500 outline-none" 
                    placeholder="Enter variable name..." 
                />
                <span className="text-slate-500 font-bold font-mono">= 10;</span>
            </div>
            
            <div className={\`mt-4 p-4 rounded-xl border font-bold text-center \${name.length===0 ? 'bg-slate-900 border-slate-800 text-slate-500' : isValid ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}\`}>
                {name.length === 0 ? 'Start typing...' : isValid ? 'Valid Identifier! Compilation Success.' : 'Invalid Identifier! Compilation Failed.'}
            </div>
        </div>
    );
};
`;
if(l3.includes('export default function JavaLecture3() {')) {
    l3 = l3.replace('export default function JavaLecture3() {', l3Comp + '\nexport default function JavaLecture3() {');
    l3 = l3.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><IdentifierValidator /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L3/page.tsx', l3);
}

// L4: Bitwise Masking
let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', 'utf8');
const l4Comp = `
// --- INTERACTIVE 4: Bitwise Masking Visualizer ---
const BitwiseMasking = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Real World: Bitwise Masking (Color Codes)</h3>
            <p className="text-slate-400 mb-6">Bitwise operators aren't just theory. They are used to extract RGB color values from a single 32-bit integer! Using bitwise AND (&) and Right Shift (>>).</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl font-mono text-sm">
                <div className="text-slate-400 mb-2">// 32-bit ARGB Color (A=255, R=255, G=165, B=0)</div>
                <div className="text-orange-400 mb-6">int color = 0xFFFFA500;</div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded text-red-400">
                        <div className="mb-2 text-xs uppercase font-bold text-slate-500">Extract Red</div>
                        int r = (color &gt;&gt; 16) & 0xFF;
                        <div className="mt-2 text-white font-bold">Result: 255</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-4 rounded text-green-400">
                        <div className="mb-2 text-xs uppercase font-bold text-slate-500">Extract Green</div>
                        int g = (color &gt;&gt; 8) & 0xFF;
                        <div className="mt-2 text-white font-bold">Result: 165</div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded text-blue-400">
                        <div className="mb-2 text-xs uppercase font-bold text-slate-500">Extract Blue</div>
                        int b = color & 0xFF;
                        <div className="mt-2 text-white font-bold">Result: 0</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
`;
if(l4.includes('export default function JavaLecture4() {')) {
    l4 = l4.replace('export default function JavaLecture4() {', l4Comp + '\nexport default function JavaLecture4() {');
    l4 = l4.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><BitwiseMasking /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', l4);
}

// L5: Logical Not (!) Toggle
let l5 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L5/page.tsx', 'utf8');
const l5Comp = `
// --- INTERACTIVE 5: Logical Not Toggle ---
const LogicalNotToggle = () => {
    const [isOn, setIsOn] = useState(false);
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6">The Unary Not (!) Toggle</h3>
            <p className="text-slate-400 mb-6">The logical NOT operator flips a boolean. It's the standard way to build a toggle switch in Java.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center gap-6">
                <button 
                    onClick={() => setIsOn(!isOn)}
                    className={\`px-8 py-4 rounded-full font-bold text-xl border-4 transition-all duration-300 \${isOn ? 'bg-green-500 border-green-400 text-black shadow-[0_0_40px_rgba(34,197,94,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-400'}\`}
                >
                    {isOn ? 'POWER ON' : 'POWER OFF'}
                </button>
                <div className="text-mono font-bold text-orange-400 bg-black p-4 rounded border border-slate-800">
                    isPowerOn = !isPowerOn;
                </div>
            </div>
        </div>
    );
};
`;
if(l5.includes('export default function JavaLecture5() {')) {
    l5 = l5.replace('export default function JavaLecture5() {', l5Comp + '\nexport default function JavaLecture5() {');
    l5 = l5.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><LogicalNotToggle /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L5/page.tsx', l5);
}

// L6: Dangling Else Trap
let l6 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', 'utf8');
const l6Comp = `
// --- INTERACTIVE 4: Dangling Else Trap ---
const DanglingElse = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">The Dangling Else Trap</h3>
            <p className="text-slate-400 mb-6">Whitespace in Java means absolutely nothing. If you omit curly braces, an 'else' block will bind to the NEAREST 'if', regardless of how you indented the code!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500 text-black font-bold px-3 py-1 text-xs">WHAT IT LOOKS LIKE</div>
                    <span className="text-purple-400 mt-4 block">if</span> (user != null)\n
                    <div className="pl-4">
                        <span className="text-purple-400">if</span> (user.isAdmin())\n
                        <div className="pl-4 text-slate-300">grantAccess();</div>
                    </div>
                    <span className="text-purple-400 text-red-400">else</span> <span className="text-slate-500 italic">// Looks tied to outer if!</span>\n
                    <div className="pl-4 text-slate-300">throwError();</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-black font-bold px-3 py-1 text-xs">WHAT JAVA SEES</div>
                    <span className="text-purple-400 mt-4 block">if</span> (user != null) {'{'}\n
                    <div className="pl-4">
                        <span className="text-purple-400">if</span> (user.isAdmin()) {'{'}\n
                        <div className="pl-4 text-slate-300">grantAccess();</div>
                        {'}'} <span className="text-purple-400 text-green-400">else</span> {'{'} <span className="text-slate-500 italic">// Binds to nearest if!</span>\n
                        <div className="pl-4 text-slate-300">throwError();</div>
                        {'}'}
                    </div>
                    {'}'}
                </div>
            </div>
            <div className="mt-6 text-center text-orange-400 font-bold uppercase tracking-widest text-xs">
                Always use curly braces {} to prevent the Dangling Else!
            </div>
        </div>
    );
};
`;
if(l6.includes('export default function JavaLecture6() {')) {
    l6 = l6.replace('export default function JavaLecture6() {', l6Comp + '\nexport default function JavaLecture6() {');
    l6 = l6.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><DanglingElse /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', l6);
}

