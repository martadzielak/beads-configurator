import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/components/sidebar/Sidebar';

jest.mock('@/components/sidebar/sections/ResetSection', () => ({
    __esModule: true,
    ResetSection: ({ onResetPixels }: { onResetPixels: () => void }) => (
        <div data-testid="reset-section" onClick={onResetPixels}>Reset</div>
    ),
}));

describe('Sidebar', () => {
    const noop = () => { };

    const baseProps = {
        color: '#ff0000',
        setColor: noop,
        gridWidth: 10,
        setGridWidth: noop as (n: number) => void,
        gridHeight: 5,
        setGridHeight: noop as (n: number) => void,
        pixelWidth: 3,
        setPixelWidth: noop as (n: number) => void,
        pixelHeight: 2,
        setPixelHeight: noop as (n: number) => void,
        pipetteActive: false,
        setPipetteActive: noop as (b: boolean) => void,
        eraserActive: false,
        setEraserActive: noop as (b: boolean) => void,
        showGridOverlay: false,
        setShowGridOverlay: noop as (b: boolean) => void,
        peyoteActive: false,
        setPeyoteActive: noop as (b: boolean) => void,
        onResetPixels: noop,
    } as const;

    it('renders Settings heading and core sections', () => {
        render(<Sidebar {...baseProps} data-testid="sidebar" />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toHaveStyle({ width: '300px' });
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();
        expect(screen.getByText(/^Peyote mode$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Grid dimensions$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Beads dimensions$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Grid overlay$/i)).toBeInTheDocument();
        expect(screen.getByTestId('reset-section')).toBeInTheDocument();
    });

})