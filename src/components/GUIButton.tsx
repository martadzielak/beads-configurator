import { FC } from "react";
import { Button, PickerContainer } from "./styles/styled";

interface ButtonProps {
    onClick: (() => void) | undefined;
    active: boolean;
    text: string;
}

export const GUIButton: FC<ButtonProps> = ({ onClick, active, text }) => <PickerContainer>
    <Button
        onClick={onClick}
        {...(active ? { 'data-active': 'true' } : {})}
    >
        {text}
    </Button>
</PickerContainer>