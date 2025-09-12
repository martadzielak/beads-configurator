import { useThree } from "@react-three/fiber";
import React from "react";

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
