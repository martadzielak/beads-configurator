import React from "react";
import { GUISectionContainer } from '../../GUISectionContainer';
import { GUIButton } from '@/components/GUIButton';

interface Props {
    peyoteActive: boolean;
    onTogglePeyote: () => void;
}

export const PeyoteModeSection: React.FC<Props> = ({ peyoteActive, onTogglePeyote }) => (
    <GUISectionContainer label="Peyote mode" text="Add 2 pixels in every other column (top & bottom)">
        <GUIButton
            onClick={onTogglePeyote}
            active={peyoteActive}
            text={peyoteActive ? 'Disable Peyote Mode' : 'Enable Peyote Mode'}
        />
    </GUISectionContainer>
);
