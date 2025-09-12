import { LogoImg, MobileOverlayCaption, MobileOverlayContainer } from "@/components/styles/styled";
import { FC } from "react";

export const MobileOverlay: FC = () => (
    <MobileOverlayContainer>
        <LogoImg src="/peyote_black.png" alt="peyote logo" />
        <MobileOverlayCaption style={{ marginTop: '24px', fontSize: '1.2rem', fontWeight: 400 }}>
            This is an app to design bead patterns. It works only on desktop, as it requires a larger screen for optimal use. Please visit this site on your desktop computer.
        </MobileOverlayCaption>
    </MobileOverlayContainer>
)