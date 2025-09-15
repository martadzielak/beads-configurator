import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { SizePicker } from '@/components/sidebar/common/SizePicker';
import { SectionText } from "@/components/styles/styled";

interface Props {
    gridWidth: number;
    setGridWidth: (size: number) => void;
    gridHeight: number;
    setGridHeight: (size: number) => void;
    children?: React.ReactNode;
}

export const GridDimensionsSection: React.FC<Props> = ({ gridWidth, setGridWidth, gridHeight, setGridHeight }) => (
    <GUISectionContainer label="Grid dimensions">
        <SectionText>
            Adjust the grid dimensions.
        </SectionText>
        <SizePicker label={"Grid width"} min={2} max={100} step={1} value={gridWidth} onChange={e => { const n = Number(e.target.value); if (!Number.isFinite(n)) return; setGridWidth(n); }} />
        <SizePicker label={"Grid height"} min={2} max={50} step={1} value={gridHeight} onChange={e => { const n = Number(e.target.value); if (!Number.isFinite(n)) return; setGridHeight(n); }} />
    </GUISectionContainer>
);
