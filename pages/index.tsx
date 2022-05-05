import type { NextPage } from 'next';
import { useContext } from 'react';
import HomeNav from '../components/HomeNav/HomeNav';
import PaletteList from '../components/PaletteList/PaletteList';
import defaultPalettes from '../constants/defaultPalettes';
import { ColorPalettesContext } from '../contexts/ColorPalettes.context';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    const { allPalettes } = useContext(ColorPalettesContext);
    return (
        <div className={styles.container}>
            <HomeNav />
            <PaletteList palettes={allPalettes} />
        </div>
    );
};

export default Home;
