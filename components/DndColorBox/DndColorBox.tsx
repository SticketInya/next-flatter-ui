//Material UI
import DeleteIcon from '@mui/icons-material/Delete';
import { Dispatch } from 'react';
import { PaletteAction } from '../../interfaces/NewPaletteReducerInterface';

import styles from './DndColorBox.module.scss';

interface props {
    color: string;
    name: string;
    dispatchPalette: Dispatch<PaletteAction>;
}

export default function DndColorBox({
    name,
    color,
    dispatchPalette,
}: props): JSX.Element {
    const handleRemove = () => {
        dispatchPalette({ type: 'REMOVE', payload: { name, color } });
    };
    return (
        <div className={styles.root} style={{ backgroundColor: color }}>
            <div className={styles.container}>
                <span className={styles.name}>{name}</span>
                <DeleteIcon className={styles.remove} onClick={handleRemove} />
            </div>
        </div>
    );
}
