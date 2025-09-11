import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { SizePicker } from '@/components/sidebar/common/SizePicker';

interface Props {
    pixelWidth: number;
    setPixelWidth: (w: number) => void;
    pixelHeight: number;
    setPixelHeight: (h: number) => void;
}

export const BeadsDimensionsSection: React.FC<Props> = ({ pixelWidth, setPixelWidth, pixelHeight, setPixelHeight }) => (
    <GUISectionContainer label="Beads dimensions" text="Set bead size in mm.">
        <SizePicker label={"Bead width"} min={1} max={10} step={0.1} value={pixelWidth} onChange={e => setPixelWidth(Number(e.target.value))} />
        <SizePicker label={"Bead height"} min={1} max={10} step={0.1} value={pixelHeight} onChange={e => setPixelHeight(Number(e.currentTarget.value))} />
    </GUISectionContainer>
);
