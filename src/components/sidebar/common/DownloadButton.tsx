import React from "react";
import { IconImg } from "../../styles/styled";
import { DownloadButtonWrapper } from "../../styles/styled";



interface DownloadButtonProps {
    onClick: () => void;
    text?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, text = "Download PNG" }) => (
    <DownloadButtonWrapper onClick={onClick}>
        <IconImg src="/download.png" alt="download icon" />
        {text}
    </DownloadButtonWrapper>
);