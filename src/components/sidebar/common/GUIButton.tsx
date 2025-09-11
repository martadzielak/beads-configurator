import { FC } from "react";
import { Button, PickerContainer } from "../../styles/styled";

interface ButtonProps {
    onClick: (() => void) | undefined;
    active: boolean;
    children: React.ReactNode;
}

export const GUIButton: FC<ButtonProps> = ({ onClick, active, children }) => <PickerContainer>
    <Button
        onClick={onClick}
        {...(active ? { 'data-active': 'true' } : {})}
    >
        {children}
    </Button>
</PickerContainer>