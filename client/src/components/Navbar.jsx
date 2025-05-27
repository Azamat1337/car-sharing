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
} from '@mui/material';
import {
    Menu as MenuIcon,
    CloseRounded as CloseRoundedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import {
    BLOG_ROUTE,
    CAR_LIST_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
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
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
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
                            <Button
                                variant='text'
                                color='info'
                                size='small'
                                onClick={() => navigate(CAR_LIST_ROUTE)}
                            >
                                Car List
                            </Button>
                            <Button
                                variant='text'
                                color='info'
                                size='small'
                                sx={{ minWidth: 0 }}
                            >
                                Rental
                            </Button>
                            <Button
                                variant='text'
                                color='info'
                                size='small'
                                sx={{ minWidth: 0 }}
                                onClick={() => navigate(BLOG_ROUTE)}
                            >
                                Blog
                            </Button>
                            <Button
                                variant='text'
                                color='info'
                                size='small'
                                sx={{ minWidth: 0 }}
                                onClick={() => navigate(TAXI_ROUTE)}
                            >
                                Taxi
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            color='primary'
                            variant='text'
                            size='small'
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Sign in
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            onClick={() => navigate(REGISTRATION_ROUTE)}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton
                            aria-label='Menu button'
                            onClick={toggleDrawer(true)}
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
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'background.default',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                <MenuItem>Features</MenuItem>
                                <MenuItem>Testimonials</MenuItem>
                                <MenuItem>Highlights</MenuItem>
                                <MenuItem>Pricing</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                                <MenuItem>Blog</MenuItem>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        fullWidth
                                    >
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        fullWidth
                                    >
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
