import { NextPage } from 'next';
import { FormEvent, useContext, useEffect, useState } from 'react';
import DndColorBox from '../../../components/DndColorBox/DndColorBox';
import { ColorPalettesContext } from '../../../contexts/ColorPalettes.context';
import NewPaletteDrawer from '../../../components/NewPaletteDrawer/NewPaletteDrawer';
import NewPaletteNav from '../../../components/NewPaletteNav/NewPaletteNav';
import { color } from '../../../interfaces/ColorPaletteInterface';
import useFormInputState from '../../../hooks/useFormInputState';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

//Material UI
import Box from '@mui/material/Box';
import useToggleState from '../../../hooks/useToggleState';
import { Main, DrawerHeader } from '../../../helpers/muiDrawerStyles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CssBaseline } from '@mui/material';

import styles from './NewPalettePage.module.scss';

const NewPalettePage: NextPage = () => {
    const { allPalettes, addColorPalette } = useContext(ColorPalettesContext);
    const [palette, setPalette] = useState(allPalettes[0]);
    const [drawerOpen, toggleDrawerOpen] = useToggleState(true);
    const [dialogOpen, toggleDialogOpen] = useToggleState(false);
    const [paletteName, updatePaletteName] = useFormInputState('');
    const isPaletteFull = palette.colors.length >= 20;

    const removeColor = (name: string) => {
        setPalette({
            ...palette,
            colors: palette.colors.filter((color) => color.name !== name),
        });
    };

    const addColor = (newColor: { name: string; color: string }) => {
        setPalette({ ...palette, colors: [...palette.colors, newColor] });
    };

    const clearPalette = () => {
        setPalette({ ...palette, colors: [] });
    };

    const getRandomColor = () => {
        const randPalette = Math.floor(Math.random() * allPalettes.length);
        const randColor = Math.floor(
            Math.random() * allPalettes[randPalette].colors.length,
        );
        return allPalettes[randPalette].colors[randColor];
    };

    const addRandomColor = () => {
        let randomColor: color;
        let isDuplicate = true;
        do {
            randomColor = getRandomColor();
            isDuplicate = palette.colors.some(
                (color) => color.name === randomColor.name,
            );
        } while (isDuplicate);
        setPalette({ ...palette, colors: [...palette.colors, randomColor] });
    };

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        const newPalette = {
            paletteName: paletteName,
            id: paletteName.replace(/ /g, '-'),
            colors: palette.colors,
        };
        addColorPalette(newPalette);
        toggleDialogOpen();
    };

    useEffect(() => {
        // @ts-ignore: Unreachable code error
        if (!ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
            ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
                return allPalettes.every((palette) => {
                    return (
                        palette.paletteName.toLowerCase() !==
                        value.toLowerCase()
                    );
                });
            });
        }

        return function cleanCustomRules() {
            // @ts-ignore: Unreachable code error
            if (ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
                ValidatorForm.removeValidationRule('isPaletteNameUnique');
            }
        };
    });

    return (
        <div className={styles.root}>
            <div className={styles.ui}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <NewPaletteNav
                        open={drawerOpen}
                        handleDrawerToggle={toggleDrawerOpen}
                        toggleDialogOpen={toggleDialogOpen}
                    />
                    <NewPaletteDrawer
                        open={drawerOpen}
                        isPaletteFull={isPaletteFull}
                        handleDrawerToggle={toggleDrawerOpen}
                        addColor={addColor}
                        allColors={palette.colors}
                        clearPalette={clearPalette}
                        addRandomColor={addRandomColor}
                    />
                    <Main open={drawerOpen}>
                        <DrawerHeader />
                        <div className={styles.container}>
                            {palette.colors.map((color) => {
                                return (
                                    <DndColorBox
                                        key={color.name}
                                        name={color.name}
                                        color={color.color}
                                        removeColor={removeColor}
                                    />
                                );
                            })}
                        </div>
                    </Main>
                </Box>
            </div>
            <div className={styles.dialog}>
                <Dialog
                    open={dialogOpen}
                    onClose={toggleDialogOpen}
                    className={styles.dialog}
                    sx={{
                        '.MuiPaper-root': {
                            backgroundColor: '#272727',
                        },
                    }}
                >
                    <DialogTitle className={styles.diaTitle}>
                        Name Your Color Palette
                    </DialogTitle>
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        instantValidate={false}
                        className={styles.form}
                    >
                        <DialogContent className={styles.diaContent}>
                            <DialogContentText className={styles.diaContext}>
                                Please give a unique a wondorous name to Your
                                Color Palette!
                            </DialogContentText>

                            <TextValidator
                                className={styles.textfield}
                                name='paletteName'
                                label='Palette name'
                                value={paletteName}
                                onChange={updatePaletteName}
                                autoFocus
                                fullWidth
                                variant='standard'
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={[
                                    'This field is required',
                                    'Palette name must be unique',
                                ]}
                            />
                        </DialogContent>
                        <DialogActions className={styles.btns}>
                            <button
                                onClick={toggleDialogOpen}
                                className={styles.cancel}
                            >
                                Cancel
                            </button>
                            <button type='submit' className={styles.save}>
                                Save Palette
                            </button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        </div>
    );
};

export default NewPalettePage;
