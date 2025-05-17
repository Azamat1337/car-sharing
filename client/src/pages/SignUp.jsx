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
import { SitemarkIcon } from '../components/CustomIcons.jsx';
import { useContext } from 'react';
import { Context } from '../main.jsx';
import { useNavigate } from 'react-router';
import { CAR_LIST_ROUTE } from '../infrastructure/routes/index.js';

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        try {
            navigate(CAR_LIST_ROUTE);
        } catch (e) {
            console.error(e.response.data.message);
        }
    };

    return (
        <>
            <CssBaseline />
            <SignUpContainer direction='column'>
                <StyledCard variant='outlined'>
                    <SitemarkIcon />
                    <Typography
                        component='h1'
                        variant='h4'
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor='name'>Full name</FormLabel>
                            <TextField
                                autoComplete='name'
                                name='name'
                                required
                                fullWidth
                                id='name'
                                placeholder='Jon Snow'
                                variant='outlined'
                                error={!!errors.name}
                                helperText={
                                    errors.name ? errors.name.message : ''
                                }
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                placeholder='your@email.com'
                                name='email'
                                autoComplete='email'
                                variant='outlined'
                                error={!!errors.email}
                                helperText={
                                    errors.email ? errors.email.message : ''
                                }
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message:
                                            'Please, enter the valid email address.',
                                    },
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                placeholder='••••••'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                                variant='outlined'
                                error={!!errors.password}
                                helperText={
                                    errors.password
                                        ? errors.password.message
                                        : ''
                                }
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password should be at least 6 characters',
                                    },
                                })}
                            />
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained'>
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>
                            or
                        </Typography>
                    </Divider>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link href='/login' variant='body2'>
                            Sign in
                        </Link>
                    </Typography>
                </StyledCard>
            </SignUpContainer>
        </>
    );
}
