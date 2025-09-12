import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { SizePicker } from '@/components/sidebar/common/SizePicker';
import { SectionText, WarningText } from "@/components/styles/styled";
import warningIcon from "@/../public/warning.png";
import Image from "next/image";

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
        <WarningText>
            <Image src={warningIcon} alt="Warning" width={20} height={20} />
            Caution! This will reset the pattern!
        </WarningText>
        <SizePicker label={"Grid width"} min={2} max={100} step={1} value={gridWidth} onChange={e => setGridWidth(Number(e.target.value))} />
        <SizePicker label={"Grid height"} min={2} max={50} step={1} value={gridHeight} onChange={e => setGridHeight(Number(e.target.value))} />
    </GUISectionContainer>
);
