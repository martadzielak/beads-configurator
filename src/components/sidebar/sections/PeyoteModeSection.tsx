import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { GUIButton } from '@/components/sidebar/common/GUIButton';

interface Props {
    peyoteActive: boolean;
    onTogglePeyote: () => void;
}

export const PeyoteModeSection: React.FC<Props> = ({ peyoteActive, onTogglePeyote }) => (
    <GUISectionContainer label="Peyote mode" text="Toggle peyote stitch mode for staggered rows. Caution! This will reset the pattern!">
        <GUIButton
            onClick={onTogglePeyote}
            active={peyoteActive}
            text={peyoteActive ? 'Disable Peyote Mode' : 'Enable Peyote Mode'}
        />
    </GUISectionContainer>
);
