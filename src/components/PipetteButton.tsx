import { FC } from "react";
import { Button, PickerContainer } from "./styled";

interface PipetteButtonProps {
    onClick: () => void;
    active: boolean;
    text: string;
}

export const PipetteButton: FC<PipetteButtonProps> = ({ onClick, active, text }) => <PickerContainer>
    <Button
        onClick={onClick}
        active={active}
    >
        {text}
    </Button>
</PickerContainer>