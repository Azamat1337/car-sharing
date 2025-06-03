import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, Avatar, Button, Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADMIN_ROUTE, USER_ROUTE } from '../infrastructure/routes/index.js';
import { logoutRequest } from '../infrastructure/redux/user/slice.js';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
}));

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const avatar = false;
    const user = useSelector(state => state.user.profile);

    const { username, email, role } = user || {};

    const handleLogout = () => {
        dispatch(logoutRequest());
        navigate('/login');
    };

    return (
        <StyledAppBar position="sticky">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    sx={{
                        cursor: 'pointer',
                        fontWeight: 700,
                        letterSpacing: '0.05rem'
                    }}
                    onClick={() => navigate('/')}
                >
                    CarShare+
                </Typography>

                {user ? (
                    <Box display="flex" alignItems="center">
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ gap: 1 }}
                        >
                            {avatar ? (
                                <Avatar
                                    src={avatar}
                                    alt={username}
                                    sx={{ width: 40, height: 40 }}
                                />
                            ) : (
                                <AccountCircle fontSize="large" />
                            )}
                            <Box textAlign="right">
                                <Typography variant="subtitle1">{username}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {email}
                                </Typography>
                            </Box>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            PaperProps={{
                                sx: {
                                    minWidth: '200px',
                                    mt: 1.5,
                                    '& .MuiMenuItem-root': {
                                        py: 1.5,
                                        px: 2.5,
                                    }
                                }
                            }}
                        >
                            <MenuItem onClick={() => { navigate(USER_ROUTE); setAnchorEl(null); }}>
                                👤 Профиль
                            </MenuItem>
                            {role === 'ADMIN' && (
                                <MenuItem onClick={() => { navigate(ADMIN_ROUTE); setAnchorEl(null); }}>
                                    🛠️ Админ-панель
                                </MenuItem>
                            )}
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem
                                onClick={handleLogout}
                                sx={{ color: 'error.main' }}
                            >
                                🚪 Выйти
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<AccountCircle />}
                        onClick={() => navigate('/login')}
                    >
                        Войти
                    </Button>
                )}
            </Toolbar>
        </StyledAppBar>
    );
}