import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import ColorPalettesProvider from '../contexts/ColorPalettes.context';
import ColorFormatProvider from '../contexts/ColorFormat.context';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ColorPalettesProvider>
            <ColorFormatProvider>
                <Component {...pageProps} />
            </ColorFormatProvider>
        </ColorPalettesProvider>
    );
}

export default MyApp;
