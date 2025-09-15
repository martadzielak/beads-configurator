import { ZoomButtonContainer, ZoomButton } from "@/components/styles/styled";

interface ZoomProps {
    setZoom: (updater: (current: number) => number) => void;
}

export const Zoom = ({ setZoom }: ZoomProps) => (<ZoomButtonContainer>
    <ZoomButton onClick={() => setZoom(z => Math.min(200, z + 5))}>+</ZoomButton>
    <ZoomButton onClick={() => setZoom(z => Math.max(10, z - 5))}>-</ZoomButton>
</ZoomButtonContainer>)