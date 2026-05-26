"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Search, Play, RotateCcw, Info, Activity } from 'lucide-react';

const CodeBlock = ({ code, language = 'cpp', explanation, title }: { code: string, language?: string, explanation?: string, title?: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);
    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700/50 my-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-blue-500/30 w-full relative">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/90 backdrop-blur-md border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    {title && <span className="text-xs font-medium text-slate-400 tracking-wider uppercase bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">{title}</span>}
                </div>
                {explanation && (
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${showExplanation ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700'}`}
                    >
                        <Info size={14} /> {showExplanation ? 'HIDE EXPLANATION' : 'EXPLAIN CODE'}
                    </button>
                )}
            </div>
            <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>
                    {code.split('\n').map((line, i) => (
                        <div key={i} className="flex hover:bg-slate-800/30 px-2 -mx-2 rounded transition-colors group/line">
                            <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-4 text-xs mt-0.5 group-hover/line:text-blue-500/50 transition-colors">{i + 1}</span>
                            <span className="flex-1 whitespace-pre">{line || ' '}</span>
                        </div>
                    ))}
                </code>
            </pre>
            {showExplanation && explanation && (
                <div className="bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/50 p-6 text-sm text-slate-300 leading-relaxed animate-in slide-in-from-top-4 fade-in duration-300">
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
};

// --- INTERACTIVE 1: Binary Search Deep Dive ---
const BinarySearchVisualizer = () => {
    // 15 elements -> max 4 operations
    const array = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 81, 88, 93, 97, 99];
    const [target, setTarget] = useState<number>(72);
    
    // Algorithm state
    const [low, setLow] = useState<number | null>(null);
    const [high, setHigh] = useState<number | null>(null);
    const [mid, setMid] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
    const [log, setLog] = useState<string[]>([]);
    
    const [isSearching, setIsSearching] = useState(false);

    const reset = () => {
        setLow(null);
        setHigh(null);
        setMid(null);
        setStatus('idle');
        setLog([]);
        setIsSearching(false);
    };

    const addLog = (msg: string) => {
        setLog(prev => [...prev, msg]);
    };

    const runSearch = async () => {
        if (isSearching) return;
        reset();
        setIsSearching(true);
        setStatus('searching');
        setLog([`Target: ${target}`]);
        
        let l = 0;
        let r = array.length - 1;
        
        await new Promise(res => setTimeout(res, 600));

        while (l <= r) {
            setLow(l);
            setHigh(r);
            addLog(`Setting bounds: Low = [${l}], High = [${r}]`);
            await new Promise(res => setTimeout(res, 1000));
            
            const m = Math.floor((l + r) / 2);
            setMid(m);
            addLog(`Calculating Mid: floor((${l} + ${r}) / 2) = [${m}]`);
            await new Promise(res => setTimeout(res, 1000));

            addLog(`Comparing Array[${m}] (${array[m]}) with Target (${target})`);
            await new Promise(res => setTimeout(res, 1000));

            if (array[m] === target) {
                setStatus('found');
                addLog(`🎯 SUCCESS: Found ${target} at index [${m}]!`);
                setIsSearching(false);
                return;
            } else if (array[m] < target) {
                addLog(`Value ${array[m]} is too small. Target must be on the RIGHT.`);
                l = m + 1;
                addLog(`Moving Low to Mid + 1 -> [${l}]`);
            } else {
                addLog(`Value ${array[m]} is too large. Target must be on the LEFT.`);
                r = m - 1;
                addLog(`Moving High to Mid - 1 -> [${r}]`);
            }
            await new Promise(res => setTimeout(res, 1000));
        }
        
        setLow(null);
        setHigh(null);
        setMid(null);
        setStatus('not_found');
        addLog(`❌ FAILED: Target ${target} does not exist in the array.`);
        setIsSearching(false);
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] border border-slate-700 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Binary Search: The Math Visualizer</h3>
            <p className="text-slate-400 mb-8">Binary search is a divide-and-conquer algorithm. It requires a <strong>sorted array</strong>. At each step, it calculates the exact mathematical middle of the remaining search space, effectively discarding half of the array in a single operation. This results in <code className="text-blue-400">O(log N)</code> time complexity.</p>
            
            <div className="bg-black border border-slate-800 rounded-xl p-8 flex flex-col xl:flex-row gap-8">
                
                {/* Array Area */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="text-white font-bold text-sm uppercase tracking-wider">Search Target:</div>
                        <input 
                            type="number" 
                            value={target} 
                            onChange={e => setTarget(Number(e.target.value))}
                            disabled={isSearching}
                            className="w-24 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold text-center disabled:opacity-50"
                        />
                        <button 
                            onClick={runSearch}
                            disabled={isSearching}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors ml-auto flex items-center gap-2"
                        >
                            <Play size={16} /> Execute Binary Search
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-12 min-h-[80px]">
                        {array.map((val, i) => {
                            const isOut = status === 'searching' && ((low !== null && i < low) || (high !== null && i > high));
                            const isMid = mid === i;
                            const isFound = isMid && status === 'found';
                            const isLow = low === i;
                            const isHigh = high === i;
                            
                            return (
                                <div key={i} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 border flex items-center justify-center font-bold text-lg transition-all duration-300 relative ${isFound ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_15px_currentColor] z-10' : isMid ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 shadow-[0_0_15px_currentColor] z-10' : isOut ? 'bg-[#0d1117] border-slate-800 text-slate-700 opacity-30' : 'bg-[#161b22] border-slate-700 text-white'}`}>
                                        {val}
                                    </div>
                                    <div className="mt-2 font-mono text-[10px] text-slate-500">[{i}]</div>
                                    <div className="h-4 mt-1 flex gap-1 font-bold text-[10px] uppercase">
                                        {isLow && !isOut && <span className="text-blue-500">L</span>}
                                        {isMid && <span className="text-white">M</span>}
                                        {isHigh && !isOut && <span className="text-purple-500">H</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={reset} 
                            disabled={isSearching}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-bold rounded-lg transition-colors border border-slate-600 flex items-center gap-2"
                        >
                            <RotateCcw size={16} /> Reset Engine
                        </button>
                    </div>
                </div>

                {/* Console Log Area */}
                <div className="w-full xl:w-96 bg-[#0d1117] border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-400 h-[400px] overflow-y-auto flex flex-col gap-2">
                    <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2 font-bold">SYSTEM TERMINAL</div>
                    {log.length === 0 && <div className="italic opacity-50">Awaiting execution...</div>}
                    {log.map((msg, i) => (
                        <div key={i} className={`${msg.includes('SUCCESS') ? 'text-emerald-400 font-bold' : msg.includes('FAILED') ? 'text-red-400 font-bold' : msg.includes('Mid') ? 'text-blue-400' : 'text-slate-300'}`}>
                            &gt; {msg}
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
};



// --- INTERACTIVE 2: The Binary Search Game ---
const BinarySearchGame = () => {
    const [target, setTarget] = useState<number>(() => Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState<string>('');
    const [guesses, setGuesses] = useState<{val: number, result: string}[]>([]);
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    
    // Max guesses for 100 is 7 (log2(100) ~ 6.64)
    const MAX_GUESSES = 7;

    const resetGame = () => {
        setTarget(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setGuesses([]);
        setStatus('playing');
    };

    const handleGuess = () => {
        if (status !== 'playing' || !guess) return;
        
        const g = parseInt(guess);
        if (isNaN(g) || g < 1 || g > 100) {
            alert('Please enter a valid number between 1 and 100');
            return;
        }

        let result = '';
        let newStatus: 'playing' | 'won' | 'lost' = status;

        if (g === target) {
            result = '🎯 CORRECT!';
            newStatus = 'won';
        } else if (g < target) {
            result = '🔼 TOO LOW';
        } else {
            result = '🔽 TOO HIGH';
        }

        const newGuesses = [...guesses, { val: g, result }];
        setGuesses(newGuesses);
        setStatus(newStatus);
        setGuess('');

        if (newStatus !== 'won' && newGuesses.length >= MAX_GUESSES) {
            setStatus('lost');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleGuess();
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-6">Interactive: The Binary Search Game</h3>
            <p className="text-slate-400 mb-6">
                I am thinking of a number between <strong>1 and 100</strong>. You have exactly <strong>7 guesses</strong>. <br/>
                Why 7? Because <code className="text-blue-400">log₂(100) ≈ 6.64</code>. If you use the Binary Search strategy (always guessing exactly in the middle of the remaining range), you are mathematically guaranteed to win every single time.
            </p>

            <div className="bg-black border border-slate-800 p-8 rounded-xl flex flex-col items-center">
                
                <div className="text-2xl font-black text-white mb-2 tracking-widest">
                    {status === 'won' ? <span className="text-emerald-400">YOU WIN!</span> : status === 'lost' ? <span className="text-red-500">GAME OVER!</span> : <span>GUESS THE NUMBER</span>}
                </div>
                {status === 'lost' && <div className="text-red-400 font-bold mb-4">The number was {target}</div>}

                <div className="flex gap-2 mb-8">
                    {Array.from({length: MAX_GUESSES}).map((_, i) => {
                        const isUsed = i < guesses.length;
                        return (
                            <div key={i} className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all ${isUsed ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-blue-900/30 border-blue-500/50 text-blue-400'}`}>
                                {MAX_GUESSES - i}
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <input 
                        type="number" 
                        value={guess} 
                        onChange={e => setGuess(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={status !== 'playing'}
                        placeholder="1-100"
                        className="w-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white font-bold text-center disabled:opacity-50 text-xl"
                    />
                    <button 
                        onClick={handleGuess}
                        disabled={status !== 'playing' || !guess}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors"
                    >
                        SUBMIT
                    </button>
                </div>

                <div className="w-full max-w-md bg-[#0d1117] border border-slate-800 rounded-lg p-4 min-h-[200px] flex flex-col gap-2">
                    <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2 font-bold text-xs">GUESS HISTORY</div>
                    {guesses.length === 0 && <div className="italic opacity-50 text-slate-400 text-sm text-center mt-4">No guesses yet...</div>}
                    {guesses.map((g, i) => (
                        <div key={i} className="flex justify-between items-center bg-black p-2 rounded border border-slate-800">
                            <div className="text-slate-300 font-bold w-8 text-center">{g.val}</div>
                            <div className={`font-bold text-sm tracking-wider ${g.result.includes('CORRECT') ? 'text-emerald-400' : g.result.includes('LOW') ? 'text-blue-400' : 'text-red-400'}`}>
                                {g.result}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button 
                        onClick={resetGame} 
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors border border-slate-600 flex items-center gap-2"
                    >
                        <RotateCcw size={16} /> Restart Game
                    </button>
                </div>
            </div>
        </div>
    );
};


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
                            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-200" style={{ width: `${binaryProgress}%` }}></div>
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
                            <div className="h-full bg-gradient-to-r from-red-600 to-orange-500" style={{ width: `${linearProgress}%` }}></div>
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
                    <button onClick={() => {setIsSorted(false); setStatus('idle');}} className={`px-6 py-2 rounded-lg font-bold border transition-all ${!isSorted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Use Unsorted Array</button>
                    <button onClick={() => {setIsSorted(true); setStatus('idle');}} className={`px-6 py-2 rounded-lg font-bold border transition-all ${isSorted ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>Use Sorted Array</button>
                </div>

                <div className="flex gap-2 mb-8">
                    {(isSorted ? sortedArray : unsortedArray).map((val, i) => (
                        <div key={i} className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-lg rounded ${val === target ? 'border-blue-500 text-blue-400' : 'border-slate-700 text-white'}`}>
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
                        style={{ width: `${100 / fraction}%` }}
                    >
                        1/{fraction}
                    </div>
                    {/* The discarded blocks */}
                    <div 
                        className="h-full bg-red-950/20 border-l border-red-900/30 flex items-center justify-center"
                        style={{ width: `${100 - (100 / fraction)}%` }}
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

export default function DSALecture6() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/dsa/logo.png" alt="DSA Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Searching Techniques</h1>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Unit 1 • Lecture 6</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/unit1/L5" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} /> Previous
                        </Link>
                        {/* Next link can be disabled or point to Unit 2 */}
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-not-allowed">
                            End of Unit 1
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-12">
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Finding Data in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">O(log N)</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        Searching is the most common operation in computer science. Every database query, every Google search, every file lookup relies on efficient searching algorithms. 
                        In this lecture, we compare the naive <strong>Linear Search</strong> against the mathematically beautiful <strong>Binary Search</strong>.
                    </p>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <div className="flex flex-col gap-12">
                        {/* Linear Search Deep Dive */}
                        <div className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Linear Search (The Brute Force Approach)</h3>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                                <div>
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        Linear search is the most fundamental searching algorithm. It operates by sequentially checking each element of the list until a match is found or the whole list has been searched. While mathematically inefficient, it has one major hardware advantage: <strong>Cache Locality</strong>.
                                    </p>
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        Because arrays are stored in contiguous memory blocks, the CPU fetches surrounding elements into the L1/L2 Cache. A linear scan takes extreme advantage of this hardware pre-fetching, making it surprisingly fast for very small datasets (usually N &lt; 100) before its asymptotic inferiority takes over.
                                    </p>
                                    <div className="space-y-4 bg-[#0d1117] p-6 rounded-xl border border-slate-800">
                                        <h4 className="text-white font-bold mb-2">Complexity Matrix</h4>
                                        <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                            <span className="text-slate-400">Worst-Case Time</span>
                                            <span className="text-red-400 font-mono font-bold">O(N)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                            <span className="text-slate-400">Best-Case Time</span>
                                            <span className="text-blue-400 font-mono font-bold">Ω(1)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">Auxiliary Space</span>
                                            <span className="text-green-400 font-mono font-bold">O(1)</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <CodeBlock 
                                        title="LinearSearch.cpp"
                                        code={`int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        // CPU Cache loves this contiguous access pattern
        if (arr[i] == target) {
            return i; // Target found at index i
        }
    }
    return -1; // Target not found
}`} 
                                        explanation="The loop sequentially scans from index 0 to N-1. The space complexity is O(1) because we only allocate a single integer variable 'i', regardless of how large the array is."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Binary Search Deep Dive */}
                        <div className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Binary Search (The Divide & Conquer Approach)</h3>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                                <div>
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        Binary Search is a textbook example of a Divide and Conquer algorithm. By requiring the array to be <strong>strictly sorted</strong>, it allows us to discard exactly 50% of the remaining search space on every single iteration. 
                                    </p>
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        This geometric halving creates a logarithmic time complexity. To search the entire internet (approx 50 billion pages), a linear search takes 50 billion operations. A Binary Search takes exactly <strong>36 operations</strong>.
                                    </p>
                                    
                                    <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 mb-6">
                                        <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><Activity size={16}/> The Integer Overflow Bug</h4>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            Historically, textbooks taught calculating the midpoint as <code className="text-red-400 bg-red-950 px-1 rounded">(low + high) / 2</code>. If <code className="text-blue-400">low</code> and <code className="text-blue-400">high</code> are extremely large numbers near the 32-bit integer limit (2.14 billion), adding them together causes a buffer overflow, crashing the program. The mathematically equivalent, perfectly safe formula is <code className="text-green-400 bg-green-950 px-1 rounded">low + (high - low) / 2</code>.
                                        </p>
                                    </div>

                                    <div className="space-y-4 bg-[#0d1117] p-6 rounded-xl border border-slate-800">
                                        <h4 className="text-white font-bold mb-2">Complexity Matrix</h4>
                                        <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                            <span className="text-slate-400">Worst-Case Time</span>
                                            <span className="text-blue-400 font-mono font-bold">O(log N)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                            <span className="text-slate-400">Best-Case Time</span>
                                            <span className="text-green-400 font-mono font-bold">Ω(1)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">Auxiliary Space</span>
                                            <span className="text-green-400 font-mono font-bold">O(1) Iterative / O(log N) Recursive</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <CodeBlock 
                                        title="BinarySearch.cpp"
                                        code={`int binarySearch(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        // Safe midpoint calculation prevents Integer Overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Found it!
        }
        
        if (arr[mid] < target) {
            low = mid + 1; // Discard left half
        } else {
            high = mid - 1; // Discard right half
        }
    }
    return -1; // Target not found
}`} 
                                        explanation="Notice the exact strictness of 'low <= high'. If we used 'low < high', the algorithm would fail on single-element arrays or edge-case boundary checks. Also notice the +1 and -1 applied to 'mid'—if we didn't offset 'mid', the search could get stuck in an infinite loop."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                    <BinarySearchVisualizer />
                </section>

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

            </div>
        </div>
    );
}
