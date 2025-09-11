import React from "react";
import { GUISectionContainer } from '../../GUISectionContainer';
import { GUIButton } from '@/components/GUIButton';

interface Props {
  showGridOverlay: boolean;
  setShowGridOverlay: (v: boolean) => void;
}

export const GridOverlaySection: React.FC<Props> = ({ showGridOverlay, setShowGridOverlay }) => (
  <GUISectionContainer label="Grid overlay" text="Show or hide grid overlay lines">
    <GUIButton
      onClick={() => setShowGridOverlay(!showGridOverlay)}
      active={showGridOverlay}
      text={showGridOverlay ? 'Hide Grid Overlay' : 'Show Grid Overlay'}
    />
  </GUISectionContainer>
);
