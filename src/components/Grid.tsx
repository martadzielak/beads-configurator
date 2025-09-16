"use client";
import { Canvas } from '@react-three/fiber';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect, useMemo } from 'react';
import { GridContainer } from '@/components/styles/styled';
import { calculatePixelOutlineLines, DownloadHelper, DownloadPNGHelper, getPeyotePixelIdx } from '@/helpers/helpers';
import { PeyoteGrid } from './grid/PeyoteGrid';
import { RectGrid } from './grid/RectGrid';
import * as THREE from 'three';
import { mediumGray } from "../app/colors";

type GridProps = {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    color: string;
    pixels: string[];
    setPixels: (pixels: string[]) => void;
    showGridOverlay: boolean;
    peyoteActive: boolean;
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
    showGridOverlay,
    peyoteActive
}: GridProps & {
    pipetteActive: boolean,
    setColor: (c: string) => void,
    onDownloadPNG?: () => void,
    downloadRequest: boolean,
    setDownloadRequest: (v: boolean) => void,
    showGridOverlay: boolean,
    peyoteActive: boolean
}, ref) => {
    const [mouseDown, setMouseDown] = useState(false);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        const handleMouseUp = () => setMouseDown(false);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    useImperativeHandle(ref, () => ({
        getCanvasDataURL: () => {
            if (!rendererRef.current) return null;
            return rendererRef.current.domElement.toDataURL('image/png');
        }
    }));

    let totalPixels = gridWidth * gridHeight;
    if (peyoteActive) {
        let count = 0;
        for (let row = 0; row < gridHeight; row++) {
            count += (row % 2 === 0) ? gridWidth : (gridWidth - 1);
        }
        totalPixels = count;
    }

    useEffect(() => {
        if (pixels.length !== totalPixels) {
            setPixels(Array(totalPixels).fill(""));
        }
    }, [totalPixels, pixels.length, setPixels]);

    const handlePixelPaint = (idx: number) => {
        if (!mouseDown) return;
        if (idx >= totalPixels) return;
        const newPixels = [...pixels];
        newPixels[idx] = color;
        setPixels(newPixels);
    };



    const pixelOutlineLines = useMemo(() => {
        return calculatePixelOutlineLines(peyoteActive, gridWidth, gridHeight, pixelWidth, pixelHeight);
    }, [gridWidth, gridHeight, pixelWidth, pixelHeight, peyoteActive]);

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
                    {peyoteActive ? (
                        <PeyoteGrid
                            gridWidth={gridWidth}
                            gridHeight={gridHeight}
                            pixelWidth={pixelWidth}
                            pixelHeight={pixelHeight}
                            pixels={pixels}
                            pipetteActive={pipetteActive}
                            setColor={setColor}
                            handlePixelPaint={handlePixelPaint}
                        />
                    ) : (
                        <RectGrid
                            gridWidth={gridWidth}
                            gridHeight={gridHeight}
                            pixelWidth={pixelWidth}
                            pixelHeight={pixelHeight}
                            pixels={pixels}
                            pipetteActive={pipetteActive}
                            setColor={setColor}
                            handlePixelPaint={handlePixelPaint}
                        />
                    )}
                    {showGridOverlay && (
                        <lineSegments>
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    args={[new Float32Array(pixelOutlineLines), 3]}
                                />
                            </bufferGeometry>
                            <lineBasicMaterial color={mediumGray} linewidth={0.3} />
                        </lineSegments>
                    )}
                    {onDownloadPNG && <DownloadHelper triggerDownload={onDownloadPNG} />}
                    <DownloadPNGHelper downloadRequest={downloadRequest} setDownloadRequest={setDownloadRequest} />
                </Canvas>
            </GridContainer>
        </div>
    );
});
Grid.displayName = 'Grid';