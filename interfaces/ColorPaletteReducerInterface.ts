import ColorPalette from './ColorPaletteInterface';

export enum ColorPaletteReducerActionType {
    ADD_PALETTE,
    REMOVE_PALETTE,
}

export type AddPaletteAction = {
    type: ColorPaletteReducerActionType.ADD_PALETTE;
    payload: ColorPalette;
};
export type RemovePaletteAction = {
    type: ColorPaletteReducerActionType.REMOVE_PALETTE;
    payload: {
        id: string;
    };
};

export type ColorPaletteReducerAction = {
    type: ColorPaletteReducerActionType;
    payload?: any;
};
