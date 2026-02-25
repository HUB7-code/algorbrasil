import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
    target: number;
    duration?: number;  // ms
    startOnView?: boolean;
}

export function useCountUp({ target, duration = 1200, startOnView = true }: UseCountUpOptions) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const ref = useRef<HTMLElement | null>(null);

    // Respect prefers-reduced-motion
    const prefersReduced = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    useEffect(() => {
        if (!startOnView) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView]);

    useEffect(() => {
        if (!hasStarted) return;

        if (prefersReduced) {
            setCount(target);
            return;
        }

        let startTime: number | null = null;
        const startValue = 0;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(startValue + (target - startValue) * eased));
            if (progress < 1) requestAnimationFrame(step);
        };

        const raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [hasStarted, target, duration, prefersReduced]);

    return { count, ref };
}
