const fs = require('fs');

let l3 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 3: 2D Array Memory Mapping ---
const TwoDimensionalMemoryVisualizer = () => {
    const [mapping, setMapping] = useState<'row' | 'col'>('row');
    const rows = 3;
    const cols = 4;
    
    // Create matrix data
    const matrix = [];
    let counter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            matrix.push({ r, c, val: counter++ });
        }
    }

    const flattened = mapping === 'row' 
        ? matrix 
        : [...matrix].sort((a, b) => a.c === b.c ? a.r - b.r : a.c - b.c);

    const getIndex = (r: number, c: number) => {
        return mapping === 'row' ? r * cols + c : c * rows + r;
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">2D Array Flattening (Row-Major)</h3>
            <p className="text-slate-400 mb-6">RAM is strictly 1-Dimensional. There is no such thing as a "grid" of memory. When you create a 2D matrix <code className="text-blue-400">arr[3][4]</code>, C++ flattens it into a 1D array using <strong>Row-Major Order</strong>.</p>
            
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setMapping('row')}
                    className={\`px-6 py-2 rounded-lg font-bold border transition-all \${mapping === 'row' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}
                >
                    Row-Major Order (C/C++)
                </button>
                <button 
                    onClick={() => setMapping('col')}
                    className={\`px-6 py-2 rounded-lg font-bold border transition-all \${mapping === 'col' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}
                >
                    Column-Major Order (Fortran)
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start mb-8">
                {/* 2D View */}
                <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl">
                    <div className="text-center font-mono text-xs text-slate-500 mb-4 uppercase tracking-widest">Mental Model (2D Grid)</div>
                    <div className="grid grid-cols-4 gap-2">
                        {matrix.map((cell, i) => {
                            const flatIdx = getIndex(cell.r, cell.c);
                            const hue = (flatIdx * 30) % 360;
                            return (
                                <div 
                                    key={i} 
                                    className="w-16 h-16 flex flex-col items-center justify-center border rounded-lg transition-all"
                                    style={{ 
                                        backgroundColor: \`hsla(\${hue}, 70%, 50%, 0.1)\`, 
                                        borderColor: \`hsla(\${hue}, 70%, 50%, 0.5)\` 
                                    }}
                                >
                                    <div className="text-white font-bold">{cell.val}</div>
                                    <div className="text-[9px] font-mono opacity-50">[{cell.r}][{cell.c}]</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="hidden xl:flex items-center justify-center">
                    <ArrowRight size={32} className="text-slate-700" />
                </div>
                <div className="flex xl:hidden items-center justify-center">
                    <ArrowRight size={32} className="text-slate-700 rotate-90" />
                </div>

                {/* 1D View */}
                <div className="bg-black border border-slate-800 p-6 rounded-xl flex-1 w-full overflow-x-auto">
                    <div className="text-center font-mono text-xs text-slate-500 mb-4 uppercase tracking-widest">Physical RAM (1D Memory)</div>
                    <div className="flex gap-0 min-w-max">
                        {flattened.map((cell, i) => {
                            const hue = (i * 30) % 360;
                            return (
                                <div 
                                    key={i}
                                    className="w-12 h-20 flex flex-col items-center justify-center border animate-in slide-in-from-left duration-300"
                                    style={{ 
                                        backgroundColor: \`hsla(\${hue}, 70%, 50%, 0.1)\`, 
                                        borderColor: \`hsla(\${hue}, 70%, 50%, 0.5)\`,
                                        borderRightWidth: i === flattened.length - 1 ? '1px' : '0px'
                                    }}
                                >
                                    <div className="text-white font-bold">{cell.val}</div>
                                    <div className="text-[8px] font-mono opacity-50 mt-1">idx:{i}</div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-400 font-mono text-center">
                        Address Formula: <br/>
                        <span className="text-white">Base + (Row × Num_Cols + Col) × Size</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};
`;

if (!l3.includes('TwoDimensionalMemoryVisualizer')) {
    // Insert component
    l3 = l3.replace('export default function DSALecture3', comp + '\nexport default function DSALecture3');
    // Inject it in the page
    l3 = l3.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <TwoDimensionalMemoryVisualizer />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx', l3);
    console.log('Injected 2D Array Visualizer into L3.');
} else {
    console.log('Already exists');
}
