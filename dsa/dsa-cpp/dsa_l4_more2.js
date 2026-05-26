const fs = require('fs');

let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 4: Bubble Sort Visualizer ---
const BubbleSortVisualizer = () => {
    const initialArray = [42, 12, 89, 23, 77, 7, 51, 35];
    const [array, setArray] = useState<number[]>([...initialArray]);
    
    // Animation states
    const [compareIdx, setCompareIdx] = useState<number | null>(null);
    const [swapIdx, setSwapIdx] = useState<number | null>(null);
    const [sortedCount, setSortedCount] = useState(0);
    const [isSorting, setIsSorting] = useState(false);
    const [status, setStatus] = useState("Ready to sort.");

    const reset = () => {
        setArray([...initialArray]);
        setCompareIdx(null);
        setSwapIdx(null);
        setSortedCount(0);
        setStatus("Ready to sort.");
        setIsSorting(false);
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setStatus("Sorting started...");
        
        let tempArr = [...array];
        let n = tempArr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight comparison
                setCompareIdx(j);
                setStatus(\`Comparing arr[\${j}] (\${tempArr[j]}) and arr[\${j+1}] (\${tempArr[j+1]})\`);
                await new Promise(r => setTimeout(r, 400));
                
                if (tempArr[j] > tempArr[j + 1]) {
                    // Highlight swap
                    setSwapIdx(j);
                    setStatus(\`Swapping \${tempArr[j]} and \${tempArr[j+1]} because \${tempArr[j]} > \${tempArr[j+1]}\`);
                    await new Promise(r => setTimeout(r, 400));
                    
                    let temp = tempArr[j];
                    tempArr[j] = tempArr[j + 1];
                    tempArr[j + 1] = temp;
                    setArray([...tempArr]);
                    
                    await new Promise(r => setTimeout(r, 400));
                    setSwapIdx(null);
                }
            }
            // One element is fully sorted at the end
            setSortedCount(i + 1);
        }
        
        setSortedCount(n);
        setCompareIdx(null);
        setStatus("Array is fully sorted! Time complexity: O(N²)");
        setIsSorting(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Sorting Visualizer: Bubble Sort</h3>
            <p className="text-slate-400 mb-6">Sorting is the process of arranging elements in a specific order (e.g. ascending). <strong>Bubble Sort</strong> works by repeatedly stepping through the array, comparing adjacent elements, and swapping them if they are in the wrong order. Because it uses nested loops, it takes <code className="text-red-400">O(N²)</code> time.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-yellow-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex items-end gap-2 mb-12 h-40">
                    {array.map((val, i) => {
                        const isComparing = compareIdx === i || compareIdx === i - 1;
                        const isSwapping = swapIdx === i || swapIdx === i - 1;
                        const isSorted = i >= array.length - sortedCount;
                        
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div 
                                    className={\`w-10 flex items-center justify-center text-xs font-bold transition-all duration-300 \${isSwapping ? 'bg-red-500 border border-red-400 text-white shadow-[0_0_15px_currentColor]' : isComparing ? 'bg-yellow-500 border border-yellow-400 text-black shadow-[0_0_15px_currentColor]' : isSorted ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' : 'bg-[#161b22] border-slate-700 text-white border'}\`}
                                    style={{ height: \`\${val * 1.5}px\` }}
                                >
                                    {val}
                                </div>
                                <div className="mt-2 font-mono text-[10px] text-slate-500">[{i}]</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-4 w-full justify-center">
                    <button 
                        onClick={runSort} 
                        disabled={isSorting || sortedCount === array.length}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Play size={16} /> Start Bubble Sort
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

if (!l4.includes('BubbleSortVisualizer')) {
    l4 = l4.replace('export default function DSALecture4', comp + '\nexport default function DSALecture4');
    l4 = l4.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <BubbleSortVisualizer />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', l4);
    console.log('Injected BubbleSortVisualizer into L4.');
} else {
    console.log('Already exists');
}
