import React from "react";
import { SectionText } from '../../styles/styled';
import { IconImg } from '@/components/styles/styled';
import { GUISectionContainer } from '../common/GUISectionContainer';
import { GUIButton } from '@/components/sidebar/common/GUIButton';


interface Props {
    peyoteActive: boolean;
    onTogglePeyote: () => void;
}

export const PeyoteModeSection: React.FC<Props> = ({ peyoteActive, onTogglePeyote }) => (
    <GUISectionContainer label="Peyote mode">
        <SectionText>
            Toggle peyote stitch mode for staggered rows.
        </SectionText>
        <GUIButton
            onClick={onTogglePeyote}
            active={peyoteActive}
        >
            <IconImg src="/peyote_icon.png" alt="peyote icon" $active={peyoteActive} />
            {peyoteActive ? 'Disable Peyote Mode' : 'Enable Peyote Mode'}
        </GUIButton>
    </GUISectionContainer>
);
