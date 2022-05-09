import { useRouter } from 'next/router';
import ColorPalette from '../../interfaces/ColorPaletteInterface';
import { MouseEvent, useContext } from 'react';
import { ColorPalettesContext } from '../../contexts/ColorPalettes.context';
import { ColorPaletteReducerActionType } from '../../interfaces/ColorPaletteReducerInterface';

//Material UI
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './MiniPalette.module.scss';

interface props {
    palette: ColorPalette;
}

export default function MiniPalette({
    palette: { paletteName, id, colors },
}: props) {
    const router = useRouter();
    const { dispatchAllPalettes } = useContext(ColorPalettesContext);

    const handleClick = () => {
        const path = router.asPath;
        router.push(`/palette/${id}`);
    };

    const handleRemove = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatchAllPalettes({
            type: ColorPaletteReducerActionType.REMOVE_PALETTE,
            payload: { id },
        });
    };

    return (
        <div className={styles.root} onClick={handleClick}>
            <div className={styles.container}>
                <div className={styles.remove} onClick={handleRemove}>
                    <DeleteIcon />
                </div>
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
