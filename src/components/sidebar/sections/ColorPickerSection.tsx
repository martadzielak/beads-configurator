import React from "react";
import { GUISectionContainer } from '../common/GUISectionContainer';
import { ColorPicker } from '@/components/sidebar/common/ColorPicker';
import { GUIButton } from '@/components/sidebar/common/GUIButton';

interface Props {
    color: string;
    setColor: (color: string) => void;
    pipetteActive: boolean;
    setPipetteActive: (active: boolean) => void;
}

export const ColorPickerSection: React.FC<Props> = ({ color, setColor, pipetteActive, setPipetteActive }) => (
    <GUISectionContainer label="Pick color" text="Choose a bead color.">
        <ColorPicker color={color} setColor={setColor} />
        <GUIButton
            onClick={() => setPipetteActive(!pipetteActive)}
            active={pipetteActive}
        >
            {pipetteActive ? 'Pipette (active) [P]' : 'Activate Pipette [P]'}
        </GUIButton>
    </GUISectionContainer>
);
