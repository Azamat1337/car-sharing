import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

function Copyright() {
    return (
        <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color='text.secondary' href='https://mui.com/'>
                Carsharing+ App
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: { xs: 4, sm: 8 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Copyright />
                </div>
                <Stack
                    direction='row'
                    spacing={1}
                    useFlexGap
                    sx={{ justifyContent: 'left', color: 'text.secondary' }}
                >
                    <IconButton
                        color='inherit'
                        size='small'
                        href='https://github.com/Azamat1337'
                        aria-label='GitHub'
                        sx={{ alignSelf: 'center' }}
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        color='inherit'
                        size='small'
                        href='https://x.com/Nura'
                        aria-label='X'
                        sx={{ alignSelf: 'center' }}
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton
                        color='inherit'
                        size='small'
                        href='https://www.linkedin.com/company/mui/'
                        aria-label='LinkedIn'
                        sx={{ alignSelf: 'center' }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}