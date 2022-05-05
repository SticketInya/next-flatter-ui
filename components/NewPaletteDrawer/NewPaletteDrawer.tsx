import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { color } from '../../interfaces/ColorPaletteInterface';
import useFormInputState from '../../hooks/useFormInputState';
import { PaletteAction } from '../../interfaces/NewPaletteReducerInterface';

//Material UI
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DrawerHeader, drawerWidth } from '../../helpers/muiDrawerStyles';

import styles from './NewPaletteDrawer.module.scss';

interface props {
    open: boolean;
    isPaletteFull: boolean;
    allColors: color[];
    handleDrawerToggle: () => void;
    dispatchPalette: Dispatch<PaletteAction>;
    addRandomColor: () => void;
}

export default function NewPaletteDrawer({
    open,
    isPaletteFull,
    allColors,
    handleDrawerToggle,
    dispatchPalette,
    addRandomColor,
}: props) {
    const [color, setColor] = useState('#aabbcc');
    const [colorName, updateColorName] = useFormInputState('');

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        dispatchPalette({ type: 'ADD', payload: { name: colorName, color } });
    };

    const handleClear = () => {
        dispatchPalette({ type: 'CLEAR', payload: {} as color });
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
                    backgroundColor: '#12121280',
                },
            }}
            variant='persistent'
            anchor='left'
            open={open}
            className={styles.root}
        >
            <DrawerHeader>
                <IconButton
                    onClick={handleDrawerToggle}
                    className={styles.close}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <div className={styles.content}>
                <h3 className={styles.title}>Add Your own Colors!</h3>
                <div className={styles.container}>
                    <button className={styles.clear} onClick={handleClear}>
                        Clear Palette
                    </button>
                    <button
                        className={styles.random}
                        onClick={addRandomColor}
                        disabled={isPaletteFull}
                    >
                        Random Color
                    </button>
                </div>
                <div className={styles.color}>
                    <HexColorPicker
                        color={color}
                        onChange={setColor}
                        className={styles.picker}
                    />
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        instantValidate={false}
                        className={styles.form}
                    >
                        <TextValidator
                            className={styles.textfield}
                            name={'NewColorName'}
                            label={'Color name'}
                            value={colorName}
                            onChange={updateColorName}
                            fullWidth
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
                            disabled={isPaletteFull}
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
