import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { GUIButton } from '@/components/sidebar/common/GUIButton';

interface Props {
    showGridOverlay: boolean;
    setShowGridOverlay: (v: boolean) => void;
}

export const GridOverlaySection: React.FC<Props> = ({ showGridOverlay, setShowGridOverlay }) => (
    <GUISectionContainer label="Grid overlay" text="Show or hide grid overlay lines">
        <GUIButton
            onClick={() => setShowGridOverlay(!showGridOverlay)}
            active={showGridOverlay}
        >
            {showGridOverlay ? 'Hide Grid Overlay [O]' : 'Show Grid Overlay [O]'}
        </GUIButton>
    </GUISectionContainer>
);
