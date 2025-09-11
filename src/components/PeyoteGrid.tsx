import React, { Fragment } from "react";
import { mediumGray } from "./styles/colors";
import { getPeyotePixelIdx } from '@/helpers/helpers';

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
                    const pixelIdx = getPeyotePixelIdx(rowIdx, colIdx, gridWidth);
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
