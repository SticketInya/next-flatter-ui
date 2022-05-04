import chroma from 'chroma-js';
import ColorPalette, {
    colorFormat,
    ColorPaletteShades,
} from '../interfaces/ColorPaletteInterface';

const levels = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export default function generateShades(
    starterPalette: ColorPalette,
): ColorPaletteShades {
    let newColors: { [key: number]: Array<colorFormat> } = {};

    levels.forEach((level) => {
        newColors[level] = [];
    });

    starterPalette.colors.map((color) => {
        const scale = getScale(color.color, levels.length);
        scale.map((hex, i) => {
            newColors[levels[i]].push({
                id: color.name.toLocaleLowerCase().replace(/ /g, '-'),
                name: `${color.name} ${levels[i]}`,
                hex: hex,
                rgb: chroma(hex).css(),
                rgba: chroma(hex).alpha(0.9).css(),
            });
        });
    });

    return { ...starterPalette, colors: { ...newColors } };
}

function getScale(hexColor: string, numOfColors: number) {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numOfColors);
}

function getRange(hexColor: string) {
    const darkest = chroma(hexColor).darken(1.4);
    const lightest = chroma(hexColor).brighten(1.8);
    return [lightest, hexColor, darkest];
}
