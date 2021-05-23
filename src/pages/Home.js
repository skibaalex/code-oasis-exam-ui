import { Box, Divider, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import BookCard from '../components/BookCard/BookCard';
import BooksContext from '../context/Books';
import { Redirect, useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import AuthContext from '../context/Auth';

const Home = () => {
    const { booksByIDs, allBookIDs, purchaseBook, myBooks, searchResult, isInitialised } = useContext(BooksContext)
    const { isInitialised: authIsInitialised } = useContext(AuthContext)
    const renderBooks = () => (
        <Box p={3}>
            {searchResult ?
                <Grid spacing={3} direction="row" container>
                    {searchResult && searchResult.map(book => (
                        <Grid item key={book._id}>
                            <BookCard purchaseBook={purchaseBook} book={book} />
                        </Grid>
                    ))}
                </Grid>
                :
                <Grid spacing={3} direction="row" container>
                    {allBookIDs && allBookIDs.map(id => (
                        <Grid item key={id}>
                            <BookCard buyNow purchaseBook={purchaseBook} book={booksByIDs[id]} />
                        </Grid>
                    ))}
                </Grid>
            }
            {searchResult && !searchResult.length &&
                <Box>
                    <Typography variant="subtitle2">No Matches Found</Typography>
                </Box>
            }
        </Box>
    )


    const renderMyBooks = () => (
        <Box padding={3}>
            <Grid spacing={3} direction="row" container>
                {myBooks?.length ? myBooks.map(id => (
                    <Grid item key={id}>
                        <BookCard purchaseBook={purchaseBook} book={booksByIDs[id]} />
                    </Grid>
                )) : <Typography variant="caption">No Books were puchased yet</Typography>}
            </Grid>
        </Box>
    )

    const renderSkeleton = () => (
        <Box p={3}>
            <Grid spacing={3} direction="row" container>
                {[1, 2, 3, 4].map((x, i) => (
                    <Grid item key={i}>
                        <Skeleton variant="rect" width={210} height={400} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )

    return (
        <Grid spacing={2} mt={3}>
            <Box>
                <Typography variant="h6">{searchResult ? 'Search Results' : 'Recomended Books'}</Typography>
                <Divider />
            </Box>
            {(authIsInitialised && isInitialised) ? renderBooks() : renderSkeleton()}
            <Box>
                <Typography variant="h6">Your Books</Typography>
                <Divider />
            </Box>
            {(authIsInitialised && isInitialised) ? renderMyBooks() : renderSkeleton()}
        </Grid >

    )
}

export default Home;