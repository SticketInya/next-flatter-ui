import { createContext, ReactNode, Dispatch, SetStateAction } from 'react';
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
    removeColorPalette: (id: string) => void;
};

export const ColorPalettesContext = createContext<DefaultContextValue>({
    allPalettes: [],
    setAllPalettes: () => {},
    addColorPalette: (newPalette: ColorPalette) => {},
    getRandomColor: () => defCol,
    removeColorPalette: (id: string) => {},
});

export default function ColorPalettesProvider({ children }: props) {
    const [allPalettes, setAllPalettes] = useLocalStorageState(
        'colors',
        defaultPalettes,
    );

    const addColorPalette = (newPalette: ColorPalette) => {
        setAllPalettes([...allPalettes, newPalette]);
    };

    const removeColorPalette = (id: string) => {
        setAllPalettes(allPalettes.filter((palette) => palette.id !== id));
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
        removeColorPalette,
    };
    return (
        <ColorPalettesContext.Provider value={value}>
            {children}
        </ColorPalettesContext.Provider>
    );
}
