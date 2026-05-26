const fs = require('fs');
const path = require('path');

function replaceInDir(dir, type) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath, type);
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            if (type === 'java') {
                const regexJava = /<div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white" style=\{\{ filter: isLightMode \? 'invert\(1\) hue-rotate\(180deg\) sepia\(0\.3\) contrast\(0\.95\)' : 'none' \}\}>.*?<\/div>/s;
                const replacement = `<img src="/logo.png" alt="Java Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) sepia(0.3) contrast(0.95)' : 'none' }} />`;
                if (regexJava.test(content)) {
                    content = content.replace(regexJava, replacement);
                    updated = true;
                }
            } else if (type === 'dsa') {
                const regexDsaOld = /<div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white" style=\{\{ filter: isLightMode \? 'invert\(1\) hue-rotate\(180deg\) sepia\(0\.3\) contrast\(0\.95\)' : 'none' \}\}>.*?<\/div>/s;
                const replacementOld = `<img src="/logo.png" alt="DSA Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)' : 'none' }} />`;
                
                if (regexDsaOld.test(content)) {
                    content = content.replace(regexDsaOld, replacementOld);
                    updated = true;
                }

                const regexDsaNew = /<div className="w-8 h-8 rounded-lg bg-gradient-to-br[^>]+ flex items-center justify-center">\s*<[A-Za-z]+ className="text-white w-5 h-5" \/>\s*<\/div>/g;
                const replacementNew = `<img src="/logo.png" alt="DSA Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />`;
                if (regexDsaNew.test(content)) {
                    content = content.replace(regexDsaNew, replacementNew);
                    updated = true;
                }
            }

            if (updated) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1', 'dsa');
replaceInDir('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1', 'java');
