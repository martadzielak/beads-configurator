import { ChangeEvent } from "react";

interface SizePickerProps {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SizePicker: React.FC<SizePickerProps> = ({ label, min, max, step, value, onChange }) => <div style={{ marginBottom: 20 }}>
    <label>{label}</label>
    <input type="number" min={min} max={max} step={step} value={value} onChange={onChange} />
</div>
