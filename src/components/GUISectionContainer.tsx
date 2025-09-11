import { SectionLabel, SectionText } from "./styles/styled";

interface GUISectionContainerProps {
    label: string;
    text: string;
    children: React.ReactNode;
}

export const GUISectionContainer: React.FC<GUISectionContainerProps> = ({ label, text, children }) => (
    <div style={{ marginBottom: 24, padding: '12px 0', borderBottom: '1px solid #444' }}>
        <SectionLabel style={{ fontWeight: 600, color: 'white', fontSize: '1rem', marginBottom: 4 }}>
            {label}
        </SectionLabel>
        <SectionText>
            {text}
        </SectionText>
        {children}
    </div>
);