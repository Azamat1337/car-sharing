import React, {useEffect} from 'react';
import {
    Container,
    Box,
    Typography,
    CardMedia,
    Divider,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {fetchNewsDataSelector, fetchNewsRequest} from "../infrastructure/redux/news/get/slice.js";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const PostContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    minHeight: '100vh',
}));

const HeroImage = styled(CardMedia)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    marginBottom: theme.spacing(4),
}));

const Section = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export default function BlogPostPage() {
    const {id} = useParams();
    const data = useSelector(fetchNewsDataSelector) ?? []

    const post = data?.[Number(id)] ?? {}
    console.log('DATA, POST', data, post)
    console.log('ID', id)
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(fetchNewsRequest())
    }, [])

    return (
        <PostContainer maxWidth="md">
            <Typography variant="h3" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                By {post.author} • {post.publishedAt.split('T').join(' ')}
            </Typography>

            <HeroImage
                component="img"
                image={post.urlToImage}
                alt={post.title}
            />

            <Divider sx={{ mb: 4 }} />

            <Section>
                <Typography variant="body1" paragraph>
                    {post.content}
                </Typography>
            </Section>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="outlined" onClick={() => window.history.back()}>
                    ← Back to Blog
                </Button>
            </Box>
        </PostContainer>
    );
}
