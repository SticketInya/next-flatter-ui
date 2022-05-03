import type { NextPage, NextPageContext } from 'next';
import { useContext, useState } from 'react';
import ColorBox from '../../../components/ColorBox/ColorBox';
import { ColorPalettesContext } from '../../../contexts/ColorPalettes.context';
import ColorPalette from '../../../interfaces/ColorPaletteInterface';

import styles from './PalettePage.module.scss';

interface Props {
    paletteId: string;
}

const PalettePage: NextPage<Props> = ({ paletteId }) => {
    const { allPalettes } = useContext(ColorPalettesContext);
    const [palette, setPalette] = useState<ColorPalette | undefined>(
        getPalette(paletteId),
    );

    function getPalette(paletteId: string): ColorPalette | undefined {
        return allPalettes.find((palette) => palette.id === paletteId);
    }

    return (
        <div>
            <div className={styles.container}>
                {palette?.colors?.map((color) => {
                    return (
                        <ColorBox
                            key={color.name}
                            name={color.name}
                            color={color.color}
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
