import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';


export default function CarInfoDialog({
    open,
    onClose,
    onSubmit,
    attributeName,
    attributeValue,
    setAttributeName,
    setAttributeValue,
    loading,
    error,
    isEdit = false
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                {isEdit ? 'Edit a specification' : 'Add a specification'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        label="Name"
                        value={attributeName}
                        onChange={e => setAttributeName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        disabled={loading}
                    />
                    <TextField
                        label="Value"
                        value={attributeValue}
                        onChange={e => setAttributeValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        disabled={loading}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : (isEdit ? 'Save' : 'Add')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}