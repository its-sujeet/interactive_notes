const fs = require('fs');

// Helpers for reading/writing
const processFile = (path, editor) => {
    let content = fs.readFileSync(path, 'utf8');
    content = editor(content);
    fs.writeFileSync(path, content);
};

// L1 Upgrade
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L1/page.tsx', (l1) => {
    const proTip = `
                <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Zap size={20}/> PRO-TIP: GC Tuning</h4>
                    <p className="text-slate-300 text-sm">While the JVM manages memory automatically, enterprise applications often tune the Garbage Collector. For example, using <code className="text-orange-400">java -XX:+UseZGC Main</code> switches the JVM to the ultra-low latency Z Garbage Collector designed for multi-terabyte heaps.</p>
                </div>
`;
    l1 = l1.replace('<GCVisualizer /></section>', proTip + '<GCVisualizer /></section>');

    const whyCare = `
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Why Should I Care About JVM Architecture?</h4>
                    <p className="text-slate-400 text-sm">If your application crashes with an <code className="text-red-400">OutOfMemoryError</code> or runs painfully slow, you cannot fix it without knowing whether the bottleneck is in the Classloader, the Execution Engine, or the Memory Areas.</p>
                </div>
`;
    l1 = l1.replace('<JVMArchitectureVisualizer />', whyCare + '<JVMArchitectureVisualizer />');
    return l1;
});

// L2 Upgrade
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L2/page.tsx', (l2) => {
    const theoryMetaspace = `
                <div className="bg-purple-500/10 border-l-4 border-purple-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-purple-400 font-bold mb-2">Deep Theory: The Death of PermGen</h4>
                    <p className="text-slate-300 text-sm">Prior to Java 8, class metadata was stored in a fixed-size memory area called <strong>PermGen (Permanent Generation)</strong>. If you loaded too many classes dynamically, it would throw <code className="text-red-400">OutOfMemoryError: PermGen space</code>. Java 8 replaced this with <strong>Metaspace</strong>, which automatically scales using native OS memory, eliminating this notorious crash.</p>
                </div>
`;
    l2 = l2.replace('<JVMMemoryVisualizer /></section>', theoryMetaspace + '<JVMMemoryVisualizer /></section>');

    const rwMaven = `
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Real World Context: Build Tools</h4>
                    <p className="text-slate-400 text-sm">In professional environments, nobody types <code className="text-orange-400">javac -cp ...</code> by hand. We use build tools like <strong>Maven</strong> or <strong>Gradle</strong> which automatically download dependencies (like MySQL drivers) from the internet and construct the massive classpath string for the compiler automatically.</p>
                </div>
`;
    l2 = l2.replace('<ClasspathSimulator /></section>', rwMaven + '<ClasspathSimulator /></section>');
    return l2;
});

// L3 Upgrade
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L3/page.tsx', (l3) => {
    const byteChallenge = `
                <div className="bg-[#161b22] border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Target size={20} className="text-red-500" /> Mini-Challenge: The Byte Barrier</h4>
                    <div className="font-mono text-sm mb-4">
                        <span className="text-blue-400">byte</span> myNum = <span className="text-orange-400">128</span>;<br/>
                        System.out.println(myNum);
                    </div>
                    <p className="text-slate-400 text-sm mb-4">What happens when you compile this code?</p>
                    <details className="cursor-pointer group">
                        <summary className="text-orange-400 font-bold mb-2 outline-none">Reveal Answer</summary>
                        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded">
                            <strong>Compilation Error!</strong> A byte is 8 bits and strictly limited to values between -128 and 127. The compiler detects that 128 exceeds the maximum boundary and refuses to build.
                        </div>
                    </details>
                </div>
`;
    // We need to import Target from lucide-react if not present, but let's just use Zap or Code which are likely imported.
    // L3 imports: Terminal, Code, Play, Layers, Globe, Zap, LayoutGrid, Info, Server, Shield, Shapes, Lock, Database, Coffee, Sun, Moon, ArrowRight, ArrowDown, Unlock, Eye, EyeOff
    const byteChallengeFix = byteChallenge.replace('<Target', '<Zap');
    l3 = l3.replace('<TypeCastingCrucible />', byteChallengeFix + '<TypeCastingCrucible />');

    const immutabilityTheory = `
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Deep Theory: String Immutability</h4>
                    <p className="text-slate-400 text-sm">Strings in Java are <strong>immutable</strong>. Once a String object is created in memory, its value can NEVER be changed. If you try to concatenate a string (e.g., <code className="text-orange-400">s = s + " World"</code>), Java does not modify the original string; it creates an entirely new String object in the heap. This makes Strings incredibly thread-safe but requires the String Constant Pool to prevent memory bloat.</p>
                </div>
`;
    l3 = l3.replace('<StringPoolVisualizer /></section>', immutabilityTheory + '<StringPoolVisualizer /></section>');
    return l3;
});

// L4 Upgrade
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L4/page.tsx', (l4) => {
    const rwSubnet = `
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Real World Context: Network Subnetting</h4>
                    <p className="text-slate-400 text-sm">Beyond color graphics, Bitwise AND (<code className="text-orange-400">&amp;</code>) is actively used in networking to calculate Subnet Routing. Routers apply a bitwise AND operation between an IP address and a Subnet Mask to instantly determine if a packet belongs to the local network or needs to be forwarded to the internet.</p>
                </div>
`;
    l4 = l4.replace('<BitwiseMasking /></section>', rwSubnet + '<BitwiseMasking /></section>');

    const shortCircuitTip = `
                <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-green-400 font-bold mb-2">PRO-TIP: Safe Navigation</h4>
                    <p className="text-slate-300 text-sm">Always place your null-checks on the left side of a <code className="text-orange-400">&amp;&amp;</code> operator. The JVM evaluates left-to-right, so if the left side is null, the short-circuit triggers immediately, preventing a <code className="text-red-400">NullPointerException</code> on the right side.</p>
                </div>
`;
    l4 = l4.replace('<ShortCircuitVisualizer /></section>', shortCircuitTip + '<ShortCircuitVisualizer /></section>');
    return l4;
});

// L5 Upgrade
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L5/page.tsx', (l5) => {
    const preChallenge = `
                <div className="bg-[#161b22] border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Code size={20} className="text-orange-500" /> Mini-Challenge: Brain Teaser</h4>
                    <div className="font-mono text-sm mb-4">
                        <span className="text-orange-400">int</span> x = 5;<br/>
                        System.out.println(x++ + ++x);
                    </div>
                    <p className="text-slate-400 text-sm mb-4">Can you calculate the output?</p>
                    <details className="cursor-pointer group">
                        <summary className="text-orange-400 font-bold mb-2 outline-none">Reveal Answer</summary>
                        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded mt-2">
                            <strong>Output: 12</strong><br/>
                            1. <code className="text-orange-400">x++</code> evaluates to 5 (post-increment), then x becomes 6.<br/>
                            2. <code className="text-orange-400">++x</code> increments x to 7 (pre-increment), and evaluates to 7.<br/>
                            3. Final addition: 5 + 7 = 12.
                        </div>
                    </details>
                </div>
`;
    l5 = l5.replace('<PrecedenceArena />', preChallenge + '<PrecedenceArena />');

    const theoryCpu = `
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Deep Theory: Branch Prediction</h4>
                    <p className="text-slate-400 text-sm">While the Ternary operator shrinks code visually, it compiles to standard branching instructions just like an if-else. Deep down at the CPU level, your processor uses an algorithm called <strong>Branch Prediction</strong> to guess which path (true or false) will execute, pre-loading those instructions to save nanoseconds. If it guesses wrong, it flushes the pipeline (a massive performance hit in high-frequency trading apps).</p>
                </div>
`;
    l5 = l5.replace('<TernaryRouter />', theoryCpu + '<TernaryRouter />');
    return l5;
});

// L6 Upgrade
processFile('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', (l6) => {
    const rwFormat = `
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mb-8">
                    <h4 className="text-white font-bold mb-2">Real World Context: CI/CD Pipelines</h4>
                    <p className="text-slate-400 text-sm">Because the Dangling Else trap causes silent bugs, modern software teams use automated formatting tools (like <strong>Checkstyle</strong> or <strong>SonarQube</strong>). These tools will automatically reject your code commit if you write an if-statement without curly braces.</p>
                </div>
`;
    l6 = l6.replace('<DanglingElse /></section>', rwFormat + '<DanglingElse /></section>');
    
    return l6;
});

