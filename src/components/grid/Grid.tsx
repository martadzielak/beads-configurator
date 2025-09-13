import { Canvas } from '@react-three/fiber';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';
import { GridContainer, ZoomButton, ZoomButtonContainer, PaletteContainer, PaletteSwatch, PaletteDeleteButton } from '@/components/styles/styled';
import { calculatePixelOutlineLines, DownloadHelper, DownloadPNGHelper, getTotalPixels } from '@/helpers/helpers';
import { PeyoteGrid } from './PeyoteGrid';
import { RectGrid } from './RectGrid';
import * as THREE from 'three';
import { lightGray, mediumGray } from "../styles/colors";

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
    const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const totalPixels = getTotalPixels(gridWidth, gridHeight, peyoteActive);

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.zoom = zoom;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [zoom]);

    useEffect(() => {
        if (pixels.length !== totalPixels) {
            setPixels((prev: string[]) => {
                const arr = Array.isArray(prev) ? prev : [] as string[];
                if (arr.length < totalPixels) return arr.concat(Array(totalPixels - arr.length).fill(""));
                if (arr.length > totalPixels) return arr.slice(0, totalPixels);
                return arr;
            });
        }
    }, [totalPixels, pixels.length, setPixels]);

    useImperativeHandle(ref, () => ({
        getCanvasDataURL: () => {
            if (!rendererRef.current) return null;
            return rendererRef.current.domElement.toDataURL('image/png');
        }
    }));

    // Un-highlight swatch if user changes color away from the selected swatch
    useEffect(() => {
        if (selectedSwatch && color !== selectedSwatch) {
            setSelectedSwatch(null);
        }
    }, [color, selectedSwatch]);

    // If the selected swatch gets removed from palette, clear selection
    useEffect(() => {
        if (selectedSwatch && !paletteColors.includes(selectedSwatch)) {
            setSelectedSwatch(null);
        }
    }, [paletteColors, selectedSwatch]);



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
        <>
            <ZoomButtonContainer>
                <ZoomButton onClick={() => setZoom(z => Math.min(200, z + 5))}>+</ZoomButton>
                <ZoomButton onClick={() => setZoom(z => Math.max(10, z - 5))}>-</ZoomButton>
            </ZoomButtonContainer>
            <GridContainer>
                {paletteColors && paletteColors.length > 0 && (
                    <PaletteContainer>
                        {paletteColors.map((c, i) => (
                            <PaletteSwatch
                                key={`palette-${i}`}
                                $color={c}
                                $selected={selectedSwatch === c}
                                title={c}
                                onClick={() => {
                                    setSelectedSwatch(c);
                                    setColor(c);
                                }}
                            />
                        ))}
                        {selectedSwatch && onRemovePaletteColor && (
                            <PaletteDeleteButton
                                aria-label="Remove selected color"
                                title="Remove selected color"
                                onClick={() => {
                                    onRemovePaletteColor(selectedSwatch);
                                    setSelectedSwatch(null);
                                }}
                            >
                                ×
                            </PaletteDeleteButton>
                        )}
                    </PaletteContainer>
                )}
                <Canvas
                    orthographic
                    camera={{ zoom, position: [0, 0, 100] }}
                    style={{ width: '100%', height: '100vh', background: lightGray }}
                    onCreated={({ gl, camera }) => {
                        rendererRef.current = gl;
                        if ((camera as THREE.Camera).type === "OrthographicCamera") {
                            cameraRef.current = camera as THREE.OrthographicCamera;
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
            </GridContainer >
        </>
    );
});
Grid.displayName = 'Grid';