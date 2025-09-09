"use client";
import { Canvas } from '@react-three/fiber';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect, useMemo } from 'react';
import { GridContainer } from '@/components/styled';
import { calculatePixelOutlineLines, DownloadHelper, DownloadPNGHelper } from '@/helpers/helpers';
import * as THREE from 'three';

type GridProps = {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    color: string;
    pixels: string[];
    setPixels: (pixels: string[]) => void;
    showGridOverlay: boolean;
};

export const Grid = forwardRef(({
    gridWidth,
    gridHeight,
    pixelWidth,
    pixelHeight,
    color,
    pixels,
    setPixels,
    pipetteActive,
    setColor,
    onDownloadPNG,
    downloadRequest,
    setDownloadRequest,
    showGridOverlay
}: GridProps & {
    pipetteActive: boolean,
    setColor: (c: string) => void,
    onDownloadPNG?: () => void,
    downloadRequest: boolean,
    setDownloadRequest: (v: boolean) => void,
    showGridOverlay: boolean
}, ref) => {
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        const handleMouseUp = () => setMouseDown(false);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    useImperativeHandle(ref, () => ({
        getCanvasDataURL: () => {
            if (!rendererRef.current) return null;
            return rendererRef.current.domElement.toDataURL('image/png');
        }
    }));

    const handlePixelPaint = (idx: number) => {
        if (!mouseDown) return;
        const newPixels = [...pixels];
        newPixels[idx] = color;
        setPixels(newPixels);
    };

    const handlePixelClick = (idx: number) => {
        const newPixels = [...pixels];
        newPixels[idx] = color;
        setPixels(newPixels);
    };

    const pixelOutlineLines = useMemo(() => {
        return calculatePixelOutlineLines(gridWidth, gridHeight, pixelWidth, pixelHeight);
    }, [gridWidth, gridHeight, pixelWidth, pixelHeight]);

    return (
        <div style={{ width: '85%', height: '100vh', position: 'relative' }}>

            <GridContainer>
                <Canvas
                    orthographic
                    camera={{ zoom: 50, position: [0, 0, 100] }}
                    style={{ width: '100%', height: '100vh', background: 'black' }}
                    onCreated={({ gl }) => { rendererRef.current = gl; }}
                    onPointerDown={() => setMouseDown(true)}
                    onPointerUp={() => setMouseDown(false)}
                >
                    {Array.from({ length: gridWidth * gridHeight }).map((_, idx) => {
                        const x = idx % gridWidth;
                        const y = Math.floor(idx / gridWidth);
                        const px = (x + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2;
                        const py = (y + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
                        const isFilled = !!pixels[idx];
                        return (
                            <mesh
                                key={`color-${idx}`}
                                position={[px, py, 0]}
                                onClick={() => pipetteActive && isFilled ? setColor(pixels[idx]) : !pipetteActive ? handlePixelClick(idx) : undefined}
                                onPointerOver={() => !pipetteActive && handlePixelPaint(idx)}
                            >
                                <boxGeometry args={[pixelWidth / 10, pixelHeight / 10, 0.1]} />
                                {isFilled && (
                                    <meshBasicMaterial color={pixels[idx]} transparent opacity={1} />
                                )}
                            </mesh>

                        );
                    })}
                    {showGridOverlay && (
                        <lineSegments>
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    args={[new Float32Array(pixelOutlineLines), 3]}
                                />
                            </bufferGeometry>
                            <lineBasicMaterial color="#7a7a7a" linewidth={0.3} />
                        </lineSegments>
                    )}
                    {onDownloadPNG && <DownloadHelper triggerDownload={onDownloadPNG} />}
                    <DownloadPNGHelper downloadRequest={downloadRequest} setDownloadRequest={setDownloadRequest} />
                </Canvas>
            </GridContainer>
        </div>
    );
});

Grid.displayName = "Grid";