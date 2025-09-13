import React, { Fragment } from "react";
import { mediumGray } from "../styles/colors";

interface PeyoteGridProps {
    gridWidth: number;
    gridHeight: number;
    pixelWidth: number;
    pixelHeight: number;
    pixels: string[];
    pipetteActive: boolean;
    setColor: (color: string) => void;
    handlePixelPaint: (pixelIdx: number) => void;
};

export function PeyoteGrid({
    gridWidth,
    gridHeight,
    pixelWidth,
    pixelHeight,
    pixels,
    pipetteActive,
    setColor,
    handlePixelPaint
}: PeyoteGridProps) {
    return (
        <>
            {Array.from({ length: gridHeight }).map((_, rowIdx) => {
                const rowWidth = rowIdx % 2 === 0 ? gridWidth : gridWidth - 1;
                return Array.from({ length: rowWidth }).map((_, colIdx) => {
                    let px = (colIdx + 0.5) * pixelWidth / 10 - (gridWidth * pixelWidth / 10) / 2;
                    const py = (rowIdx + 0.5) * pixelHeight / 10 - (gridHeight * pixelHeight / 10) / 2;
                    if (rowIdx % 2 === 1) {
                        px += (pixelWidth / 10) / 2;
                    }
                    // Column-major index for peyote using slot-based mapping
                    // Even rows occupy even slots (true columns), odd rows occupy odd slots (between columns)
                    const evenRowsCount = Math.ceil(gridHeight / 2);
                    const oddRowsCount = Math.floor(gridHeight / 2);
                    const slotIndex = (rowIdx % 2 === 0) ? (colIdx * 2) : (colIdx * 2 + 1);
                    const pairsBefore = Math.floor(slotIndex / 2);
                    let pixelIdx = pairsBefore * (evenRowsCount + oddRowsCount);
                    if (slotIndex % 2 === 1) pixelIdx += evenRowsCount;
                    pixelIdx += Math.floor(rowIdx / 2);
                    const isFilled = !!pixels[pixelIdx];
                    return (
                        <Fragment key={`peyote-pixel-${rowIdx}-${colIdx}`}>
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
                });
            })}
        </>
    );
}
