const fs = require('fs');

for (let i = 1; i <= 6; i++) {
    const file = `/home/anon/Desktop/interactive-notes/cpp/c-units-cpp/app/unit1/L${i}/page.tsx`;
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(/[ \t]*<div <div className="min-h-screen[^>]*>\n/g, '');
    
    fs.writeFileSync(file, content);
}
console.log("Fixed broken divs!");
