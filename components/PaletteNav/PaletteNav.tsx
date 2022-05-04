import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { colorFormat } from '../../interfaces/ColorPaletteInterface';

//Material UI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//Styles
import styles from './PaletteNav.module.scss';
import { ColorFormatContext } from '../../contexts/ColorFormat.context';

interface props {
    paletteName: string;
    changeFormat: (newFormat: keyof colorFormat) => void;
}

export default function PaletteNav({
    paletteName = 'Palette',
}: props): JSX.Element {
    const router = useRouter();
    const { colorFormat, setColorFormat } = useContext(ColorFormatContext);

    const handleBack = () => {
        router.back();
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const newFormat = e.target.value.toLowerCase() as keyof colorFormat;
        setColorFormat(newFormat);
    };

    return (
        <div className={styles.root}>
            <span className={styles.back} onClick={handleBack}>
                <ChevronLeftIcon />
                Back
            </span>

            <Select
                defaultValue={'hex'}
                onChange={handleSelectChange}
                className={styles.select}
            >
                <MenuItem className={styles.item} value={'hex'}>
                    Copy Format: HEX(#AA12BB)
                </MenuItem>
                <MenuItem value={'rgb'}>Copy Format: RGB(11,22,33)</MenuItem>
                <MenuItem value={'rgba'}>
                    Copy Format: RGBA(11,22,33,0.9)
                </MenuItem>
            </Select>

            <span className={styles.palette_name}>{paletteName}</span>
        </div>
    );
}
