import React from "react";
import { SectionText } from '../../styles/styled';
import { GUISectionContainer } from '../common/GUISectionContainer';
import { SizePicker } from '@/components/sidebar/common/SizePicker';

interface Props {
    pixelWidth: number;
    setPixelWidth: (w: number) => void;
    pixelHeight: number;
    setPixelHeight: (h: number) => void;
}

export const BeadsDimensionsSection: React.FC<Props> = ({ pixelWidth, setPixelWidth, pixelHeight, setPixelHeight }) => (
    <GUISectionContainer label="Beads dimensions">
        <SectionText>
            Set bead size in mm.
        </SectionText>
        <SizePicker label={"Bead width"} min={1} max={10} step={0.1} value={pixelWidth} onChange={e => { const n = Number(e.target.value); if (!Number.isFinite(n)) return; setPixelWidth(n); }} />
        <SizePicker label={"Bead height"} min={1} max={10} step={0.1} value={pixelHeight} onChange={e => { const n = Number(e.currentTarget.value); if (!Number.isFinite(n)) return; setPixelHeight(n); }} />
    </GUISectionContainer>
);
