import { FooterText } from "@/components/styles/styled";
import { FC } from "react";

export const Footer: FC = () => (
    <FooterText>
        Made with <span style={{ color: 'red' }}>&hearts;</span> by Marta Dziełak. If you like it, consider <a href="https://www.buymeacoffee.com/marthvader" target="_blank" rel="noopener noreferrer">buying me a coffee</a>.
    </FooterText>
);