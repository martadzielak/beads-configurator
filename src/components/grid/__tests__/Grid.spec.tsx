import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from '@/components/grid/Grid';
import { exp } from 'three/tsl';

// Mock the Canvas to avoid WebGL in JSDOM
jest.mock('@react-three/fiber', () => ({
    __esModule: true,
    Canvas: () => (
        <div data-testid="mock-canvas" />
    ),
    useFrame: () => { },
    useThree: () => ({ gl: {}, scene: {}, camera: {} }),
}));

describe('Grid', () => {
    const baseProps = {
        gridWidth: 4,
        gridHeight: 3,
        pixelWidth: 3,
        pixelHeight: 2,
        color: '#ff0000',
        pixels: Array(12).fill(''),
        setPixels: () => { },
        showGridOverlay: true,
        peyoteActive: false,
        pipetteActive: false,
        eraserActive: false,
        setColor: () => { },
        downloadRequest: false,
        setDownloadRequest: () => { },
        paletteColors: ['#111111', '#222222'] as string[],
        onRemovePaletteColor: () => { },
    } as const;

    it('renders GridContainer and mocked Canvas', () => {
        render(<Grid {...baseProps} />);
        expect(screen.getByTestId('mock-canvas')).toBeInTheDocument();
        expect(screen.getByTestId('mock-canvas').parentElement).toHaveStyle({
            width: 'calc(100% - 300px)',
        });
    });
});
