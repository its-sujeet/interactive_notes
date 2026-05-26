const fs = require('fs');

let l1 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 3: The Pointer Reality Check ---
const PointerRealityCheck = () => {
    const [selectedElement, setSelectedElement] = useState<number>(0);
    const baseAddress = 0x1000;
    
    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Pointer Reality Check</h3>
            <p className="text-slate-400 mb-6">In Java, an array is an object. In C++, an array is just a <strong className="text-blue-400">Pointer</strong> to a contiguous block of memory. The variable name itself holds the memory address of the first element.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl font-mono text-sm flex flex-col items-center">
                
                <div className="text-blue-400 mb-8 font-bold text-lg">
                    int arr[5] = {'{'}10, 20, 30, 40, 50{'}'};
                </div>

                {/* Memory Blocks */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {[0, 1, 2, 3, 4].map(idx => (
                        <div 
                            key={idx}
                            onMouseEnter={() => setSelectedElement(idx)}
                            className={\`w-24 border-2 rounded-lg flex flex-col overflow-hidden cursor-pointer transition-all duration-300 \${selectedElement === idx ? 'border-orange-500 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.4)] z-10' : 'border-slate-700 hover:border-slate-500'}\`}
                        >
                            <div className={\`text-center py-1 text-xs font-bold \${selectedElement === idx ? 'bg-orange-500 text-black' : 'bg-slate-800 text-slate-500'}\`}>
                                arr[{idx}]
                            </div>
                            <div className="text-center py-4 text-white font-black text-xl bg-slate-900">
                                {(idx + 1) * 10}
                            </div>
                            <div className="text-center py-1 text-[10px] text-slate-500 bg-black">
                                0x{(baseAddress + (idx * 4)).toString(16).toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Panel */}
                <div className="w-full max-w-2xl bg-black border border-slate-800 rounded-xl p-6 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-slate-400">
                            Value of <code className="text-orange-400">arr[{selectedElement}]</code>
                        </div>
                        <div className="text-white font-bold text-right">
                            {(selectedElement + 1) * 10}
                        </div>
                        
                        <div className="text-slate-400">
                            Memory Address <code className="text-orange-400">&arr[{selectedElement}]</code>
                        </div>
                        <div className="text-white font-bold text-right">
                            0x{(baseAddress + (selectedElement * 4)).toString(16).toUpperCase()}
                        </div>
                        
                        <div className="col-span-2 border-t border-slate-800 my-2"></div>
                        
                        <div className="text-slate-400">
                            Pointer Arithmetic <code className="text-blue-400">*(arr + {selectedElement})</code>
                        </div>
                        <div className="text-green-400 font-bold text-right">
                            {(selectedElement + 1) * 10}
                        </div>
                    </div>
                </div>

            </div>

            <ExplainerCard 
                title="Array Decay and Pointer Arithmetic"
                text="In C++, when you pass 'arr' to a function, it 'decays' into a pointer (int*). This means the function does not know the length of the array! Furthermore, arr[2] is just syntactic sugar for *(arr + 2). The compiler takes the base memory address, adds (2 * sizeof(int)) bytes to it, and dereferences the value at that exact memory cell. This is why array indexing is extremely fast: O(1)." 
            />
        </div>
    );
};

// --- INTERACTIVE 4: Algorithm Characteristics Validator ---
const AlgorithmValidator = () => {
    const [selected, setSelected] = useState<string[]>([]);
    
    const characteristics = [
        { id: 'finiteness', name: 'Finiteness', desc: 'Must eventually terminate.' },
        { id: 'definiteness', name: 'Definiteness', desc: 'Each step must be unambiguously clear.' },
        { id: 'input', name: 'Input', desc: 'Has zero or more inputs.' },
        { id: 'output', name: 'Output', desc: 'Produces at least one output.' },
        { id: 'effectiveness', name: 'Effectiveness', desc: 'Operations must be basic enough to be done exactly.' }
    ];

    const toggle = (id: string) => {
        if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
        else setSelected([...selected, id]);
    };

    const isComplete = selected.length === 5;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Algorithm Characteristics Validator</h3>
            <p className="text-slate-400 mb-6">Not all code is an Algorithm. According to Donald Knuth, a true algorithm must possess five absolute characteristics. Select all 5 to validate a mathematical algorithm.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    {characteristics.map(c => (
                        <div 
                            key={c.id} 
                            onClick={() => toggle(c.id)}
                            className={\`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between \${selected.includes(c.id) ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#161b22] border-slate-700 hover:border-slate-500'}\`}
                        >
                            <div>
                                <h4 className={\`font-bold \${selected.includes(c.id) ? 'text-blue-400' : 'text-slate-300'}\`}>{c.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                            </div>
                            <div className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center \${selected.includes(c.id) ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-600'}\`}>
                                {selected.includes(c.id) && "✓"}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex items-center justify-center bg-black border border-slate-800 rounded-xl p-8 relative overflow-hidden">
                    {isComplete ? (
                        <div className="animate-in zoom-in duration-500 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.6)] mb-6 text-white">
                                ✓
                            </div>
                            <h3 className="text-2xl font-black text-green-400 tracking-widest uppercase mb-2">VALIDATED</h3>
                            <p className="text-slate-400 text-sm">Your procedure is officially an Algorithm.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center opacity-50">
                            <div className="w-24 h-24 border-4 border-dashed border-slate-700 rounded-full flex items-center justify-center mb-6">
                                <span className="text-slate-600 font-bold text-2xl">{selected.length}/5</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-500 tracking-widest uppercase mb-2">INCOMPLETE</h3>
                            <p className="text-slate-600 text-sm">Select all required characteristics.</p>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
};
`;

if(l1.includes('export default function DSALecture1() {')) {
    l1 = l1.replace('export default function DSALecture1() {', comp + '\nexport default function DSALecture1() {');
    l1 = l1.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><PointerRealityCheck /></section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><AlgorithmValidator /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', l1);
}

