const fs = require('fs');

let l1 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', 'utf8');

const comp = `
// --- INTERACTIVE 2: Stack vs Heap Memory Allocator ---
const MemoryAllocator = () => {
    const [memoryType, setMemoryType] = useState<'stack'|'heap'>('stack');
    const [arraySize, setArraySize] = useState(10);
    const stackLimit = 1000; // Simulated stack limit

    const isStackOverflow = memoryType === 'stack' && arraySize > stackLimit;

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Memory Control: Stack vs Heap</h3>
            <p className="text-slate-400 mb-6">In C++, you dictate exactly where memory is allocated. The <strong>Stack</strong> is fast, automatically managed, but extremely small. The <strong>Heap</strong> is massive, but you must manually allocate (<code className="text-blue-400">new</code>) and deallocate (<code className="text-blue-400">delete</code>) the memory.</p>

            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setMemoryType('stack')}
                    className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${memoryType === 'stack' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500'}\`}
                >
                    Stack Allocation
                </button>
                <button 
                    onClick={() => setMemoryType('heap')}
                    className={\`px-6 py-2 rounded-lg font-bold border-2 transition-all \${memoryType === 'heap' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500'}\`}
                >
                    Heap Allocation
                </button>
            </div>

            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl min-h-[250px] flex flex-col md:flex-row gap-8">
                
                {/* Control Panel */}
                <div className="flex-1 font-mono text-sm">
                    <div className="mb-6">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Array Size (Elements)</span>
                        <input 
                            type="range" 
                            min="10" 
                            max="2000" 
                            step="10"
                            value={arraySize} 
                            onChange={(e) => setArraySize(Number(e.target.value))} 
                            className={\`w-full \${memoryType === 'stack' ? 'accent-orange-500' : 'accent-purple-500'}\`} 
                        />
                        <div className="mt-2 text-white font-bold">{arraySize} integers</div>
                    </div>

                    <div className="p-4 bg-black border border-slate-800 rounded-lg">
                        {memoryType === 'stack' ? (
                            <div>
                                <span className="text-blue-400">void</span> createArray() {'{'}<br/>
                                <div className="pl-4">
                                    <span className="text-blue-400">int</span> arr[{arraySize}];
                                </div>
                                {'}'}
                            </div>
                        ) : (
                            <div>
                                <span className="text-blue-400">void</span> createArray() {'{'}<br/>
                                <div className="pl-4">
                                    <span className="text-blue-400">int*</span> arr = <span className="text-blue-400">new</span> <span className="text-blue-400">int</span>[{arraySize}];<br/>
                                    <span className="text-slate-500 italic">// ... use array ...</span><br/>
                                    <span className="text-red-400">delete[]</span> arr;
                                </div>
                                {'}'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Visualizer */}
                <div className="flex-1 border-l border-slate-800 pl-8 flex flex-col justify-center">
                    {isStackOverflow ? (
                        <div className="animate-in fade-in zoom-in duration-300 p-6 bg-red-500/10 border border-red-500 rounded-xl text-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                            <h4 className="text-red-500 font-black text-xl mb-2">STACK OVERFLOW!</h4>
                            <p className="text-red-400 text-sm">You attempted to allocate {arraySize * 4} bytes on the stack. The stack is limited to roughly 1MB - 8MB. The OS forcefully terminated your program.</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 flex flex-col items-center">
                            <div className={\`w-full p-4 rounded-xl border-2 flex items-center justify-center font-bold text-xl \${memoryType === 'stack' ? 'bg-orange-500/10 border-orange-500 text-orange-400 h-32' : 'bg-purple-500/10 border-purple-500 text-purple-400 h-48'}\`}>
                                {memoryType === 'stack' ? 'Stack Memory' : 'Heap Memory'}
                            </div>
                            <div className="mt-4 text-center">
                                <div className="text-slate-300 font-bold mb-1">
                                    {arraySize * 4} Bytes Allocated
                                </div>
                                <div className="text-slate-500 text-xs uppercase tracking-widest">
                                    {memoryType === 'stack' ? 'Fast Allocation / Automatic Cleanup' : 'Slower Allocation / Manual Cleanup'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <ExplainerCard 
                title="Pointers and new/delete"
                text="In C++, when you declare 'int arr[100];', the memory is pushed onto the thread's Execution Stack. It is instantly reclaimed when the function returns. However, the stack is very small. If you need a massive array, you must use 'new int[1000000]'. This asks the OS to find space in the massive system Heap. It returns a POINTER (memory address) to that space. If you forget to call 'delete[]', that memory is permanently locked until the program dies—this is a Memory Leak." 
            />
        </div>
    );
};
`;

if(l1.includes('export default function DSALecture1() {')) {
    l1 = l1.replace('export default function DSALecture1() {', comp + '\nexport default function DSALecture1() {');
    l1 = l1.replace('</section>\n\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><MemoryAllocator /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', l1);
}

