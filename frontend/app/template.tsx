import React from 'react';

export default function Template({ children }: { children: React.RefObject<React.ReactNode> | React.ReactNode }) {
    // Strictly stable wrapper to prevent hydration mismatches
    return (
        <div className="algor-template-boundary">
            {children as React.ReactNode}
        </div>
    );
}
