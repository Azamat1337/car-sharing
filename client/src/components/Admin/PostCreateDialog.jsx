import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    addPostRequest,
    addPostReset,
    addPostLoadingSelector,
    addPostErrorSelector,
    addPostSuccessSelector
} from '../../infrastructure/redux/post/add/slice';

export default function PostCreateDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const loading = useSelector(addPostLoadingSelector);
    const error = useSelector(addPostErrorSelector);
    const success = useSelector(addPostSuccessSelector);

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (success) {
            setTitle('');
            setExcerpt('');
            setContent('');
            setImage(null);
            setTimeout(() => {
                dispatch(addPostReset());
                onClose();
            }, 800);
        }
    }, [success, dispatch, onClose]);

    const handleCreate = () => {
        if (!title.trim() || !content.trim()) return;

        dispatch(addPostRequest({
            title: title.trim(),
            excerpt: excerpt.trim() || undefined,
            content: content.trim(),
            image: image
        }));
    };

    const handleClose = () => {
        setTitle('');
        setExcerpt('');
        setContent('');
        setImage(null);
        dispatch(addPostReset());
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Создать пост</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Заголовок"
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    error={!!error}
                    disabled={loading}
                />
                <TextField
                    margin="dense"
                    label="Краткое описание"
                    fullWidth
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    margin="dense"
                    label="Текст поста"
                    fullWidth
                    multiline
                    minRows={4}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {image ? `Изображение: ${image.name}` : 'Загрузить изображение'}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={e => setImage(e.target.files[0])}
                    />
                </Button>
                {success && (
                    <Typography color="success.main" sx={{ mt: 1 }}>
                        Пост успешно создан!
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={loading || !title.trim() || !content.trim()}
                >
                    {loading ? <CircularProgress size={24} /> : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}