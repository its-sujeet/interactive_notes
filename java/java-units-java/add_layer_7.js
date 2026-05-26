const fs = require('fs');

// Helpers for reading/writing
const processFile = (path, editor) => {
    let content = fs.readFileSync(path, 'utf8');
    content = editor(content);
    fs.writeFileSync(path, content);
};

// L1: Java Keyword Highlighter
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L1/page.tsx', (l1) => {
    const comp = `
// --- INTERACTIVE 7: Java Keyword Highlighter ---
const KeywordHighlighter = () => {
    const [activeKeyword, setActiveKeyword] = useState<'public'|'class'|'static'|'void'|'main'|'String'|'args'|null>(null);

    const definitions: any = {
        public: "Access Modifier: Anyone can access this. The JVM needs it to be public to execute it from outside.",
        class: "Blueprint: Everything in Java must reside inside a class.",
        static: "Memory Allocation: Means the method belongs to the class itself, not an instance. The JVM can run it without using 'new'.",
        void: "Return Type: This method returns nothing to the OS when it finishes.",
        main: "Entry Point: The exact method name the JVM looks for to start the program.",
        String: "Data Type: An array of characters. Note the capital 'S', meaning it's a Class, not a primitive.",
        args: "Parameter: The variable name for command-line arguments. You could technically name this 'tacos' and it would still work."
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Syntax Deconstructor</h3>
            <p className="text-slate-400 mb-6">Hover or tap on any word in the main method signature to reveal exactly why Java forces you to type it.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center min-h-[250px]">
                <div className="font-mono text-xl md:text-2xl font-bold flex flex-wrap justify-center gap-x-2 gap-y-4 mb-8">
                    <span onMouseEnter={() => setActiveKeyword('public')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">public</span>
                    <span onMouseEnter={() => setActiveKeyword('class')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">class</span>
                    <span className="text-slate-300">Main</span>
                    <span className="text-slate-300">{'{'}</span>
                    <br className="w-full"/>
                    &nbsp;&nbsp;
                    <span onMouseEnter={() => setActiveKeyword('public')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">public</span>
                    <span onMouseEnter={() => setActiveKeyword('static')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">static</span>
                    <span onMouseEnter={() => setActiveKeyword('void')} onMouseLeave={() => setActiveKeyword(null)} className="text-orange-400 cursor-help hover:bg-orange-500/20 px-1 rounded transition-colors">void</span>
                    <span onMouseEnter={() => setActiveKeyword('main')} onMouseLeave={() => setActiveKeyword(null)} className="text-blue-400 cursor-help hover:bg-blue-500/20 px-1 rounded transition-colors">main</span>
                    <span className="text-slate-300">(</span>
                    <span onMouseEnter={() => setActiveKeyword('String')} onMouseLeave={() => setActiveKeyword(null)} className="text-green-400 cursor-help hover:bg-green-500/20 px-1 rounded transition-colors">String</span>
                    <span className="text-slate-300">[]</span>
                    <span onMouseEnter={() => setActiveKeyword('args')} onMouseLeave={() => setActiveKeyword(null)} className="text-purple-400 cursor-help hover:bg-purple-500/20 px-1 rounded transition-colors">args</span>
                    <span className="text-slate-300">)</span>
                </div>
                
                <div className="h-20 w-full max-w-2xl text-center">
                    {activeKeyword ? (
                        <div className="text-white text-lg bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-in fade-in zoom-in duration-200">
                            <strong>{activeKeyword}</strong>: {definitions[activeKeyword]}
                        </div>
                    ) : (
                        <div className="text-slate-600 text-sm uppercase tracking-widest font-bold mt-4">Hover over the code...</div>
                    )}
                </div>
            </div>
        </div>
    );
};
`;
    l1 = l1.replace('export default function JavaLecture1() {', comp + '\nexport default function JavaLecture1() {');
    l1 = l1.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><KeywordHighlighter /></section>\n            </div>\n        </div>\n    );\n}');
    return l1;
});

// L2: Bytecode Viewer
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', (l2) => {
    const comp = `
// --- INTERACTIVE 8: Bytecode Viewer ---
const BytecodeViewer = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Inside the .class File (Bytecode)</h3>
            <p className="text-slate-400 mb-6">When you run <code className="text-orange-400">javac</code>, it doesn't create binary 1s and 0s. It creates JVM Bytecode. You can actually read this using the <code className="text-orange-400">javap -c</code> command!</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-700 rounded-xl overflow-hidden font-mono text-sm">
                <div className="bg-[#1e1e1e] p-6 border-b lg:border-b-0 lg:border-r border-slate-700">
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Source Code (Main.java)</div>
                    <div className="text-slate-300 leading-relaxed">
                        <span className="text-orange-400">public class</span> Main {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-orange-400">public static void</span> main(String[] args) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">int</span> x = <span className="text-green-400">5</span>;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(x);<br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </div>
                <div className="bg-black p-6">
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">javap -c Main.class</div>
                    <div className="text-green-400/80 leading-relaxed">
                        0: iconst_5 <span className="text-slate-600 ml-4">// Load int 5</span><br/>
                        1: istore_1 <span className="text-slate-600 ml-4">// Store into local var 1 (x)</span><br/>
                        2: getstatic #7 <span className="text-slate-600 ml-4">// Get System.out</span><br/>
                        5: iload_1  <span className="text-slate-600 ml-4">// Load local var 1</span><br/>
                        6: invokevirtual #13 <span className="text-slate-600 ml-2">// Call println()</span><br/>
                        9: return   <span className="text-slate-600 ml-4">// Void return</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
`;
    l2 = l2.replace('export default function JavaLecture2() {', comp + '\nexport default function JavaLecture2() {');
    l2 = l2.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><BytecodeViewer /></section>\n            </div>\n        </div>\n    );\n}');
    return l2;
});

// L3: Integer Overflow Simulator
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L3/page.tsx', (l3) => {
    const comp = `
// --- INTERACTIVE 6: Integer Overflow Simulator ---
const OverflowSimulator = () => {
    const [val, setVal] = useState(125);
    // Simulate byte overflow
    const simulatedByte = (val > 127) ? -128 + (val - 128) : val;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Overflow Trap (Ring Buffer)</h3>
            <p className="text-slate-400 mb-6">Primitive types are fixed in size. A <code className="text-orange-400">byte</code> maxes out at 127. If you forcefully add 1 to it, it doesn't crash—it wraps around to the lowest possible negative number (-128)!</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center gap-8">
                <div className="flex items-center gap-6">
                    <button onClick={() => setVal(v => v - 1)} className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-xl hover:bg-slate-700">-</button>
                    <div className="text-4xl font-mono font-bold text-orange-400 w-24 text-center">{val}</div>
                    <button onClick={() => setVal(v => v + 1)} className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-xl hover:bg-slate-700">+</button>
                </div>
                
                <div className="w-full max-w-md h-4 bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300" style={{ width: \`\${(val / 130) * 100}%\`}}></div>
                </div>

                <div className="flex gap-8 font-mono text-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-xs mb-1">Theoretical int</span>
                        <span className="text-white font-bold">{val}</span>
                    </div>
                    <div className="text-slate-600 font-bold">vs</div>
                    <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-xs mb-1">Actual (byte)myNum</span>
                        <span className={\`font-bold \${simulatedByte < 0 ? 'text-red-500' : 'text-green-400'}\`}>{simulatedByte}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
`;
    l3 = l3.replace('export default function JavaLecture3() {', comp + '\nexport default function JavaLecture3() {');
    l3 = l3.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><OverflowSimulator /></section>\n            </div>\n        </div>\n    );\n}');
    return l3;
});

// L4: Floating Point Precision Bug
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', (l4) => {
    const comp = `
// --- INTERACTIVE 5: Floating Point Precision ---
const FloatingPointPrecision = () => {
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Floating Point Lie</h3>
            <p className="text-slate-400 mb-6">Never use <code className="text-orange-400">double</code> or <code className="text-orange-400">float</code> for currency. Computers use Base-2 (binary) fractions, which cannot perfectly represent Base-10 decimals like 0.1.</p>
            
            <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-xl font-mono text-center flex flex-col items-center justify-center min-h-[200px]">
                <div className="text-orange-400 text-2xl font-bold mb-4">
                    double result = 0.1 + 0.2;
                </div>
                <div className="text-slate-400 text-sm mb-4">System.out.println(result);</div>
                <div className="text-red-400 text-4xl font-black bg-black px-6 py-2 rounded-lg border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    0.30000000000000004
                </div>
                <div className="mt-6 text-slate-500 text-xs tracking-widest uppercase font-bold">Use BigDecimal for Money!</div>
            </div>
        </div>
    );
};
`;
    l4 = l4.replace('export default function JavaLecture4() {', comp + '\nexport default function JavaLecture4() {');
    l4 = l4.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><FloatingPointPrecision /></section>\n            </div>\n        </div>\n    );\n}');
    return l4;
});

// L5: Ternary Nesting
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L5/page.tsx', (l5) => {
    const comp = `
// --- INTERACTIVE 6: Nested Ternary Nightmare ---
const NestedTernary = () => {
    const [age, setAge] = useState(25);
    const [isVip, setIsVip] = useState(false);

    // logic: age >= 18 ? (isVip ? "Free VIP Drink" : "Pay $10") : "Too Young"
    const result = age >= 18 ? (isVip ? "Free VIP Drink" : "Pay $10") : "Too Young";

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Nested Ternary Nightmare</h3>
            <p className="text-slate-400 mb-6">You can nest ternaries inside ternaries. This is a great way to show off your skills, and an even better way to make your senior developer yell at you for unreadable code.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl font-mono text-sm">
                <div className="flex gap-6 mb-8 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400">age:</span>
                        <input type="range" min="10" max="30" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-32"/>
                        <span className="text-orange-400 font-bold">{age}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400">isVip:</span>
                        <button onClick={() => setIsVip(!isVip)} className={\`px-4 py-1 rounded font-bold \${isVip ? 'bg-green-500 text-black' : 'bg-slate-700 text-white'}\`}>{isVip ? 'true' : 'false'}</button>
                    </div>
                </div>

                <div className="text-center text-xl text-slate-300 leading-loose">
                    String msg = <span className={\`transition-colors \${age >= 18 ? 'text-green-400 font-bold' : 'text-slate-500'}\`}>age &gt;= 18</span> ? <br/>
                    (<span className={\`transition-colors \${age >= 18 ? (isVip ? 'text-green-400 font-bold' : 'text-slate-500') : 'text-slate-700'}\`}>isVip</span> ? <span className={\`text-purple-400 \${result === 'Free VIP Drink' ? 'bg-purple-500/20 underline' : ''}\`}>"Free VIP Drink"</span> : <span className={\`text-yellow-400 \${result === 'Pay $10' ? 'bg-yellow-500/20 underline' : ''}\`}>"Pay $10"</span>) <br/>
                    : <span className={\`text-red-400 \${result === 'Too Young' ? 'bg-red-500/20 underline' : ''}\`}>"Too Young"</span>;
                </div>
            </div>
        </div>
    );
};
`;
    l5 = l5.replace('export default function JavaLecture5() {', comp + '\nexport default function JavaLecture5() {');
    l5 = l5.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><NestedTernary /></section>\n            </div>\n        </div>\n    );\n}');
    return l5;
});

// L6: Logic Gates Simulator (Wait, let's do IF-Else Visualizer)
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', (l6) => {
    const comp = `
// --- INTERACTIVE 5: Logical XOR Gate ---
const XORGate = () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const result = a !== b; // Java ^ operator

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Exclusive OR (^) Gate</h3>
            <p className="text-slate-400 mb-6">The <code className="text-orange-400">^</code> (XOR) operator is rarely used but extremely powerful. It only returns true if A and B are DIFFERENT.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex items-center justify-center gap-8">
                <div className="flex flex-col gap-4">
                    <button onClick={() => setA(!a)} className={\`w-20 h-20 rounded-xl font-bold text-2xl border-4 transition-all \${a ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-slate-700 text-slate-500'}\`}>
                        {a ? 'T' : 'F'}
                    </button>
                    <button onClick={() => setB(!b)} className={\`w-20 h-20 rounded-xl font-bold text-2xl border-4 transition-all \${b ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-slate-700 text-slate-500'}\`}>
                        {b ? 'T' : 'F'}
                    </button>
                </div>
                
                <div className="text-4xl text-slate-500 font-bold">➜</div>
                
                <div className={\`w-32 h-32 rounded-full flex items-center justify-center font-black text-3xl border-8 transition-all duration-500 \${result ? 'bg-green-500 border-green-400 text-white shadow-[0_0_50px_rgba(34,197,94,0.6)]' : 'bg-slate-900 border-slate-800 text-slate-600'}\`}>
                    {result ? 'TRUE' : 'FALSE'}
                </div>
            </div>
        </div>
    );
};
`;
    l6 = l6.replace('export default function JavaLecture6() {', comp + '\nexport default function JavaLecture6() {');
    l6 = l6.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><XORGate /></section>\n            </div>\n        </div>\n    );\n}');
    return l6;
});

