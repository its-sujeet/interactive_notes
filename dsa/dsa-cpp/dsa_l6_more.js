const fs = require('fs');

let l6 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L6/page.tsx', 'utf8');

const comp = `
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
        let newStatus = status;

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
                            <div key={i} className={\`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all \${isUsed ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-blue-900/30 border-blue-500/50 text-blue-400'}\`}>
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
                            <div className={\`font-bold text-sm tracking-wider \${g.result.includes('CORRECT') ? 'text-emerald-400' : g.result.includes('LOW') ? 'text-blue-400' : 'text-red-400'}\`}>
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
`;

if (!l6.includes('BinarySearchGame')) {
    l6 = l6.replace('export default function DSALecture6', comp + '\nexport default function DSALecture6');
    l6 = l6.replace('</section>\n\n            </div>', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <BinarySearchGame />\n                </section>\n\n            </div>');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L6/page.tsx', l6);
    console.log('Injected BinarySearchGame into L6.');
} else {
    console.log('Already exists');
}
