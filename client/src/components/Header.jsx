import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
}));

export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (route) => {
        handleCloseMenu();
        navigate(route);
    };

    return (
        <StyledAppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    CarShare+
                </Typography>
                <Box>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleOpenMenu}
                        aria-controls="user-menu"
                        aria-haspopup="true"
                    >
                        <AccountCircle fontSize="large" />
                        <Typography>User Name</Typography>
                    </IconButton>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={() => handleMenuClick('/profile')}>My Profile</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/my-cars')}>My Cars</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/settings')}>Settings</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/logout')}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
}
