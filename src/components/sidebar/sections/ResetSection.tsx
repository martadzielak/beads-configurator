import React from "react";
import { WarningText, IconImg, DangerButton } from '../../styles/styled';
import { GUISectionContainer } from '../common/GUISectionContainer';
import Image from "next/image";
import warningIcon from "@/../public/warning.png";

interface ResetSectionProps {
    onResetPixels: () => void;
}

export const ResetSection: React.FC<ResetSectionProps> = ({ onResetPixels }) => (
    <GUISectionContainer label="Reset design" variant="danger">
        <WarningText style={{ color: '#cc2020' }}>
            <Image src={warningIcon} alt="Warning" width={20} height={20} />
            Caution! The pattern will be lost!
        </WarningText>
        <DangerButton onClick={onResetPixels}>
            <IconImg src="/reset.png" alt="Reset" $active={false} />
            Reset design
        </DangerButton>
    </GUISectionContainer>
);