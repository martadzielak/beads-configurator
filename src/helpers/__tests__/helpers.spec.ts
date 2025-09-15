import {
    getPeyotePixelIdx,
    getTotalPixels,
    getInitialPixels,
    getInitialPixelsValues,
} from '@/helpers/helpers';

const expectedSize = (w: number, h: number, pey: boolean) => getTotalPixels(w, h, pey);

describe('helpers', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('getPeyotePixelIdx computes cumulative index per row parity', () => {
        // Row 0, col 0 -> 0
        expect(getPeyotePixelIdx(0, 0, 5)).toBe(0);
        // Row 1 has row 0 width 5 preceding; row 1 uses width-1 (4)
        expect(getPeyotePixelIdx(1, 0, 5)).toBe(5);
        expect(getPeyotePixelIdx(1, 3, 5)).toBe(8);
        // Row 2 has 5 + 4 preceding = 9
        expect(getPeyotePixelIdx(2, 2, 5)).toBe(11);
    });

    test('getTotalPixels for normal grid', () => {
        expect(getTotalPixels(10, 3, false)).toBe(30);
    });

    test('getTotalPixels for peyote grid', () => {
        // rows: 0..3 => 10 + 9 + 10 + 9 = 38
        expect(getTotalPixels(10, 4, true)).toBe(38);
    });

    test('getInitialPixels returns saved pixels padded/truncated to expected size', () => {
        localStorage.setItem('gridWidth', '4');
        localStorage.setItem('gridHeight', '3');
        localStorage.setItem('peyoteActive', 'false');
        const saved = ['#111', '', '#333'];
        localStorage.setItem('pixels', JSON.stringify(saved));

        const result = getInitialPixels(expectedSize);
        // 4x3 normal grid => 12
        expect(result.length).toBe(12);
        expect(result[0]).toBe('#111');
        expect(result[2]).toBe('#333');
        // padded entries should be empty strings
        expect(result[11]).toBe('');
    });

    test('getInitialPixels uses defaults when localStorage holds invalid numbers', () => {
        localStorage.setItem('gridWidth', 'NaN');
        localStorage.setItem('gridHeight', 'oops');
        localStorage.setItem('peyoteActive', 'maybe');
        localStorage.removeItem('pixels');

        const result = getInitialPixels(expectedSize);
        expect(Array.isArray(result)).toBe(true);
        expect(result.every((v) => typeof v === 'string')).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('getInitialPixelsValues pads and truncates as needed', () => {
        const setPixels = jest.fn<
            void,
            [(updater: (prev: string[]) => string[]) => void]
        >() as unknown as ((updater: (prev: string[]) => string[]) => void) & jest.Mock;
        const size = 5;
        // shorter array
        getInitialPixelsValues(['a', 'b'], setPixels, size);
        expect(setPixels).toHaveBeenCalledTimes(1);
        const updater1 = (setPixels as jest.Mock).mock.calls[0][0] as (prev: string[]) => string[];
        const out1 = updater1(['a', 'b']);
        expect(out1.length).toBe(5);
        expect(out1.slice(0, 2)).toEqual(['a', 'b']);
        expect(out1.slice(2)).toEqual(['', '', '']);

        (setPixels as jest.Mock).mockClear();
        // longer array
        getInitialPixelsValues(['1', '2', '3', '4', '5', '6'], setPixels, size);
        const updater2 = (setPixels as jest.Mock).mock.calls[0][0] as (prev: string[]) => string[];
        const out2 = updater2(['1', '2', '3', '4', '5', '6']);
        expect(out2).toEqual(['1', '2', '3', '4', '5']);
    });
});
