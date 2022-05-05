import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar } from '../../helpers/muiDrawerStyles';

import styles from './NewPaletteNav.module.scss';
import { useRouter } from 'next/router';

interface props {
    open: boolean;
    handleDrawerToggle: () => void;
    toggleDialogOpen: () => void;
}

export default function NewPaletteNav({
    open,
    handleDrawerToggle,
    toggleDialogOpen,
}: props) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <AppBar position='fixed' open={open} className={styles.appbar}>
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerToggle}
                    edge='start'
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <div className={styles.content}>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        className={styles.title}
                    >
                        Create Your Palette
                    </Typography>
                    <div className={styles.btns}>
                        <button
                            className={styles.save}
                            onClick={toggleDialogOpen}
                        >
                            Save
                        </button>
                        <button className={styles.back} onClick={handleBack}>
                            Back
                        </button>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}
