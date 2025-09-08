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
