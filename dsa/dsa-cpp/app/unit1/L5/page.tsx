"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity, Play, RotateCcw } from 'lucide-react';

// --- INTERACTIVE 1: Selection Sort Visualizer ---
const SelectionSortVisualizer = () => {
    const initialArray = [64, 25, 12, 22, 11, 89, 34, 90];
    const [array, setArray] = useState<number[]>([...initialArray]);
    
    // Animation states
    const [currentIdx, setCurrentIdx] = useState<number | null>(null);
    const [minIdx, setMinIdx] = useState<number | null>(null);
    const [scanIdx, setScanIdx] = useState<number | null>(null);
    const [sortedBoundary, setSortedBoundary] = useState(0);
    const [isSorting, setIsSorting] = useState(false);
    const [status, setStatus] = useState("Ready to sort.");

    const reset = () => {
        setArray([...initialArray]);
        setCurrentIdx(null);
        setMinIdx(null);
        setScanIdx(null);
        setSortedBoundary(0);
        setStatus("Ready to sort.");
        setIsSorting(false);
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setStatus("Starting Selection Sort...");
        
        let tempArr = [...array];
        let n = tempArr.length;
        
        for (let i = 0; i < n - 1; i++) {
            setCurrentIdx(i);
            let min_idx = i;
            setMinIdx(min_idx);
            setStatus(`Pass ${i+1}: Assuming min is at [${min_idx}] (${tempArr[min_idx]})`);
            await new Promise(r => setTimeout(r, 600));
            
            for (let j = i + 1; j < n; j++) {
                setScanIdx(j);
                await new Promise(r => setTimeout(r, 300));
                
                if (tempArr[j] < tempArr[min_idx]) {
                    min_idx = j;
                    setMinIdx(min_idx);
                    setStatus(`Found new min at [${min_idx}] (${tempArr[min_idx]})`);
                    await new Promise(r => setTimeout(r, 600));
                }
            }
            
            setScanIdx(null);
            
            if (min_idx !== i) {
                setStatus(`Swapping [${i}] (${tempArr[i]}) with absolute min [${min_idx}] (${tempArr[min_idx]})`);
                await new Promise(r => setTimeout(r, 600));
                
                let temp = tempArr[i];
                tempArr[i] = tempArr[min_idx];
                tempArr[min_idx] = temp;
                setArray([...tempArr]);
            } else {
                setStatus(`[${i}] is already the minimum. No swap needed.`);
            }
            
            await new Promise(r => setTimeout(r, 400));
            setSortedBoundary(i + 1);
        }
        
        setSortedBoundary(n);
        setCurrentIdx(null);
        setMinIdx(null);
        setScanIdx(null);
        setStatus("Selection Sort Complete! Time complexity: O(N²)");
        setIsSorting(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">1. Selection Sort (The Scavenger)</h3>
            <p className="text-slate-400 mb-6">Selection Sort works by repeatedly finding the absolute minimum element from the unsorted part and putting it at the beginning. It makes exactly <code className="text-blue-400">O(N²)</code> comparisons, but guarantees the minimum number of swaps <code className="text-green-400">O(N)</code>.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-blue-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex items-end gap-2 mb-12 h-40">
                    {array.map((val, i) => {
                        const isSorted = i < sortedBoundary;
                        const isCurrent = i === currentIdx;
                        const isMin = i === minIdx;
                        const isScan = i === scanIdx;
                        
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div 
                                    className={`w-10 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isSorted ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' : isMin ? 'bg-purple-500 border border-purple-400 text-white shadow-[0_0_15px_currentColor]' : isScan ? 'bg-yellow-500 border border-yellow-400 text-black shadow-[0_0_15px_currentColor]' : isCurrent ? 'bg-blue-500 border border-blue-400 text-white shadow-[0_0_15px_currentColor]' : 'bg-[#161b22] border-slate-700 text-white border'}`}
                                    style={{ height: `${val * 1.5}px` }}
                                >
                                    {val}
                                </div>
                                <div className="mt-2 font-mono text-[10px] text-slate-500">[{i}]</div>
                                {isMin && <div className="text-[8px] text-purple-400 font-bold uppercase mt-1">Min</div>}
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-4 w-full justify-center">
                    <button 
                        onClick={runSort} 
                        disabled={isSorting || sortedBoundary === array.length}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Play size={16} /> Start Selection Sort
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

// --- INTERACTIVE 2: Insertion Sort Visualizer ---
const InsertionSortVisualizer = () => {
    const initialArray = [85, 12, 59, 45, 72, 51, 23, 99];
    const [array, setArray] = useState<number[]>([...initialArray]);
    
    // Animation states
    const [keyIdx, setKeyIdx] = useState<number | null>(null);
    const [compareIdx, setCompareIdx] = useState<number | null>(null);
    const [sortedBoundary, setSortedBoundary] = useState(1);
    const [isSorting, setIsSorting] = useState(false);
    const [status, setStatus] = useState("Ready to sort.");

    const reset = () => {
        setArray([...initialArray]);
        setKeyIdx(null);
        setCompareIdx(null);
        setSortedBoundary(1);
        setStatus("Ready to sort.");
        setIsSorting(false);
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setStatus("Starting Insertion Sort...");
        
        let tempArr = [...array];
        let n = tempArr.length;
        
        for (let i = 1; i < n; i++) {
            setSortedBoundary(i);
            let key = tempArr[i];
            let j = i - 1;
            
            setKeyIdx(i);
            setStatus(`Pass ${i}: Extracted key (${key}) from [${i}]. Finding its place in sorted subarray [0...${i-1}].`);
            await new Promise(r => setTimeout(r, 800));
            
            while (j >= 0) {
                setCompareIdx(j);
                await new Promise(r => setTimeout(r, 400));
                
                if (tempArr[j] > key) {
                    setStatus(`[${j}] (${tempArr[j]}) > key (${key}). Shifting ${tempArr[j]} to the right.`);
                    tempArr[j + 1] = tempArr[j];
                    setArray([...tempArr]);
                    await new Promise(r => setTimeout(r, 400));
                    j = j - 1;
                } else {
                    setStatus(`[${j}] (${tempArr[j]}) <= key (${key}). Found insertion point.`);
                    await new Promise(r => setTimeout(r, 400));
                    break;
                }
            }
            
            setCompareIdx(null);
            tempArr[j + 1] = key;
            setArray([...tempArr]);
            setKeyIdx(j + 1);
            setStatus(`Inserted key (${key}) at [${j + 1}].`);
            await new Promise(r => setTimeout(r, 600));
        }
        
        setSortedBoundary(n);
        setKeyIdx(null);
        setCompareIdx(null);
        setStatus("Insertion Sort Complete! Time complexity: O(N²), Best Case: O(N)");
        setIsSorting(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">2. Insertion Sort (The Card Player)</h3>
            <p className="text-slate-400 mb-6">Insertion Sort builds the sorted array one item at a time, exactly like sorting playing cards in your hands. It extracts the next element and <strong>shifts</strong> the sorted elements right until it finds the correct insertion slot. It is highly efficient for nearly-sorted data <code className="text-green-400">O(N)</code>.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-purple-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex items-end gap-2 mb-12 h-40">
                    {array.map((val, i) => {
                        const isSorted = i < sortedBoundary;
                        const isKey = i === keyIdx;
                        const isCompare = i === compareIdx;
                        
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div 
                                    className={`w-10 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isKey ? 'bg-purple-500 border border-purple-400 text-white shadow-[0_0_15px_currentColor] -translate-y-4' : isCompare ? 'bg-yellow-500 border border-yellow-400 text-black shadow-[0_0_15px_currentColor]' : isSorted ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' : 'bg-[#161b22] border-slate-700 text-white border'}`}
                                    style={{ height: `${val * 1.5}px` }}
                                >
                                    {val}
                                </div>
                                <div className="mt-2 font-mono text-[10px] text-slate-500">[{i}]</div>
                                {isKey && <div className="text-[8px] text-purple-400 font-bold uppercase mt-1">Key</div>}
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-4 w-full justify-center">
                    <button 
                        onClick={runSort} 
                        disabled={isSorting || sortedBoundary === array.length}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Play size={16} /> Start Insertion Sort
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
                setStatus(`Comparing arr[${j}] (${tempArr[j]}) and arr[${j+1}] (${tempArr[j+1]})`);
                await new Promise(r => setTimeout(r, 400));
                
                if (tempArr[j] > tempArr[j + 1]) {
                    // Highlight swap
                    setSwapIdx(j);
                    setStatus(`Swapping ${tempArr[j]} and ${tempArr[j+1]} because ${tempArr[j]} > ${tempArr[j+1]}`);
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
                                    className={`w-10 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isSwapping ? 'bg-red-500 border border-red-400 text-white shadow-[0_0_15px_currentColor]' : isComparing ? 'bg-yellow-500 border border-yellow-400 text-black shadow-[0_0_15px_currentColor]' : isSorted ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' : 'bg-[#161b22] border-slate-700 text-white border'}`}
                                    style={{ height: `${val * 1.5}px` }}
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
            setStatus(`Comparing Arr1[${p1}] (${arr1[p1]}) and Arr2[${p2}] (${arr2[p2]})`);
            await new Promise(r => setTimeout(r, 600));

            if (arr1[p1] <= arr2[p2]) {
                setStatus(`${arr1[p1]} <= ${arr2[p2]}, pushing ${arr1[p1]} to Merged Array`);
                tempMerged.push(arr1[p1]);
                p1++;
            } else {
                setStatus(`${arr2[p2]} < ${arr1[p1]}, pushing ${arr2[p2]} to Merged Array`);
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
            setStatus(`Arr2 is empty. Pushing remaining ${arr1[p1]} from Arr1`);
            setPtr1(p1);
            await new Promise(r => setTimeout(r, 600));
            tempMerged.push(arr1[p1]);
            p1++;
            setMerged([...tempMerged]);
            setPtr1(p1);
        }

        while (p2 < arr2.length) {
            setStatus(`Arr1 is empty. Pushing remaining ${arr2[p2]} from Arr2`);
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
                                        <div className={`w-12 h-12 border flex items-center justify-center font-bold transition-all ${isCurrent ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 shadow-[0_0_15px_currentColor]' : isDone ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-30' : 'bg-[#161b22] border-slate-700 text-white'}`}>
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
                                        <div className={`w-12 h-12 border flex items-center justify-center font-bold transition-all ${isCurrent ? 'bg-purple-500/20 border-purple-500 text-purple-400 scale-110 shadow-[0_0_15px_currentColor]' : isDone ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-30' : 'bg-[#161b22] border-slate-700 text-white'}`}>
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
                                <div key={i} className={`w-12 h-12 border flex items-center justify-center font-bold transition-all ${hasVal ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_currentColor] animate-in zoom-in' : 'bg-slate-900/50 border-slate-800 border-dashed text-slate-700'}`}>
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
        setStatus(`Running ${sortType === 'stable' ? 'Bubble Sort (Stable)' : 'Selection Sort (Unstable)'}...`);
        
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
            <div className="text-slate-400 mb-6 space-y-4">
                <p>A sorting algorithm is <strong>Stable</strong> if it guarantees that two equal elements will retain their original relative order after sorting. <strong>Unstable</strong> algorithms might accidentally swap them across the array while moving other elements.</p>
                <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="text-blue-400 font-bold mb-2">Why does this matter in the real world?</h4>
                    <p className="text-sm">Imagine an Excel spreadsheet of students. First, you sort the sheet by <strong>Name</strong>. Then, you sort the sheet by <strong>Grade</strong>. If the Grade-sorting algorithm is <em>Stable</em> (like Bubble/Insertion), students with the same grade will remain perfectly sorted by Name. But if the algorithm is <em>Unstable</em> (like Selection), the Name order gets completely scrambled when the Grades are sorted. Stability allows you to stack multiple sorts on top of each other.</p>
                </div>
            </div>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-emerald-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex gap-4 mb-12">
                    {array.map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-16 h-20 bg-[#161b22] border border-slate-700 rounded-lg flex flex-col items-center justify-center transition-all duration-300">
                                <div className="text-2xl font-bold text-white">{item.val}</div>
                                <div className={`font-mono text-xs font-bold ${item.color}`}>{item.id}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 w-full justify-center">
                    <button 
                        onClick={() => { setSortType('stable'); setArray([...initialArray]); }}
                        disabled={isSorting}
                        className={`px-6 py-2 font-bold rounded-lg transition-colors ${sortType === 'stable' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        Select: Bubble Sort (Stable)
                    </button>
                    <button 
                        onClick={() => { setSortType('unstable'); setArray([...initialArray]); }}
                        disabled={isSorting}
                        className={`px-6 py-2 font-bold rounded-lg transition-colors ${sortType === 'unstable' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
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


// --- INTERACTIVE 5: Adaptability Visualizer (Best Case O(N)) ---
const AdaptabilityVisualizer = () => {
    // A nearly sorted array
    const initialArray = [10, 20, 30, 40, 50, 60, 70, 80];
    
    const [array, setArray] = useState([...initialArray]);
    const [sortType, setSortType] = useState<'insertion' | 'selection'>('insertion');
    const [isSorting, setIsSorting] = useState(false);
    const [status, setStatus] = useState("Array is ALREADY SORTED. Let's see how the algorithms handle it.");
    const [operations, setOperations] = useState(0);

    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    const reset = () => {
        setArray([...initialArray]);
        setIsSorting(false);
        setStatus("Array is ALREADY SORTED. Let's see how the algorithms handle it.");
        setOperations(0);
        setActiveIdx(null);
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setOperations(0);
        setStatus(`Running ${sortType === 'insertion' ? 'Insertion Sort (Adaptive)' : 'Selection Sort (Non-Adaptive)'}...`);
        
        let tempArr = [...array];
        let n = tempArr.length;
        let ops = 0;
        
        if (sortType === 'insertion') {
            // Insertion Sort (Adaptive)
            for (let i = 1; i < n; i++) {
                setActiveIdx(i);
                ops++;
                setOperations(ops);
                // Compare with previous. It's already larger, so loop breaks immediately.
                setStatus(`Checking ${tempArr[i]}. It is > ${tempArr[i-1]}, no shifting needed.`);
                await new Promise(r => setTimeout(r, 600));
            }
            setStatus(`Insertion Sort recognized it was already sorted! Finished in O(N) time with only ${ops} operations.`);
        } else {
            // Selection Sort (Non-Adaptive)
            for (let i = 0; i < n - 1; i++) {
                let min_idx = i;
                for (let j = i + 1; j < n; j++) {
                    setActiveIdx(j);
                    ops++;
                    setOperations(ops);
                    if (tempArr[j] < tempArr[min_idx]) {
                        min_idx = j;
                    }
                    if (ops % 3 === 0) {
                        setStatus(`Blindly scanning for minimum... (Ops: ${ops})`);
                        await new Promise(r => setTimeout(r, 100));
                    }
                }
            }
            setStatus(`Selection Sort is completely blind to existing order. It wasted ${ops} operations! O(N²)`);
        }
        
        setActiveIdx(null);
        setIsSorting(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Algorithm Adaptability (Best-Case Scenario)</h3>
            <p className="text-slate-400 mb-6">An algorithm is <strong>Adaptive</strong> if it runs faster when the data is already partially or fully sorted. <strong>Insertion Sort</strong> is highly adaptive (Best case: <code className="text-green-400">O(N)</code>). <strong>Selection Sort</strong> is non-adaptive; it always blindly scans everything (Best case: <code className="text-red-400">O(N²)</code>).</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-orange-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {status}
                </div>

                <div className="flex items-end gap-2 mb-8 h-32 w-full justify-center">
                    {array.map((val, i) => {
                        const isActive = i === activeIdx;
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div 
                                    className={`w-12 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive ? 'bg-orange-500 border border-orange-400 text-white shadow-[0_0_15px_currentColor] -translate-y-2' : 'bg-emerald-900 border border-emerald-700 text-emerald-400'}`}
                                    style={{ height: `${val * 1.2}px` }}
                                >
                                    {val}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-lg flex gap-8 items-center justify-center mb-8">
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Total Operations:</span>
                    <span className="text-3xl font-mono font-bold text-white">{operations}</span>
                </div>

                <div className="flex flex-wrap gap-4 w-full justify-center">
                    <button 
                        onClick={() => { setSortType('insertion'); reset(); }}
                        disabled={isSorting}
                        className={`px-6 py-2 font-bold rounded-lg transition-colors ${sortType === 'insertion' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        Select: Insertion Sort (Adaptive)
                    </button>
                    <button 
                        onClick={() => { setSortType('selection'); reset(); }}
                        disabled={isSorting}
                        className={`px-6 py-2 font-bold rounded-lg transition-colors ${sortType === 'selection' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        Select: Selection Sort (Non-Adaptive)
                    </button>
                </div>
                
                <div className="flex gap-4 w-full justify-center mt-6 pt-6 border-t border-slate-800">
                    <button 
                        onClick={runSort} 
                        disabled={isSorting}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
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

export default function DSALecture5() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="DSA Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Sorting Techniques</h1>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-purple-400">Unit 1 • Lecture 5</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/unit1/L4" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Previous
                        </Link>
                        <Link href="/unit1/L6" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Next <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="py-12">
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">O(N²)</span> Sorting Suite
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        Sorting is the cornerstone of data processing. Before we dive into advanced divide-and-conquer algorithms like MergeSort or QuickSort, we must master the foundational `O(N²)` sorting techniques: <strong>Bubble</strong>, <strong>Selection</strong>, and <strong>Insertion</strong>.
                    </p>
                </section>

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

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <BubbleSortVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <SelectionSortVisualizer />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <InsertionSortVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row gap-8">
                    {/* Time Complexity Card */}
                    <div className="flex-1 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">When to use which?</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-black border border-slate-800 rounded-lg">
                                <h4 className="text-red-400 font-bold text-sm mb-1">Bubble Sort</h4>
                                <p className="text-slate-400 text-xs">Almost never used in production. It is purely an educational tool to teach nested loops and array swapping.</p>
                            </div>
                            <div className="p-4 bg-black border border-slate-800 rounded-lg">
                                <h4 className="text-blue-400 font-bold text-sm mb-1">Selection Sort</h4>
                                <p className="text-slate-400 text-xs">Useful when memory writes (swapping) are extremely expensive. Selection sort guarantees a maximum of O(N) swaps.</p>
                            </div>
                            <div className="p-4 bg-black border border-slate-800 rounded-lg">
                                <h4 className="text-purple-400 font-bold text-sm mb-1">Insertion Sort</h4>
                                <p className="text-slate-400 text-xs">Highly practical. If an array is already mostly sorted, Insertion Sort runs in almost O(N) time. Built-in functions like std::sort often switch to Insertion Sort for small subarrays.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <StabilityVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <AdaptabilityVisualizer />
                </section>

            </div>
        </div>
    );
}
