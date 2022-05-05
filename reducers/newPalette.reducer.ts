import {
    PaletteState,
    PaletteAction,
} from '../interfaces/NewPaletteReducerInterface';

const newPaletteReducer = (state: PaletteState, action: PaletteAction) => {
    const { payload } = action;

    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                colors: [...state.colors, payload],
            };
        case 'REMOVE':
            return {
                ...state,
                colors: state.colors.filter(
                    (color) => color.name !== payload.name,
                ),
            };
        case 'CLEAR':
            return { ...state, colors: [] };
        default:
            return state;
    }
};

export default newPaletteReducer;
