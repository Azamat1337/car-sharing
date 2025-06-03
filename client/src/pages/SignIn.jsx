import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    FormLabel,
    FormControl,
    Link,
    TextField,
    Typography,
    Stack,
    Card,
    useTheme,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RENTAL_LIST_ROUTE } from '../infrastructure/routes/index.js';
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../infrastructure/redux/user/slice.js";

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    Width: '100vw',
    backgroundColor: theme.palette.background.default,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    padding: theme.spacing(5, 4),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.palette.mode === 'dark'
        ? '0 2px 16px 0 rgba(0,0,0,0.45)'
        : '0 2px 16px 0 rgba(30,30,30,0.10)',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.common.white,
    border: `1.5px solid ${theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
        }`,
    gap: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[50],
        borderRadius: theme.shape.borderRadius * 1.5,
        color: theme.palette.text.primary,
        fontSize: 16,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 700 : 300],
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 500 : 800],
    },
    '& .MuiInputBase-input': {
        color: theme.palette.text.primary,
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.common.black,
    color: theme.palette.mode === 'dark'
        ? theme.palette.common.black
        : theme.palette.common.white,
    borderRadius: theme.shape.borderRadius * 1.5,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 1,
    height: 48,
    boxShadow: 'none',
    transition: 'background 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.grey[300]
            : theme.palette.grey[900],
        color: theme.palette.mode === 'dark'
            ? theme.palette.common.black
            : theme.palette.common.white,
    },
}));

export default function SignIn() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, loading, error } = useSelector(state => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (token) {
            navigate(RENTAL_LIST_ROUTE);
        }
    }, [token, navigate]);

    const onSubmit = (data) => {
        dispatch(loginRequest(data));
    };

    return (
        <>
            <CssBaseline />
            <SignInContainer>
                <StyledCard variant='outlined'>
                    <Typography
                        component='h1'
                        variant='h4'
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            mb: 1,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Sign in
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 3,
                            textAlign: 'center',
                        }}
                    >
                        Welcome back! Please enter your credentials.
                    </Typography>

                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        <FormControl>
                            <FormLabel
                                htmlFor='email'
                                sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5 }}
                            >
                                Email
                            </FormLabel>
                            <StyledTextField
                                id='email'
                                type='email'
                                placeholder='your@email.com'
                                autoComplete='email'
                                autoFocus
                                required
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel
                                htmlFor='password'
                                sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5 }}
                            >
                                Password
                            </FormLabel>
                            <StyledTextField
                                placeholder='••••••'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                required
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox color="default" sx={{
                                color: theme.palette.grey[theme.palette.mode === 'dark' ? 300 : 800],
                                '&.Mui-checked': {
                                    color: theme.palette.mode === 'dark'
                                        ? theme.palette.common.white
                                        : theme.palette.common.black,
                                },
                            }} />}
                            label="Remember me"
                            sx={{ color: theme.palette.text.secondary }}
                        />

                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}

                        <StyledButton
                            type='submit'
                            fullWidth
                            variant='contained'
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </StyledButton>
                    </Box>

                    <Divider sx={{
                        width: '100%',
                        my: 2,
                        borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200],
                    }} />

                    <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                        Don&apos;t have an account?{' '}
                        <Link
                            href='/registration'
                            variant='body2'
                            sx={{
                                color: theme.palette.mode === 'dark'
                                    ? theme.palette.common.white
                                    : theme.palette.common.black,
                                fontWeight: 600,
                                ml: 0.5,
                            }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </StyledCard>
            </SignInContainer>
        </>
    );
}
