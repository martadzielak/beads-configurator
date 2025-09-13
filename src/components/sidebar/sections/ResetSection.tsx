import React from "react";
import { WarningText, IconImg } from '../../styles/styled';
import { GUISectionContainer } from '../common/GUISectionContainer';
import { GUIButton } from '@/components/sidebar/common/GUIButton';
import Image from "next/image";
import warningIcon from "@/../public/warning.png";

interface ResetSectionProps {
    onResetPixels: () => void;
}

export const ResetSection: React.FC<ResetSectionProps> = ({ onResetPixels }) => (
    <GUISectionContainer label="Reset design">
        <WarningText>
            <Image src={warningIcon} alt="Warning" width={20} height={20} />
            Caution! The pattern will be lost!
        </WarningText>
        <GUIButton onClick={onResetPixels} active={false}>
            <IconImg src="/reset.png" alt="Reset" $active={false} />
            Reset design
        </GUIButton>
    </GUISectionContainer>
);