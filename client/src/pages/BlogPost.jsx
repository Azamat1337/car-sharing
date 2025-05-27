import React, { useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    CardMedia,
    Divider,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllPostsDataSelector,
    getAllPostsRequest
} from '../infrastructure/redux/post/getAll/slice.js';

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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BlogPostPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const postsData = useSelector(getAllPostsDataSelector);
    const posts = postsData?.posts || [];
    const post = posts.find((p) => String(p.id) === String(id));
    console.log('post', post);
    useEffect(() => {
        if (!postsData) {
            dispatch(getAllPostsRequest());
        }
    }, [dispatch, postsData]);

    if (!post) {
        return (
            <PostContainer maxWidth="md">
                <Typography variant="h5" align="center">Пост не найден</Typography>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button variant="outlined" onClick={() => window.history.back()}>
                        ← Назад к блогу
                    </Button>
                </Box>
            </PostContainer>
        );
    }

    return (
        <PostContainer maxWidth="md">
            <Typography variant="h3" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {post.author?.username ? `By ${post.author.username}` : ''}
                {post.publishedAt ? ` • ${new Date(post.publishedAt).toLocaleString()}` : ''}
            </Typography>

            {post.image && (
                <HeroImage
                    component="img"
                    image={
                        post.image.startsWith('http')
                            ? post.image
                            : `${API_URL}${post.image}`
                    }
                    alt={post.title}
                />
            )}

            <Divider sx={{ mb: 4 }} />

            <Section>
                <Typography variant="body1" paragraph>
                    {post.content}
                </Typography>
            </Section>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="outlined" onClick={() => window.history.back()}>
                    ← Назад к блогу
                </Button>
            </Box>
        </PostContainer>
    );
}
