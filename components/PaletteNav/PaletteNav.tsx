import { useRouter } from 'next/router';

//Material UI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//Styles
import styles from './PaletteNav.module.scss';
import { useState } from 'react';

interface props {
    paletteName: string;
}

export default function PaletteNav({
    paletteName = 'Palette',
}: props): JSX.Element {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        console.log(e.target.value);
    };

    return (
        <div className={styles.root}>
            <span className={styles.back} onClick={handleBack}>
                <ChevronLeftIcon />
                Back
            </span>

            <Select
                defaultValue={'HEX'}
                onChange={handleSelectChange}
                className={styles.select}
            >
                <MenuItem className={styles.item} value={'HEX'}>
                    Copy Format: HEX(#AA12BB)
                </MenuItem>
                <MenuItem value={'RGB'}>Copy Format: RGB(11,22,33)</MenuItem>
                <MenuItem value={'RGBA'}>
                    Copy Format: RGBA(11,22,33,0.9)
                </MenuItem>
            </Select>

            <span className={styles.palette_name}>{paletteName}</span>
        </div>
    );
}
