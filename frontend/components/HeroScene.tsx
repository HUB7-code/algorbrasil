"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles(props: any) {
    const ref = useRef<THREE.Points>(null!);

    // Generate random points in a sphere
    const [positions, videProps] = useMemo(() => {
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 2.5 + Math.random() * 0.5; // Radius between 2.5 and 3.0

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color gradient between Brand Green and Electric Blue
            if (Math.random() > 0.5) {
                color.set("#00FF94"); // Green
            } else {
                color.set("#00A3FF"); // Blue
            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, { vertexColors: true }];
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

import ErrorBoundary from "./ErrorBoundary";

export default function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <ErrorBoundary fallback={
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-black pointer-events-none" />
            }>
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                    {/* Ambient Light */}
                    <ambientLight intensity={0.5} />

                    {/* Particles */}
                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <Particles />
                    </Float>

                    {/* Fog to blend with background */}
                    {/* Note: Background color should match HTML bg usually, but we are transparent. 
             If we want fog, we need to attach it to the scene and color it. 
             Let's skip fog for transparency so it sits on top of CSS layout. */}
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
