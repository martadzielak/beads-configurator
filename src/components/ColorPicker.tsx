import { HexColorPicker } from "react-colorful";
import { ColorPickerContainer, PickerLabel } from "./styles/styled";

export const ColorPicker: React.FC<{ color: string; setColor: (color: string) => void }> = ({ color, setColor }) => (
    <ColorPickerContainer>
        <PickerLabel>Color Picker</PickerLabel>
        <HexColorPicker color={color} onChange={setColor} />
    </ColorPickerContainer>
);