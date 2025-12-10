"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function NeuronNetwork(props: any) {
    const ref = useRef<any>();

    // Gerar posições aleatórias manualmente (sem 'maath')
    const count = 3000;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 1.5;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00FF94" // Bio-Green
                    size={0.003} // Partículas ultra refinadas
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4} // Mais sutil
                />
            </Points>
        </group>
    );
}

export default function Scene3D() {
    return (
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <NeuronNetwork />
            </Canvas>
        </div>
    );
}
