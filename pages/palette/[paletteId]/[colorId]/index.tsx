import { NextPage, NextPageContext } from 'next';
import { useContext, useState } from 'react';
import ColorBox from '../../../../components/ColorBox/ColorBox';
import PaletteNav from '../../../../components/PaletteNav/PaletteNav';
import { ColorFormatContext } from '../../../../contexts/ColorFormat.context';
import { ColorPalettesContext } from '../../../../contexts/ColorPalettes.context';
import generateShades from '../../../../helpers/generateShades';
import getColorPaletteById from '../../../../helpers/getColorPaletteById';
import { colorFormat } from '../../../../interfaces/ColorPaletteInterface';

import styles from './ColorPage.module.scss';

interface props {
    paletteId: string;
    colorId: string;
}

const ColorPage: NextPage<props> = ({ paletteId, colorId }: props) => {
    const { allPalettes } = useContext(ColorPalettesContext);
    const { colorFormat } = useContext(ColorFormatContext);
    const [palette, setPalette] = useState(
        generateShades(getColorPaletteById(paletteId, allPalettes)),
    );

    const getSingleColorShades = (
        allColors: { [key: number]: Array<colorFormat> },
        colorId: string,
    ): Array<colorFormat> => {
        let shades = [];
        for (let level in allColors) {
            shades.push(allColors[level].find((color) => color.id === colorId));
        }
        return shades as Array<colorFormat>;
    };

    return (
        <div className={styles.root}>
            <PaletteNav paletteName={colorId} />
            <div className={styles.container}>
                {getSingleColorShades(palette.colors, colorId).map((shade) => {
                    return (
                        <ColorBox
                            key={shade.hex}
                            color={shade[colorFormat]}
                            name={shade.name}
                            id={shade.id}
                            hasMore={false}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ColorPage;

ColorPage.getInitialProps = async ({
    query,
}: NextPageContext): Promise<props> => {
    return {
        paletteId: query.paletteId as string,
        colorId: query.colorId as string,
    };
};
