"use client";
import { Sidebar } from "@/components/Sidebar";
import { Grid } from "@/components/Grid";
import { useState, useEffect } from "react";


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
