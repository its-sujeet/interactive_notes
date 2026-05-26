import Link from 'next/link';
import { BookOpen, ArrowRight, Code, Terminal, Layers } from 'lucide-react';

const units = [
  { id: 1, title: 'Introduction', description: 'Basics of C programming, setup, and first steps.', icon: Terminal },
  { id: 2, title: 'Control Flow', description: 'If-else, switch, loops, and logic.', icon: Code },
  { id: 3, title: 'Functions', description: 'Modular programming, parameters, and return values.', icon: Layers },
  { id: 5, title: 'Pointers', description: 'Memory management, addressing, and pointer arithmetic.', icon: ArrowRight },
  { id: 6, title: 'Structures', description: 'Custom data types, structs, and unions.', icon: BookOpen },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to C-Units</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Master C programming through structured units, interactive examples, and clear theory.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => {
          const Icon = unit.icon;
          return (
            <Link key={unit.id} href={`/unit${unit.id}/L1`} className="group">
              <div className="h-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-blue-300 cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Unit {unit.id}: {unit.title}</h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {unit.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Start Learning <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
