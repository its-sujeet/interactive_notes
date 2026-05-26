const fs = require('fs');

let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 3: Search Engine Race (Linear vs Binary) ---
const SearchVisualizer = () => {
    const array = [2, 7, 12, 19, 23, 29, 35, 42, 51, 68, 77, 84, 91, 99];
    const [target, setTarget] = useState<number>(42);
    
    // Linear State
    const [linIdx, setLinIdx] = useState<number | null>(null);
    const [linStatus, setLinStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
    const [linSteps, setLinSteps] = useState(0);

    // Binary State
    const [binLow, setBinLow] = useState<number | null>(null);
    const [binHigh, setBinHigh] = useState<number | null>(null);
    const [binMid, setBinMid] = useState<number | null>(null);
    const [binStatus, setBinStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
    const [binSteps, setBinSteps] = useState(0);
    
    const [isSearching, setIsSearching] = useState(false);

    const reset = () => {
        setLinIdx(null); setLinStatus('idle'); setLinSteps(0);
        setBinLow(null); setBinHigh(null); setBinMid(null); setBinStatus('idle'); setBinSteps(0);
    };

    const runSearch = async () => {
        if (isSearching) return;
        reset();
        setIsSearching(true);
        
        let foundLin = false;
        let foundBin = false;

        // Async wrappers to run them in parallel
        const runLinear = async () => {
            setLinStatus('searching');
            for (let i = 0; i < array.length; i++) {
                setLinIdx(i);
                setLinSteps(s => s + 1);
                await new Promise(r => setTimeout(r, 400));
                if (array[i] === target) {
                    setLinStatus('found');
                    foundLin = true;
                    return;
                }
            }
            setLinStatus('not_found');
        };

        const runBinary = async () => {
            setBinStatus('searching');
            let l = 0;
            let r = array.length - 1;
            
            while (l <= r) {
                setBinLow(l);
                setBinHigh(r);
                await new Promise(res => setTimeout(res, 400));
                
                const mid = Math.floor((l + r) / 2);
                setBinMid(mid);
                setBinSteps(s => s + 1);
                await new Promise(res => setTimeout(res, 600));

                if (array[mid] === target) {
                    setBinStatus('found');
                    foundBin = true;
                    return;
                } else if (array[mid] < target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            setBinStatus('not_found');
        };

        await Promise.all([runLinear(), runBinary()]);
        setIsSearching(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Algorithm Race: Linear vs Binary Search</h3>
            <p className="text-slate-400 mb-6">Finding data in an array can be slow. <strong>Linear Search</strong> checks every element <code className="text-red-400">O(N)</code>. But if the array is sorted, <strong>Binary Search</strong> cuts the search space in half every step <code className="text-blue-400">O(log N)</code>. Let's race them.</p>
            
            <div className="flex items-center gap-4 mb-8 bg-black p-4 rounded-xl border border-slate-800">
                <div className="text-white font-bold">Target Value:</div>
                <input 
                    type="number" 
                    value={target} 
                    onChange={e => setTarget(Number(e.target.value))}
                    className="w-24 bg-slate-900 border border-slate-700 rounded p-2 text-white text-center font-bold"
                />
                <button 
                    onClick={runSearch}
                    disabled={isSearching}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors ml-auto"
                >
                    Start Race
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Linear Search Track */}
                <div className="flex-1 bg-black border border-slate-800 p-6 rounded-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-red-400 font-bold tracking-widest text-sm uppercase">Linear Search</div>
                        <div className="text-slate-500 font-mono text-xs">O(N)</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                        {array.map((val, i) => {
                            const isChecking = linIdx === i && linStatus === 'searching';
                            const isFound = linIdx === i && linStatus === 'found';
                            const isPassed = linIdx !== null && i < linIdx && !isFound;
                            
                            return (
                                <div key={i} className={\`w-10 h-10 border flex items-center justify-center text-sm font-bold transition-all \${isFound ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_15px_currentColor] z-10' : isChecking ? 'bg-red-500/20 border-red-500 text-red-400 scale-110 z-10 shadow-[0_0_15px_currentColor]' : isPassed ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-50' : 'bg-[#161b22] border-slate-700 text-slate-400'}\`}>
                                    {val}
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-auto bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="text-slate-400 text-sm">Operations (Steps):</div>
                        <div className="font-mono text-2xl text-white font-bold">{linSteps}</div>
                    </div>
                </div>

                {/* Binary Search Track */}
                <div className="flex-1 bg-black border border-slate-800 p-6 rounded-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-blue-400 font-bold tracking-widest text-sm uppercase">Binary Search</div>
                        <div className="text-slate-500 font-mono text-xs">O(log N)</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                        {array.map((val, i) => {
                            const isOut = (binLow !== null && i < binLow) || (binHigh !== null && i > binHigh);
                            const isMid = binMid === i;
                            const isFound = isMid && binStatus === 'found';
                            
                            return (
                                <div key={i} className={\`w-10 h-10 border flex items-center justify-center text-sm font-bold transition-all relative \${isFound ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_15px_currentColor] z-10' : isMid ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 z-10 shadow-[0_0_15px_currentColor]' : isOut ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-20' : 'bg-[#161b22] border-slate-700 text-slate-400'}\`}>
                                    {val}
                                    {binLow === i && !isOut && <div className="absolute -bottom-4 text-[8px] text-blue-400 font-bold">L</div>}
                                    {binHigh === i && !isOut && <div className="absolute -bottom-4 text-[8px] text-purple-400 font-bold">R</div>}
                                    {isMid && <div className="absolute -top-4 text-[8px] text-white font-bold animate-bounce">M</div>}
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-auto bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="text-slate-400 text-sm">Operations (Steps):</div>
                        <div className="font-mono text-2xl text-white font-bold">{binSteps}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
`;

if (!l4.includes('SearchVisualizer')) {
    l4 = l4.replace('export default function DSALecture4', comp + '\nexport default function DSALecture4');
    l4 = l4.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <SearchVisualizer />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', l4);
    console.log('Injected SearchVisualizer into L4.');
} else {
    console.log('Already exists');
}
