const fs = require('fs');

let l1 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 5: The Algorithmic Speed Race ---
const SpeedRace = () => {
    const [nValue, setNValue] = useState<number>(10);
    const [racing, setRacing] = useState(false);
    const [progress, setProgress] = useState({ o1: 0, oN: 0, oN2: 0 });

    const startRace = () => {
        if (racing) return;
        setRacing(true);
        setProgress({ o1: 0, oN: 0, oN2: 0 });

        // Calculate relative times (fake ms for simulation)
        // O(1) is always instant (e.g. 50ms)
        // O(N) scales linearly (e.g. N * 5ms)
        // O(N^2) scales quadratically (e.g. N^2 * 0.5ms)

        const t1 = 200;
        const tN = Math.max(200, nValue * 15);
        const tN2 = Math.max(200, Math.pow(nValue, 2) * 0.5);

        const animate = (targetTime: number, key: 'o1' | 'oN' | 'oN2') => {
            let start = performance.now();
            const step = (timestamp: number) => {
                const elapsed = timestamp - start;
                const percent = Math.min(100, (elapsed / targetTime) * 100);
                setProgress(prev => ({ ...prev, [key]: percent }));
                if (percent < 100) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        animate(t1, 'o1');
        animate(tN, 'oN');
        animate(tN2, 'oN2');

        setTimeout(() => setRacing(false), Math.max(t1, tN, tN2) + 100);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">The Algorithmic Speed Race</h3>
            <p className="text-slate-400 mb-6">Watch how Time Complexity scales with the Input Size (N). For small N, bad algorithms look fine. But crank N up to 100, and watch the O(N²) algorithm completely choke.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl mb-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex-1">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Input Size (N) = {nValue}</span>
                        <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            step="10"
                            value={nValue} 
                            onChange={(e) => setNValue(Number(e.target.value))} 
                            disabled={racing}
                            className="w-full accent-blue-500" 
                        />
                    </div>
                    <button 
                        onClick={startRace}
                        disabled={racing}
                        className={\`px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all \${racing ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105'}\`}
                    >
                        {racing ? 'Racing...' : 'Start Race'}
                    </button>
                </div>

                <div className="space-y-6">
                    {/* O(1) */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-green-400 font-mono">O(1) - Constant</span>
                            <span className="text-slate-500">{progress.o1 === 100 ? 'Finished' : progress.o1 > 0 ? 'Running' : 'Ready'}</span>
                        </div>
                        <div className="h-4 bg-black rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)] transition-all ease-linear" style={{ width: \`\${progress.o1}%\` }}></div>
                        </div>
                    </div>
                    
                    {/* O(N) */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-yellow-400 font-mono">O(N) - Linear</span>
                            <span className="text-slate-500">{progress.oN === 100 ? 'Finished' : progress.oN > 0 ? 'Running' : 'Ready'}</span>
                        </div>
                        <div className="h-4 bg-black rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,1)] transition-all ease-linear" style={{ width: \`\${progress.oN}%\` }}></div>
                        </div>
                    </div>

                    {/* O(N^2) */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-red-500 font-mono">O(N²) - Quadratic</span>
                            <span className="text-slate-500">{progress.oN2 === 100 ? 'Finished' : progress.oN2 > 0 ? 'Running' : 'Ready'}</span>
                        </div>
                        <div className="h-4 bg-black rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] transition-all ease-linear" style={{ width: \`\${progress.oN2}%\` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <ExplainerCard 
                title="The Scaling Disaster"
                text="At N=10, O(N^2) does 100 operations. It looks perfectly fine. But at N=100, it does 10,000 operations. If N is 1,000,000 (a small database table), O(N^2) attempts 1 Trillion operations, locking up the CPU completely. This is why algorithmic complexity analysis is the most important skill in computer science." 
            />
        </div>
    );
};


// --- INTERACTIVE 6: Memory Footprint Calculator ---
const MemoryCalculator = () => {
    const [dataType, setDataType] = useState<number>(4); // bytes
    const [elementCount, setElementCount] = useState<number>(1000);

    const totalBytes = dataType * elementCount;
    
    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return bytes + " Bytes";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Space Complexity Calculator</h3>
            <p className="text-slate-400 mb-6">Space complexity isn't just theory—it dictates exactly how much RAM your arrays will burn in production. In C++, you must be hyper-aware of the byte-sizes of your primitives.</p>

            <div className="bg-[#161b22] border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center">
                
                <div className="flex-1 w-full space-y-6">
                    <div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Data Type (Primitive Size)</span>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setDataType(1)} className={\`py-2 rounded border \${dataType === 1 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}\`}>char (1 Byte)</button>
                            <button onClick={() => setDataType(2)} className={\`py-2 rounded border \${dataType === 2 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}\`}>short (2 Bytes)</button>
                            <button onClick={() => setDataType(4)} className={\`py-2 rounded border \${dataType === 4 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}\`}>int / float (4 Bytes)</button>
                            <button onClick={() => setDataType(8)} className={\`py-2 rounded border \${dataType === 8 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'}\`}>double / long long (8 Bytes)</button>
                        </div>
                    </div>
                    
                    <div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Array Size (N): {elementCount.toLocaleString()}</span>
                        <input 
                            type="range" 
                            min="1000" 
                            max="10000000" 
                            step="1000"
                            value={elementCount} 
                            onChange={(e) => setElementCount(Number(e.target.value))} 
                            className="w-full accent-cyan-500" 
                        />
                    </div>
                </div>

                <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-black border border-slate-800 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                        <HardDrive size={120} />
                    </div>
                    <span className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-4 z-10">Total RAM Allocated</span>
                    <div className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10">
                        {formatBytes(totalBytes)}
                    </div>
                    <div className="text-slate-600 font-mono text-sm mt-4 z-10">
                        {elementCount.toLocaleString()} × {dataType} Bytes
                    </div>
                </div>

            </div>

            <ExplainerCard 
                title="The Cost of Precision"
                text="Notice that using a 'double' (8 bytes) instead of a 'float' (4 bytes) literally doubles your RAM footprint. If you are building an array with 10 Million elements (like rendering pixels on a 4K screen), choosing the wrong primitive type could waste 40 Megabytes of RAM instantly. This is why C++ offers so many specific primitive sizes." 
            />
        </div>
    );
};
`;

if(l1.includes('export default function DSALecture1() {')) {
    l1 = l1.replace('export default function DSALecture1() {', comp + '\nexport default function DSALecture1() {');
    l1 = l1.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><SpeedRace /></section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><MemoryCalculator /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', l1);
}

