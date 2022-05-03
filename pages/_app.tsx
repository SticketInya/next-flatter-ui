import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import ColorPalettesProvider from '../contexts/ColorPalettes.context';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ColorPalettesProvider>
            <Component {...pageProps} />
        </ColorPalettesProvider>
    );
}

export default MyApp;
