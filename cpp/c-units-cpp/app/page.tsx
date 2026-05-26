import Link from 'next/link';
import { BookOpen, ArrowRight, Code, Terminal, Layers } from 'lucide-react';

const units = [
  { id: 1, title: "Concepts and Basics of C++ Programming", description: 'Lectures: 6', icon: Terminal },
  { id: 2, title: "Pointers, Reference Variables, Arrays and String Concepts", description: 'Lectures: 6', icon: Code },
  { id: 3, title: "Data File Operations and Constructors", description: 'Lectures: 6', icon: Layers },
  { id: 4, title: "Operator Overloading and Inheritance", description: 'Lectures: 6', icon: ArrowRight },
  { id: 5, title: "Dynamic Memory Management and Polymorphism", description: 'Lectures: 6', icon: BookOpen },
  { id: 6, title: "Exception Handling, Templates and Standard Template Library (STL)", description: 'Lectures: 6', icon: FileCode },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to C++ Units</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Master C++ programming through structured units, interactive examples, and clear theory.
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
