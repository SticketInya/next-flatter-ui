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

const NewPalettePage: NextPage = () => {
    const { allPalettes } = useContext(ColorPalettesContext);
    const [palette, setPalette] = useState(allPalettes[0]);
    const [open, toggleOpen] = useToggleState(false);

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
                        handleDrawerToggle={handleDrawerToggle}
                        addColor={addColor}
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
