import Link from 'next/link';
import React from 'react';

import styles from './HomeNav.module.scss';

export default function HomeNav(): JSX.Element {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <Link href='/'>
                    <h4 className={styles.logo}>
                        Flatter UI{' '}
                        <span className={styles.logo_accent}>Colors</span>
                    </h4>
                </Link>
                <Link href='#'>
                    <a className={styles.create}>Create Palette</a>
                </Link>
            </div>
        </div>
    );
}
