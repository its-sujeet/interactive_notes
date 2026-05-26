const fs = require('fs');
const path = require('path');

function patchDirectory(dir, basePathPrefix) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            patchDirectory(fullPath, basePathPrefix);
        } else if (file === 'page.tsx' || file === 'layout.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            // Handle src="/logo.png"
            if (content.includes('src="/logo.png"')) {
                content = content.replaceAll('src="/logo.png"', `src="${basePathPrefix}/logo.png"`);
                updated = true;
            }

            // Handle src="/cunits/logo.png" specifically for cpp
            if (basePathPrefix === '/cpp' && content.includes('src="/cunits/logo.png"')) {
                content = content.replaceAll('src="/cunits/logo.png"', 'src="/cpp/logo.png"');
                updated = true;
            }

            if (updated) {
                fs.writeFileSync(fullPath, content);
                console.log(`Patched ${fullPath}`);
            }
        }
    }
}

console.log("Patching C++...");
patchDirectory('/home/anon/Desktop/interactive-notes/cpp/c-units-cpp/app', '/cpp');

console.log("Patching DSA...");
patchDirectory('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app', '/dsa');

console.log("Patching Java...");
patchDirectory('/home/anon/Desktop/interactive-notes/java/java-units-java/app', '/java');
