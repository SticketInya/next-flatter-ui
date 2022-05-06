import { color } from './ColorPaletteInterface';

export interface PaletteAction {
    type: string;
    payload: color[];
}

export interface PaletteState {
    paletteName: string;
    id: string;
    colors: color[];
}
