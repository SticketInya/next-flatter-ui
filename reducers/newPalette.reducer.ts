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
                colors: [...state.colors, payload[0]],
            };
        case 'REMOVE':
            return {
                ...state,
                colors: state.colors.filter(
                    (color) => color.name !== payload[0].name,
                ),
            };
        case 'CLEAR':
            return { ...state, colors: [] };

        case 'EDIT':
            return { ...state, colors: payload };
        default:
            return state;
    }
};

export default newPaletteReducer;
