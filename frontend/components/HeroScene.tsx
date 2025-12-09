"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";

function NetworkMesh(props: any) {
    const ref = useRef<THREE.Group>(null!);
    const [hovered, setHover] = useState(false);

    // Generate random points
    const { positions, connections } = useMemo(() => {
        const count = 80; // Fewer points for connections
        const positions = new Float32Array(count * 3);
        const connections = [];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        // Create random connections
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = Math.sqrt(
                    Math.pow(positions[i * 3] - positions[j * 3], 2) +
                    Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
                    Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
                );

                // Connect if close enough
                if (dist < 3.5) {
                    connections.push(
                        new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
                        new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
                    );
                }
            }
        }

        return { positions, connections };
    }, []);

    useFrame((state) => {
        if (ref.current) {
            // Mouse interaction: Rotate heavily based on mouse X/Y
            // state.mouse.x is -1 to 1
            const x = state.mouse.x * 0.5;
            const y = state.mouse.y * 0.5;

            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y, 0.1);
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x, 0.1);
        }
    });

    return (
        <group ref={ref} {...props}>
            {/* Nodes */}
            <Points positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00FF94" /* Bio-Green */
                    size={0.06}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>

            {/* Connections (Synapses) */}
            <Line
                worldUnits
                points={connections}
                color="#00A3FF" /* Electric Blue */
                opacity={0.15}
                transparent
                lineWidth={0.1}
            />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <ErrorBoundary fallback={
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-black pointer-events-none" />
            }>
                <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                    <ambientLight intensity={0.5} />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <NetworkMesh />
                    </Float>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
