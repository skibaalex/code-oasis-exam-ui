import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, InputAdornment } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import BooksContext from '../../context/Books';


export const NewEditBook = ({ book, show, toggleShow }) => {
    const [initialValues, setInitialValues] = useState({})
    const [_id, setId] = useState()

    const { updateBook, createBook } = useContext(BooksContext)

    useEffect(() => {
        const initialValues = {
            name: book ? book.name : '',
            description: book ? book.description : '',
            author: book ? book.author : '',
            publisher: book ? book.publisher : '',
            price: book ? book.price : '',
            cover: book ? book.cover : ''
        }
        setId(book ? book._id : undefined)
        setInitialValues(initialValues)
    }, [book])

    const handleClose = () => {
        toggleShow()
        setInitialValues(undefined)
    }

    return (
        <div>
            <Dialog maxWidth="lg" open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.description) {
                            errors.description = 'Required';
                        }
                        if (!values.author) {
                            errors.author = 'Required';
                        }
                        if (!values.publisher) {
                            errors.publisher = 'Required';
                        }
                        if (!values.price) {
                            errors.price = 'Required';
                        }
                        if (!values.cover) {
                            errors.cover = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {

                        try {
                            if (_id) await updateBook({ _id, values })
                            else await createBook({ values })
                            setSubmitting(false)
                            toggleShow()
                        } catch (e) {
                            console.error(e)
                        }

                        handleClose()
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Box>
                        <DialogTitle id="form-dialog-title">{book ? 'EDIT' : 'NEW BOOK'}</DialogTitle>
                        <Box p={3}>
                            <DialogContent style={{ width: 500 }}>

                                <Form onSubmit={handleSubmit}>
                                    <Box>
                                        <TextField
                                            autoFocus
                                            error={errors.name}
                                            id="name"
                                            name="name"
                                            label="Book Name"
                                            type="text"
                                            value={values.name}
                                            fullWidth
                                            multiline
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            multiline
                                            error={errors.description}
                                            margin="dense"
                                            name="description"
                                            id="description"
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            value={values.description}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            margin="dense"
                                            error={errors.author}
                                            id="author"
                                            name="author"
                                            label="Author"
                                            type="text"
                                            fullWidth
                                            value={values.author}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            margin="dense"
                                            id="publisher"
                                            error={errors.publisher}
                                            name="publisher"
                                            label="Publisher"
                                            type="text"
                                            fullWidth
                                            value={values.publisher}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            margin="dense"
                                            error={errors.price}
                                            id="price"
                                            name="price"
                                            label="Price"
                                            type="text"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            fullWidth
                                            value={values.price}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            margin="dense"
                                            error={errors.cover}
                                            name="cover"
                                            id="cover"
                                            label="Cover"
                                            fullWidth
                                            type="text"
                                            style={{ flex: 1 }}
                                            value={values.cover}
                                            onChange={handleChange}
                                            helperText="Image URL"
                                        />
                                    </Box>
                                </Form>
                            </DialogContent>
                        </Box>
                        <Box pt={3}>
                            <DialogActions>
                                <Button onClick={toggleShow} color="primary">
                                    Cancel
                        </Button>
                                <Button onClick={handleSubmit} color="primary">
                                    Submit
                        </Button>
                            </DialogActions>
                        </Box>
                    </Box>)}
                </Formik>
            </Dialog>
        </div>
    );
}

export default NewEditBook;