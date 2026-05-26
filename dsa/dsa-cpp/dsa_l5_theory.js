const fs = require('fs');

let l5 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', 'utf8');

const theoryContent = `
                {/* THEORY SECTION */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Space Complexity & In-Place */}
                        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Memory Architecture: In-Place Sorting</h3>
                            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                                All three of these algorithms (Bubble, Selection, Insertion) are <strong>In-Place</strong> algorithms. This is a critical memory management concept.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                                    <p className="text-sm text-slate-300"><strong>Auxiliary Space:</strong> They require exactly <code className="text-blue-400">O(1)</code> extra memory space, usually just a single temporary variable for swapping.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-purple-500"></div>
                                    <p className="text-sm text-slate-300"><strong>Hardware Cache:</strong> Because they operate directly on the original contiguous array block in RAM, they have excellent <em>Cache Locality</em>. The CPU doesn't have to jump around fetching new memory blocks.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-pink-500"></div>
                                    <p className="text-sm text-slate-300"><strong>Out-of-Place (Contrast):</strong> Algorithms like standard <em>MergeSort</em> require <code className="text-pink-400">O(N)</code> extra space to construct a new array during the merge phase, which can crash a system if memory is strictly limited (like embedded C++ systems).</p>
                                </li>
                            </ul>
                        </div>

                        {/* Complexity Matrix */}
                        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">The Complexity Matrix</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="py-3 px-4 text-slate-400 font-bold text-sm uppercase">Algorithm</th>
                                            <th className="py-3 px-4 text-slate-400 font-bold text-sm uppercase">Best Case</th>
                                            <th className="py-3 px-4 text-slate-400 font-bold text-sm uppercase">Worst Case</th>
                                            <th className="py-3 px-4 text-slate-400 font-bold text-sm uppercase">Space</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-slate-300">
                                        <tr className="border-b border-slate-800/50">
                                            <td className="py-3 px-4 font-bold text-white">Bubble Sort</td>
                                            <td className="py-3 px-4 text-green-400">O(N)</td>
                                            <td className="py-3 px-4 text-red-400">O(N²)</td>
                                            <td className="py-3 px-4 text-blue-400">O(1)</td>
                                        </tr>
                                        <tr className="border-b border-slate-800/50">
                                            <td className="py-3 px-4 font-bold text-white">Selection Sort</td>
                                            <td className="py-3 px-4 text-red-400">O(N²)</td>
                                            <td className="py-3 px-4 text-red-400">O(N²)</td>
                                            <td className="py-3 px-4 text-blue-400">O(1)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-bold text-white">Insertion Sort</td>
                                            <td className="py-3 px-4 text-green-400">O(N)</td>
                                            <td className="py-3 px-4 text-red-400">O(N²)</td>
                                            <td className="py-3 px-4 text-blue-400">O(1)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 p-3 bg-black border border-slate-800 rounded text-xs text-slate-400 italic">
                                * Note: Bubble and Insertion achieve O(N) only if the array is already sorted (they are Adaptive). Selection sort is totally blind and always takes O(N²).
                            </div>
                        </div>
                    </div>
                </section>
`;

if (!l5.includes('The Complexity Matrix')) {
    l5 = l5.replace(
        '<strong>Insertion</strong>.', 
        '<strong>Insertion</strong>.\n                    </p>\n                </section>\n' + theoryContent
    );
    // There's a chance the replace might not exactly match depending on how it was formatted.
    // Let's do a safer replace using </section> right after the paragraph.
    l5 = l5.replace(
        /<\/section>\s*<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\s*<BubbleSortVisualizer \/>/,
        '</section>\n' + theoryContent + '\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <BubbleSortVisualizer />'
    );
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', l5);
    console.log('Injected Theory content into L5.');
} else {
    console.log('Already exists');
}
