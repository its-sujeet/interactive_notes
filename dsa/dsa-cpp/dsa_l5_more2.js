const fs = require('fs');

let l5 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 4: Sorting Stability Visualizer ---
const StabilityVisualizer = () => {
    // Array with two '5's to demonstrate stability
    const initialArray = [
        { val: 8, id: 'A', color: 'text-slate-300' },
        { val: 5, id: 'A', color: 'text-blue-400' }, 
        { val: 2, id: 'A', color: 'text-slate-300' },
        { val: 5, id: 'B', color: 'text-purple-400' }
    ];
    
    const [array, setArray] = useState([...initialArray]);
    const [sortType, setSortType] = useState<'stable' | 'unstable'>('unstable');
    const [isSorting, setIsSorting] = useState(false);
    const [status, setStatus] = useState("Ready. Notice the two 5s (5A is Blue, 5B is Purple).");

    const reset = () => {
        setArray([...initialArray]);
        setIsSorting(false);
        setStatus("Ready. Notice the two 5s (5A is Blue, 5B is Purple).");
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setStatus(\`Running \${sortType === 'stable' ? 'Bubble Sort (Stable)' : 'Selection Sort (Unstable)'}...\`);
        
        let tempArr = [...array];
        let n = tempArr.length;
        
        if (sortType === 'stable') {
            // Bubble Sort (Stable)
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (tempArr[j].val > tempArr[j + 1].val) {
                        let temp = tempArr[j];
                        tempArr[j] = tempArr[j + 1];
                        tempArr[j + 1] = temp;
                        setArray([...tempArr]);
                        await new Promise(r => setTimeout(r, 600));
                    }
                }
            }
            setStatus("Sorted! Notice 5A is still before 5B. The relative order was preserved.");
        } else {
            // Selection Sort (Unstable)
            for (let i = 0; i < n - 1; i++) {
                let min_idx = i;
                for (let j = i + 1; j < n; j++) {
                    if (tempArr[j].val < tempArr[min_idx].val) {
                        min_idx = j;
                    }
                }
                if (min_idx !== i) {
                    let temp = tempArr[i];
                    tempArr[i] = tempArr[min_idx];
                    tempArr[min_idx] = temp;
                    setArray([...tempArr]);
                    await new Promise(r => setTimeout(r, 800));
                }
            }
            setStatus("Sorted! Notice 5B jumped in front of 5A. The relative order was DESTROYED.");
        }
        
        setIsSorting(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Sorting Stability</h3>
            <p className="text-slate-400 mb-6">A sorting algorithm is <strong>Stable</strong> if it preserves the relative order of equal elements. <strong>Unstable</strong> algorithms might accidentally swap them while moving other elements around. Bubble and Insertion sort are stable. Selection sort is unstable.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-emerald-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex gap-4 mb-12">
                    {array.map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-16 h-20 bg-[#161b22] border border-slate-700 rounded-lg flex flex-col items-center justify-center transition-all duration-300">
                                <div className="text-2xl font-bold text-white">{item.val}</div>
                                <div className={\`font-mono text-xs font-bold \${item.color}\`}>{item.id}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 w-full justify-center">
                    <button 
                        onClick={() => { setSortType('stable'); setArray([...initialArray]); }}
                        disabled={isSorting}
                        className={\`px-6 py-2 font-bold rounded-lg transition-colors \${sortType === 'stable' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}\`}
                    >
                        Select: Bubble Sort (Stable)
                    </button>
                    <button 
                        onClick={() => { setSortType('unstable'); setArray([...initialArray]); }}
                        disabled={isSorting}
                        className={\`px-6 py-2 font-bold rounded-lg transition-colors \${sortType === 'unstable' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}\`}
                    >
                        Select: Selection Sort (Unstable)
                    </button>
                </div>
                
                <div className="flex gap-4 w-full justify-center mt-6 pt-6 border-t border-slate-800">
                    <button 
                        onClick={runSort} 
                        disabled={isSorting}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
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

if (!l5.includes('StabilityVisualizer')) {
    l5 = l5.replace('export default function DSALecture5', comp + '\nexport default function DSALecture5');
    l5 = l5.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <StabilityVisualizer />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', l5);
    console.log('Injected StabilityVisualizer into L5.');
} else {
    console.log('Already exists');
}
