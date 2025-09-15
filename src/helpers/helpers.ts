import { useThree } from "@react-three/fiber";
import React from "react";
import {
    DEFAULT_GRID_WIDTH,
    DEFAULT_GRID_HEIGHT,
    DEFAULT_PEYOTE_ACTIVE,
    PALETTE_MAX,
    DEFAULT_PALETTE
} from '@/app/defaults';

export const DownloadHelper = ({ triggerDownload }: { triggerDownload?: () => void }) => {
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

export const DownloadPNGHelper = ({ downloadRequest, setDownloadRequest }: { downloadRequest: boolean, setDownloadRequest: (v: boolean) => void }) => {
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

const calculateNormalGridLines = (gridWidth: number, gridHeight: number, pixelWidth: number, pixelHeight: number) => {
    const lines = [];
    const w = gridWidth * (pixelWidth / 10);
    const h = gridHeight * (pixelHeight / 10);
    // Vertical lines
    for (let i = 0; i <= gridWidth; i++) {
        const x = -w / 2 + i * pixelWidth / 10;
        lines.push(x, -h / 2, 0.1, x, h / 2, 0.1);
    }
    // Horizontal lines
    for (let j = 0; j <= gridHeight; j++) {
        const y = -h / 2 + j * pixelHeight / 10;
        lines.push(-w / 2, y, 0.1, w / 2, y, 0.1);
    }
    return lines;
}

const calculatePeyoteGridLines = (gridWidth: number, gridHeight: number, pixelWidth: number, pixelHeight: number) => {
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
    return lines;
}

export const calculatePixelOutlineLines = (
    peyoteActive: boolean,
    gridWidth: number,
    gridHeight: number,
    pixelWidth: number,
    pixelHeight: number
) => {
    const lines = peyoteActive
        ? calculatePeyoteGridLines(gridWidth, gridHeight, pixelWidth, pixelHeight)
        : calculateNormalGridLines(gridWidth, gridHeight, pixelWidth, pixelHeight);
    return lines.flat();
}


export const getPeyotePixelIdx = (row: number, col: number, gridWidth: number) => {
    let idx = 0;
    for (let r = 0; r < row; r++) {
        idx += (r % 2 === 0) ? gridWidth : (gridWidth - 1);
    }
    return idx + col;
};

export const getTotalPixels = (gridWidth: number, gridHeight: number, peyoteActive: boolean): number => {
    if (!peyoteActive) return gridWidth * gridHeight;
    let count = 0;
    for (let row = 0; row < gridHeight; row++) {
        count += (row % 2 === 0) ? gridWidth : (gridWidth - 1);
    }
    return count;
}

export const getInitialPixels = (expectedSize: (gw: number, gh: number, pey: boolean) => number): string[] => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('pixels');
        const w = localStorage.getItem('gridWidth');
        const h = localStorage.getItem('gridHeight');
        const p = localStorage.getItem('peyoteActive');
        const parsedW = w !== null ? Number(w) : NaN;
        const parsedH = h !== null ? Number(h) : NaN;
        const gw = Number.isFinite(parsedW) ? parsedW : DEFAULT_GRID_WIDTH;
        const gh = Number.isFinite(parsedH) ? parsedH : DEFAULT_GRID_HEIGHT;
        const pey = p !== null ? (p === 'true') : DEFAULT_PEYOTE_ACTIVE;
        const size = expectedSize(gw, gh, pey);
        if (saved) {
            try {
                let arr = JSON.parse(saved);
                if (Array.isArray(arr)) {
                    if (arr.length < size) arr = arr.concat(Array(size - arr.length).fill(''));
                    else if (arr.length > size) arr = arr.slice(0, size);
                    return arr;
                }
            } catch { }
        }
        return Array(size).fill('');
    }
    const fallbackSize = expectedSize(DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT, DEFAULT_PEYOTE_ACTIVE);
    return Array(fallbackSize).fill('');
};

export const getInitialNumberValue = (defaultValue: number, item: string) => {
    if (typeof window !== 'undefined') {
        const v = localStorage.getItem(item);
        if (v === null) return defaultValue;
        const n = Number(v);
        return Number.isFinite(n) ? n : defaultValue;
    }
    return defaultValue;
};

export const getInitialStringValue = (defaultValue: string, item: string) => {
    if (typeof window !== 'undefined') {
        const v = localStorage.getItem(item);
        return v ? String(v) : defaultValue;
    }
    return defaultValue;
};

export const getInitialBooleanValue = (defaultValue: boolean, item: string) => {
    if (typeof window !== 'undefined') {
        const v = localStorage.getItem(item);
        if (v === null) return defaultValue;
        if (v === 'true') return true;
        if (v === 'false') return false;
        return defaultValue;
    }
    return defaultValue;
};

interface SetPixelsFunction {
    (prev: string[]): string[];
}

export const getInitialPixelsValues = (
    pixels: string[],
    setPixels: (fn: SetPixelsFunction) => void,
    size: number
): void => {
    if (pixels.length !== size) {
        setPixels((prev: string[]) => {
            const arr: string[] = Array.isArray(prev) ? prev : [];
            if (arr.length < size) return arr.concat(Array(size - arr.length).fill(''));
            if (arr.length > size) return arr.slice(0, size);
            return arr;
        });
    }
}

export const getInitialPaletteColors = (): string[] => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('paletteColors');
        if (saved) {
            try {
                const arr = JSON.parse(saved);
                if (Array.isArray(arr)) return arr.slice(0, PALETTE_MAX);
            } catch { }
        }
    }
    return DEFAULT_PALETTE;
}