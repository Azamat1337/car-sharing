import React, {useEffect} from 'react';
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
import {POST_ROUTE} from "../infrastructure/routes/index.js";
import {useNavigate} from "react-router-dom";
import {
    fetchNewsDataSelector,
    fetchNewsLoadingSelector,
    fetchNewsRequest
} from "../infrastructure/redux/news/get/slice.js";
import {useDispatch, useSelector} from "react-redux";

const posts = [
    {
        id: 1,
        title: '10 Tips for Safe City Driving',
        excerpt: 'Discover key practices to stay safe and confident when navigating busy urban streets.',
        author: 'Jane Doe',
        date: '2025-05-10',
        image: 'https://via.placeholder.com/400x200?text=City+Driving'
    },
    {
        id: 2,
        title: 'How to Choose the Right Car Model',
        excerpt: 'A comprehensive guide to help you select the perfect car based on your lifestyle and budget.',
        author: 'John Smith',
        date: '2025-04-28',
        image: 'https://via.placeholder.com/400x200?text=Car+Selection'
    },
    {
        id: 3,
        title: 'Benefits of Electric Vehicles',
        excerpt: 'Learn about the environmental and financial advantages of switching to an electric car.',
        author: 'Alex Johnson',
        date: '2025-03-15',
        image: 'https://via.placeholder.com/400x200?text=Electric+Vehicles'
    },
];

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

export default function BlogPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const posts = useSelector(fetchNewsDataSelector) ?? []
    const loading = useSelector(fetchNewsLoadingSelector)

    useEffect(() => {
        dispatch(fetchNewsRequest())
    }, [])

    const goToPostPage = (id) => {
        const path = POST_ROUTE.replace(':id', id)
        navigate(path)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Our Blog
            </Typography>
            <Grid container spacing={4}>
                {posts.map((post, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                        <BlogCard>
                            <CardMedia
                                component="img"
                                height="180"
                                image={post.urlToImage}
                                alt={post.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.description}
                                </Typography>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <Typography color="text.secondary">{post.author}</Typography>
                                    <Typography color="text.secondary">{post.date}</Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="text" onClick={() => goToPostPage(idx)}>
                                    Read More
                                </Button>
                            </CardActions>
                        </BlogCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
