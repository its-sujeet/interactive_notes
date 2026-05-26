const fs = require('fs');
const path = require('path');

const explanations = {
    'L1': {
        'SyntaxDeconstructor': "When the JVM starts, it needs a specific entry point to begin execution. The 'public' modifier ensures the JVM (which is outside your program) can access it. 'static' means the JVM doesn't need to create an object of your class to run it. 'void' means the method doesn't return anything to the JVM. And 'String[] args' is the array where command-line arguments are stored.",
        'ArchitectureVisualizer': "Java's 'Write Once, Run Anywhere' magic comes from this pipeline. The Compiler (.java -> .class) translates your human-readable code into Bytecode. This Bytecode is platform-independent. When you run the program, the JVM translates this Bytecode into Machine Code specific to your OS (Windows, Mac, Linux) on the fly.",
        'GarbageCollectorSim': "In languages like C++, you must manually free memory (delete obj). If you forget, you get a memory leak. Java's Garbage Collector runs in the background, hunting for objects that have no active references. When it finds them, it automatically reclaims the memory. This prevents crashes and makes development much faster."
    },
    'L2': {
        'JDKVisualizer': "The JVM only runs code. The JRE contains the JVM plus standard libraries (like String, Math). The JDK contains the JRE plus development tools (like javac compiler, javap disassembler). If you only want to PLAY Minecraft, you need the JRE. If you want to MOD Minecraft, you need the JDK.",
        'CliSandbox': "IDEs like IntelliJ and Eclipse hide the actual build process from you. Under the hood, they are just running 'javac' to compile your .java files and 'java' to execute the resulting .class files. Understanding this CLI workflow is critical for debugging server environments where IDEs don't exist.",
        'PathVariableSimulator': "When you type 'javac' in the terminal, the OS searches the directories listed in your PATH environment variable. If the JDK's 'bin' folder isn't in the PATH, the OS says 'command not found'. Setting the PATH is the #1 hurdle for beginners.",
        'BytecodeViewer': "Bytecode is the intermediate language of Java. It's not machine code, and it's not source code. It's a highly optimized set of instructions that the JVM understands. The 'javap -c' command allows us to disassemble a .class file and see exactly what the compiler generated."
    },
    'L3': {
        'PrimitiveCrucible': "Java has 8 primitive types. The 'size' of the box matters. You can easily put a smaller box (int) into a larger box (long) - this is Implicit Casting. But if you try to put a larger box into a smaller box, you risk losing data, so Java forces you to Explicitly Cast it, acknowledging the risk.",
        'AutoboxingSandbox': "Primitives (int, double) are fast and live on the Stack. Objects (Integer, Double) are slower and live on the Heap. Java Collections (like ArrayList) can ONLY hold Objects. Autoboxing is Java's automatic feature of wrapping a primitive into its Object wrapper so it can be stored in a Collection.",
        'StringPoolVisualizer': "Strings are immutable in Java. To save memory, Java maintains a 'String Pool'. If you create a String literal like \"Hello\", Java checks the pool. If it exists, it reuses the reference. But if you use the 'new' keyword, Java is forced to create a brand new object in the Heap, bypassing the pool entirely.",
        'IntegerOverflowSim': "Primitives have strict memory limits. A 'byte' uses 8 bits, meaning it can only hold 256 unique values (-128 to 127). If you add 1 to 127, it doesn't become 128. It 'overflows' binary representation and wraps completely around to -128. This silent error has caused massive software disasters."
    },
    'L4': {
        'BitwiseWorkbench': "Bitwise operators manipulate the raw 1s and 0s of data. AND (&) is used for masking (extracting bits). OR (|) is used for setting bits. XOR (^) is used for toggling. Left Shift (<<) multiplies by 2, and Right Shift (>>) divides by 2. These are the fastest operations a CPU can perform.",
        'ShortCircuitVisualizer': "The && and || operators are 'short-circuit' operators. If the left side of && is false, the entire expression MUST be false, so Java skips evaluating the right side entirely. This is heavily used to prevent NullPointerExceptions by checking for null on the left side.",
        'ModuloSandbox': "The modulo operator (%) returns the remainder of a division. It is the core mathematical tool for wrapping values around a boundary (like clock arithmetic), finding even/odd numbers (num % 2 == 0), and hashing algorithms.",
        'BitwiseMasking': "Bitwise masking is used heavily in graphics, networking, and embedded systems. In a 32-bit ARGB color, 8 bits are used for Alpha, 8 for Red, 8 for Green, 8 for Blue. By bit-shifting right and using an AND mask (& 0xFF), we can extract individual color channels from a single integer.",
        'FloatingPointPrecision': "Computers operate in Base-2 (binary). They cannot perfectly represent all Base-10 (decimal) fractions. Just like 1/3 is 0.33333... in decimal, 0.1 is an infinite repeating fraction in binary. This causes tiny rounding errors. Never use float or double for precise values like currency; use BigDecimal.",
        'CompoundAssignmentTrap': "When you use a compound assignment operator (like +=, -=, *=), Java automatically injects an implicit cast to the type of the left-hand variable. This prevents compilation errors when adding an int to a short, but it can mask silent data loss if the result overflows the smaller type."
    },
    'L5': {
        'TernaryRouter': "The ternary operator (? :) is an expression, meaning it returns a value. An if-else is a statement, meaning it performs an action. Ternaries are perfect for concise, inline conditional assignments where you need to assign one of two values to a variable based on a boolean condition.",
        'PrecedenceArena': "Operator precedence dictates the order in which operators are evaluated. Multiplication (*) happens before Addition (+). And (&&) happens before Or (||). If you are ever unsure, or if the logic is complex, ALWAYS use parentheses to explicitly define the order of evaluation.",
        'UnaryIncrementTrap': "The position of ++ matters. Pre-increment (++x) adds 1 to the variable, THEN returns the new value. Post-increment (x++) returns the current value, THEN adds 1 to the variable in the background. Mixing these up in complex expressions is a common source of off-by-one errors.",
        'NestedTernaryNightmare': "While you can nest ternary operators, it quickly becomes unreadable. A nested ternary is essentially an if-else-if ladder crammed into a single line. If your logic requires more than one condition, it is almost always better for code maintainability to use standard if-else blocks."
    },
    'L6': {
        'FallthroughTrap': "In a switch statement, once a matching case is found, Java executes that case AND all subsequent cases below it until it hits a 'break;' statement or the end of the switch block. This 'fallthrough' behavior is a holdover from C, and forgetting the break is one of the most common bugs in Java.",
        'ScopeVisualizer': "Variables in Java have Block Scope. They are born when their declaring block '{' opens, and they die when that block '}' closes. You cannot access a variable outside of the block it was declared in. This forces you to declare variables at the correct level of visibility.",
        'CodeGolf': "Ternary operators allow for 'Code Golf' - writing code in as few keystrokes as possible. While elegant for simple assignments, overusing them can harm readability. The goal of a programmer isn't to write the shortest code, but the most readable and maintainable code.",
        'DanglingElse': "Indentation means nothing to the Java compiler. An 'else' statement always binds to the nearest unmatched 'if' statement in its scope. If you don't use curly braces '{}', you can easily trick yourself into thinking an 'else' belongs to an outer 'if' based on visual indentation, leading to severe logical bugs.",
        'XORGate': "The logical XOR (^) operator is the 'exclusive OR'. It evaluates to true ONLY if the operands are strictly different (True/False or False/True). If they are the same (True/True or False/False), it returns false. It's a hardware-level parity check.",
        'EnhancedSwitchVisualizer': "Java 14 introduced the Arrow (->) Switch to solve the fallthrough trap. Cases separated by commas allow multiple matches. The arrow syntax guarantees no fallthrough (no break needed), and the switch can be used as an expression to yield a value directly into a variable."
    }
};

const ExplainerComponent = `
const ExplainerCard = ({ title, text }: { title?: string, text: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-8 border-t border-slate-800 pt-6">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-400 transition-colors uppercase tracking-widest">
                <Info size={16} className={open ? "text-orange-500" : ""} />
                {open ? 'Hide Deep Dive' : 'Read Deep Dive Explanation'}
            </button>
            {open && (
                <div className="mt-4 p-6 bg-blue-950/20 border border-blue-900/50 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Globe size={16}/> Under The Hood {title ? \`- \${title}\` : ''}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
                </div>
            )}
        </div>
    );
};
`;

const processFile = (unit, lesson) => {
    const filePath = `/home/anon/Desktop/interactive-notes/java/java-units-java/app/${unit}/${lesson}/page.tsx`;
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('const ExplainerCard =')) {
        content = content.replace('const CodeBlock =', ExplainerComponent + '\n\nconst CodeBlock =');
    }

    const lessonExps = explanations[lesson];
    if (!lessonExps) return;

    for (const [compName, text] of Object.entries(lessonExps)) {
        // Find the component definition
        const compRegex = new RegExp(`const ${compName} = \\(\\) => \\{[\\s\\S]*?(?=const |export default|// ---)`, 'g');
        const match = compRegex.exec(content);
        if (match) {
            let compBody = match[0];
            if (!compBody.includes('<ExplainerCard')) {
                // Find the last </div> before the final return closing
                const lastDivRegex = /<\/div>\s*<\/div>\s*\);\s*};/g;
                const divMatch = [...compBody.matchAll(/<\/div>\s*\);\s*};/g)];
                
                if (divMatch.length > 0) {
                     // Replace the last </div> with <ExplainerCard /></div>
                     compBody = compBody.replace(/<\/div>\s*\);\s*};/, `    <ExplainerCard text="${text.replace(/"/g, '&quot;')}" />\n        </div>\n    );\n};`);
                     content = content.replace(match[0], compBody);
                } else {
                     // Alternative replace if multiple nested divs
                     compBody = compBody.replace(/(<\/div>\s*\);\s*\n};)/, `    <ExplainerCard text="${text.replace(/"/g, '&quot;')}" />\n        $1`);
                     content = content.replace(match[0], compBody);
                }
            }
        }
    }

    fs.writeFileSync(filePath, content);
};

['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].forEach(l => processFile('unit1', l));
console.log("Explanations injected successfully.");
