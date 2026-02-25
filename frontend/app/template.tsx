'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up') || pathname?.startsWith('/2fa');

    // Bypass animations for Clerk pages to prevent strict Hydration Mismatches
    if (isAuthPage) {
        return <>{children}</>;
    }

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
                ease: [0.16, 1, 0.3, 1], // Custom bouncy ease for cinematic feel
                delay: 0.1
            }}
        >
            {children}
        </motion.div>
    );
}
