'use client';

import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface CounterNumProps {
    target: number;
    suffix: string;
}

export function CounterNum({ target, suffix }: CounterNumProps) {
    const { count, ref } = useCountUp({ target });
    return (
        <span ref={ref as React.RefObject<HTMLSpanElement>} className="font-orbitron text-5xl md:text-6xl font-bold text-white">
            {count}{suffix}
        </span>
    );
}
