import { NextPage } from 'next';
import { FormEvent, useContext, useReducer } from 'react';
import { ColorPalettesContext } from '../../../contexts/ColorPalettes.context';
import NewPaletteDrawer from '../../../components/NewPaletteDrawer/NewPaletteDrawer';
import NewPaletteNav from '../../../components/NewPaletteNav/NewPaletteNav';
import { color } from '../../../interfaces/ColorPaletteInterface';
import useFormInputState from '../../../hooks/useFormInputState';
import NewPaletteDialog from '../../../components/NewPaletteDialog/NewPaletteDialog';
import { useRouter } from 'next/router';
import newPaletteReducer from '../../../reducers/newPalette.reducer';
import DndColorBoxList from '../../../components/DndColorboxList/DndColorboxList';

//Material UI
import Box from '@mui/material/Box';
import useToggleState from '../../../hooks/useToggleState';
import { Main, DrawerHeader } from '../../../helpers/muiDrawerStyles';
import { CssBaseline } from '@mui/material';

import styles from './NewPalettePage.module.scss';
import { ColorPaletteReducerActionType } from '../../../interfaces/ColorPaletteReducerInterface';

const NewPalettePage: NextPage = () => {
    const router = useRouter();
    const { allPalettes, dispatchAllPalettes, getRandomColor } =
        useContext(ColorPalettesContext);
    const [palette, dispatchPalette] = useReducer(
        newPaletteReducer,
        allPalettes[0],
    );
    const [drawerOpen, toggleDrawerOpen] = useToggleState(true);
    const [dialogOpen, toggleDialogOpen] = useToggleState(false);
    const [paletteName, updatePaletteName] = useFormInputState('');
    const isPaletteFull = palette.colors.length >= 20;

    const addRandomColor = () => {
        let randomColor: color;
        let isDuplicate = true;
        do {
            randomColor = getRandomColor();
            isDuplicate = palette.colors.some(
                (color) => color.name === randomColor.name,
            );
        } while (isDuplicate);
        dispatchPalette({ type: 'ADD', payload: [randomColor] });
    };

    const handlePaletteSave = (e: FormEvent<Element>) => {
        e.preventDefault();
        const newPalette = {
            paletteName: paletteName,
            id: paletteName.replace(/ /g, '-'),
            colors: palette.colors,
        };
        dispatchAllPalettes({
            type: ColorPaletteReducerActionType.ADD_PALETTE,
            payload: newPalette,
        });
        router.push('/');
    };

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
                        dispatchPalette={dispatchPalette}
                        allColors={palette.colors}
                        addRandomColor={addRandomColor}
                    />
                    <Main open={drawerOpen}>
                        <DrawerHeader />
                        <DndColorBoxList
                            palette={palette}
                            dispatchPalette={dispatchPalette}
                        />
                    </Main>
                </Box>
            </div>
            <NewPaletteDialog
                dialogOpen={dialogOpen}
                paletteName={paletteName}
                updatePaletteName={updatePaletteName}
                toggleDialogOpen={toggleDialogOpen}
                handleSubmit={handlePaletteSave}
            />
        </div>
    );
};

export default NewPalettePage;
