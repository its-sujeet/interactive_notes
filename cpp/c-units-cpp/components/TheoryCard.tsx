import React from 'react';

interface TheoryCardProps {
    title: string;
    children: React.ReactNode;
    variant?: 'code-example' | 'note' | 'concept';
}

const TheoryCard: React.FC<TheoryCardProps> = ({ title, children, variant = 'concept' }) => {
    let bgColor = 'bg-white';
    let borderColor = 'border-gray-200';
    let titleColor = 'text-gray-900';

    if (variant === 'note') {
        bgColor = 'bg-yellow-50';
        borderColor = 'border-yellow-200';
        titleColor = 'text-yellow-800';
    } else if (variant === 'code-example') {
        bgColor = 'bg-gray-50';
        borderColor = 'border-gray-200';
    }

    return (
        <div className={`mb-6 rounded-lg border ${borderColor} ${bgColor} shadow-sm overflow-hidden`}>
            <div className="px-6 py-4 border-b border-gray-100 last:border-0">
                <h3 className={`text-lg font-semibold ${titleColor} mb-2`}>{title}</h3>
                <div className="text-gray-700 leading-relaxed space-y-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TheoryCard;
