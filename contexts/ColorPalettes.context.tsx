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
};

export const ColorPalettesContext = createContext<DefaultContextValue>({
    allPalettes: [],
    setAllPalettes: () => {},
});

export default function ColorPalettesProvider({ children }: props) {
    const [allPalettes, setAllPalettes] =
        useState<ColorPalette[]>(defaultPalettes);

    const value = {
        allPalettes,
        setAllPalettes,
    };
    return (
        <ColorPalettesContext.Provider value={value}>
            {children}
        </ColorPalettesContext.Provider>
    );
}
