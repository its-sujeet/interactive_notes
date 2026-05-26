"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Home, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const units = [
    { id: 1, title: 'Unit 1: Introduction' },
    { id: 2, title: 'Unit 2: Control Flow' },
    { id: 3, title: 'Unit 3: Functions' },
    { id: 5, title: 'Unit 5: Pointers' },
    { id: 6, title: 'Unit 6: Structures' },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [expandedUnit, setExpandedUnit] = useState<number | null>(null);

    const toggleUnit = (id: number) => {
        setExpandedUnit(expandedUnit === id ? null : id);
    };

    return (
        <aside className="w-64 bg-gray-900 border-r border-gray-800 text-gray-300 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-800 flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">C</div>
                <span className="text-xl font-bold text-white tracking-tight">C-Units</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link
                    href="/"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                        }`}
                >
                    <Home size={20} />
                    <span className="font-medium">Dashboard</span>
                </Link>

                {units.map((unit) => (
                    <div key={unit.id} className="space-y-1">
                        <button
                            onClick={() => toggleUnit(unit.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-gray-800 ${pathname.startsWith(`/unit${unit.id}`) ? 'text-white' : ''
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <BookOpen size={20} />
                                <span className="font-medium">{unit.title}</span>
                            </div>
                            <ChevronRight size={16} className={`transform transition-transform ${expandedUnit === unit.id ? 'rotate-90' : ''}`} />
                        </button>

                        {expandedUnit === unit.id && (
                            <div className="pl-12 space-y-1">
                                {[1, 2, 3, 4, 5].map((lesson) => (
                                    <Link
                                        key={lesson}
                                        href={`/unit${unit.id}/L${lesson}`}
                                        className={`block py-2 px-3 text-sm rounded-md transition-colors ${pathname === `/unit${unit.id}/L${lesson}`
                                                ? 'bg-blue-900/50 text-blue-400'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                            }`}
                                    >
                                        Lecture {lesson}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800 text-xs text-center text-gray-500">
                &copy; 2025 C-Units Learning
            </div>
        </aside>
    );
};

export default Sidebar;
