import { ChangeEvent } from "react";
import { ColorPickerContainer, PickerInput, PickerLabel } from "../../styles/styled";

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
        <PickerInput
            type="number"
            min={min}
            max={max}
            step={step}
            value={Number.isFinite(value as number) ? String(value) : ""}
            onChange={(e) => {
                const n = Number(e.target.value);
                if (!Number.isFinite(n)) return; // ignore NaN
                if (n < min || n > max) {
                    // Allow typing intermediate value by not forcing clamp here; delegate to parent if needed
                    onChange(e);
                    return;
                }
                onChange(e);
            }}
        />
    </ColorPickerContainer>
);

