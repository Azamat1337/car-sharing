import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    CardMedia,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllPostsDataSelector,
    getAllPostsRequest
} from '../infrastructure/redux/post/getAll/slice.js';
import {
    updatePostRequest,
    updatePostReset,
    updatePostLoadingSelector,
    updatePostErrorSelector,
    updatePostSuccessSelector
} from '../infrastructure/redux/post/update/slice.js';
import {
    deletePostRequest,
    deletePostLoadingSelector,
    deletePostSuccessSelector,
    deletePostErrorSelector,
    clearDeletePostState
} from '../infrastructure/redux/post/delete/slice.js';

const userProfileSelector = state => state.user?.profile;

const PostContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    minHeight: '100vh',
    '&.MuiContainer-root': {
        backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    }
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postsData = useSelector(getAllPostsDataSelector);
    const posts = postsData?.posts || [];
    const post = posts.find((p) => String(p.id) === String(id));
    const user = useSelector(userProfileSelector);
    const isAdmin = user?.role === 'ADMIN';

    const [editOpen, setEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editExcerpt, setEditExcerpt] = useState('');
    const [editContent, setEditContent] = useState('');

    const [deleteOpen, setDeleteOpen] = useState(false);

    const loading = useSelector(updatePostLoadingSelector);
    const error = useSelector(updatePostErrorSelector);
    const success = useSelector(updatePostSuccessSelector);

    const deleteLoading = useSelector(deletePostLoadingSelector);
    const deleteSuccess = useSelector(deletePostSuccessSelector);
    const deleteError = useSelector(deletePostErrorSelector);

    useEffect(() => {
        if (!postsData) {
            dispatch(getAllPostsRequest());
        }
    }, [dispatch, postsData]);

    const handleEditOpen = () => {
        setEditTitle(post.title || '');
        setEditExcerpt(post.excerpt || '');
        setEditContent(post.content || '');
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        dispatch(updatePostReset());
    };

    const handleEditSave = () => {
        dispatch(updatePostRequest({
            id: post.id,
            title: editTitle,
            excerpt: editExcerpt,
            content: editContent
        }));
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setEditOpen(false);
                dispatch(updatePostReset());
                dispatch(getAllPostsRequest());
            }, 700);
        }
    }, [success, dispatch]);

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        dispatch(clearDeletePostState());
    };

    const handleDeleteConfirm = () => {
        dispatch(deletePostRequest(post.id));
    };

    useEffect(() => {
        if (deleteSuccess) {
            setTimeout(() => {
                setDeleteOpen(false);
                dispatch(clearDeletePostState());
                navigate('/blog');
            }, 700);
        }
    }, [deleteSuccess, dispatch, navigate]);

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
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    {post.title}
                </Typography>
                {isAdmin && (
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleEditOpen}
                            sx={{ ml: 2, height: 40 }}
                        >
                            Редактировать
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteOpen}
                            sx={{ ml: 2, height: 40 }}
                        >
                            Удалить
                        </Button>
                    </Box>
                )}
            </Box>
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

            <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
                <DialogTitle>Редактировать пост</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Заголовок"
                        fullWidth
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        disabled={loading}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Краткое описание"
                        fullWidth
                        value={editExcerpt}
                        onChange={e => setEditExcerpt(e.target.value)}
                        disabled={loading}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Текст поста"
                        fullWidth
                        multiline
                        minRows={4}
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        error={!!error}
                        helperText={error}
                        disabled={loading}
                    />
                    {success && (
                        <Typography color="success.main" sx={{ mt: 1 }}>
                            Пост успешно обновлён!
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} disabled={loading}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleEditSave}
                        disabled={loading || !editTitle.trim() || !editContent.trim()}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Сохранить'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteOpen} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
                <DialogTitle>Удалить пост</DialogTitle>
                <DialogContent>
                    <Typography>
                        Вы действительно хотите удалить пост <b>{post.title}</b>?
                    </Typography>
                    {deleteError && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {deleteError}
                        </Typography>
                    )}
                    {deleteSuccess && (
                        <Typography color="success.main" sx={{ mt: 1 }}>
                            Пост успешно удалён!
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} disabled={deleteLoading}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? <CircularProgress size={24} /> : 'Удалить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </PostContainer>
    );
}