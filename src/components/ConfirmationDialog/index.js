import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';

const ConfirmationDialog = ({ handleChoice, open, book }) => {
    return (
        <Dialog open={open}>
            <Box p={3}>
                <DialogTitle>
                    Cofirm
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">Are you sure that you want to <b>DELETE</b> {book?.name}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleChoice(false)}>Cancel</Button>
                    <Button onClick={() => handleChoice(true)}>Confirm</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default ConfirmationDialog;