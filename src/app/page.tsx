"use client";
import { Sidebar } from "@/components/Sidebar";
import { Grid } from "@/components/Grid";
import { useState, useEffect } from "react";
import { CornerInstruction } from "@/components/styled";


export default function Home() {
  const [color, setColor] = useState('#ff0000');
  const [gridWidth, setGridWidth] = useState(85);
  const [gridHeight, setGridHeight] = useState(19);
  const [pixelWidth, setPixelWidth] = useState(0.3);
  const [pixelHeight, setPixelHeight] = useState(0.2);
  const [pixels, setPixels] = useState(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pixels');
      if (saved) return JSON.parse(saved);
    }
    return Array(85 * 19).fill('');
  });
  const [pipetteActive, setPipetteActive] = useState(false);
  const [downloadRequest, setDownloadRequest] = useState(false);

  useEffect(() => {
    setPixels(Array(gridWidth * gridHeight).fill(''));
  }, [gridWidth, gridHeight]);

  useEffect(() => {
    // Save to localStorage on every change
    if (typeof window !== 'undefined') {
      localStorage.setItem('pixels', JSON.stringify(pixels));
    }
  }, [pixels]);

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
        onDownloadPNG={() => setDownloadRequest(true)}
      />
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
        downloadRequest={downloadRequest}
        setDownloadRequest={setDownloadRequest}
      />
      <CornerInstruction>
        [SHIFT] Activate/disactivate pipette
      </CornerInstruction>
    </div>
  );
}
