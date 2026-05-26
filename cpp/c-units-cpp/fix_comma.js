const fs = require('fs');

for (let i = 1; i <= 6; i++) {
    const file = `/home/anon/Desktop/interactive-notes/cpp/c-units-cpp/app/unit1/L${i}/page.tsx`;
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Match any identifier (word chars) immediately followed by newlines/spaces and "Sun,"
    content = content.replace(/([a-zA-Z0-9_]+)\s*\n\s*Sun,/g, '$1,\n    Sun,');
    
    fs.writeFileSync(file, content);
}
console.log("Fixed missing commas!");
