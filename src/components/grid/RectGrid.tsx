import React, { Fragment } from "react";
import { mediumGray } from "../styles/colors";

interface RectGridProps {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    pixels: string[];
    pipetteActive: boolean;
    setColor: (color: string) => void;
    handlePixelPaint: (idx: number) => void;
};

export function RectGrid({
    gridWidth,
    gridHeight,
    pixelWidth,
    pixelHeight,
    pixels,
    pipetteActive,
    setColor,
    handlePixelPaint
}: RectGridProps) {
    return (
        <>
            {Array.from({ length: gridWidth * gridHeight }).map((_, idx) => {
                // Column-major indexing: columns first (x), then rows (y)
                const x = Math.floor(idx / gridHeight);
                const y = idx % gridHeight;
                const px = (x + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2;
                const py = (y + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
                const pixelIdx = x * gridHeight + y;
                const isFilled = !!pixels[pixelIdx];
                return (
                    <Fragment key={`pixel-${idx}`}>
                        <mesh
                            position={[px, py, 0]}
                            onClick={() => pipetteActive && isFilled ? setColor(pixels[pixelIdx]) : !pipetteActive ? handlePixelPaint(pixelIdx) : undefined}
                            onPointerOver={() => !pipetteActive && handlePixelPaint(pixelIdx)}
                        >
                            <boxGeometry args={[pixelWidth / 10, pixelHeight / 10, 0.1]} />
                            {isFilled ? (
                                <meshBasicMaterial color={pixels[pixelIdx]} transparent opacity={1} />
                            ) : (
                                <meshBasicMaterial color={mediumGray} wireframe />
                            )}
                        </mesh>
                    </Fragment>
                );
            })}
        </>
    );
}
