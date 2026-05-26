const fs = require('fs');

for (let i = 1; i <= 5; i++) {
    const file = `/home/anon/Desktop/interactive-notes/cpp/c-units-cpp/app/unit1/L${i}/page.tsx`;
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Add Sun, Moon to lucide-react if not there
    if (!content.includes('Sun,')) {
        content = content.replace(/} from 'lucide-react';/, '    Sun,\n    Moon\n} from \'lucide-react\';');
    }
    
    // Add isLightMode state and wrapper
    if (!content.includes('const [isLightMode, setIsLightMode] = useState(false);')) {
        // Find the function definition
        const regex = new RegExp(`export default function CppLecture${i}\\(\\) \\{\\n\\s*return \\(`);
        content = content.replace(regex, `export default function CppLecture${i}() {\n    const [isLightMode, setIsLightMode] = useState(false);\n\n    return (\n        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.5s ease' }}>\n            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-[...]/30">`.replace('className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-[...]/30">', '<div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 selection:bg-purple-500/30">'));
        
        // Actually wait, let's just do it cleanly:
        // Replace "return (" with "const [isLightMode, setIsLightMode] = useState(false);\n\n    return (\n        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.5s ease' }}>"
        
        // Let's refine this to avoid destroying the inner div
        content = content.replace(/export default function CppLecture\d+\(\) \{\n\s*return \(\n\s*<div className="min-h-screen/g, 
        `export default function CppLecture${i}() {\n    const [isLightMode, setIsLightMode] = useState(false);\n\n    return (\n        <div style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.5s ease' }}>\n        <div className="min-h-screen`);
    }

    // Update Header Logo and Toggle
    if (!content.includes('title="Toggle Light/Dark Mode"')) {
        content = content.replace(/(<img src="\/cunits\/logo\.png"[^>]+)\/>/g, `$1 style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : 'none' }} />`);
            
        content = content.replace(/<\/header>/, 
            `    <button \n                        onClick={() => setIsLightMode(!isLightMode)}\n                        className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center shadow-lg"\n                        style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}\n                        title="Toggle Light/Dark Mode"\n                    >\n                        {isLightMode ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-400" />}\n                    </button>\n                </header>`);
    }

    // Add closing div
    if (!content.includes('</section>\n            </div>\n        </div>')) {
        content = content.replace(/<\/section>\n\s*<\/div>\n\s*\);\n}/, `</section>\n            </div>\n        </div>\n    );\n}`);
    }

    fs.writeFileSync(file, content);
    console.log(`Updated L${i}`);
}
