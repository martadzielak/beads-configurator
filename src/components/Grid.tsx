"use client";
import { Canvas, useThree } from '@react-three/fiber';
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { GridContainer } from '@/components/styled';
import * as THREE from 'three';

type GridProps = {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    color: string;
    pixels: string[];
    setPixels: (pixels: string[]) => void;
};

const DownloadHelper = ({ triggerDownload }: { triggerDownload?: () => void }) => {
    const { gl, scene, camera } = useThree();
    React.useEffect(() => {
        if (!triggerDownload) return;
        gl.render(scene, camera);
        const url = gl.domElement.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grid.png';
        a.click();
        triggerDownload();
    }, [triggerDownload, gl, scene, camera]);
    return null;
};

const DownloadPNGHelper = ({ downloadRequest, setDownloadRequest }: { downloadRequest: boolean, setDownloadRequest: (v: boolean) => void }) => {
    const { gl, scene, camera } = useThree();
    React.useEffect(() => {
        if (downloadRequest) {
            gl.render(scene, camera);
            const url = gl.domElement.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'grid.png';
            a.click();
            setDownloadRequest(false);
        }
    }, [downloadRequest, gl, scene, camera, setDownloadRequest]);
    return null;
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
    setDownloadRequest
}: GridProps & {
    pipetteActive: boolean,
    setColor: (c: string) => void,
    onDownloadPNG?: () => void,
    downloadRequest: boolean,
    setDownloadRequest: (v: boolean) => void
}, ref) => {
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    useImperativeHandle(ref, () => ({
        getCanvasDataURL: () => {
            if (!rendererRef.current) return null;
            return rendererRef.current.domElement.toDataURL('image/png');
        }
    }));
    const handlePixelClick = (idx: number) => {
        const newPixels = [...pixels];
        newPixels[idx] = color;
        setPixels(newPixels);
    };
    return (
        <GridContainer>
            <Canvas
                orthographic
                camera={{ zoom: 50, position: [0, 0, 100] }}
                style={{ width: '100%', height: '100vh', background: 'black' }}
                onCreated={({ gl }) => { rendererRef.current = gl; }}
            >
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
                {onDownloadPNG && <DownloadHelper triggerDownload={onDownloadPNG} />}
                <DownloadPNGHelper downloadRequest={downloadRequest} setDownloadRequest={setDownloadRequest} />
            </Canvas>
        </GridContainer>
    );
});

Grid.displayName = "Grid";