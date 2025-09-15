import React from "react";
import { DownloadIconImg } from "../../styles/styled";
import { DownloadButtonWrapper } from "../../styles/styled";



interface DownloadButtonProps {
    onClick: () => void;
    text?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, text = "Download PNG" }) => (
    <DownloadButtonWrapper onClick={onClick}>
        <DownloadIconImg src="/download.png" alt="download icon" />
        {text}
    </DownloadButtonWrapper>
);