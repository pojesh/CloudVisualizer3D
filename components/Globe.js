// src/components/Globe.js
import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import earthTexture from '../assets/8k_earth_daymap.jpg';

const Globe = () => {
  const texture = useLoader(THREE.TextureLoader, earthTexture);
  const globeRef = useRef();

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Globe;
