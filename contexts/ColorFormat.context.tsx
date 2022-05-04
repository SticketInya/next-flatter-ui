import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { colorFormat } from '../interfaces/ColorPaletteInterface';

type props = {
    children: ReactNode;
};

type DefaultContextValue = {
    colorFormat: keyof colorFormat;
    setColorFormat: Dispatch<SetStateAction<keyof colorFormat>>;
};

export const ColorFormatContext = createContext<DefaultContextValue>({
    colorFormat: '' as keyof colorFormat,
    setColorFormat: () => {},
});

export default function ColorFormatProvider({ children }: props) {
    const [colorFormat, setColorFormat] = useState<keyof colorFormat>('hex');

    const value = {
        colorFormat,
        setColorFormat,
    };

    return (
        <ColorFormatContext.Provider value={value}>
            {children}
        </ColorFormatContext.Provider>
    );
}
