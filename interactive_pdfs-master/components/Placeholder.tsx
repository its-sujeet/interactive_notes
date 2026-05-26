import React from 'react';

export default function PlaceholderPage({ params }: { params: { unit: string; lecture: string } }) {
    // Since we are using static routes for unit1/L1, we might not use this dynamicaly everywhere yet,
    // but for now, let's create static files or a dynamic route that catches others.
    // Ideally, app/unit[id]/L[id]/page.tsx structure implies dynamic routes or individual files.
    // I will assume individual files are expected for specific content, but for placeholders I'll use a generic simple component 
    // that I can copy or use if I were to make a dynamic route [unitId]/[lessonId]/page.tsx.
    // However, the instructions imply creating specific paths.
    // I will create a simple placeholder component here to be used/copied if needed, 
    // OR I can just create the files directly.

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
            <div className="bg-gray-100 p-8 rounded-full mb-6">
                <span className="text-4xl">🚧</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Coming Soon</h1>
            <p className="text-gray-500 max-w-md">
                This lecture content is currently under development. Please check back later or proceed to the next available lesson.
            </p>
        </div>
    );
}
