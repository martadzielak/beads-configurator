import React from "react";
import { IconImg, SectionText } from '../../styles/styled';
import { GUISectionContainer } from '../common/GUISectionContainer';
import { GUIButton } from '@/components/sidebar/common/GUIButton';

interface Props {
    showGridOverlay: boolean;
    setShowGridOverlay: (v: boolean) => void;
}

export const GridOverlaySection: React.FC<Props> = ({
    showGridOverlay, setShowGridOverlay
}) => {
    return (
        <GUISectionContainer label="Grid overlay">
            <SectionText>
                Show or hide grid overlay lines.
            </SectionText>
            <GUIButton
                onClick={() => setShowGridOverlay(!showGridOverlay)}
                active={showGridOverlay}
            >
                <IconImg src="/grid.png" alt="Grid Overlay" style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }} $active={showGridOverlay} />
                {showGridOverlay ? 'Hide Grid Overlay [O]' : 'Show Grid Overlay [O]'}
            </GUIButton>
        </GUISectionContainer>
    );
};