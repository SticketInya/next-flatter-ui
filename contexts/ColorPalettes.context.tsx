import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import defaultPalettes from '../constants/defaultPalettes';
import useLocalStorageState from '../hooks/useLocalStorageState';
import ColorPalette, { color } from '../interfaces/ColorPaletteInterface';

const defCol = { name: '', color: '' };

type props = {
    children: ReactNode;
};

type DefaultContextValue = {
    allPalettes: ColorPalette[];
    setAllPalettes: Dispatch<SetStateAction<ColorPalette[]>>;
    addColorPalette: (newPalette: ColorPalette) => void;
    getRandomColor: () => color;
};

export const ColorPalettesContext = createContext<DefaultContextValue>({
    allPalettes: [],
    setAllPalettes: () => {},
    addColorPalette: (newPalette: ColorPalette) => {},
    getRandomColor: () => defCol,
});

export default function ColorPalettesProvider({ children }: props) {
    const [allPalettes, setAllPalettes] =
        useState<ColorPalette[]>(defaultPalettes);

    //TODO - Render PageSkeleton before localStorage access, to prevent hydration error
    // const [allPalettes, setAllPalettes] = useLocalStorageState(
    //     'colors',
    //     defaultPalettes,
    // );

    const addColorPalette = (newPalette: ColorPalette) => {
        setAllPalettes([...allPalettes, newPalette]);
    };

    const getRandomColor = () => {
        const randPalette = Math.floor(Math.random() * allPalettes.length);
        const randColor = Math.floor(
            Math.random() * allPalettes[randPalette].colors.length,
        );
        return allPalettes[randPalette].colors[randColor];
    };

    const value = {
        allPalettes,
        setAllPalettes,
        addColorPalette,
        getRandomColor,
    };
    return (
        <ColorPalettesContext.Provider value={value}>
            {children}
        </ColorPalettesContext.Provider>
    );
}
