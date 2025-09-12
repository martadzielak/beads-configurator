import { SectionHeading } from "../../styles/styled";

interface GUISectionContainerProps {
    label: string;
    children: React.ReactNode;
}

export const GUISectionContainer: React.FC<GUISectionContainerProps> = ({ label, children }) => (
    <div style={{ marginBottom: 24, padding: '12px 0', borderBottom: '1px solid #444' }}>
        <SectionHeading style={{ fontWeight: 600, color: 'white', fontSize: '1rem', marginBottom: 4 }}>
            {label}
        </SectionHeading>
        {children}
    </div>
);