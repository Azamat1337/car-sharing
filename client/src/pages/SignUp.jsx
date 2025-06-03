import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    CssBaseline,
    Divider,
    FormLabel,
    FormControl,
    Link,
    TextField,
    Typography,
    Stack,
    Card,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RENTAL_LIST_ROUTE } from '../infrastructure/routes/index.js';
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../infrastructure/redux/user/slice.js";

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        if (token) {
            navigate(RENTAL_LIST_ROUTE);
        }
    }, [token, navigate]);

    const onSubmit = (data) => {
        dispatch(registerRequest({ ...data, role: 'user' }));
    };

    return (
        <>
            <CssBaseline />
            <SignUpContainer>
                <StyledCard>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            mb: 1,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Sign up
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 2,
                            textAlign: 'center',
                        }}
                    >
                        Create your account to get started.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        <FormControl>
                            <FormLabel
                                htmlFor="username"
                                sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5 }}
                            >
                                Username
                            </FormLabel>
                            <StyledTextField
                                id="username"
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                {...register('username', {
                                    required: 'Username is required'
                                })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel
                                htmlFor="email"
                                sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5 }}
                            >
                                Email
                            </FormLabel>
                            <StyledTextField
                                id="email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Enter a valid email'
                                    }
                                })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel
                                htmlFor="password"
                                sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5 }}
                            >
                                Password
                            </FormLabel>
                            <StyledTextField
                                id="password"
                                type="password"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum 6 characters'
                                    }
                                })}
                            />
                        </FormControl>

                        {/* Hidden field for role */}
                        <input
                            type="hidden"
                            {...register('role')}
                            value="user"
                        />

                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}

                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </StyledButton>
                    </Box>

                    <Divider sx={{
                        width: '100%',
                        my: 2,
                        borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200],
                    }}>or</Divider>
                    <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            variant="body2"
                            sx={{
                                color: theme.palette.mode === 'dark'
                                    ? theme.palette.common.white
                                    : theme.palette.common.black,
                                fontWeight: 600,
                                ml: 0.5,
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </StyledCard>
            </SignUpContainer>
        </>
    );
}
