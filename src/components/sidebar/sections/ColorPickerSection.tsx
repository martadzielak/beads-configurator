import React from "react";
import Image from 'next/image';
import { IconImg, SectionText } from '../../styles/styled';
import { GUISectionContainer } from '../common/GUISectionContainer';
import { ColorPicker } from '@/components/sidebar/common/ColorPicker';
import { GUIButton } from '@/components/sidebar/common/GUIButton';

interface Props {
    color: string;
    setColor: (color: string) => void;
    pipetteActive: boolean;
    setPipetteActive: (active: boolean) => void;
    eraserActive: boolean;
    setEraserActive: (active: boolean) => void;
}

export const ColorPickerSection: React.FC<Props> = ({ color, setColor, pipetteActive, setPipetteActive, eraserActive, setEraserActive }) => (
    <GUISectionContainer label="Pick color">
        <SectionText>
            Choose a bead color.
        </SectionText>
        <ColorPicker color={color} setColor={setColor} />
        <GUIButton
            onClick={() => setPipetteActive(!pipetteActive)}
            active={pipetteActive}
        >
            <IconImg src="/pipette.png" alt="Pipette" style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }} $active={pipetteActive} />
            {pipetteActive ? 'Pipette (active) [P]' : 'Activate Pipette [P]'}
        </GUIButton>
        <GUIButton
            onClick={() => setEraserActive(!eraserActive)}
            active={eraserActive}
        >
            <IconImg src="/eraser.png" alt="Eraser" style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }} $active={eraserActive} />
            {eraserActive ? 'Eraser (active)' : 'Activate Eraser'}
        </GUIButton>
    </GUISectionContainer>
);
