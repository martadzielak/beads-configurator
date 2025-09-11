"use client";
import { DownloadButton } from "@/components/DownloadButton";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { CornerInstruction } from "@/components/styles/styled";
import { Grid } from "@/components/Grid";
import { useState, useEffect } from "react";

export const App = () => {
    const [color, setColor] = useState('#ff0000');
    const [gridWidth, setGridWidth] = useState(85);
    const [gridHeight, setGridHeight] = useState(19);
    const [pixelWidth, setPixelWidth] = useState(3);
    const [pixelHeight, setPixelHeight] = useState(2);
    const [pixels, setPixels] = useState(() => {
        // Load from localStorage if available
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pixels');
            if (saved) return JSON.parse(saved);
        }
        return Array(85 * 19).fill('');
    });
    const [pipetteActive, setPipetteActive] = useState(false);
    const [showGridOverlay, setShowGridOverlay] = useState(false);
    const [downloadRequest, setDownloadRequest] = useState(false);
    const [peyoteActive, setPeyoteActive] = useState(false);

    useEffect(() => {
        if (peyoteActive) {
            // Only odd columns
            const oddCols = Math.floor(gridWidth / 2) + (gridWidth % 2);
            setPixels(Array(oddCols * gridHeight).fill(''));
        } else {
            setPixels(Array(gridWidth * gridHeight).fill(''));
        }
    }, [gridWidth, gridHeight, peyoteActive]);

    useEffect(() => {
        // Save to localStorage on every change
        if (typeof window !== 'undefined') {
            localStorage.setItem('pixels', JSON.stringify(pixels));
        }
    }, [pixels]);

    useEffect(() => {
        // Restore from localStorage when grid size changes
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pixels');
            if (saved) {
                const arr = JSON.parse(saved);
                if (Array.isArray(arr) && arr.length === gridWidth * gridHeight) {
                    setPixels(arr);
                    return;
                }
            }
        }
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
                showGridOverlay={showGridOverlay}
                setShowGridOverlay={setShowGridOverlay}
                peyoteActive={peyoteActive}
                setPeyoteActive={setPeyoteActive}
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
                setColor={setColor}
                showGridOverlay={showGridOverlay}
                downloadRequest={downloadRequest}
                setDownloadRequest={setDownloadRequest}
                peyoteActive={peyoteActive}
            />
            <CornerInstruction>
                [ P ] Activate/disactivate pipette<br />
                [ O ] Show/hide overlay
            </CornerInstruction>
            <DownloadButton
                onClick={() => setDownloadRequest(true)}
            />
        </div>
    );
}
