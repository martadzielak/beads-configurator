"use client";
import { DownloadButton } from "@/components/sidebar/common/DownloadButton";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Grid } from "@/components/grid/Grid";
import { getTotalPixels } from "@/helpers/helpers";
import { useState, useEffect } from "react";
import { Loader, useLoader } from "@/components/common/Loader";

export const App = () => {
    const expectedSize = (w: number, h: number, peyote: boolean) => getTotalPixels(w, h, peyote);

    const [color, setColor] = useState('#ff0000');
    const [gridWidth, setGridWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            const v = localStorage.getItem('gridWidth');
            return v ? Number(v) : 85;
        }
        return 85;
    });
    const [gridHeight, setGridHeight] = useState(() => {
        if (typeof window !== 'undefined') {
            const v = localStorage.getItem('gridHeight');
            return v ? Number(v) : 19;
        }
        return 19;
    });
    const [pixelWidth, setPixelWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            const v = localStorage.getItem('pixelWidth');
            return v ? Number(v) : 3;
        }
        return 3;
    });
    const [pixelHeight, setPixelHeight] = useState(() => {
        if (typeof window !== 'undefined') {
            const v = localStorage.getItem('pixelHeight');
            return v ? Number(v) : 2;
        }
        return 2;
    });
    const [peyoteActive, setPeyoteActive] = useState(() => {
        if (typeof window !== 'undefined') {
            const v = localStorage.getItem('peyoteActive');
            return v ? v === 'true' : false;
        }
        return false;
    });
    const [pixels, setPixels] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pixels');
            const w = localStorage.getItem('gridWidth');
            const h = localStorage.getItem('gridHeight');
            const p = localStorage.getItem('peyoteActive');
            const gw = w ? Number(w) : 85;
            const gh = h ? Number(h) : 19;
            const pey = p ? p === 'true' : false;
            const size = expectedSize(gw, gh, pey);
            if (saved) {
                try {
                    let arr = JSON.parse(saved);
                    if (Array.isArray(arr)) {
                        if (arr.length < size) arr = arr.concat(Array(size - arr.length).fill(''));
                        else if (arr.length > size) arr = arr.slice(0, size);
                        return arr;
                    }
                } catch { /* ignore */ }
            }
            return Array(size).fill('');
        }
        return Array(85 * 19).fill('');
    });
    const [pipetteActive, setPipetteActive] = useState(false);
    const [eraserActive, setEraserActive] = useState(false);
    const [showGridOverlay, setShowGridOverlay] = useState(false);
    const [downloadRequest, setDownloadRequest] = useState(false);

    const loading = useLoader(1000);

    const handleResetPixels = () => {
        const size = expectedSize(gridWidth, gridHeight, peyoteActive);
        setPixels(Array(size).fill(''));
    };

    // Save all settings to localStorage when they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('gridWidth', String(gridWidth));
            localStorage.setItem('gridHeight', String(gridHeight));
            localStorage.setItem('pixelWidth', String(pixelWidth));
            localStorage.setItem('pixelHeight', String(pixelHeight));
            localStorage.setItem('peyoteActive', String(peyoteActive));
            localStorage.setItem('pixels', JSON.stringify(pixels));
        }
    }, [gridWidth, gridHeight, pixelWidth, pixelHeight, peyoteActive, pixels]);

    // When grid config changes, pad/truncate pixels—preserve existing colors
    useEffect(() => {
        const size = expectedSize(gridWidth, gridHeight, peyoteActive);
        if (pixels.length !== size) {
            setPixels(prev => {
                const arr = Array.isArray(prev) ? prev : [];
                if (arr.length < size) return arr.concat(Array(size - arr.length).fill(''));
                if (arr.length > size) return arr.slice(0, size);
                return arr;
            });
        }
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
            />
            <DownloadButton
                onClick={() => setDownloadRequest(true)}
            />
        </div>
    );
}
