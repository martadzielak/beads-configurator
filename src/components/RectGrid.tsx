import React, { Fragment } from "react";
import { mediumGray } from "./styles/colors";

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
                const x = idx % gridWidth;
                const y = Math.floor(idx / gridWidth);
                const px = (x + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2;
                const py = (y + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
                const isFilled = !!pixels[idx];
                return (
                    <Fragment key={`pixel-${idx}`}>
                        <mesh
                            position={[px, py, 0]}
                            onClick={() => pipetteActive && isFilled ? setColor(pixels[idx]) : !pipetteActive ? handlePixelPaint(idx) : undefined}
                            onPointerOver={() => !pipetteActive && handlePixelPaint(idx)}
                        >
                            <boxGeometry args={[pixelWidth / 10, pixelHeight / 10, 0.1]} />
                            {isFilled ? (
                                <meshBasicMaterial color={pixels[idx]} transparent opacity={1} />
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
