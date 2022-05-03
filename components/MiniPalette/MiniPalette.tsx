import ColorPalette from '../../interfaces/ColorPaletteInterface';

import styles from './MiniPalette.module.scss';

interface props {
    palette: ColorPalette;
}

export default function MiniPalette({
    palette: { paletteName, id, colors },
}: props) {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.colors}>
                    {colors.map((color) => (
                        <div
                            key={id + color.name}
                            className={styles.minicolor}
                            style={{ backgroundColor: color.color }}
                        />
                    ))}
                </div>
                <h2 className={styles.title}>{paletteName}</h2>
            </div>
        </div>
    );
}
