import { PaletteContainer, PaletteSwatch, PaletteDeleteButton, PaletteDeleteIcon } from "@/components/styles/styled";

type PaletteProps = {
    colors: string[];
    selected: string | null;
    onSelect: (color: string | null) => void;
    onRemove?: (color: string) => void;
};

export const Palette = ({ colors, selected, onSelect, onRemove }: PaletteProps) => (
    <PaletteContainer>
        {colors.map((c, i) => (
            <PaletteSwatch
                key={`palette-${i}`}
                $color={c}
                $selected={selected === c}
                title={c}
                onClick={() => onSelect(c)}
            />
        ))}
        {selected && onRemove && (
            <PaletteDeleteButton
                aria-label="Remove selected color"
                title="Remove selected color"
                onClick={() => {
                    onRemove(selected);
                    onSelect(null);
                }}
            >
                <PaletteDeleteIcon>×</PaletteDeleteIcon>
            </PaletteDeleteButton>
        )}
    </PaletteContainer>
);
