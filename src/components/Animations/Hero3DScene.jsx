import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// 3D Geometry Component
function FloatingOrb() {
    const meshRef = useRef();

    // Make the orb slowly rotate and pulse
    useFrame((state) => {
        if (!meshRef.current) return;
        
        const time = state.clock.getElapsedTime();
        
        // Time-based rotation for idle movement
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
        
        // Continuous subtle scale pulsing for 'alive' feel
        const pulse = 1 + Math.sin(time * 2) * 0.05;
        meshRef.current.scale.set(pulse, pulse, pulse);
        
        // Mouse interaction: Gentle tilt based on pointer position (Damped for performance)
        const targetX = (state.pointer.x * Math.PI) * 0.2;
        const targetY = (state.pointer.y * Math.PI) * 0.2;
        
        // Smoothly interpolate current rotation to target mouse rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
    });

    // Optimize geometry by creating it once
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.2, 2), []);
    
    // Core material: Sleek black with continuous neon green wireframe
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
        emissive: "#32E612",
        emissiveIntensity: 0.4
    }), []);

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh
                ref={meshRef}
                geometry={geometry}
                material={material}
            />
        </Float>
    );
}

// Main Canvas Component exported to Hero.jsx
export default function Hero3DScene() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}>
            <Canvas 
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 1.5]} // Cap pixel ratio for high DPI screens to massive save performance
                performance={{ min: 0.5 }} // Allow R3F to scale down resolution if frame rate drops
                gl={{ powerPreference: "high-performance", antialias: false }} // Turn off heavy AA
            >
                {/* Minimal tech lighting */}
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#32E612" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
                
                {/* Subtle background particles for depth instead of heavy HDRI Environment */}
                <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />
                
                {/* The Object */}
                <FloatingOrb />
            </Canvas>
        </div>
    );
}
