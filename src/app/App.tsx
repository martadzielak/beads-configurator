"use client";
import { DownloadButton } from "@/components/grid/common/DownloadButton";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Grid } from "@/components/grid/Grid";
import { getInitialBooleanValue, getInitialNumberValue, getInitialPaletteColors, getInitialPixels, getInitialPixelsValues, getTotalPixels } from "@/helpers/helpers";
import { useState, useEffect } from "react";
import { Loader, useLoader } from "@/components/common/Loader";
import {
    DEFAULT_COLOR,
    DEFAULT_GRID_WIDTH,
    DEFAULT_GRID_HEIGHT,
    DEFAULT_PIXEL_WIDTH,
    DEFAULT_PIXEL_HEIGHT,
    DEFAULT_PEYOTE_ACTIVE,
    PALETTE_MAX,
    LOADER_DELAY_MS,
} from './defaults';

export const App = () => {
    const expectedSize = (w: number, h: number, peyote: boolean) => getTotalPixels(w, h, peyote);
    const [color, setColor] = useState(DEFAULT_COLOR);
    const [gridWidth, setGridWidth] = useState(() => {
        return getInitialNumberValue(DEFAULT_GRID_WIDTH, 'gridWidth');
    });
    const [gridHeight, setGridHeight] = useState(() => {
        return getInitialNumberValue(DEFAULT_GRID_HEIGHT, 'gridHeight');
    });
    const [pixelWidth, setPixelWidth] = useState(() => {
        return getInitialNumberValue(DEFAULT_PIXEL_WIDTH, 'pixelWidth');
    });
    const [pixelHeight, setPixelHeight] = useState(() => {
        return getInitialNumberValue(DEFAULT_PIXEL_HEIGHT, 'pixelHeight');
    });
    const [peyoteActive, setPeyoteActive] = useState(() => {
        return getInitialBooleanValue(DEFAULT_PEYOTE_ACTIVE, 'peyoteActive');
    });
    const [pixels, setPixels] = useState<string[]>(getInitialPixels(expectedSize));
    const [pipetteActive, setPipetteActive] = useState(false);
    const [eraserActive, setEraserActive] = useState(false);
    const [showGridOverlay, setShowGridOverlay] = useState(false);
    const [downloadRequest, setDownloadRequest] = useState(false);
    const [paletteColors, setPaletteColors] = useState<string[]>(() =>
        getInitialPaletteColors()
    );

    const loading = useLoader(LOADER_DELAY_MS);

    const handleResetPixels = () => {
        const size = expectedSize(gridWidth, gridHeight, peyoteActive);
        setPixels(Array(size).fill(''));
        setShowGridOverlay(true);
    };

    const handleAddToPalette = () => {
        setPaletteColors(prev => {
            if (prev.includes(color)) return prev;
            const next = [...prev, color];
            if (next.length > PALETTE_MAX) next.shift();
            return next;
        });
    };

    const handleRemoveFromPalette = (hex: string) => {
        setPaletteColors(prev => prev.filter(c => c !== hex));
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('gridWidth', String(gridWidth));
            localStorage.setItem('gridHeight', String(gridHeight));
            localStorage.setItem('pixelWidth', String(pixelWidth));
            localStorage.setItem('pixelHeight', String(pixelHeight));
            localStorage.setItem('peyoteActive', String(peyoteActive));
            localStorage.setItem('pixels', JSON.stringify(pixels));
            localStorage.setItem('paletteColors', JSON.stringify(paletteColors));
        }
    }, [gridWidth, gridHeight, pixelWidth, pixelHeight, peyoteActive, pixels, paletteColors]);

    useEffect(() => {
        const size = expectedSize(gridWidth, gridHeight, peyoteActive);
        return getInitialPixelsValues(pixels, setPixels, size);
    }, [gridWidth, gridHeight, peyoteActive, pixels.length]);

    if (loading) return <Loader />;

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
                eraserActive={eraserActive}
                setEraserActive={setEraserActive}
                showGridOverlay={showGridOverlay}
                setShowGridOverlay={setShowGridOverlay}
                peyoteActive={peyoteActive}
                setPeyoteActive={setPeyoteActive}
                onResetPixels={handleResetPixels}
                onAddToPalette={handleAddToPalette}
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
                eraserActive={eraserActive}
                setColor={setColor}
                showGridOverlay={showGridOverlay}
                downloadRequest={downloadRequest}
                setDownloadRequest={setDownloadRequest}
                peyoteActive={peyoteActive}
                paletteColors={paletteColors}
                onRemovePaletteColor={handleRemoveFromPalette}
            />
            <DownloadButton
                onClick={() => setDownloadRequest(true)}
            />
        </div>
    );
}
