//Material UI
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './DndColorBox.module.scss';

interface props {
    color: string;
    name: string;
    removeColor: (name: string) => void;
}

export default function DndColorBox({
    name,
    color,
    removeColor,
}: props): JSX.Element {
    const handleRemove = () => {
        console.log(`Removing ${name}`);
        removeColor(name);
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
