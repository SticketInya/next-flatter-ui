import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useToggleState from '../../hooks/useToggleState';
import useDidMountEffect from '../../hooks/useDidMountEffect';

//Material UI
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//Styles
import styles from './ColorBox.module.scss';

interface props {
    color: string;
    name: string;
    id: string;
}

export default function ColorBox({ name, color, id }: props): JSX.Element {
    const router = useRouter();
    const [isCopied, setIsCopied] = useState(false);
    const [timeout, toggleTimeout] = useToggleState(false);
    const isDark = false;
    const textColor = isDark ? styles.dark : styles.light;
    const isActive = isCopied ? styles.active : styles.hidden;

    const handleCopy = () => {
        setIsCopied(true);
        toggleTimeout();
    };

    const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(`${router.asPath}/${id}`);
    };

    useDidMountEffect(() => {
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }, [timeout]);

    return (
        <CopyToClipboard text={color} onCopy={handleCopy}>
            <div className={styles.root} style={{ backgroundColor: color }}>
                <div
                    className={`${styles.overlay} ${isActive}`}
                    style={{ backgroundColor: color }}
                ></div>
                <div className={`${styles.text_container} ${isActive}`}>
                    <h2 className={styles.title}>copied!</h2>
                    <h4 className={styles.title_color}>{color}</h4>
                </div>
                <span className={styles.cpy_btn}>Copy</span>
                <div className={styles.btn_container}>
                    <span className={`${styles.color_name} ${textColor}`}>
                        {name}
                    </span>
                    <button
                        className={styles.color_more}
                        onClick={handleMoreClick}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </CopyToClipboard>
    );
}
