import type { NextPage } from 'next';
import HomeNav from '../components/HomeNav/HomeNav';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <HomeNav />
        </div>
    );
};

export default Home;
