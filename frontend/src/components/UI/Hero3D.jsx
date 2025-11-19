import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef } from 'react';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        sphereRef.current.position.y = Math.sin(t / 1.5) * 0.2;
        sphereRef.current.rotation.z = t * 0.1;
        sphereRef.current.rotation.x = t * 0.1;
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2.5} ref={sphereRef}>
            <MeshDistortMaterial
                color="#6366f1"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0}
                metalness={0.5}
            />
        </Sphere>
    );
};

const Hero3D = () => {
    return (
        <div className="h-[500px] w-full">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
