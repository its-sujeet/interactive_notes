const fs = require('fs');

let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 5: Array Merging (Two-Pointer Technique) ---
const MergeVisualizer = () => {
    const arr1 = [2, 5, 8, 12];
    const arr2 = [3, 7, 10, 15, 18];
    const targetSize = arr1.length + arr2.length;
    
    const [ptr1, setPtr1] = useState(0);
    const [ptr2, setPtr2] = useState(0);
    const [merged, setMerged] = useState<number[]>([]);
    
    const [isMerging, setIsMerging] = useState(false);
    const [status, setStatus] = useState("Ready to merge.");

    const reset = () => {
        setPtr1(0);
        setPtr2(0);
        setMerged([]);
        setStatus("Ready to merge.");
        setIsMerging(false);
    };

    const runMerge = async () => {
        if (isMerging) return;
        setIsMerging(true);
        setStatus("Starting Two-Pointer Merge...");
        
        let p1 = 0;
        let p2 = 0;
        let tempMerged: number[] = [];

        while (p1 < arr1.length && p2 < arr2.length) {
            setPtr1(p1);
            setPtr2(p2);
            setStatus(\`Comparing Arr1[\${p1}] (\${arr1[p1]}) and Arr2[\${p2}] (\${arr2[p2]})\`);
            await new Promise(r => setTimeout(r, 600));

            if (arr1[p1] <= arr2[p2]) {
                setStatus(\`\${arr1[p1]} <= \${arr2[p2]}, pushing \${arr1[p1]} to Merged Array\`);
                tempMerged.push(arr1[p1]);
                p1++;
            } else {
                setStatus(\`\${arr2[p2]} < \${arr1[p1]}, pushing \${arr2[p2]} to Merged Array\`);
                tempMerged.push(arr2[p2]);
                p2++;
            }
            
            setMerged([...tempMerged]);
            setPtr1(p1);
            setPtr2(p2);
            await new Promise(r => setTimeout(r, 600));
        }

        // Exhaust remaining elements
        while (p1 < arr1.length) {
            setStatus(\`Arr2 is empty. Pushing remaining \${arr1[p1]} from Arr1\`);
            setPtr1(p1);
            await new Promise(r => setTimeout(r, 600));
            tempMerged.push(arr1[p1]);
            p1++;
            setMerged([...tempMerged]);
            setPtr1(p1);
        }

        while (p2 < arr2.length) {
            setStatus(\`Arr1 is empty. Pushing remaining \${arr2[p2]} from Arr2\`);
            setPtr2(p2);
            await new Promise(r => setTimeout(r, 600));
            tempMerged.push(arr2[p2]);
            p2++;
            setMerged([...tempMerged]);
            setPtr2(p2);
        }

        setStatus("Merge Complete! Time Complexity: O(N + M)");
        setIsMerging(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Array Merging: The Two-Pointer Technique</h3>
            <p className="text-slate-400 mb-6">Merging two <strong>sorted</strong> arrays into a single sorted array is a foundational operation (the backbone of MergeSort). Instead of joining them and re-sorting <code className="text-red-400">O((N+M)log(N+M))</code>, we use two pointers to merge them in exactly <code className="text-blue-400">O(N + M)</code> time.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-yellow-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex flex-col md:flex-row gap-12 w-full justify-center mb-12">
                    {/* Array 1 */}
                    <div className="flex flex-col items-center">
                        <div className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">Array 1</div>
                        <div className="flex gap-2">
                            {arr1.map((val, i) => {
                                const isCurrent = ptr1 === i && isMerging;
                                const isDone = ptr1 > i;
                                return (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={\`w-12 h-12 border flex items-center justify-center font-bold transition-all \${isCurrent ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 shadow-[0_0_15px_currentColor]' : isDone ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-30' : 'bg-[#161b22] border-slate-700 text-white'}\`}>
                                            {val}
                                        </div>
                                        {isCurrent && <div className="mt-2 text-blue-400 font-bold text-[10px] uppercase">Ptr 1</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Array 2 */}
                    <div className="flex flex-col items-center">
                        <div className="text-purple-400 font-bold mb-4 uppercase tracking-widest text-sm">Array 2</div>
                        <div className="flex gap-2">
                            {arr2.map((val, i) => {
                                const isCurrent = ptr2 === i && isMerging;
                                const isDone = ptr2 > i;
                                return (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={\`w-12 h-12 border flex items-center justify-center font-bold transition-all \${isCurrent ? 'bg-purple-500/20 border-purple-500 text-purple-400 scale-110 shadow-[0_0_15px_currentColor]' : isDone ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-30' : 'bg-[#161b22] border-slate-700 text-white'}\`}>
                                            {val}
                                        </div>
                                        {isCurrent && <div className="mt-2 text-purple-400 font-bold text-[10px] uppercase">Ptr 2</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-800 mb-12 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-slate-600 font-mono text-xs">MERGES INTO</div>
                </div>

                {/* Merged Array */}
                <div className="flex flex-col items-center mb-8">
                    <div className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Merged Array</div>
                    <div className="flex gap-2 min-h-[48px]">
                        {Array.from({length: targetSize}).map((_, i) => {
                            const val = merged[i];
                            const hasVal = val !== undefined;
                            return (
                                <div key={i} className={\`w-12 h-12 border flex items-center justify-center font-bold transition-all \${hasVal ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_currentColor] animate-in zoom-in' : 'bg-slate-900/50 border-slate-800 border-dashed text-slate-700'}\`}>
                                    {hasVal ? val : '?'}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-4 w-full justify-center">
                    <button 
                        onClick={runMerge} 
                        disabled={isMerging || merged.length === targetSize}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Play size={16} /> Start Two-Pointer Merge
                    </button>
                    <button 
                        onClick={reset} 
                        disabled={isMerging}
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

if (!l4.includes('MergeVisualizer')) {
    l4 = l4.replace('export default function DSALecture4', comp + '\nexport default function DSALecture4');
    l4 = l4.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <MergeVisualizer />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', l4);
    console.log('Injected MergeVisualizer into L4.');
} else {
    console.log('Already exists');
}
