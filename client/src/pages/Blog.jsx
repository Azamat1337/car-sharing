import React, { useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { POST_ROUTE } from "../infrastructure/routes/index.js";
import { useNavigate } from "react-router-dom";
import {
    getAllPostsDataSelector,
    getAllPostsLoadingSelector,
    getAllPostsRequest
} from "../infrastructure/redux/post/getAll/slice.js";
import { useDispatch, useSelector } from "react-redux";

const BlogCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[2],
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postsData = useSelector(getAllPostsDataSelector);
    const loading = useSelector(getAllPostsLoadingSelector);
    const posts = postsData?.posts || [];

    useEffect(() => {
        dispatch(getAllPostsRequest());
    }, [dispatch]);

    const goToPostPage = (id) => {
        const path = POST_ROUTE.replace(':id', id);
        navigate(path);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Our Blog
            </Typography>
            {loading ? (
                <Typography align="center">Loading...</Typography>
            ) : (
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <BlogCard>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={
                                        post.image
                                            ? (post.image.startsWith('http')
                                                ? post.image
                                                : `${API_URL}${post.image}`)
                                            : null
                                    }
                                    alt={post.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.excerpt}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                        <Typography color="text.secondary">{post.author?.username || ''}</Typography>
                                        <Typography color="text.secondary">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="text" onClick={() => goToPostPage(post.id)}>
                                        Read More
                                    </Button>
                                </CardActions>
                            </BlogCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
