const fs = require('fs');

let l1 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', 'utf8');

const theory1 = `
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Theoretical Foundations: Time and Space</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
                            <h4 className="text-blue-400 font-bold text-xl mb-4">Time Complexity</h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Time complexity is <strong>not</strong> measured in seconds. A supercomputer will always run a bad algorithm faster than an old laptop. Instead, we measure the <strong>growth rate</strong> of an algorithm by counting the number of basic operations (like additions, assignments, and comparisons) relative to the input size <code className="text-orange-400 font-mono">N</code>.
                            </p>
                            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                                <li><strong>Best Case:</strong> Minimum operations needed (e.g., finding item at index 0).</li>
                                <li><strong>Average Case:</strong> Expected operations over all possible inputs.</li>
                                <li><strong>Worst Case:</strong> Maximum operations needed (e.g., item not found). This is what we care about most.</li>
                            </ul>
                        </div>
                        
                        <div className="bg-[#161b22] border border-slate-800 p-6 rounded-xl hover:border-purple-500/30 transition-colors">
                            <h4 className="text-purple-400 font-bold text-xl mb-4">Space Complexity</h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Space complexity measures the total amount of memory (RAM) an algorithm needs to run completely. It is composed of two parts:
                            </p>
                            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                                <li><strong>Input Space:</strong> The memory required just to store the input data (you can't usually avoid this).</li>
                                <li><strong>Auxiliary Space:</strong> The <em>extra</em> memory the algorithm needs to do its job (e.g., temporary arrays, variables, or call stack space during recursion).</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-blue-950/20 border border-blue-900/50 p-6 rounded-xl text-slate-300 text-sm leading-relaxed">
                        <strong className="text-blue-400 text-base">The Trade-off Principle:</strong>
                        <p className="mt-2">In engineering, nothing is free. If you want an algorithm to run blazingly fast, you usually have to pre-calculate data and store it in memory (Caching, Memoization, Hash Tables), which drastically increases your Space Complexity. Conversely, if you are memory-constrained (like on an embedded microchip), you must calculate data on the fly (Brute Force), which drastically increases your Time Complexity.</p>
                    </div>
                </section>
`;

if(l1.includes('<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <TimeSpaceTradeoff />')) {
    l1 = l1.replace('<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <TimeSpaceTradeoff />', theory1 + '\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <TimeSpaceTradeoff />');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L1/page.tsx', l1);
}

