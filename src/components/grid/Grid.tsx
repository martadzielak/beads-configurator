import { Canvas } from '@react-three/fiber';
import { useRef, useImperativeHandle, forwardRef, useState, useMemo, type Dispatch, type SetStateAction, useEffect } from 'react';
import { GridContainer } from '@/components/styles/styled';
import { Palette } from './common/Palette';
import { calculatePixelOutlineLines, DownloadHelper, DownloadPNGHelper, getTotalPixels } from '@/helpers/helpers';
import { PeyoteGrid } from './PeyoteGrid';
import { RectGrid } from './RectGrid';
import * as THREE from 'three';
import { lightGray } from "../../app/colors";
import { GridOverlay } from './GridOverlay';
import { Zoom } from './common/Zoom';

type GridProps = {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    color: string;
    pixels: string[];
    setPixels: Dispatch<SetStateAction<string[]>>;
    showGridOverlay: boolean;
    peyoteActive: boolean;
    pipetteActive: boolean;
    eraserActive: boolean;
    setColor: (c: string) => void;
    onDownloadPNG?: () => void;
    downloadRequest: boolean;
    setDownloadRequest: (v: boolean) => void;
    paletteColors: string[];
    onRemovePaletteColor?: (hex: string) => void;
};

export const Grid = forwardRef(function Grid(props: GridProps, ref) {
    const {
        gridWidth,
        gridHeight,
        pixelWidth,
        pixelHeight,
        color,
        pixels,
        setPixels,
        pipetteActive,
        eraserActive,
        setColor,
        onDownloadPNG,
        downloadRequest,
        setDownloadRequest,
        showGridOverlay,
        peyoteActive,
        paletteColors,
        onRemovePaletteColor
    } = props;

    const [zoom, setZoom] = useState(50);
    const [mouseDown, setMouseDown] = useState(false);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.zoom = zoom;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [zoom]);

    const totalPixels = getTotalPixels(gridWidth, gridHeight, peyoteActive);

    const handleGridSizeChange = () => {
        if (pixels.length !== totalPixels) {
            setPixels((prev: string[]) => {
                const arr = Array.isArray(prev) ? prev : [] as string[];
                if (arr.length < totalPixels) return arr.concat(Array(totalPixels - arr.length).fill(""));
                if (arr.length > totalPixels) return arr.slice(0, totalPixels);
                return arr;
            });
        }
    };

    handleGridSizeChange();

    useImperativeHandle(ref, () => ({
        getCanvasDataURL: () => {
            if (!rendererRef.current) return null;
            return rendererRef.current.domElement.toDataURL('image/png');
        }
    }));

    const handleSelectSwatch = (c: string | null) => {
        if (c) setColor(c);
    };

    const handleRemovePaletteColor = (c: string) => {
        if (onRemovePaletteColor) onRemovePaletteColor(c);
    };

    const selectedSwatch: string | null = paletteColors.includes(color) ? color : null;

    const handlePixelPaint = (idx: number) => {
        if (!mouseDown) return;
        if (idx >= totalPixels) return;
        const newPixels = [...pixels];
        if (eraserActive) {
            newPixels[idx] = "";
        } else {
            newPixels[idx] = color;
        }
        setPixels(newPixels);
    };

    const pixelOutlineLines = useMemo(() => {
        return calculatePixelOutlineLines(peyoteActive, gridWidth, gridHeight, pixelWidth, pixelHeight);
    }, [gridWidth, gridHeight, pixelWidth, pixelHeight, peyoteActive]);

    return (
        <GridContainer>
            <Zoom setZoom={setZoom} />
            <Palette
                colors={paletteColors}
                selected={selectedSwatch}
                onSelect={handleSelectSwatch}
                onRemove={handleRemovePaletteColor}
            />
            <Canvas
                orthographic
                camera={{ zoom, position: [0, 0, 100] }}
                style={{ width: '100%', height: '100vh', background: lightGray }}
                onCreated={({ gl, camera }) => {
                    rendererRef.current = gl;
                    if ((camera as THREE.Camera).type === "OrthographicCamera") {
                        cameraRef.current = camera as THREE.OrthographicCamera;
                        cameraRef.current.zoom = zoom;
                        cameraRef.current.updateProjectionMatrix();
                    }
                }}
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
                    <GridOverlay pixelOutlineLines={pixelOutlineLines} />
                )}
                {onDownloadPNG && <DownloadHelper triggerDownload={onDownloadPNG} />}
                <DownloadPNGHelper downloadRequest={downloadRequest} setDownloadRequest={setDownloadRequest} />
            </Canvas>
        </GridContainer >
    );
});
Grid.displayName = 'Grid';