import React from 'react';
import {
    Card,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button,
    IconButton,
    Alert,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const InfoCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #333',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.mode === 'dark' ? '#222' : '#fafafa'
}));

export default function CarInfoTable({
    carInfo = [],
    isAdmin = false,
    onAdd,
    onEdit,
    onDelete,
    loading,
    error,
    createError,
    deleteError,
    updateError,
    createLoading,
    deleteLoading,
    updateLoading
}) {
    return (
        <InfoCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom>
                    Specifications
                </Typography>
                {isAdmin && (
                    <Button size="small" variant="outlined" onClick={onAdd}>
                        Add
                    </Button>
                )}
            </Box>
            {createError && <Alert severity="error" sx={{ mb: 1 }}>{createError}</Alert>}
            {deleteError && <Alert severity="error" sx={{ mb: 1 }}>{deleteError}</Alert>}
            {updateError && <Alert severity="error" sx={{ mb: 1 }}>{updateError}</Alert>}
            {loading && <Typography>Loading specifications...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && (
                <Table size="small">
                    <TableBody>
                        {carInfo.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={isAdmin ? 3 : 2}>There are no specifications</TableCell>
                            </TableRow>
                        )}
                        {carInfo.map(info => (
                            <TableRow key={info.id}>
                                <TableCell
                                    component="th"
                                    sx={{ borderBottom: 'none', fontWeight: 'bold', color: 'inherit' }}
                                >
                                    {info.attributeName}
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none', color: 'inherit' }}>
                                    {info.attributeValue}
                                </TableCell>
                                {isAdmin && (
                                    <TableCell sx={{ borderBottom: 'none', whiteSpace: 'nowrap' }}>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => onEdit && onEdit(info)}
                                            disabled={updateLoading}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => onDelete && onDelete(info.id)}
                                            disabled={deleteLoading}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </InfoCard>
    );
}