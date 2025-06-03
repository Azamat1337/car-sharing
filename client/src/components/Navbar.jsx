import React from 'react';
import {
    styled,
    alpha,
    Box,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Container,
    Divider,
    MenuItem,
    Drawer,
    useTheme
} from '@mui/material';
import {
    Menu as MenuIcon,
    CloseRounded as CloseRoundedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import {
    BLOG_ROUTE,
    CAR_SHARING_LIST_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    RENTAL_LIST_ROUTE,
    TAXI_ROUTE,
} from '../infrastructure/routes/index.js';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.palette.mode === 'light'
        ? alpha('#fff', 0.85)
        : alpha('#111', 0.85),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#111' : '#fff',
    borderColor: theme.palette.mode === 'light' ? '#111' : '#fff',
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light'
            ? alpha('#000', 0.07)
            : alpha('#fff', 0.07),
        borderColor: theme.palette.mode === 'light' ? '#000' : '#fff',
    },
}));

const DrawerMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#111' : '#fff',
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light'
            ? alpha('#000', 0.07)
            : alpha('#fff', 0.07),
    },
}));


export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position='fixed'
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth='lg'>
                <StyledToolbar variant='dense' disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            px: 0,
                        }}
                    >
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <NavButton
                                variant='text'
                                size='small'
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => navigate(RENTAL_LIST_ROUTE)}
                            >
                                RENTAL
                            </NavButton>
                            <NavButton
                                variant='text'
                                size='small'
                                sx={{ minWidth: 0, textTransform: 'uppercase' }}
                                onClick={() => navigate(CAR_SHARING_LIST_ROUTE)}
                            >
                                CARSHARING
                            </NavButton>
                            <NavButton
                                variant='text'
                                size='small'
                                sx={{ minWidth: 0, textTransform: 'uppercase' }}
                                onClick={() => navigate(BLOG_ROUTE)}
                            >
                                BLOG
                            </NavButton>
                            <NavButton
                                variant='text'
                                size='small'
                                sx={{ minWidth: 0, textTransform: 'uppercase' }}
                                onClick={() => navigate(TAXI_ROUTE)}
                            >
                                TAXI
                            </NavButton>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <NavButton
                            variant='outlined'
                            size='small'
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Sign in
                        </NavButton>
                        <NavButton
                            variant='contained'
                            size='small'
                            onClick={() => navigate(REGISTRATION_ROUTE)}
                            sx={{
                                backgroundColor: theme.palette.mode === 'light' ? '#111' : '#fff',
                                color: theme.palette.mode === 'light' ? '#fff' : '#111',
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'light'
                                        ? '#222'
                                        : '#eee',
                                    color: theme.palette.mode === 'light'
                                        ? '#fff'
                                        : '#111',
                                }
                            }}
                        >
                            Sign up
                        </NavButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton
                            aria-label='Menu button'
                            onClick={toggleDrawer(true)}
                            sx={{
                                color: theme.palette.mode === 'light' ? '#111' : '#fff'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor='top'
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                    backgroundColor: theme.palette.mode === 'light'
                                        ? '#fff'
                                        : '#111',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: theme.palette.mode === 'light'
                                        ? '#fff'
                                        : '#111',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton
                                        onClick={toggleDrawer(false)}
                                        sx={{
                                            color: theme.palette.mode === 'light' ? '#111' : '#fff'
                                        }}
                                    >
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                <DrawerMenuItem
                                    sx={{ textTransform: 'uppercase' }}
                                    onClick={() => {
                                        setOpen(false);
                                        navigate(RENTAL_LIST_ROUTE);
                                    }}
                                >
                                    RENTAL
                                </DrawerMenuItem>
                                <DrawerMenuItem
                                    sx={{ textTransform: 'uppercase' }}
                                    onClick={() => {
                                        setOpen(false);
                                        navigate(CAR_SHARING_LIST_ROUTE);
                                    }}
                                >
                                    CARSHARING
                                </DrawerMenuItem>
                                <DrawerMenuItem
                                    sx={{ textTransform: 'uppercase' }}
                                    onClick={() => {
                                        setOpen(false);
                                        navigate(BLOG_ROUTE);
                                    }}
                                >
                                    BLOG
                                </DrawerMenuItem>
                                <DrawerMenuItem
                                    sx={{ textTransform: 'uppercase' }}
                                    onClick={() => {
                                        setOpen(false);
                                        navigate(TAXI_ROUTE);
                                    }}
                                >
                                    TAXI
                                </DrawerMenuItem>
                                <Divider sx={{ my: 3, borderColor: theme.palette.mode === 'light' ? '#111' : '#fff' }} />
                                <DrawerMenuItem>
                                    <NavButton
                                        variant='contained'
                                        fullWidth
                                        onClick={() => {
                                            setOpen(false);
                                            navigate(REGISTRATION_ROUTE);
                                        }}
                                        sx={{
                                            backgroundColor: theme.palette.mode === 'light' ? '#111' : '#fff',
                                            color: theme.palette.mode === 'light' ? '#fff' : '#111',
                                            '&:hover': {
                                                backgroundColor: theme.palette.mode === 'light'
                                                    ? '#222'
                                                    : '#eee',
                                                color: theme.palette.mode === 'light'
                                                    ? '#fff'
                                                    : '#111',
                                            }
                                        }}
                                    >
                                        Sign up
                                    </NavButton>
                                </DrawerMenuItem>
                                <DrawerMenuItem>
                                    <NavButton
                                        variant='outlined'
                                        fullWidth
                                        onClick={() => {
                                            setOpen(false);
                                            navigate(LOGIN_ROUTE);
                                        }}
                                    >
                                        Sign in
                                    </NavButton>
                                </DrawerMenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}