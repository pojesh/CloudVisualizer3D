// src/components/DataPoints.js
import React, { useMemo } from 'react';
import * as THREE from 'three';

const DataPoints = ({ data }) => {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(data.length * 3);
    const colors = new Float32Array(data.length * 3);

    //const reflectivities = data.map(point => point.reflectivity);
    //const minReflectivity = Math.min(...reflectivities);
    //const maxReflectivity = Math.max(...reflectivities);

    const minReflectivity = 0; //-6.5
    const maxReflectivity = 60; //35.8

    const step = 0.01;

    const getColorForReflectivity = (reflectivity) => {
      const normalized = (reflectivity - minReflectivity) / (maxReflectivity - minReflectivity);
      const colorStep = Math.floor(normalized / step);
      const hue = (1 - colorStep * step) * 240; // From blue (hue 240 deg) to red (hue 0 deg)
      return new THREE.Color().setHSL(hue / 360, 1, 0.5);
    };


    data.forEach((point, i) => {
      //Lat Long to Cartesian coordinates
      const radius =100 + (point.altitude/8000); //Altitude scaling //20000
      const phi = (90 - point.latitude) * (Math.PI / 180);
      const theta = (point.longitude + 180) * (Math.PI / 180);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = getColorForReflectivity(point.reflectivity);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });

    return { positions, colors };
  }, [data]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.2} //0.5
        sizeAttenuation
        transparent
        opacity={0.6} //0.6
      />
    </points>
  );
}
export default DataPoints;