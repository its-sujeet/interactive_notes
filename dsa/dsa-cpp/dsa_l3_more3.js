const fs = require('fs');

let l3 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 5: Stack vs Heap Allocation ---
const StackVsHeapVisualizer = () => {
    const [allocation, setAllocation] = useState<'none' | 'stack' | 'heap'>('none');
    const [isDeleted, setIsDeleted] = useState(false);

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Static vs Dynamic Allocation (Stack vs Heap)</h3>
            <p className="text-slate-400 mb-6">In C++, where your array lives determines how it behaves. <strong>Static Arrays</strong> live on the Stack (fast, auto-cleanup, but fixed size). <strong>Dynamic Arrays</strong> live on the Heap (flexible size, but requires manual <code className="text-red-400">delete[]</code> cleanup).</p>

            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => { setAllocation('stack'); setIsDeleted(false); }}
                    className={\`px-6 py-2 rounded-lg font-bold border transition-all \${allocation === 'stack' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}
                >
                    int arr[5]; (Stack)
                </button>
                <button 
                    onClick={() => { setAllocation('heap'); setIsDeleted(false); }}
                    className={\`px-6 py-2 rounded-lg font-bold border transition-all \${allocation === 'heap' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_currentColor]' : 'bg-slate-900 border-slate-800 text-slate-500'}\`}
                >
                    int* arr = new int[5]; (Heap)
                </button>
            </div>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 shadow-inner">
                {/* The Stack */}
                <div className="flex-1 border border-slate-800 rounded-xl bg-[#161b22] overflow-hidden flex flex-col">
                    <div className="bg-blue-900/30 border-b border-blue-900/50 p-3 text-center font-bold text-blue-400 tracking-widest text-xs uppercase">
                        The Stack (Auto Memory)
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-end gap-2 min-h-[250px]">
                        {allocation !== 'none' && (
                            <div className="bg-slate-800/50 border-l-4 border-slate-600 p-3 text-xs text-slate-400 font-mono">
                                function_call_frame()
                            </div>
                        )}
                        {allocation === 'stack' && (
                            <div className="bg-blue-500/20 border-l-4 border-blue-500 p-4 animate-in slide-in-from-bottom duration-300">
                                <div className="text-white font-bold mb-2">int arr[5]</div>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-8 h-8 border border-blue-500/50 flex items-center justify-center text-xs text-blue-300 bg-blue-950/50">0</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {allocation === 'heap' && (
                            <div className="bg-purple-500/20 border-l-4 border-purple-500 p-4 animate-in slide-in-from-bottom duration-300 relative">
                                <div className="text-white font-bold mb-2">int* arr</div>
                                <div className="w-full h-8 border border-purple-500/50 flex items-center justify-center text-xs text-purple-300 bg-purple-950/50 font-mono truncate">
                                    0xHeapAddr
                                </div>
                                <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-purple-500 -mr-8"></div>
                            </div>
                        )}
                        <div className="bg-slate-800 border-l-4 border-slate-600 p-3 text-xs text-slate-500 font-mono">
                            main()
                        </div>
                    </div>
                </div>

                {/* The Heap */}
                <div className="flex-1 border border-slate-800 rounded-xl bg-[#161b22] overflow-hidden flex flex-col">
                    <div className="bg-purple-900/30 border-b border-purple-900/50 p-3 text-center font-bold text-purple-400 tracking-widest text-xs uppercase">
                        The Heap (Dynamic Memory)
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center items-center min-h-[250px] relative">
                        {allocation === 'heap' && !isDeleted && (
                            <div className="bg-purple-500/10 border border-purple-500 p-6 rounded-lg animate-in zoom-in duration-300">
                                <div className="text-white font-bold mb-4 text-center">Allocated Memory Block</div>
                                <div className="flex gap-2">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-10 h-10 border-2 border-purple-500 flex items-center justify-center text-sm font-bold text-purple-300 bg-purple-900/50">0</div>
                                    ))}
                                </div>
                                <div className="font-mono text-xs text-purple-400 text-center mt-4">Address: 0xHeapAddr</div>
                            </div>
                        )}
                        {allocation === 'heap' && isDeleted && (
                            <div className="text-slate-600 font-mono text-sm italic animate-in fade-in">Memory Freed Successfully.</div>
                        )}
                        {allocation === 'stack' && (
                            <div className="text-slate-700 font-mono text-sm italic">Empty</div>
                        )}
                        {allocation === 'none' && (
                            <div className="text-slate-700 font-mono text-sm italic">Empty</div>
                        )}
                    </div>
                    
                    {/* Actions */}
                    <div className="p-4 bg-black border-t border-slate-800">
                        {allocation === 'heap' ? (
                            <div className="flex items-center justify-between">
                                {!isDeleted ? (
                                    <>
                                        <div className="text-xs text-red-400 font-bold flex items-center gap-2 animate-pulse"><ShieldAlert size={14}/> MEMORY LEAK RISK</div>
                                        <button onClick={() => setIsDeleted(true)} className="px-4 py-2 bg-red-950 hover:bg-red-900 border border-red-500 text-red-300 text-xs font-bold rounded transition-colors">
                                            execute: delete[] arr;
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-2"><Zap size={14}/> SAFE: MEMORY RETURNED</div>
                                )}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-500 text-center">No manual cleanup required.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
`;

if (!l3.includes('StackVsHeapVisualizer')) {
    l3 = l3.replace('export default function DSALecture3', comp + '\nexport default function DSALecture3');
    l3 = l3.replace('</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <PointerArithmeticSandbox />', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <PointerArithmeticSandbox />\n                </section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <StackVsHeapVisualizer />');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L3/page.tsx', l3);
    console.log('Injected Stack vs Heap Visualizer into L3.');
} else {
    console.log('Already exists');
}
