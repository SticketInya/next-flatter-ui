import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar } from '../../helpers/muiDrawerStyles';

interface props {
    open: boolean;
    handleDrawerToggle: () => void;
}

export default function NewPaletteNav({ open, handleDrawerToggle }: props) {
    return (
        <AppBar position='fixed' open={open}>
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
                <Typography variant='h6' noWrap component='div'>
                    Persistent drawer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
