"use client";
import { SizePicker } from '@/components/SizePicker';
import { ColorPicker } from '@/components/ColorPicker';
import { PipetteButton } from '@/components/PipetteButton';
import { FC } from 'react';
import { SidebarContainer, Heading } from './styled';

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
};

export const Sidebar: FC<SidebarProps> = ({ color, setColor, gridWidth, setGridWidth, gridHeight, setGridHeight, pixelWidth, setPixelWidth, pixelHeight, setPixelHeight, pipetteActive, setPipetteActive }: SidebarProps) =>
    <SidebarContainer>
        <Heading>Settings </Heading>
        <ColorPicker color={color} setColor={setColor} />
        <SizePicker label={"Grid width"} min={2} max={100} step={1} value={gridWidth} onChange={e => setGridWidth(Number(e.target.value))} />
        <SizePicker label={"Grid height"} min={2} max={50} step={1} value={gridHeight} onChange={e => setGridHeight(Number(e.target.value))} />
        <SizePicker label={"Bead width"} min={0.1} max={2} step={0.01} value={pixelWidth} onChange={e => setPixelWidth(Number(e.target.value))} />
        <SizePicker label={"Bead height"} min={0.1} max={2} step={0.01} value={pixelHeight} onChange={e => setPixelHeight(Number(e.currentTarget.value))} />
        <PipetteButton
            onClick={() => setPipetteActive(!pipetteActive)}
            active={pipetteActive}
            text={pipetteActive ? 'Pipette (active)' : 'Activate Pipette'}
        />
    </SidebarContainer>

