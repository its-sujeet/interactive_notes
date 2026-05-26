const fs = require('fs');

let l1 = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L1/page.tsx', 'utf8');

const l1Comp = `
// --- INTERACTIVE 5: History & Features Matrix ---
const FeaturesMatrix = () => {
    const [activeFeature, setActiveFeature] = useState<'history'|'oop'|'platform'|'secure'>('history');

    const features = {
        history: { title: "The Oak Project (1995)", desc: "Originally named 'Oak' by James Gosling at Sun Microsystems. Built for interactive television, it was too advanced for the time and pivoted to the World Wide Web.", icon: Coffee, color: "text-orange-400 border-orange-500", bg: "bg-orange-500/20" },
        oop: { title: "Strictly Object-Oriented", desc: "Everything is an Object. Except for 8 primitive types, all code must reside inside a Class blueprint. This enforces modularity and code reuse.", icon: Shapes, color: "text-blue-400 border-blue-500", bg: "bg-blue-500/20" },
        platform: { title: "Platform Independent", desc: "Write Once, Run Anywhere (WORA). The compiler generates bytecode, and the JVM translates it for the specific OS. You don't need to recompile for Mac, Windows, or Linux.", icon: Globe, color: "text-green-400 border-green-500", bg: "bg-green-500/20" },
        secure: { title: "Secure & Robust", desc: "No explicit pointers. Automatic Garbage Collection. A strict bytecode verifier that checks for unauthorized memory access before execution.", icon: Shield, color: "text-red-400 border-red-500", bg: "bg-red-500/20" }
    };

    return (
        <div className="my-12 p-8 bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">History & Core Features</h3>
            
            <div className="flex flex-wrap gap-4 mb-8">
                {(Object.keys(features) as Array<keyof typeof features>).map(key => {
                    const feat = features[key];
                    const Icon = feat.icon;
                    const isActive = activeFeature === key;
                    return (
                        <button 
                            key={key}
                            onClick={() => setActiveFeature(key)}
                            className={\`flex-1 min-w-[150px] p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 \${isActive ? \`\${feat.bg} \${feat.color}\` : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}\`}
                        >
                            <Icon size={24} />
                            <span className="font-bold text-sm">{key.toUpperCase()}</span>
                        </button>
                    );
                })}
            </div>

            <div className={\`p-8 border-2 rounded-xl transition-all \${features[activeFeature].bg} \${features[activeFeature].color.split(' ')[1]}\`}>
                <h4 className={\`text-2xl font-bold mb-4 \${features[activeFeature].color.split(' ')[0]}\`}>{features[activeFeature].title}</h4>
                <p className="text-slate-200 text-lg leading-relaxed">{features[activeFeature].desc}</p>
            </div>
        </div>
    );
};
`;

if(l1.includes('export default function JavaLecture1() {')) {
    l1 = l1.replace('export default function JavaLecture1() {', l1Comp + '\nexport default function JavaLecture1() {');
    l1 = l1.replace('</section>\n            </div>\n        </div>\n    );\n}', '</section>\n<section className="px-6 md:px-12 max-w-7xl mx-auto mb-16"><FeaturesMatrix /></section>\n            </div>\n        </div>\n    );\n}');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L1/page.tsx', l1);
}

