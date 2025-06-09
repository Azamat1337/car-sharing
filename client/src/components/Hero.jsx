import React from 'react';
import {
    Box,
    Button,
    Container,
    InputLabel,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { REGISTRATION_ROUTE } from '../infrastructure/routes/index.js';
import Logo from '../assets/logo_carsharing.png';

const LogoBox = styled(Box)(({ theme }) => ({
    alignSelf: 'center',
    width: 160,
    height: 160,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    borderRadius: '50%',
    background: theme.palette.mode === 'light'
        ? alpha('#111', 0.04)
        : alpha('#fff', 0.04),
    border: `2px solid ${theme.palette.mode === 'light' ? '#111' : '#fff'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: 40,
    color: theme.palette.mode === 'light' ? '#111' : '#fff',
    letterSpacing: 2,
    boxShadow: theme.palette.mode === 'light'
        ? '0 0 12px 4px rgba(0,0,0,0.04)'
        : '0 0 24px 8px rgba(255,255,255,0.04)',
    [theme.breakpoints.up('sm')]: {
        width: 220,
        height: 220,
        fontSize: 56,
    },
}));

export default function Hero() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            id='hero'
            sx={{
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'radial-gradient(ellipse 80% 50% at 50% -20%, #f5f5f5, transparent)'
                        : 'radial-gradient(ellipse 80% 50% at 50% -20%, #181818, transparent)',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack
                    spacing={2}
                    useFlexGap
                    sx={{
                        alignItems: 'center',
                        width: { xs: '100%', sm: '70%' },
                    }}
                >
                    <Typography
                        variant='h1'
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                            color: theme.palette.mode === 'light'
                                ? theme.palette.primary.main
                                : theme.palette.primary.light,
                            fontWeight: 700,
                            letterSpacing: 1,
                        }}
                    >
                        Welcome&nbsp;to&nbsp;our&nbsp;
                        <Typography
                            component='span'
                            variant='h1'
                            sx={{
                                fontSize: 'inherit',
                                color: theme.palette.mode === 'light'
                                    ? '#000'
                                    : '#fff',
                                fontWeight: 900,
                                letterSpacing: 2,
                            }}
                        >
                            web-site
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: theme.palette.mode === 'light' ? '#222' : '#ccc',
                            width: { sm: '100%', md: '80%' },
                            fontSize: { xs: 18, sm: 20 },
                            fontWeight: 400,
                        }}
                    >
                        Explore our minimalistic carsharing and rental service. Fast, simple, and always in style.
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                    >
                        <InputLabel htmlFor='email-hero' sx={visuallyHidden}>
                            Email
                        </InputLabel>
                        <TextField
                            id='email-hero'
                            hiddenLabel
                            size='small'
                            variant='outlined'
                            aria-label='Enter your email address'
                            placeholder='Your email address'
                            fullWidth
                            sx={{
                                input: {
                                    color: theme.palette.mode === 'light' ? '#111' : '#fff',
                                    background: theme.palette.mode === 'light'
                                        ? alpha('#000', 0.02)
                                        : alpha('#fff', 0.02),
                                },
                                '& fieldset': {
                                    borderColor: theme.palette.mode === 'light'
                                        ? '#111'
                                        : '#fff',
                                },
                            }}
                            slotProps={{
                                htmlInput: {
                                    autoComplete: 'off',
                                    'aria-label': 'Enter your email address',
                                },
                            }}
                        />
                        <Button
                            variant='contained'
                            color='inherit'
                            size='small'
                            sx={{
                                minWidth: 'fit-content',
                                background: theme.palette.mode === 'light' ? '#111' : '#fff',
                                color: theme.palette.mode === 'light' ? '#fff' : '#111',
                                fontWeight: 700,
                                letterSpacing: 1,
                                '&:hover': {
                                    background: theme.palette.mode === 'light' ? '#222' : '#eee',
                                    color: theme.palette.mode === 'light' ? '#fff' : '#111',
                                }
                            }}
                            onClick={() => navigate(REGISTRATION_ROUTE)}
                        >
                            Start now
                        </Button>
                    </Stack>
                </Stack>
                <LogoBox>
                    <img src={Logo} alt="Logotype" style={{ borderRadius: '50%', }} />
                </LogoBox>
            </Container>
        </Box>
    );
}