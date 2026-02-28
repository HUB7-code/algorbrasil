'use client';

import { useEffect, useRef } from 'react';

interface NeuralGlobeProps {
    size?: number;       // diameter in px
    className?: string;
    intensity?: 'low' | 'medium' | 'high'; // glow intensity
}

// Deterministic pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

export default function NeuralGlobe({ size = 320, className = '', intensity = 'high' }: NeuralGlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const isVisible = useRef<boolean>(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Pause animation loop when canvas is not visible (saves CPU/GPU)
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible.current = entry.isIntersecting; },
            { threshold: 0.01 }
        );
        observer.observe(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const cx = size / 2;
        const cy = size / 2;
        const radius = size * 0.42;

        // Generate nodes on sphere surface using seeded values
        const NODE_COUNT = intensity === 'high' ? 80 : intensity === 'medium' ? 50 : 30;
        const nodes: { x: number; y: number; z: number; pulse: number }[] = [];

        for (let i = 0; i < NODE_COUNT; i++) {
            const theta = Math.acos(2 * seededRandom(i * 3) - 1);
            const phi = 2 * Math.PI * seededRandom(i * 3 + 1);
            nodes.push({
                x: Math.sin(theta) * Math.cos(phi),
                y: Math.sin(theta) * Math.sin(phi),
                z: Math.cos(theta),
                pulse: seededRandom(i * 3 + 2) * Math.PI * 2,
            });
        }

        let angle = 0;

        const draw = () => {
            // Skip expensive draw calls when not visible
            if (!isVisible.current) {
                animRef.current = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, size, size);

            // Outer glow rings
            const ringGrad = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.4);
            ringGrad.addColorStop(0, 'rgba(79,126,255,0.12)');
            ringGrad.addColorStop(0.5, 'rgba(79,126,255,0.06)');
            ringGrad.addColorStop(1, 'rgba(79,126,255,0)');
            ctx.fillStyle = ringGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
            ctx.fill();

            // Core glow
            const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            coreGrad.addColorStop(0, 'rgba(129,140,248,0.25)');
            coreGrad.addColorStop(0.4, 'rgba(79,126,255,0.15)');
            coreGrad.addColorStop(1, 'rgba(79,126,255,0.02)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();

            // Latitude / longitude grid lines
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            ctx.strokeStyle = 'rgba(79,126,255,0.15)';
            ctx.lineWidth = 0.6;

            // Equator + parallels
            for (let lat = -60; lat <= 60; lat += 30) {
                const latRad = (lat * Math.PI) / 180;
                const r = radius * Math.cos(latRad);
                const yOff = radius * Math.sin(latRad);
                ctx.beginPath();
                ctx.ellipse(cx, cy + yOff * cos, r, r * Math.abs(sin) + 1, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Meridians
            for (let lon = 0; lon < 180; lon += 30) {
                const lonRad = (lon * Math.PI) / 180 + angle;
                ctx.beginPath();
                ctx.ellipse(cx, cy, radius * Math.abs(Math.cos(lonRad)), radius, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Outer circle border
            ctx.strokeStyle = 'rgba(79,126,255,0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Nodes + connections
            const time = Date.now() * 0.001;
            const projected = nodes.map((n) => {
                // Rotate around Y
                const rx = n.x * Math.cos(angle) - n.z * Math.sin(angle);
                const ry = n.y;
                const rz = n.x * Math.sin(angle) + n.z * Math.cos(angle);
                const scale = (rz + 1.5) / 2.5;
                const px = cx + rx * radius;
                const py = cy + ry * radius;
                const pulse = (Math.sin(time * 2 + n.pulse) + 1) / 2;
                return { px, py, scale, rz, pulse };
            });

            // Draw connections
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const a = projected[i];
                    const b = projected[j];
                    const dist = Math.hypot(a.px - b.px, a.py - b.py);
                    if (dist < size * 0.22) {
                        const alpha = (1 - dist / (size * 0.22)) * 0.35 * Math.min(a.scale, b.scale);
                        ctx.beginPath();
                        ctx.moveTo(a.px, a.py);
                        ctx.lineTo(b.px, b.py);
                        ctx.strokeStyle = `rgba(79,126,255,${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            projected.forEach(({ px, py, scale, pulse }) => {
                const r = (2.5 + pulse * 1.5) * scale;
                const alpha = 0.4 + pulse * 0.6;

                // Glow
                const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 3);
                grd.addColorStop(0, `rgba(129,140,248,${alpha * 0.8})`);
                grd.addColorStop(1, 'rgba(129,140,248,0)');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(px, py, r * 3, 0, Math.PI * 2);
                ctx.fill();

                // Core dot
                ctx.fillStyle = `rgba(200,210,255,${alpha})`;
                ctx.beginPath();
                ctx.arc(px, py, r * 0.8, 0, Math.PI * 2);
                ctx.fill();
            });

            angle += 0.003;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animRef.current);
            observer.disconnect();
        };
    }, [size, intensity]);

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className={className}
            style={{ width: size, height: size }}
        />
    );
}
