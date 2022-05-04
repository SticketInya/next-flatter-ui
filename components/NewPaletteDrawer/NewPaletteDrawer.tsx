import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { color } from '../../interfaces/ColorPaletteInterface';

//Material UI
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DrawerHeader, drawerWidth } from '../../helpers/muiDrawerStyles';

import styles from './NewPaletteDrawer.module.scss';

interface props {
    open: boolean;
    handleDrawerToggle: () => void;
    addColor: (newColor: { name: string; color: string }) => void;
    allColors: color[];
}

export default function NewPaletteDrawer({
    open,
    handleDrawerToggle,
    addColor,
    allColors,
}: props) {
    const [color, setColor] = useState('#aabbcc');
    const [colorName, setColorName] = useState<string>('');

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setColorName(e.target.value);
    };

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        addColor({ name: colorName, color });
    };

    useEffect(() => {
        // @ts-ignore: Unreachable code error
        if (!ValidatorForm.hasValidationRule('isColorNameUnique')) {
            ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
                return allColors.every((color) => {
                    return color.name.toLowerCase() !== value.toLowerCase();
                });
            });
        }
        // @ts-ignore: Unreachable code error
        if (!ValidatorForm.hasValidationRule('isColorUnique')) {
            ValidatorForm.addValidationRule('isColorUnique', (_value) => {
                return allColors.every((c) => c.color !== color);
            });
        }

        return function cleanCustomRules() {
            // @ts-ignore: Unreachable code error
            if (ValidatorForm.hasValidationRule('isColorNameUnique')) {
                ValidatorForm.removeValidationRule('isColorNameUnique');
            }
            // @ts-ignore: Unreachable code error
            if (ValidatorForm.hasValidationRule('isColorUnique')) {
                ValidatorForm.removeValidationRule('isColorUnique');
            }
        };
    });

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
                    <HexColorPicker color={color} onChange={setColor} />
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        instantValidate={false}
                    >
                        <TextValidator
                            name={'NewColorName'}
                            label={'Color name'}
                            value={colorName}
                            onChange={handleInputChange}
                            validators={[
                                'required',
                                'isColorNameUnique',
                                'isColorUnique',
                            ]}
                            errorMessages={[
                                'This field is required',
                                'Color name must be unique',
                                'This color is already used',
                            ]}
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

// static hasValidationRule (name:string):boolean;
