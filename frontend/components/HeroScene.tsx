"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Line, Sphere } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";

// A single traveling signal (The "Comet")
function SingleSignal({ connections, color }: { connections: THREE.Vector3[], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    // Initialize with random position logic
    const state = useMemo(() => ({
        segmentIndex: Math.floor(Math.random() * (connections.length / 2)) * 2,
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.03
    }), [connections.length]);

    useFrame(() => {
        if (!meshRef.current || !connections.length) return;

        state.progress += state.speed;

        // Loop when reaching the end of the line
        if (state.progress >= 1) {
            state.segmentIndex = Math.floor(Math.random() * (connections.length / 2)) * 2;
            state.progress = 0;
        }

        const start = connections[state.segmentIndex];
        const end = connections[state.segmentIndex + 1];

        if (start && end) {
            meshRef.current.position.lerpVectors(start, end, state.progress);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.08, 8, 8]} /> {/* Bola física de 8cm */}
            <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
            {/* Glow / Trail simulated by a larger translucent shell */}
            <mesh scale={[2, 2, 2]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} />
            </mesh>
        </mesh>
    );
}

// Manager for multiple signals
function SynapseManager({ connections }: { connections: THREE.Vector3[] }) {
    // Generate 30 independent signals
    const signals = useMemo(() => new Array(30).fill(0), []);

    if (connections.length === 0) return null;

    return (
        <group>
            {signals.map((_, i) => (
                <SingleSignal
                    key={i}
                    connections={connections}
                    color={i % 2 === 0 ? "#00A3FF" : "#00FF94"} /* Alternating Blue/Green */
                />
            ))}
        </group>
    );
}

function NetworkMesh(props: any) {
    const ref = useRef<THREE.Group>(null!);

    // Generate points on a Sphere
    const { positions, connections } = useMemo(() => {
        const count = 120; // Dense globe
        const radius = 4.5;
        const positions = new Float32Array(count * 3);
        const connections: THREE.Vector3[] = [];
        const vecPositions: THREE.Vector3[] = [];

        // Fibonacci Sphere Distribution
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

        // Connect nearby points
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = vecPositions[i].distanceTo(vecPositions[j]);
                if (dist < 1.8) {
                    connections.push(vecPositions[i], vecPositions[j]);
                }
            }
        }

        return { positions, connections };
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.05;

            // Subtle mouse tilt
            const mouseX = state.mouse.x * 0.2;
            const mouseY = state.mouse.y * 0.2;

            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouseY, 0.1);
            ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -mouseX, 0.1);
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

            {/* Static Connections */}
            <Line
                worldUnits
                points={connections}
                color="#00A3FF" /* Electric Blue */
                opacity={0.2}
                transparent
                lineWidth={0.02}
                segments
            />

            {/* Active Electrical Signals (Robust Meshes) */}
            <SynapseManager connections={connections} />
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
