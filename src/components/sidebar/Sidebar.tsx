"use client";
import { FC, useEffect } from 'react';
import { SidebarContainer, Heading, LogoImg } from '../styles/styled';
import { MobileOverlay } from './common/MobileOverlay';
import { Footer } from './common/Footer';
import { GridDimensionsSection } from './sections/GridDimensionsSection';
import { BeadsDimensionsSection } from './sections/BeadsDimensionsSection';
import { ColorPickerSection } from './sections/ColorPickerSection';
import { GridOverlaySection } from './sections/GridOverlaySection';
import { PeyoteModeSection } from './sections/PeyoteModeSection';

interface SidebarProps {
    color: string;
    setColor: (color: string) => void;
    gridWidth: number;
    setGridWidth: (size: number) => void;
    gridHeight: number;
    setGridHeight: (size: number) => void;
    pixelWidth: number;
    setPixelWidth: (w: number) => void;
    pixelHeight: number;
    setPixelHeight: (h: number) => void;
    pipetteActive: boolean;
    setPipetteActive: (active: boolean) => void;
    onDownloadPNG?: () => void;
    showGridOverlay: boolean;
    setShowGridOverlay: (v: boolean) => void;
    peyoteActive: boolean;
    setPeyoteActive: (v: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ color, setColor, gridWidth, setGridWidth, gridHeight, setGridHeight, pixelWidth, setPixelWidth, pixelHeight, setPixelHeight, pipetteActive, setPipetteActive, showGridOverlay, setShowGridOverlay, peyoteActive, setPeyoteActive }: SidebarProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'p' || e.key === 'P') {
                setPipetteActive(!pipetteActive);
            }
            if (e.key === 'o' || e.key === 'O') {
                setShowGridOverlay(!showGridOverlay);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [pipetteActive, setPipetteActive, setShowGridOverlay, showGridOverlay]);

    return (

        <>    <MobileOverlay />
            <SidebarContainer>
                <LogoImg src="/peyote_black.png" alt="peyote logo" />
                <Heading>Settings</Heading>
                <PeyoteModeSection
                    peyoteActive={peyoteActive}
                    onTogglePeyote={() => setPeyoteActive(!peyoteActive)}
                />
                <GridDimensionsSection
                    gridWidth={gridWidth}
                    setGridWidth={setGridWidth}
                    gridHeight={gridHeight}
                    setGridHeight={setGridHeight}
                />
                <BeadsDimensionsSection
                    pixelWidth={pixelWidth}
                    setPixelWidth={setPixelWidth}
                    pixelHeight={pixelHeight}
                    setPixelHeight={setPixelHeight}
                />
                <ColorPickerSection
                    color={color}
                    setColor={setColor}
                    pipetteActive={pipetteActive}
                    setPipetteActive={setPipetteActive}
                />
                <GridOverlaySection
                    showGridOverlay={showGridOverlay}
                    setShowGridOverlay={setShowGridOverlay}
                />
                <Footer />
            </SidebarContainer>
        </>
    );
}

