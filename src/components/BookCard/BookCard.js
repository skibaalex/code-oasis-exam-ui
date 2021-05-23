import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Box, Card } from '@material-ui/core';
import BooksContext from '../../context/Books';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        maxWidth: 200,
    },
    image: {
        width: 256,
        height: 256,
    },
    img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    buyBookContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
}));

const BookCard = ({ book, purchaseBook, buyNow }) => {
    const classes = useStyles();
    const { author, publisher, description, name, cover, _id } = book
    const { buyBook } = useContext(BooksContext)
    return (
        <Card className={classes.paper}>
            <Box style={{ justifyContent: 'space-around', flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                <Box className={classes.image}>
                    <img className={classes.img} alt={name} src={cover} />
                </Box>
                <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Typography gutterBottom variant="subtitle2">
                        {name}
                    </Typography>

                </Box>
            </Box>
            <Grid item direction="column" spacing={2}>
                <Typography style={{ fontSize: 10 }} variant="body2" color="textSecondary">
                    PUBLISHED BY: {publisher}
                </Typography>
                <Typography gutterBottom variant="overline">
                    {author}
                </Typography>

                {buyNow &&
                    <Box>
                        <Typography variant="subtitle2">${book.price}</Typography>
                        <Button variant="contained" onClick={() => buyBook(_id)}>Buy Now</Button>
                    </Box>
                }
            </Grid>
        </Card>
    );
}

export default BookCard;