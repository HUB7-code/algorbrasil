'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up') || pathname?.startsWith('/2fa');

    // Bypass animations for Clerk pages to prevent hydration mismatches
    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        // IMPORTANT: Do NOT use scale, filter, or perspective here.
        // CSS rule: any transform/filter on an ancestor makes position:fixed children
        // behave as position:absolute (relative to ancestor, not the viewport).
        // This would break the Navbar's fixed positioning during page transitions.
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
