'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{
                opacity: 0,
                filter: 'blur(12px)',
                scale: 1.02,
                y: 10
            }}
            animate={{
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                y: 0
            }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] // Custom refined spring-like curve
            }}
        >
            {children}
        </motion.div>
    );
}
