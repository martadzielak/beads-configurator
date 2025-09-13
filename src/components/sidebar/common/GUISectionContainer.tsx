import { mediumGray, red, white } from "@/components/styles/colors";
import { SectionHeading } from "../../styles/styled";

interface GUISectionContainerProps {
    label: string;
    children: React.ReactNode;
    variant?: 'default' | 'danger';
}

export const GUISectionContainer: React.FC<GUISectionContainerProps> = ({ label, children, variant = 'default' }) => (
    <div
        style={{
            marginBottom: 24,
            padding: '12px 0',
            borderBottom: `1px solid ${mediumGray}`
        }}
    >
        <SectionHeading
            style={{
                fontWeight: 600,
                color: variant === 'danger' ? red : white,
                fontSize: '1rem',
                marginBottom: 4
            }}
        >
            {label}
        </SectionHeading>
        {children}
    </div>
);