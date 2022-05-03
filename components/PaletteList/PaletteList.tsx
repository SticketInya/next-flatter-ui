import ColorPalette from '../../interfaces/ColorPaletteInterface';

interface props {
    palettes: ColorPalette[];
}

export default function PaletteList({ palettes }: props) {
    return (
        <div className='PaletteList'>
            <ul>
                {palettes.map((palette) => {
                    return <li key={palette.id}>{palette.paletteName}</li>;
                })}
            </ul>
        </div>
    );
}
