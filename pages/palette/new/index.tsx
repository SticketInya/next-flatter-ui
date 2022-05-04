import { NextPage } from 'next';
import { useContext, useState } from 'react';
import DndColorBox from '../../../components/DndColorBox/DndColorBox';
import { ColorPalettesContext } from '../../../contexts/ColorPalettes.context';

//Material UI
import Box from '@mui/material/Box';
import useToggleState from '../../../hooks/useToggleState';
import { Main, DrawerHeader } from '../../../helpers/muiDrawerStyles';

import styles from './NewPalettePage.module.scss';
import NewPaletteDrawer from '../../../components/NewPaletteDrawer/NewPaletteDrawer';
import NewPaletteNav from '../../../components/NewPaletteNav/NewPaletteNav';
import { color } from '../../../interfaces/ColorPaletteInterface';

const NewPalettePage: NextPage = () => {
    const { allPalettes } = useContext(ColorPalettesContext);
    const [palette, setPalette] = useState(allPalettes[0]);
    const [open, toggleOpen] = useToggleState(true);
    const isPaletteFull = palette.colors.length >= 20;

    const handleDrawerToggle = () => {
        toggleOpen();
    };

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

    return (
        <div className={styles.root}>
            <div className={styles.ui}>
                <Box sx={{ display: 'flex' }}>
                    <NewPaletteNav
                        open={open}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                    <NewPaletteDrawer
                        open={open}
                        isPaletteFull={isPaletteFull}
                        handleDrawerToggle={handleDrawerToggle}
                        addColor={addColor}
                        allColors={palette.colors}
                        clearPalette={clearPalette}
                        addRandomColor={addRandomColor}
                    />
                    <Main open={open}>
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
        </div>
    );
};

export default NewPalettePage;
