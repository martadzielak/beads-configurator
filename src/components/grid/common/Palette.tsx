import { PaletteContainer, PaletteSwatch, PaletteDeleteButton, PaletteDeleteIcon } from "@/components/styles/styled";

type PaletteProps = {
    colors: string[];
    selected: string | null;
    setSelected: (color: string | null) => void;
    setColor: (color: string) => void;
    onRemoveColor?: (color: string) => void;
};

export const Palette = ({
    colors,
    selected,
    setSelected,
    setColor,
    onRemoveColor
}: PaletteProps) =>
    <PaletteContainer>
        {colors.map((c, i) => (
            <PaletteSwatch
                key={`palette-${i}`}
                $color={c}
                $selected={selected === c}
                title={c}
                onClick={() => {
                    setSelected(c);
                    setColor(c);
                }}
            />
        ))}
        {selected && onRemoveColor && (
            <PaletteDeleteButton
                aria-label="Remove selected color"
                title="Remove selected color"
                onClick={() => {
                    onRemoveColor(selected);
                    setSelected(null);
                }}
            >
                <PaletteDeleteIcon>×</PaletteDeleteIcon>
            </PaletteDeleteButton>
        )}
    </PaletteContainer>
