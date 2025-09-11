import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { SizePicker } from '@/components/sidebar/common/SizePicker';

interface Props {
    gridWidth: number;
    setGridWidth: (size: number) => void;
    gridHeight: number;
    setGridHeight: (size: number) => void;
}

export const GridDimensionsSection: React.FC<Props> = ({ gridWidth, setGridWidth, gridHeight, setGridHeight }) => (
    <GUISectionContainer label="Grid dimensions" text="Change the rows and columns length. Caution! Changing these will reset the pattern!">
        <SizePicker label={"Grid width"} min={2} max={100} step={1} value={gridWidth} onChange={e => setGridWidth(Number(e.target.value))} />
        <SizePicker label={"Grid height"} min={2} max={50} step={1} value={gridHeight} onChange={e => setGridHeight(Number(e.target.value))} />
    </GUISectionContainer>
);
