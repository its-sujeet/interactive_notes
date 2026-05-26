const fs = require('fs');

for (let i = 1; i <= 6; i++) {
    const file = `/home/anon/Desktop/interactive-notes/cpp/c-units-cpp/app/unit1/L${i}/page.tsx`;
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the current filter with a much darker, warmer cream filter
    content = content.replace(/invert\(1\) hue-rotate\(180deg\) sepia\(0\.3\) contrast\(0\.95\)/g, 'invert(1) hue-rotate(180deg) brightness(0.85) sepia(0.5) contrast(0.85)');
    
    fs.writeFileSync(file, content);
}
console.log("Applied super-soft cream light aesthetic!");
