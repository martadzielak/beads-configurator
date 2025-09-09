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

export const calculatePixelOutlineLines = (gridWidth: number, gridHeight: number, pixelWidth: number, pixelHeight: number) => {
    const lines = [];
    const w = gridWidth * pixelWidth;
    const h = gridHeight * pixelHeight;
    // Vertical lines
    for (let i = 0; i <= gridWidth; i++) {
        const x = -w / 2 + i * pixelWidth;
        lines.push(x, -h / 2, 0.1, x, h / 2, 0.1);
    }
    // Horizontal lines
    for (let j = 0; j <= gridHeight; j++) {
        const y = -h / 2 + j * pixelHeight;
        lines.push(-w / 2, y, 0.1, w / 2, y, 0.1);
    }
    return lines.flat();
}