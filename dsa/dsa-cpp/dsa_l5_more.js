const fs = require('fs');

let l4 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L4/page.tsx', 'utf8');
let l5 = fs.readFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', 'utf8');

// Extract BubbleSortVisualizer
const startToken = '// --- INTERACTIVE 4: Bubble Sort Visualizer ---';
const endToken = 'export default function DSALecture4';
const bubbleSortComp = l4.substring(l4.indexOf(startToken), l4.indexOf(endToken));

// Inject into L5
if (!l5.includes('BubbleSortVisualizer')) {
    l5 = l5.replace('export default function DSALecture5', bubbleSortComp + '\nexport default function DSALecture5');
    l5 = l5.replace('</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <SelectionSortVisualizer />', '</section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <BubbleSortVisualizer />\n                </section>\n\n                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">\n                    <SelectionSortVisualizer />');
    fs.writeFileSync('/home/anon/Desktop/interactive-notes/dsa/dsa-cpp/app/unit1/L5/page.tsx', l5);
    console.log('Injected BubbleSortVisualizer into L5.');
} else {
    console.log('Already exists');
}
