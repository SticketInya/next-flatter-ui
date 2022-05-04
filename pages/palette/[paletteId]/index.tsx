import type { NextPage, NextPageContext } from 'next';
import { useContext, useState } from 'react';
import ColorBox from '../../../components/ColorBox/ColorBox';
import PaletteNav from '../../../components/PaletteNav/PaletteNav';
import { ColorFormatContext } from '../../../contexts/ColorFormat.context';
import { ColorPalettesContext } from '../../../contexts/ColorPalettes.context';
import generateShades from '../../../helpers/GenerateShades';
import { ColorPaletteShades } from '../../../interfaces/ColorPaletteInterface';

import styles from './PalettePage.module.scss';

interface Props {
    paletteId: string;
}

const PalettePage: NextPage<Props> = ({ paletteId }) => {
    const { allPalettes } = useContext(ColorPalettesContext);
    const { colorFormat } = useContext(ColorFormatContext);
    const [palette, setPalette] = useState<ColorPaletteShades>(
        getPalette(paletteId),
    );

    function getPalette(paletteId: string): ColorPaletteShades {
        const rawPalette =
            allPalettes.find((palette) => palette.id === paletteId) ||
            allPalettes[0];

        return generateShades(rawPalette);
    }

    return (
        <div className={styles.root}>
            <PaletteNav paletteName={palette?.paletteName as string} />
            <div className={styles.container}>
                {palette.colors[500].map((color) => {
                    if (typeof color === undefined) {
                        return null;
                    }
                    return (
                        <ColorBox
                            key={color.name}
                            name={color.name}
                            color={color[colorFormat]}
                            id={color.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

PalettePage.getInitialProps = async ({
    query,
}: NextPageContext): Promise<Props> => {
    const { paletteId } = query;
    return { paletteId: paletteId as string };
};

export default PalettePage;
