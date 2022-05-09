import { Reducer } from 'react';
import ColorPalette from '../interfaces/ColorPaletteInterface';
import {
    ColorPaletteReducerAction,
    ColorPaletteReducerActionType,
} from '../interfaces/ColorPaletteReducerInterface';

const colorPaletteReducer: Reducer<
    ColorPalette[],
    ColorPaletteReducerAction
> = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ColorPaletteReducerActionType.ADD_PALETTE:
            return [...state, payload];
        case ColorPaletteReducerActionType.REMOVE_PALETTE:
            return state.filter((palette) => palette.id !== payload.id);
        default:
            return state;
    }
};

export default colorPaletteReducer;
