"use client";
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { GridContainer } from '@/components/styled';

type GridProps = {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    color: string;
    pixels: string[];
    setPixels: (pixels: string[]) => void;
};

export const Grid = ({ gridWidth, gridHeight, pixelWidth, pixelHeight, color, pixels, setPixels, pipetteActive, setColor }: GridProps & { pipetteActive: boolean, setColor: (c: string) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const handlePixelClick = (idx: number) => {
        const newPixels = [...pixels];
        newPixels[idx] = color;
        setPixels(newPixels);
    };
    return (
        <GridContainer
            ref={containerRef}
        >
            <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }} style={{ width: '100%', height: '100vh', background: 'black' }}>
                {/* Render grid pixels as mesh rectangles with wireframe, but filled if colored */}
                {Array.from({ length: gridWidth * gridHeight }).map((_, idx) => {
                    const x = idx % gridWidth;
                    const y = Math.floor(idx / gridWidth);
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
                                <meshBasicMaterial color={'#aaa'} wireframe wireframeLinewidth={2} wireframeLinejoin="round" wireframeLinecap="round" />
                            )}
                        </mesh>
                    );
                })}
            </Canvas>
        </GridContainer>
    );
}