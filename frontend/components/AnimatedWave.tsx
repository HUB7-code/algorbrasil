"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// Helper to generate a soft glow texture programmatically
function getGlowTexture() {
    if (typeof document === 'undefined') return null; // Server-side safety
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Center white
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)'); // Mid falloff
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent edge
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// NeuronTraffic: Data packets traveling along organic, root-like connections
function NeuronTraffic({ count = 600 }) { // HIGH DENSITY DEFAULT
    // 0. Texture
    const glowTexture = useMemo(() => getGlowTexture(), []);

    // 1. Generate Nodes (Static structure) - MASSIVE DENSITY
    const nodes = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 350; i++) { // 350 Structural Nodes
            const r = 15 + Math.random() * 15;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            positions.push(
                new THREE.Vector3(
                    (r * Math.sin(phi) * Math.cos(theta)) * 2.2,
                    (r * Math.sin(phi) * Math.sin(theta)) * 0.8,
                    r * Math.cos(phi)
                )
            );
        }
        return positions;
    }, []);

    // 2. Identify Paths & Generate Curves (Organic Roots)
    const { paths, linesGeometry } = useMemo(() => {
        const generatedPaths = [];
        const linePoints = [];

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].distanceTo(nodes[j]);
                // Connections logic - Adjusted for density
                if (dist < 10.5) {
                    // Create irregular path points
                    const midPoint1 = new THREE.Vector3().lerpVectors(nodes[i], nodes[j], 0.33);
                    const midPoint2 = new THREE.Vector3().lerpVectors(nodes[i], nodes[j], 0.66);

                    // Add "Chaos" (Root-like irregularity)
                    midPoint1.add(new THREE.Vector3(
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 2
                    ));
                    midPoint2.add(new THREE.Vector3(
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 2
                    ));

                    const curve = new THREE.CatmullRomCurve3([
                        nodes[i],
                        midPoint1,
                        midPoint2,
                        nodes[j]
                    ]);

                    generatedPaths.push({
                        curve: curve,
                        length: dist
                    });

                    // Generate geometry points for visible lines
                    const points = curve.getPoints(10); // Resolution of the root
                    for (let k = 0; k < points.length - 1; k++) {
                        linePoints.push(points[k], points[k + 1]);
                    }
                }
            }
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        return { paths: generatedPaths, linesGeometry: geometry };
    }, [nodes]);

    // 3. Traffic System
    const packetCount = count;
    const packetData = useMemo(() => {
        const colors = [
            new THREE.Color("#00A3FF"), // Neon Blue
            new THREE.Color("#00FF94")  // Bio Green
        ];

        return new Array(packetCount).fill(null).map(() => ({
            pathIndex: Math.floor(Math.random() * paths.length),
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.008, // Slightly slower for curves
            reverse: Math.random() > 0.5,
            pulseSpeed: 5 + Math.random() * 10,
            pulseOffset: Math.random() * Math.PI * 2,
            baseColor: colors[Math.floor(Math.random() * colors.length)]
        }));
    }, [paths, packetCount]);

    // Refs
    const geometryRef = useRef(null);
    const groupRef = useRef(null);

    // Animation Loop
    useFrame((state) => {
        if (!geometryRef.current || !groupRef.current) return;

        const positions = geometryRef.current.attributes.position.array;
        const colors = geometryRef.current.attributes.color.array;
        const time = state.clock.elapsedTime;

        packetData.forEach((packet, i) => {
            if (!paths[packet.pathIndex]) return;

            // Movement
            if (packet.reverse) packet.progress -= packet.speed;
            else packet.progress += packet.speed;

            if (packet.progress >= 1 || packet.progress <= 0) {
                packet.pathIndex = Math.floor(Math.random() * paths.length);
                if (paths[packet.pathIndex]) {
                    packet.speed = 0.002 + Math.random() * 0.008;
                    packet.reverse = Math.random() > 0.5;
                    packet.progress = packet.reverse ? 0.99 : 0.01;
                }
            }

            // Position along CURVE
            const targetPath = paths[packet.pathIndex];
            if (targetPath) {
                const currentPos = targetPath.curve.getPoint(packet.progress);
                positions[i * 3] = currentPos.x;
                positions[i * 3 + 1] = currentPos.y;
                positions[i * 3 + 2] = currentPos.z;
            }

            // COLOR & PULSE
            const pulse = Math.sin(time * packet.pulseSpeed + packet.pulseOffset);
            const brightness = 0.8 + (pulse + 1) * 0.8;

            colors[i * 3] = packet.baseColor.r * brightness;
            colors[i * 3 + 1] = packet.baseColor.g * brightness;
            colors[i * 3 + 2] = packet.baseColor.b * brightness;
        });

        geometryRef.current.attributes.position.needsUpdate = true;
        geometryRef.current.attributes.color.needsUpdate = true;

        groupRef.current.rotation.y += 0.0005;
    });

    return (
        <group ref={groupRef}>
            {/* Organic Root Lines */}
            <lineSegments geometry={linesGeometry}>
                <lineBasicMaterial color="#00A3FF" transparent opacity={0.15} depthWrite={false} />
            </lineSegments>

            {/* Glowing Particles */}
            <points>
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={packetCount}
                        array={new Float32Array(packetCount * 3)}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={packetCount}
                        array={new Float32Array(packetCount * 3)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    map={glowTexture}
                    size={1.5}
                    vertexColors={true}
                    transparent
                    opacity={1}
                    alphaTest={0.001}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshBasicMaterial color="#00FF94" transparent opacity={0.1} />
                </mesh>
            </Float>
        </group>
    );
}

export default function AnimatedWave() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 40], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
            >
                <NeuronTraffic count={600} />
                <fog attach="fog" args={['#0A1A2F', 10, 60]} />
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F] via-transparent to-[#0A1A2F] z-10" />
        </div>
    );
}
