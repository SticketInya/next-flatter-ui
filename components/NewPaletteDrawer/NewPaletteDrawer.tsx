import { HexColorPicker } from 'react-colorful';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

//Material UI
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DrawerHeader, drawerWidth } from '../../helpers/muiDrawerStyles';

import styles from './NewPaletteDrawer.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TextField } from '@mui/material';

interface props {
    open: boolean;
    handleDrawerToggle: () => void;
    addColor: (newColor: { name: string; color: string }) => void;
}

export default function NewPaletteDrawer({
    open,
    handleDrawerToggle,
    addColor,
}: props) {
    const [color, setColor] = useState('#aabbcc');
    const [colorName, setColorName] = useState<string>('');

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setColorName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addColor({ name: colorName, color });
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant='persistent'
            anchor='left'
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <div className={styles.content}>
                <h3 className={styles.title}>Add Your own Colors!</h3>
                <div className={styles.container}>
                    <button className={styles.clear}>Clear Palette</button>
                    <button className={styles.random}>Random Color</button>
                </div>
                <div className={styles.color}>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <HexColorPicker color={color} onChange={setColor} />
                        <TextValidator
                            name={'NewColorName'}
                            label={'Color name'}
                            value={colorName}
                            onChange={handleInputChange}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <button
                            type='submit'
                            className={styles.add}
                            style={{ backgroundColor: color }}
                        >
                            Add color
                        </button>
                    </ValidatorForm>
                </div>
            </div>
        </Drawer>
    );
}
