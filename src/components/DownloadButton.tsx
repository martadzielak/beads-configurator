import React from "react";
import { DownloadButtonWrapper } from "./styles/styled";



interface DownloadButtonProps {
    onClick: () => void;
    text?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, text = "Download PNG" }) => (
    <DownloadButtonWrapper onClick={onClick}>
        {text}
    </DownloadButtonWrapper>
);