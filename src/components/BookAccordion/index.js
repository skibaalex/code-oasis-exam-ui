import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CardMedia, Grid, IconButton, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react'

const BookAccordion = ({ open, book, handleChange, handleEdit, handleDelete }) => {
    const { name, publisher, description, author, _id } = book
    return (
        <Accordion onChange={handleChange(book._id)} expanded={open}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">{book.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item>
                        <Box>
                            <img src={book.cover} style={{ maxHeight: 128 }} />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box>
                            <Typography>{description}</Typography>
                        </Box>
                        <Box>
                            <Typography style={{ fontSize: 10 }} variant="body2" color="textSecondary">
                                PUBLISHED BY: {publisher}
                            </Typography>
                            <Typography gutterBottom variant="overline">
                                {author?.name}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton size="small" onClick={() => handleEdit(_id)}><EditIcon size="small" /></IconButton>
                            <IconButton size="small" onClick={() => handleDelete(_id)} color="action"><DeleteIcon /></IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default BookAccordion;