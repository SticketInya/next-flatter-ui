import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    useReducer,
} from 'react';
import defaultPalettes from '../constants/defaultPalettes';
import useLocalStorageState from '../hooks/useLocalStorageState';
import ColorPalette, { color } from '../interfaces/ColorPaletteInterface';
import { ColorPaletteReducerAction } from '../interfaces/ColorPaletteReducerInterface';
import colorPaletteReducer from '../reducers/colorPalette.reducer';

const defCol = { name: '', color: '' };

type props = {
    children: ReactNode;
};

type DefaultContextValue = {
    allPalettes: ColorPalette[];
    dispatchAllPalettes: Dispatch<ColorPaletteReducerAction>;
    getRandomColor: () => color;
};

export const ColorPalettesContext = createContext<DefaultContextValue>({
    allPalettes: [],
    dispatchAllPalettes: () => {},
    getRandomColor: () => defCol,
});

export default function ColorPalettesProvider({ children }: props) {
    const [allPalettes, dispatchAllPalettes] = useReducer(
        colorPaletteReducer,
        defaultPalettes,
    );

    const getRandomColor = () => {
        const randPalette = Math.floor(Math.random() * allPalettes.length);
        const randColor = Math.floor(
            Math.random() * allPalettes[randPalette].colors.length,
        );
        return allPalettes[randPalette].colors[randColor];
    };

    const value = {
        allPalettes,
        dispatchAllPalettes,
        getRandomColor,
    };
    return (
        <ColorPalettesContext.Provider value={value}>
            {children}
        </ColorPalettesContext.Provider>
    );
}
