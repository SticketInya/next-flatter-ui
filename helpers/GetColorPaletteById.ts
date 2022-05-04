import ColorPalette from '../interfaces/ColorPaletteInterface';

export default function getPalette(
    paletteId: string,
    allPalettes: ColorPalette[],
): ColorPalette {
    return (
        allPalettes.find((palette) => palette.id === paletteId) ||
        allPalettes[0]
    );
}
