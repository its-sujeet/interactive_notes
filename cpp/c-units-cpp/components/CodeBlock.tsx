import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'c', title }) => {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e] text-gray-100 shadow-md">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</span>
          <span className="text-xs text-gray-500">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
