"use client";
import { Fragment } from "react";
import { Canvas } from '@react-three/fiber';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect, useMemo } from 'react';
import { GridContainer } from '@/components/styles/styled';
import { calculatePixelOutlineLines, DownloadHelper, DownloadPNGHelper } from '@/helpers/helpers';
import * as THREE from 'three';
import { mediumGray } from "./styles/colors";

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

    // Map (row, col) to pixel index in pixels array for peyote mode
    const getPeyotePixelIdx = (row: number, col: number) => {
        let idx = 0;
        for (let r = 0; r < row; r++) {
            idx += (r % 2 === 0) ? gridWidth : (gridWidth - 1);
        }
        return idx + col;
    };

    const pixelOutlineLines = useMemo(() => {
        if (!peyoteActive) {
            return calculatePixelOutlineLines(gridWidth, gridHeight, pixelWidth, pixelHeight);
        }
        const lines = [];
        for (let row = 0; row < gridHeight; row++) {
            const rowWidth = row % 2 === 0 ? gridWidth : gridWidth - 1;
            const py = (row + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
            let xOffset = 0;
            if (row % 2 === 1) {
                xOffset = (pixelWidth / 10) / 2;
            }
            for (let col = 0; col < rowWidth; col++) {
                const px = (col + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2 + xOffset;
                // Draw rectangle for each pixel
                const halfW = pixelWidth / 20;
                const halfH = pixelHeight / 20;
                // Four corners
                const x0 = px - halfW, x1 = px + halfW;
                const y0 = py - halfH, y1 = py + halfH;
                const z = 0.2;
                // Top
                lines.push([x0, y1, z, x1, y1, z]);
                // Bottom
                lines.push([x0, y0, z, x1, y0, z]);
                // Left
                lines.push([x0, y0, z, x0, y1, z]);
                // Right
                lines.push([x1, y0, z, x1, y1, z]);
            }
        }
        return lines.flat();
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
                    {peyoteActive
                        ? Array.from({ length: gridHeight }).map((_, rowIdx) => {
                            const rowWidth = rowIdx % 2 === 0 ? gridWidth : gridWidth - 1;
                            return Array.from({ length: rowWidth }).map((_, colIdx) => {
                                let px = (colIdx + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2;
                                const py = (rowIdx + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
                                if (rowIdx % 2 === 1) {
                                    px += (pixelWidth / 10) / 2;
                                }
                                const pixelIdx = getPeyotePixelIdx(rowIdx, colIdx);
                                const isFilled = !!pixels[pixelIdx];
                                return (
                                    <Fragment key={`peyote-pixel-${rowIdx}-${colIdx}`}>
                                        <mesh
                                            position={[px, py, 0]}
                                            onClick={() => pipetteActive && isFilled ? setColor(pixels[pixelIdx]) : !pipetteActive ? handlePixelPaint(pixelIdx) : undefined}
                                            onPointerOver={() => !pipetteActive && handlePixelPaint(pixelIdx)}
                                        >
                                            <boxGeometry args={[pixelWidth / 10, pixelHeight / 10, 0.1]} />
                                            {isFilled ? (
                                                <meshBasicMaterial color={pixels[pixelIdx]} transparent opacity={1} />
                                            ) : (
                                                <meshBasicMaterial color={mediumGray} wireframe />
                                            )}
                                        </mesh>
                                    </Fragment>
                                );
                            });
                        })
                        : Array.from({ length: gridWidth * gridHeight }).map((_, idx) => {
                            const x = idx % gridWidth;
                            const y = Math.floor(idx / gridWidth);
                            const px = (x + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2;
                            const py = (y + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
                            const isFilled = !!pixels[idx];
                            return (
                                <Fragment key={`pixel-${idx}`}>
                                    <mesh
                                        position={[px, py, 0]}
                                        onClick={() => pipetteActive && isFilled ? setColor(pixels[idx]) : !pipetteActive ? handlePixelPaint(idx) : undefined}
                                        onPointerOver={() => !pipetteActive && handlePixelPaint(idx)}
                                    >
                                        <boxGeometry args={[pixelWidth / 10, pixelHeight / 10, 0.1]} />
                                        {isFilled ? (
                                            <meshBasicMaterial color={pixels[idx]} transparent opacity={1} />
                                        ) : (
                                            <meshBasicMaterial color={mediumGray} wireframe />
                                        )}
                                    </mesh>
                                </Fragment>
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