import { describe, it, expect } from '@jest/globals';

// Replicate crucial peyote logic from Grid.tsx
function getPeyotePixelIdx(row: number, col: number, gridWidth: number, gridHeight: number): number {
    let idx = 0;
    for (let r = 0; r < row; r++) {
        idx += (r % 2 === 0) ? gridWidth : (gridWidth - 1);
    }
    return idx + col;
}

function getTotalPixels(gridWidth: number, gridHeight: number): number {
    let count = 0;
    for (let row = 0; row < gridHeight; row++) {
        count += (row % 2 === 0) ? gridWidth : (gridWidth - 1);
    }
    return count;
}

describe('peyote logic', () => {
    it('calculates total pixels for peyote mode', () => {
        expect(getTotalPixels(5, 4)).toBe(5 + 4 + 5 + 4); // 18
        expect(getTotalPixels(3, 3)).toBe(3 + 2 + 3); // 8
    });

    it('maps (row, col) to correct pixel index', () => {
        // For gridWidth=5, gridHeight=4
        // Row 0: 5 pixels, Row 1: 4 pixels, Row 2: 5 pixels, Row 3: 4 pixels
        expect(getPeyotePixelIdx(0, 0, 5, 4)).toBe(0);
        expect(getPeyotePixelIdx(1, 0, 5, 4)).toBe(5);
        expect(getPeyotePixelIdx(2, 0, 5, 4)).toBe(9);
        expect(getPeyotePixelIdx(3, 0, 5, 4)).toBe(14);
        expect(getPeyotePixelIdx(3, 3, 5, 4)).toBe(17);
    });

    it('handles edge cases', () => {
        expect(getTotalPixels(1, 1)).toBe(1);
        expect(getPeyotePixelIdx(0, 0, 1, 1)).toBe(0);
    });
});
