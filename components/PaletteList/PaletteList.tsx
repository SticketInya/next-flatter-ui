import ColorPalette from '../../interfaces/ColorPaletteInterface';
import MiniPalette from '../MiniPalette/MiniPalette';

import styles from './PaletteList.module.scss';

interface props {
    palettes: ColorPalette[];
}

export default function PaletteList({ palettes }: props) {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.miniPalettes}>
                    {palettes.map((palette) => (
                        <MiniPalette key={palette.id} palette={palette} />
                    ))}
                </div>
            </div>
        </div>
    );
}
