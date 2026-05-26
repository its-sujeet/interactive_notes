const fs = require('fs');

let content = fs.readFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', 'utf8');

// The problematic patterns injected:
// {'{\n'}
// {'}\n'}
// Let's replace them globally.

content = content.replace(/\{'\{\n'\}/g, "{'{'}<br/>\n");
content = content.replace(/\{'\}\n'\}/g, "{'}'}<br/>\n");

fs.writeFileSync('/home/anon/Desktop/interactive-notes/java/java-units-java/app/unit1/L6/page.tsx', content);
console.log("Replaced newlines in JSX strings.");
