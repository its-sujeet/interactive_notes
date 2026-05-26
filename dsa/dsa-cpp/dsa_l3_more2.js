const fs = require('fs');

let l3 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 4: Pointer Arithmetic Sandbox ---
const PointerArithmeticSandbox = () => {
    const [ptrType, setPtrType] = useState<'int' | 'double'>('int');
    const [ptrOffset, setPtrOffset] = useState(0);
    const baseAddr = 0x1000;
    
    const types = {
        int: { size: 4, color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/20' },
        double: { size: 8, color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/20' }
    };
    
    const currentType = types[ptrType];
    const currentAddr = baseAddr + (ptrOffset * currentType.size);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Pointer Arithmetic Sandbox</h3>
            <p className="text-slate-400 mb-6">In C++, the array variable itself is just a <strong>pointer</strong> to the first element's memory address. When you add <code className="text-blue-400">+1</code> to a pointer, it doesn't add 1 byte. It adds <strong>1 unit of the data type's size</strong>. This is called Pointer Arithmetic.</p>
            
            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                {/* Pointer Code Simulation */}
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8 font-mono text-sm shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                        <Zap size={48} />
                    </div>
                    <div className="text-slate-400 mb-2">// 1. Declare pointer</div>
                    <div><span className="text-blue-400">{ptrType}</span>* ptr = arr; <span className="text-slate-500">// Points to 0x{baseAddr.toString(16)}</span></div>
                    
                    <div className="text-slate-400 mt-4 mb-2">// 2. Perform arithmetic</div>
                    <div className="flex items-center gap-4">
                        <div className="text-white">ptr = ptr + <span className="text-green-400">{ptrOffset}</span>;</div>
                        <div className="flex gap-2 ml-auto z-10">
                            <button onClick={() => setPtrOffset(Math.max(0, ptrOffset - 1))} className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded text-white">-</button>
                            <button onClick={() => setPtrOffset(Math.min(5, ptrOffset + 1))} className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded text-white">+</button>
                        </div>
                    </div>
                </div>

                {/* Memory Visualization */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <button onClick={() => { setPtrType('int'); setPtrOffset(0); }} className={\`px-4 py-1 text-xs rounded border transition-all \${ptrType === 'int' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}\`}>int* (4 Bytes)</button>
                            <button onClick={() => { setPtrType('double'); setPtrOffset(0); }} className={\`px-4 py-1 text-xs rounded border transition-all \${ptrType === 'double' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800 border-slate-700 text-slate-500'}\`}>double* (8 Bytes)</button>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-12 relative flex justify-center">
                    <div className="flex gap-1 relative pt-8">
                        {Array.from({length: 6}).map((_, i) => {
                            const isTarget = i === ptrOffset;
                            const addr = baseAddr + (i * currentType.size);
                            return (
                                <div key={i} className="flex flex-col items-center relative">
                                    {isTarget && (
                                        <div className="absolute -top-12 flex flex-col items-center animate-bounce text-red-500">
                                            <div className="font-mono text-xs font-bold mb-1">ptr</div>
                                            <ArrowRight className="rotate-90" size={20} />
                                        </div>
                                    )}
                                    <div className={\`w-20 h-16 border-2 flex items-center justify-center transition-all duration-300 \${isTarget ? \`\${currentType.bg} \${currentType.border} \${currentType.color} scale-110 z-10 shadow-[0_0_20px_currentColor]\` : 'bg-[#161b22] border-slate-800 text-slate-600'}\`}>
                                        arr[{i}]
                                    </div>
                                    <div className={\`mt-3 font-mono text-[10px] transition-colors \${isTarget ? 'text-white font-bold' : 'text-slate-500'}\`}>
                                        0x{addr.toString(16)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
`;

if (!l3.includes('PointerArithmeticSandbox')) {
    l3 = l3.replace('export default function DSALecture3', comp + '\nexport default function DSALecture3');
    l3 = l3.replace('</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <TwoDimensionalMemoryVisualizer />', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <TwoDimensionalMemoryVisualizer />\n                </section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <PointerArithmeticSandbox />');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx', l3);
    console.log('Injected Pointer Arithmetic Sandbox into L3.');
} else {
    console.log('Already exists');
}
