"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";

function NetworkMesh(props: any) {
    const ref = useRef<THREE.Group>(null!);
    const [hovered, setHover] = useState(false);

    // Generate points on a Sphere key
    const { positions, connections } = useMemo(() => {
        const count = 120; // Increased count for dense globe
        const radius = 4.5;
        const positions = new Float32Array(count * 3);
        const connections = [];
        const vecPositions = []; // Temp storage for vector distance check

        // Fibonacci Sphere Distribution for even coverage
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / count);
            const theta = Math.PI * (1 + 5 ** 0.5) * i;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            vecPositions.push(new THREE.Vector3(x, y, z));
        }

        // Create random connections based on surface distance
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = vecPositions[i].distanceTo(vecPositions[j]);

                // Connect if close enough (neighbors on sphere surface)
                if (dist < 1.8) {
                    connections.push(
                        vecPositions[i],
                        vecPositions[j]
                    );
                }
            }
        }

        return { positions, connections };
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Auto rotation + subtle mouse tilt
            ref.current.rotation.y += delta * 0.05; // Constant slow spin

            // Subtle mouse influence
            const x = state.mouse.x * 0.2;
            const y = state.mouse.y * 0.2;

            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y, 0.1);
            // We only tilt X with mouse, let Y spin naturally but slightly affected? 
            // Let's just keep Y strict auto-spin + offset? No, simpler is better.
            // Just add tilt to X. 
        }
    });

    return (
        <group ref={ref} {...props}>
            {/* Nodes */}
            <Points positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00FF94" /* Bio-Green */
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={1.0}
                    toneMapped={false}
                />
            </Points>

            {/* Connections (Synapses) */}
            <Line
                worldUnits
                points={connections}
                color="#00A3FF" /* Electric Blue */
                opacity={0.3}
                transparent
                lineWidth={0.02}
                segments
            />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <ErrorBoundary fallback={
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-black pointer-events-none" />
            }>
                <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                    <ambientLight intensity={0.5} />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <NetworkMesh />
                    </Float>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
