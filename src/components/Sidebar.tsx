"use client";
import { SizePicker } from '@/components/SizePicker';
import { ColorPicker } from '@/components/ColorPicker';
import { GUIButton } from '@/components/GUIButton';
import React, { FC, useEffect } from 'react';
import { SidebarContainer, Heading, MobileOverlay } from './styled';
import { GUISectionContainer } from './GUISectionContainer';

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
};

export const Sidebar: FC<SidebarProps> = ({ color, setColor, gridWidth, setGridWidth, gridHeight, setGridHeight, pixelWidth, setPixelWidth, pixelHeight, setPixelHeight, pipetteActive, setPipetteActive, onDownloadPNG }: SidebarProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Shift') {
                setPipetteActive(!pipetteActive);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [pipetteActive, setPipetteActive]);

    return (
        <>
            <MobileOverlay>
                This app is available only on Desktop
            </MobileOverlay>
            <SidebarContainer>
                <Heading>Settings </Heading>
                <GUISectionContainer label="Grid dimensions" text="Caution! Changing these will reset the pattern!">
                    <SizePicker label={"Grid width"} min={2} max={100} step={1} value={gridWidth} onChange={e => setGridWidth(Number(e.target.value))} />
                    <SizePicker label={"Grid height"} min={2} max={50} step={1} value={gridHeight} onChange={e => setGridHeight(Number(e.target.value))} />
                </GUISectionContainer>
                <SizePicker label={"Bead width"} min={0.1} max={2} step={0.01} value={pixelWidth} onChange={e => setPixelWidth(Number(e.target.value))} />
                <SizePicker label={"Bead height"} min={0.1} max={2} step={0.01} value={pixelHeight} onChange={e => setPixelHeight(Number(e.currentTarget.value))} />
                <ColorPicker color={color} setColor={setColor} />
                <GUIButton
                    onClick={() => setPipetteActive(!pipetteActive)}
                    active={pipetteActive}
                    text={pipetteActive ? 'Pipette (active)' : 'Activate Pipette'}
                />
                <GUIButton
                    onClick={onDownloadPNG}
                    active={false}
                    text={"Download PNG"}
                />
            </SidebarContainer>
        </>
    );
}

