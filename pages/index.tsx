import type { NextPage } from 'next';
import HomeNav from '../components/HomeNav/HomeNav';
import PaletteList from '../components/PaletteList/PaletteList';
import defaultPalettes from '../constants/defaultPalettes';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <HomeNav />
            <PaletteList palettes={defaultPalettes} />
        </div>
    );
};

export default Home;
