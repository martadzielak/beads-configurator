"use client";
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { HexColorPicker } from 'react-colorful';

type SidebarProps = {
  color: string;
  setColor: (color: string) => void;
  gridWidth: number;
  setGridWidth: (size: number) => void;
  gridHeight: number;
  setGridHeight: (size: number) => void;
  pixelWidth: number;
  setPixelWidth: (w: number) => void;
  pixelHeight: number;
  setPixelHeight: (h: number) => void;
  pipetteActive: boolean;
  setPipetteActive: (active: boolean) => void;
};

function Sidebar({ color, setColor, gridWidth, setGridWidth, gridHeight, setGridHeight, pixelWidth, setPixelWidth, pixelHeight, setPixelHeight, pipetteActive, setPipetteActive }: SidebarProps) {
  return (
    <div style={{ width: '15%', padding: 20, boxSizing: 'border-box', background: '#f5f5f5', height: '100vh' }}>
      <h2>Settings</h2>
      <div style={{ marginBottom: 20 }}>
        <label>Color Picker</label>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      <SizePicker label={"Grid width"} min={2} max={100} step={1} value={gridWidth} onChange={e => setGridWidth(Number(e.target.value))} />
      <SizePicker label={"Grid height"} min={2} max={50} step={1} value={gridHeight} onChange={e => setGridHeight(Number(e.target.value))} />
      <SizePicker label={"Bead width"} min={0.1} max={2} step={0.1} value={pixelWidth} onChange={e => setPixelWidth(Number(e.target.value))} />
      <SizePicker label={"Bead height"} min={0.1} max={2} step={0.1} value={pixelHeight} onChange={e => setPixelHeight(Number(e.currentTarget.value))} />
      <div style={{ marginBottom: 20 }}>
        <button
          style={{ background: pipetteActive ? '#0070f3' : '#eee', color: pipetteActive ? '#fff' : '#333', padding: '8px 16px', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          onClick={() => setPipetteActive(!pipetteActive)}
        >
          {pipetteActive ? 'Pipette (active)' : 'Activate Pipette'}
        </button>
      </div>
    </div>
  );
}

type GridProps = {
  gridWidth: number;
  gridHeight: number;
  pixelWidth: number;
  pixelHeight: number;
  color: string;
  pixels: string[];
  setPixels: (pixels: string[]) => void;
};

import { useRef } from 'react';
import { SizePicker } from '@/components/SizePicker';

function Grid({ gridWidth, gridHeight, pixelWidth, pixelHeight, color, pixels, setPixels, pipetteActive, setColor }: GridProps & { pipetteActive: boolean, setColor: (c: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handlePixelClick = (idx: number) => {
    const newPixels = [...pixels];
    newPixels[idx] = color;
    setPixels(newPixels);
  };


  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        background: '#fff',
        cursor: pipetteActive ? 'crosshair' : 'pointer'
      }}
    >
      <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }} style={{ width: '100%', height: '100vh', background: '#fff' }}>
        {/* Render grid pixels as mesh rectangles with wireframe, but filled if colored */}
        {Array.from({ length: gridWidth * gridHeight }).map((_, idx) => {
          const x = idx % gridWidth;
          const y = Math.floor(idx / gridWidth);
          // Center grid
          const px = (x + 0.5) * pixelWidth - (gridWidth * pixelWidth) / 2;
          const py = (y + 0.5) * pixelHeight - (gridHeight * pixelHeight) / 2;
          const isFilled = !!pixels[idx];
          return (
            <mesh
              key={idx}
              position={[px, py, 0]}
              onClick={() => pipetteActive && isFilled ? setColor(pixels[idx]) : !pipetteActive ? handlePixelClick(idx) : undefined}
            >
              <boxGeometry args={[pixelWidth, pixelHeight, 0.1]} />
              {isFilled ? (
                <meshBasicMaterial color={pixels[idx]} />
              ) : (
                <meshBasicMaterial color={'#fff'} wireframe wireframeLinewidth={2} wireframeLinejoin="round" wireframeLinecap="round" />
              )}
            </mesh>
          );
        })}
      </Canvas>
    </div>
  );
}

export default function Home() {
  const [color, setColor] = useState('#ff0000');
  const [gridWidth, setGridWidth] = useState(85);
  const [gridHeight, setGridHeight] = useState(19);
  const [pixelWidth, setPixelWidth] = useState(0.3);
  const [pixelHeight, setPixelHeight] = useState(0.2);
  const [pixels, setPixels] = useState(Array(100).fill(''));
  const [pipetteActive, setPipetteActive] = useState(false);

  useEffect(() => {
    setPixels(Array(gridWidth * gridHeight).fill(''));
  }, [gridWidth, gridHeight]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        color={color}
        setColor={setColor}
        gridWidth={gridWidth}
        setGridWidth={setGridWidth}
        gridHeight={gridHeight}
        setGridHeight={setGridHeight}
        pixelWidth={pixelWidth}
        setPixelWidth={setPixelWidth}
        pixelHeight={pixelHeight}
        setPixelHeight={setPixelHeight}
        pipetteActive={pipetteActive}
        setPipetteActive={setPipetteActive}
      />
      <div style={{ width: '85%', height: '100vh' }}>
        <Grid
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          pixelWidth={pixelWidth}
          pixelHeight={pixelHeight}
          color={color}
          pixels={pixels}
          setPixels={setPixels}
          pipetteActive={pipetteActive}
          setColor={setColor}
        />
      </div>
    </div>
  );
}
