import React from "react";
import { GUISectionContainer } from '../../GUISectionContainer';
import { ColorPicker } from '@/components/ColorPicker';
import { GUIButton } from '@/components/GUIButton';

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
            text={pipetteActive ? 'Pipette (active)' : 'Activate Pipette'}
        />
    </GUISectionContainer>
);
