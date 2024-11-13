// src/App.js
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Globe from './components/Globe';
import DataPoints from './components/DataPoints';
import { parseNetCDF } from './utils/parseNetCDF';

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const parsedData = await parseNetCDF(file);
      setData(parsedData);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <input
        type="file"
        accept=".nc,.netcdf"
        onChange={handleFileUpload}
        style={{ position: 'absolute', zIndex: 1, margin: '10px',color:'white' }}
      />
      <Canvas camera={{ position: [50, 0, 240] }}>
        <ambientLight intensity={1} />
        <pointLight position={[40, 40, 40]} intensity={2}/>
        <pointLight position={[-40, -40, -40]} intensity={0.5}/>
        <Suspense fallback={null}>
          <Globe />
          {data.length > 0 && <DataPoints data={data} />}
        </Suspense>
        <OrbitControls
          enableZoom={true}
          minDistance={110} //110
          maxDistance={240}
          zoomSpeed={0.5}
          rotateSpeed={0.1}
        />
        <Stars />
      </Canvas>
    </div>
  );
  //cam zoom to lat max-min/2 long max-min/2 alt 100 after file load
}

export default App;
