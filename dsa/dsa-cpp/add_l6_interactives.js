const fs = require('fs');

const file = '/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L6/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const newComponents = `
// --- INTERACTIVE 3: Linear vs Binary 1-Million Element Race ---
const LinearVsBinaryRace = () => {
    const [running, setRunning] = useState(false);
    const [linearOps, setLinearOps] = useState(0);
    const [binaryOps, setBinaryOps] = useState(0);
    const [linearProgress, setLinearProgress] = useState(0);
    const [binaryProgress, setBinaryProgress] = useState(0);

    const N = 1000000;
    const target = 999999; // Worst case

    const runRace = async () => {
        if (running) return;
        setRunning(true);
        setLinearOps(0);
        setBinaryOps(0);
        setLinearProgress(0);
        setBinaryProgress(0);

        // Binary Search simulation
        let low = 0;
        let high = N - 1;
        let bOps = 0;
        
        while (low <= high) {
            bOps++;
            const mid = Math.floor((low + high) / 2);
            setBinaryOps(bOps);
            setBinaryProgress((mid / N) * 100);
            await new Promise(r => setTimeout(r, 200)); // slow it down to see
            if (mid === target) break;
            else if (mid < target) low = mid + 1;
            else high = mid - 1;
        }
        setBinaryProgress(100);

        // Linear Search simulation (animated over 5 seconds)
        const duration = 5000;
        const start = Date.now();
        
        const animateLinear = () => {
            const now = Date.now();
            const elapsed = now - start;
            if (elapsed >= duration) {
                setLinearOps(N);
                setLinearProgress(100);
                setRunning(false);
                return;
            }
            const prog = (elapsed / duration);
            setLinearOps(Math.floor(prog * N));
            setLinearProgress(prog * 100);
            requestAnimationFrame(animateLinear);
        };
        requestAnimationFrame(animateLinear);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Interactive 3: The 1-Million Element Race</h3>
            <p className="text-slate-400 mb-6">Let's visualize the exact difference between O(N) and O(log N). We have an array of <strong>1,000,000 elements</strong>. We are searching for the very last element (worst-case scenario).</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl">
                <div className="mb-8">
                    <button 
                        onClick={runRace}
                        disabled={running}
                        className="px-8 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Play size={16} /> START THE RACE
                    </button>
                </div>

                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h4 className="text-blue-400 font-bold text-xl uppercase tracking-widest">Binary Search</h4>
                                <p className="text-slate-500 text-xs">O(log N) Time</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-white font-mono">{binaryOps}</div>
                                <div className="text-slate-500 text-[10px] uppercase tracking-widest">Operations</div>
                            </div>
                        </div>
                        <div className="h-6 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-200" style={{ width: \`\${binaryProgress}%\` }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h4 className="text-red-400 font-bold text-xl uppercase tracking-widest">Linear Search</h4>
                                <p className="text-slate-500 text-xs">O(N) Time</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-white font-mono">{linearOps.toLocaleString()}</div>
                                <div className="text-slate-500 text-[10px] uppercase tracking-widest">Operations</div>
                            </div>
                        </div>
                        <div className="h-6 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-gradient-to-r from-red-600 to-orange-500" style={{ width: \`\${linearProgress}%\` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE 4: The Sorted Prerequisite Check ---
const SortedPrerequisiteCheck = () => {
    const sortedArray = [10, 20, 30, 40, 50, 60, 70];
    const unsortedArray = [40, 10, 70, 20, 50, 30, 60];
    
    const [isSorted, setIsSorted] = useState(false);
    const [target, setTarget] = useState(70);
    const [status, setStatus] = useState('idle');

    const runFailSearch = () => {
        const arr = isSorted ? sortedArray : unsortedArray;
        setStatus('searching');
        
        // Simulating the failure
        setTimeout(() => {
            let m = 3; // middle index (value 20 in unsorted)
            if (arr[m] === target) {
                setStatus('found');
            } else if (target > arr[m]) {
                // target 70 > 20, so binary search moves right
                // in unsorted, right side is [50, 30, 60] -> 70 is MISSING!
                setStatus('failed');
            } else {
                setStatus('failed');
            }
        }, 1000);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Interactive 4: The Unsorted Catastrophe</h3>
            <p className="text-slate-400 mb-6">Why does Binary Search require a sorted array? Let's run it on an unsorted array and watch what happens when we look for the number <strong>70</strong>.</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                <div className="flex gap-4 mb-8">
                    <button onClick={() => {setIsSorted(false); setStatus('idle');}} className={\`px-6 py-2 rounded-lg font-bold border transition-all \${!isSorted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}>Use Unsorted Array</button>
                    <button onClick={() => {setIsSorted(true); setStatus('idle');}} className={\`px-6 py-2 rounded-lg font-bold border transition-all \${isSorted ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}>Use Sorted Array</button>
                </div>

                <div className="flex gap-2 mb-8">
                    {(isSorted ? sortedArray : unsortedArray).map((val, i) => (
                        <div key={i} className={\`w-12 h-12 border-2 flex items-center justify-center font-bold text-lg rounded \${val === target ? 'border-blue-500 text-blue-400' : 'border-slate-700 text-white'}\`}>
                            {val}
                        </div>
                    ))}
                </div>

                <button 
                    onClick={runFailSearch}
                    disabled={status === 'searching'}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg mb-8"
                >
                    Run Binary Search for 70
                </button>

                {status === 'searching' && <div className="text-yellow-400 font-bold animate-pulse">Checking middle element...</div>}
                {status === 'failed' && !isSorted && (
                    <div className="bg-red-900/30 border border-red-500 p-4 rounded-xl text-center max-w-lg">
                        <div className="text-red-400 font-black text-xl mb-2">CATASTROPHIC FAILURE</div>
                        <div className="text-red-300 text-sm">The middle element is 20. Since 70 &gt; 20, Binary Search throws away the left half and looks right. But in this unsorted array, 70 is actually on the left side (index 2)! The algorithm just deleted the target.</div>
                    </div>
                )}
                {status === 'found' && isSorted && (
                    <div className="bg-green-900/30 border border-green-500 p-4 rounded-xl text-center">
                        <div className="text-green-400 font-black text-xl">SUCCESS</div>
                        <div className="text-green-300 text-sm">Because the array is sorted, the math holds true.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- INTERACTIVE 5: Search Space Halving Visualizer ---
const SearchSpaceHalving = () => {
    const [step, setStep] = useState(0);
    const maxSteps = 6;
    
    // 1 -> 1/2 -> 1/4 -> 1/8
    const fraction = Math.pow(2, step);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Interactive 5: Exponential Decay Visualized</h3>
            <p className="text-slate-400 mb-6">This block represents the total amount of data you have to search through. Watch how rapidly the search space is destroyed at each step of O(log N).</p>
            
            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="w-full max-w-3xl h-32 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex relative mb-8">
                    {/* The remaining block */}
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500 flex items-center justify-center font-bold text-white border-r-4 border-white"
                        style={{ width: \`\${100 / fraction}%\` }}
                    >
                        1/{fraction}
                    </div>
                    {/* The discarded blocks */}
                    <div 
                        className="h-full bg-red-950/20 border-l border-red-900/30 flex items-center justify-center"
                        style={{ width: \`\${100 - (100 / fraction)}%\` }}
                    >
                        <span className="text-red-900 font-black tracking-widest uppercase opacity-30 rotate-12">DISCARDED</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-50 transition-all"
                    >
                        Reverse
                    </button>
                    <button 
                        onClick={() => setStep(Math.min(maxSteps, step + 1))}
                        disabled={step === maxSteps}
                        className="px-6 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    >
                        Slice in Half
                    </button>
                    <button 
                        onClick={() => setStep(0)}
                        className="px-6 py-2 rounded-lg font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};
`;

if (!content.includes('LinearVsBinaryRace')) {
    // Inject components above default export
    content = content.replace('export default function DSALecture6() {', newComponents + '\nexport default function DSALecture6() {');
    
    // Inject rendered tags into UI
    const insertionPoint = '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <BinarySearchGame />\n                </section>\n\n            </div>';
    
    const uiTags = `</section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <BinarySearchGame />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <LinearVsBinaryRace />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <SortedPrerequisiteCheck />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <SearchSpaceHalving />
                </section>

            </div>`;
    
    content = content.replace(insertionPoint, uiTags);
    
    fs.writeFileSync(file, content);
    console.log('Injected 3 new interactives into L6.');
} else {
    console.log('L6 already has these interactives.');
}
