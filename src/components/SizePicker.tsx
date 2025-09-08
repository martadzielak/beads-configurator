import { ChangeEvent } from "react";
import { ColorPickerContainer, PickerInput, PickerLabel } from "./styled";

interface SizePickerProps {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SizePicker: React.FC<SizePickerProps> = ({ label, min, max, step, value, onChange }) => (
    <ColorPickerContainer>
        <PickerLabel>{label}</PickerLabel>
        <PickerInput type="number" min={min} max={max} step={step} value={value} onChange={onChange} />
    </ColorPickerContainer>
);

