import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import defaultPalettes from '../constants/defaultPalettes';
import ColorPalette from '../interfaces/ColorPaletteInterface';

type props = {
    children: ReactNode;
};

type DefaultContextValue = {
    allPalettes: ColorPalette[];
    setAllPalettes: Dispatch<SetStateAction<ColorPalette[]>>;
    addColorPalette: (newPalette: ColorPalette) => void;
};

export const ColorPalettesContext = createContext<DefaultContextValue>({
    allPalettes: [],
    setAllPalettes: () => {},
    addColorPalette: (newPalette: ColorPalette) => {},
});

export default function ColorPalettesProvider({ children }: props) {
    const [allPalettes, setAllPalettes] =
        useState<ColorPalette[]>(defaultPalettes);

    const addColorPalette = (newPalette: ColorPalette) => {
        setAllPalettes([...allPalettes, newPalette]);
    };

    const value = {
        allPalettes,
        setAllPalettes,
        addColorPalette,
    };
    return (
        <ColorPalettesContext.Provider value={value}>
            {children}
        </ColorPalettesContext.Provider>
    );
}
