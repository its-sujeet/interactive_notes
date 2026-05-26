"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity, Zap, Play, RotateCcw } from 'lucide-react';

// --- INTERACTIVE 1: Traversal Visualizer ---
const TraversalVisualizer = () => {
    const array = [12, 45, 7, 23, 56, 89];
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        setIsPlaying(true);
        setCurrentIndex(0);
        let i = 0;
        const interval = setInterval(() => {
            i++;
            if (i < array.length) {
                setCurrentIndex(i);
            } else {
                clearInterval(interval);
                setIsPlaying(false);
                setTimeout(() => setCurrentIndex(-1), 1000);
            }
        }, 800);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Linear Traversal: O(N)</h3>
            <p className="text-slate-400 mb-6">Traversal means visiting every single element in the data structure exactly once. Because we must visit all <code className="text-blue-400">N</code> elements, the time complexity is strictly <code className="text-green-400">O(N)</code>.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                <div className="flex gap-2 mb-12">
                    {array.map((val, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`w-16 h-16 border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 ${currentIndex === i ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 shadow-[0_0_15px_currentColor]' : 'bg-[#161b22] border-slate-700 text-white'}`}>
                                {val}
                            </div>
                            <div className="mt-2 font-mono text-xs text-slate-500">[{i}]</div>
                            {currentIndex === i && (
                                <div className="mt-2 text-blue-400 animate-bounce">
                                    <ArrowRight className="-rotate-90" size={16} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 w-full max-w-md">
                    <button 
                        onClick={play} 
                        disabled={isPlaying}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        <Play size={18} /> Traverse Array
                    </button>
                </div>
            </div>
            
            <div className="mt-8 bg-slate-900 border-l-4 border-blue-500 p-4 rounded-r-lg font-mono text-sm text-blue-300">
                for (int i = 0; i &lt; N; i++) {'{'} <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; arr[i] &lt;&lt; " ";<br/>
                {'}'}
            </div>
        </div>
    );
};

// --- INTERACTIVE 2: Insertion & Shifting Visualizer ---
const InsertionVisualizer = () => {
    const capacity = 8;
    const initialSize = 5;
    const [array, setArray] = useState<number[]>(Array.from({length: capacity}, (_, i) => i < initialSize ? (i + 1) * 10 : -1));
    const [currentSize, setCurrentSize] = useState(initialSize);
    
    // Animation states
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [message, setMessage] = useState("Ready to insert.");

    const reset = () => {
        setArray(Array.from({length: capacity}, (_, i) => i < initialSize ? (i + 1) * 10 : -1));
        setCurrentSize(initialSize);
        setActiveIdx(null);
        setMessage("Ready to insert.");
    };

    const insertAt = async (index: number, value: number) => {
        if (currentSize >= capacity) {
            setMessage("ERROR: Array is full (Overflow). Cannot insert.");
            return;
        }
        if (index > currentSize || index < 0) {
            setMessage("ERROR: Index out of valid range.");
            return;
        }

        setIsAnimating(true);
        let tempArr = [...array];

        // Shift elements right
        for (let i = currentSize; i > index; i--) {
            setMessage(`Shifting element at index [${i-1}] to right [${i}].`);
            setActiveIdx(i-1);
            await new Promise(r => setTimeout(r, 600));
            tempArr[i] = tempArr[i - 1];
            setArray([...tempArr]);
            setActiveIdx(i);
            await new Promise(r => setTimeout(r, 400));
        }

        // Insert
        setMessage(`Inserting value ${value} at index [${index}].`);
        setActiveIdx(index);
        await new Promise(r => setTimeout(r, 600));
        tempArr[index] = value;
        setArray([...tempArr]);
        setCurrentSize(currentSize + 1);
        
        setTimeout(() => {
            setActiveIdx(null);
            setMessage("Insertion complete! Time complexity: O(N)");
            setIsAnimating(false);
        }, 800);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Array Insertion (Shifting Penalty)</h3>
            <p className="text-slate-400 mb-6">Because arrays are strictly contiguous, you cannot simply drop an element in the middle. You must physically <strong>shift all subsequent elements to the right</strong> to make room. This takes <code className="text-red-400">O(N)</code> time.</p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-yellow-400 font-mono text-sm mb-8 h-6 flex items-center justify-center text-center">
                    {message}
                </div>

                <div className="flex gap-2 mb-12">
                    {array.map((val, i) => {
                        const isGarbage = val === -1;
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-14 h-16 border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 ${activeIdx === i ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 scale-110 shadow-[0_0_15px_currentColor]' : isGarbage ? 'bg-slate-900 border-slate-800 text-slate-700 border-dashed' : 'bg-[#161b22] border-slate-700 text-white'}`}>
                                    {isGarbage ? '?' : val}
                                </div>
                                <div className="mt-2 font-mono text-xs text-slate-500">[{i}]</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap justify-center gap-4 w-full">
                    <button 
                        onClick={() => insertAt(0, 99)} 
                        disabled={isAnimating || currentSize >= capacity}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-lg transition-colors border border-slate-600"
                    >
                        Insert 99 at [0] (Worst Case)
                    </button>
                    <button 
                        onClick={() => insertAt(Math.floor(currentSize/2), 88)} 
                        disabled={isAnimating || currentSize >= capacity}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-lg transition-colors border border-slate-600"
                    >
                        Insert 88 at Middle
                    </button>
                    <button 
                        onClick={() => insertAt(currentSize, 77)} 
                        disabled={isAnimating || currentSize >= capacity}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-lg transition-colors border border-slate-600"
                    >
                        Insert 77 at End (Best Case)
                    </button>
                    <button 
                        onClick={reset} 
                        disabled={isAnimating}
                        className="px-4 py-2 bg-red-900/50 hover:bg-red-800 disabled:opacity-50 text-red-400 font-bold rounded-lg transition-colors border border-red-900 ml-auto flex items-center gap-2"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
};



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
                                <div key={i} className={`w-10 h-10 border flex items-center justify-center text-sm font-bold transition-all ${isFound ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_15px_currentColor] z-10' : isChecking ? 'bg-red-500/20 border-red-500 text-red-400 scale-110 z-10 shadow-[0_0_15px_currentColor]' : isPassed ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-50' : 'bg-[#161b22] border-slate-700 text-slate-400'}`}>
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
                                <div key={i} className={`w-10 h-10 border flex items-center justify-center text-sm font-bold transition-all relative ${isFound ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_15px_currentColor] z-10' : isMid ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 z-10 shadow-[0_0_15px_currentColor]' : isOut ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-20' : 'bg-[#161b22] border-slate-700 text-slate-400'}`}>
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

export default function DSALecture4() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="DSA Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Operations on Linear Arrays</h1>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Unit 1 • Lecture 4</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-12">
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        The Cost of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Contiguity</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        Arrays give you <code className="text-green-400">O(1)</code> instant access for free, but they charge a massive penalty for modifying their structure. Because arrays are rigid blocks of memory, inserting or deleting elements requires physically moving bytes around in RAM to maintain order.
                    </p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <TraversalVisualizer />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <InsertionVisualizer />
                </section>
                
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row gap-8">
                    {/* Deletion Summary Card */}
                    <div className="flex-1 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Deletion is just reverse insertion</h3>
                        <p className="text-slate-400 mb-4">To delete an element in an array, you do the exact opposite of insertion. You overwrite the deleted element by shifting all subsequent elements one position to the <strong>left</strong>.</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Worst Case (Delete index 0):</span>
                            <span className="font-mono text-red-400 font-bold">O(N)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-slate-500">Best Case (Delete last):</span>
                            <span className="font-mono text-green-400 font-bold">O(1)</span>
                        </div>
                    </div>

                    {/* Searching Summary Card */}
                    <div className="flex-1 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Searching in Arrays</h3>
                        <p className="text-slate-400 mb-4">Finding a specific value requires traversing the array until you find it. If the array is unsorted, you must use <strong>Linear Search</strong>. If it is sorted, you can use <strong>Binary Search</strong>.</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Linear Search (Unsorted):</span>
                            <span className="font-mono text-red-400 font-bold">O(N)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-slate-500">Binary Search (Sorted):</span>
                            <span className="font-mono text-blue-400 font-bold">O(log N)</span>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <SearchVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <BubbleSortVisualizer />
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <MergeVisualizer />
                </section>

            </div>
        </div>
    );
}
