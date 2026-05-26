const fs = require('fs');

let l5 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 5: Adaptability Visualizer (Best Case O(N)) ---
const AdaptabilityVisualizer = () => {
    // A nearly sorted array
    const initialArray = [10, 20, 30, 40, 50, 60, 70, 80];
    
    const [array, setArray] = useState([...initialArray]);
    const [sortType, setSortType] = useState<'insertion' | 'selection'>('insertion');
    const [isSorting, setIsSorting] = useState(false);
    const [status, setStatus] = useState("Array is ALREADY SORTED. Let's see how the algorithms handle it.");
    const [operations, setOperations] = useState(0);

    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    const reset = () => {
        setArray([...initialArray]);
        setIsSorting(false);
        setStatus("Array is ALREADY SORTED. Let's see how the algorithms handle it.");
        setOperations(0);
        setActiveIdx(null);
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setOperations(0);
        setStatus(\`Running \${sortType === 'insertion' ? 'Insertion Sort (Adaptive)' : 'Selection Sort (Non-Adaptive)'}...\`);
        
        let tempArr = [...array];
        let n = tempArr.length;
        let ops = 0;
        
        if (sortType === 'insertion') {
            // Insertion Sort (Adaptive)
            for (let i = 1; i < n; i++) {
                setActiveIdx(i);
                ops++;
                setOperations(ops);
                // Compare with previous. It's already larger, so loop breaks immediately.
                setStatus(\`Checking \${tempArr[i]}. It is > \${tempArr[i-1]}, no shifting needed.\`);
                await new Promise(r => setTimeout(r, 600));
            }
            setStatus(\`Insertion Sort recognized it was already sorted! Finished in O(N) time with only \${ops} operations.\`);
        } else {
            // Selection Sort (Non-Adaptive)
            for (let i = 0; i < n - 1; i++) {
                let min_idx = i;
                for (let j = i + 1; j < n; j++) {
                    setActiveIdx(j);
                    ops++;
                    setOperations(ops);
                    if (tempArr[j] < tempArr[min_idx]) {
                        min_idx = j;
                    }
                    if (ops % 3 === 0) {
                        setStatus(\`Blindly scanning for minimum... (Ops: \${ops})\`);
                        await new Promise(r => setTimeout(r, 100));
                    }
                }
            }
            setStatus(\`Selection Sort is completely blind to existing order. It wasted \${ops} operations! O(N²)\`);
        }
        
        setActiveIdx(null);
        setIsSorting(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Algorithm Adaptability (Best-Case Scenario)</h3>
            <p className="text-slate-400 mb-6">An algorithm is <strong>Adaptive</strong> if it runs faster when the data is already partially or fully sorted. <strong>Insertion Sort</strong> is highly adaptive (Best case: <code className="text-green-400">O(N)</code>). <strong>Selection Sort</strong> is non-adaptive; it always blindly scans everything (Best case: <code className="text-red-400">O(N²)</code>).</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-orange-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex items-end gap-2 mb-8 h-32 w-full justify-center">
                    {array.map((val, i) => {
                        const isActive = i === activeIdx;
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div 
                                    className={\`w-12 flex items-center justify-center text-xs font-bold transition-all duration-300 \${isActive ? 'bg-orange-500 border border-orange-400 text-white shadow-[0_0_15px_currentColor] -translate-y-2' : 'bg-emerald-900 border border-emerald-700 text-emerald-400'}\`}
                                    style={{ height: \`\${val * 1.2}px\` }}
                                >
                                    {val}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-lg flex gap-8 items-center justify-center mb-8">
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Total Operations:</span>
                    <span className="text-3xl font-mono font-bold text-white">{operations}</span>
                </div>

                <div className="flex flex-wrap gap-4 w-full justify-center">
                    <button 
                        onClick={() => { setSortType('insertion'); reset(); }}
                        disabled={isSorting}
                        className={\`px-6 py-2 font-bold rounded-lg transition-colors \${sortType === 'insertion' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}\`}
                    >
                        Select: Insertion Sort (Adaptive)
                    </button>
                    <button 
                        onClick={() => { setSortType('selection'); reset(); }}
                        disabled={isSorting}
                        className={\`px-6 py-2 font-bold rounded-lg transition-colors \${sortType === 'selection' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}\`}
                    >
                        Select: Selection Sort (Non-Adaptive)
                    </button>
                </div>
                
                <div className="flex gap-4 w-full justify-center mt-6 pt-6 border-t border-slate-800">
                    <button 
                        onClick={runSort} 
                        disabled={isSorting}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Play size={16} /> Execute Sort
                    </button>
                    <button 
                        onClick={reset} 
                        disabled={isSorting}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-bold rounded-lg transition-colors border border-slate-600 flex items-center gap-2"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
};
`;

if (!l5.includes('AdaptabilityVisualizer')) {
    l5 = l5.replace('export default function DSALecture5', comp + '\nexport default function DSALecture5');
    l5 = l5.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <AdaptabilityVisualizer />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', l5);
    console.log('Injected AdaptabilityVisualizer into L5.');
} else {
    console.log('Already exists');
}
