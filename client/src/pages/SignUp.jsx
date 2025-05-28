import * as React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RENTAL_LIST_ROUTE } from '../infrastructure/routes/index.js';
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../infrastructure/redux/user/slice.js";

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    width: '100vw',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

export default function SignUp() {
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
                    <Typography component="h1" variant="h4">Sign up</Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        {/* Исправлено name -> username */}
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
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
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
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
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
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

                        {/* Скрытое поле для роли (если требуется) */}
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </Button>
                    </Box>

                    <Divider sx={{ my: 2 }}>or</Divider>
                    <Typography>
                        Already have an account?{' '}
                        <Link href="/login" variant="body2">
                            Sign in
                        </Link>
                    </Typography>
                </StyledCard>
            </SignUpContainer>
        </>
    );
}