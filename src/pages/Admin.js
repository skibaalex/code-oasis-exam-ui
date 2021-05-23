import { Typography, Grid, Box, Divider, Accordion, Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import api from '../api'
import BookAccordion from '../components/BookAccordion'
import ConfirmationDialog from '../components/ConfirmationDialog'
import NewEditBook from '../components/NewEditBook'
import BooksContext from '../context/Books'
import AddIcon from '@material-ui/icons/Add';

const AdminPage = () => {
    const { allBookIDs, booksByIDs, deleteBook } = useContext(BooksContext)
    const [expanded, setExpanded] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const [editBook, setEditBook] = useState()
    const [showDeleteConfirmation, setShowDeleteConfirmaion] = useState()


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEdit = (bookId) => {
        if (bookId) {
            setEditBook(booksByIDs[bookId])
        } else setEditBook()
        toggleShow()
    }


    const handleDelete = (bookId) => {
        if (bookId) {
            setEditBook(booksByIDs[bookId])
            setShowDeleteConfirmaion(true)
        } else setEditBook()
    }

    const handleConfirmationChoice = (choice) => {
        if (choice) deleteBook(editBook);
        setShowDeleteConfirmaion(false)
        setEditBook()
    }

    const toggleShow = () => {
        if (showEdit) setEditBook(undefined)
        setShowEdit(!showEdit)
    }


    return (
        <>
            <Box display="flex" style={{ flexDirection: 'row', justifyContent: 'space-between' }} p={3}>
                <Box>
                    <Typography variant="h6">Admin</Typography>
                </Box>
                <Button startIcon={<AddIcon />} onClick={() => { handleEdit(false) }}>Add New</Button>
            </Box>
            <Divider />
            <Box p={3}>
                {allBookIDs && allBookIDs.map(id =>
                    <BookAccordion key={id} open={expanded === id} handleDelete={handleDelete} handleEdit={handleEdit} handleChange={handleChange} book={booksByIDs[id]} />
                )}
            </Box>
            {showEdit && <NewEditBook book={editBook} show={showEdit} toggleShow={toggleShow} />}
            {showDeleteConfirmation && <ConfirmationDialog open={showDeleteConfirmation} handleChoice={handleConfirmationChoice} book={editBook} />}
        </>
    )
}

export default AdminPage