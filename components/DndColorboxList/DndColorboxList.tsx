import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Dispatch } from 'react';
import {
    PaletteState,
    PaletteAction,
} from '../../interfaces/NewPaletteReducerInterface';
import DndColorBox from '../DndColorBox/DndColorBox';

import styles from './DndColorboxList.module.scss';

interface props {
    palette: PaletteState;
    dispatchPalette: Dispatch<PaletteAction>;
}

export default function DndColorBoxList({ palette, dispatchPalette }: props) {
    const allColors = palette.colors.map((color) => color.name);

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
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={allColors}>
                <div className={styles.container}>
                    {palette.colors.map((color) => {
                        return (
                            <DndColorBox
                                key={color.name}
                                name={color.name}
                                color={color.color}
                                dispatchPalette={dispatchPalette}
                            />
                        );
                    })}
                </div>
            </SortableContext>
        </DndContext>
    );
}
