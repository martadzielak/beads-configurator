import { mediumGray } from "../../app/colors"

interface GridOverlayProps {
    pixelOutlineLines: ArrayLike<number> | ArrayBuffer;
};

export const GridOverlay = ({ pixelOutlineLines }: GridOverlayProps) => {
    return (<lineSegments>
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(pixelOutlineLines), 3]}
            />
        </bufferGeometry>
        <lineBasicMaterial color={mediumGray} linewidth={0.3} />
    </lineSegments>)
}