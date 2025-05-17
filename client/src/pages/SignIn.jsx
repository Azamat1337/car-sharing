import * as React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgotPassword.jsx';
import { SitemarkIcon } from '../components/CustomIcons.jsx';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline />
            <SignInContainer direction='column'>
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
                        Sign in
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <TextField
                                id='email'
                                type='email'
                                name='email'
                                placeholder='your@email.com'
                                autoComplete='email'
                                autoFocus
                                required
                                fullWidth
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
                                            'Please enter the valid email address.',
                                    },
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField
                                name='password'
                                placeholder='••••••'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                required
                                fullWidth
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
                                            'Password must be at least 6 lengths',
                                    },
                                })}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox value='remember' color='primary' />
                            }
                            label='Remember me'
                        />
                        <ForgotPassword open={open} handleClose={handleClose} />
                        <Button type='submit' fullWidth variant='contained'>
                            Sign in
                        </Button>
                        <Link
                            component='button'
                            type='button'
                            onClick={handleClickOpen}
                            variant='body2'
                            sx={{ alignSelf: 'center' }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link href='/registration' variant='body2'>
                            Sign up
                        </Link>
                    </Typography>
                </StyledCard>
            </SignInContainer>
        </>
    );
}
