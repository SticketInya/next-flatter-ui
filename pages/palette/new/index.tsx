import { NextPage } from 'next';
import { FormEvent, useContext, useReducer } from 'react';
import DndColorBox from '../../../components/DndColorBox/DndColorBox';
import { ColorPalettesContext } from '../../../contexts/ColorPalettes.context';
import NewPaletteDrawer from '../../../components/NewPaletteDrawer/NewPaletteDrawer';
import NewPaletteNav from '../../../components/NewPaletteNav/NewPaletteNav';
import { color } from '../../../interfaces/ColorPaletteInterface';
import useFormInputState from '../../../hooks/useFormInputState';
import NewPaletteDialog from '../../../components/NewPaletteDialog/NewPaletteDialog';
import { useRouter } from 'next/router';
import newPaletteReducer from '../../../reducers/newPalette.reducer';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

//Material UI
import Box from '@mui/material/Box';
import useToggleState from '../../../hooks/useToggleState';
import { Main, DrawerHeader } from '../../../helpers/muiDrawerStyles';
import { CssBaseline } from '@mui/material';

import styles from './NewPalettePage.module.scss';

const NewPalettePage: NextPage = () => {
    const router = useRouter();
    const { allPalettes, addColorPalette, getRandomColor } =
        useContext(ColorPalettesContext);
    const [palette, dispatchPalette] = useReducer(
        newPaletteReducer,
        allPalettes[0],
    );
    const [drawerOpen, toggleDrawerOpen] = useToggleState(true);
    const [dialogOpen, toggleDialogOpen] = useToggleState(false);
    const [paletteName, updatePaletteName] = useFormInputState('');
    const isPaletteFull = palette.colors.length >= 20;
    const allColors = palette.colors.map((color) => color.name);

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
        addColorPalette(newPalette);
        router.push('/');
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over !== null && active.id !== over.id) {
            const oldIndex = allColors.indexOf(active.id);
            const newIndex = allColors.indexOf(over.id);
            dispatchPalette({
                type: 'EDIT',
                payload: arrayMove(palette.colors, oldIndex, newIndex),
            });
        }
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
                        <DndContext onDragEnd={handleDragEnd}>
                            <SortableContext items={allColors}>
                                <div className={styles.container}>
                                    {palette.colors.map((color) => {
                                        return (
                                            <DndColorBox
                                                key={color.name}
                                                name={color.name}
                                                color={color.color}
                                                dispatchPalette={
                                                    dispatchPalette
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </SortableContext>
                        </DndContext>
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
