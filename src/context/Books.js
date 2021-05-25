import React, { createContext, useContext, useEffect, useReducer } from 'react'
import api from '../api'
import AuthContext from './Auth';
import objFromArray from '../helpers/objFromArray'
import _ from 'lodash';

const initialBooksState = {
    isInitialised: false,
    booksByIDs: null,
    allBookIDs: null,
    myBooks: null,
    searchResult: null
};


const BooksContext = createContext({
    ...initialBooksState,
    buyBook: () => Promise.resolve(),
    createBook: () => Promise.resolve(),
    searchBooks: () => Promise.resolve(),
    updateBook: () => Promise.resolve()

})

const BooksReducer = (state, action) => {

    switch (action.type) {
        case 'INITIALISE': {
            const { books, myBooks } = action.payload;
            const booksByIDs = objFromArray(books ? books : {})
            const allBookIDs = books ? Object.keys(booksByIDs) : []
            return {
                ...state,
                isInitialised: true,
                booksByIDs,
                allBookIDs,
                myBooks
            };
        }
        case 'BUY_BOOK': {
            const { bookId } = action.payload;
            state.myBooks = _.union(state.myBooks, [bookId])
            return {
                ...state,
            };
        }
        case 'UPDATE_BOOK': {
            const { _id, values } = action.payload;
            state.booksByIDs[_id] = { ...values }
            return {
                ...state
            }
        }
        case 'DELETE_BOOK': {
            const { _id } = action.payload;
            state.booksByIDs = _.omit(state.booksByIDs, _id)
            state.allBookIDs = _.pull(state.allBookIDs, _id)
            return { ...state }
        }
        case 'CREATE_BOOK': {
            const { book } = action.payload;

            state.booksByIDs[book._id] = book
            state.allBookIDs.push(book._id)
            console.log(state)
            return { ...state }
        }
        case 'SEARCH_BOOKS': {
            const { searchResult } = action.payload;
            state.searchResult = searchResult
            return {
                ...state
            }
        }
        default: {
            throw new Error('Action type was not found.')
        }

    }
}



export const BooksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BooksReducer, initialBooksState)
    const { isAuthenticated } = useContext(AuthContext)

    const buyBook = (bookId) => {
        if (!isAuthenticated) return console.log('not authenticated.')
        api.post('/books/purchase', { bookId }).then(res => {
            dispatch({
                type: 'BUY_BOOK',
                payload: { bookId }
            })
        })
    }

    const updateBook = async ({ _id, values }) => {
        api.put('books/update', { _id, values }).then(res => {
            dispatch({
                type: 'UPDATE_BOOK',
                payload: {
                    _id,
                    values
                }
            })
        })
    }

    const deleteBook = async ({ _id }) => {
        try {
            const deleted = await api.delete(`/books/delete/${_id}`)
            dispatch({
                type: 'DELETE_BOOK',
                payload: {
                    _id
                }
            })
        } catch (err) {
            console.error(err)
        }

    }

    const createBook = async ({ values }) => {
        try {
            const book = (await api.post('books/create', values)).data
            dispatch({
                type: 'CREATE_BOOK',
                payload: {
                    book
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    const searchBooks = async ({ query }) => {
        if (query.length) {
            try {
                const searchResult = (await api.get(`books/query/${query}`)).data

                dispatch({
                    type: 'SEARCH_BOOKS',
                    payload: { searchResult }
                })
            } catch (err) {
                console.error(err)
            }
        } else {
            dispatch({
                type: 'SEARCH_BOOKS',
                payload: { searchResult: null }
            })
        }

    }

    useEffect(() => {
        const initialise = async () => {
            try {
                const response = await api.get('/books');
                const myBooks = isAuthenticated ? (await api.get('/books/myBooks')).data : []
                const books = response.data;
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        isAuthenticated: true,
                        books,
                        myBooks
                    }
                });
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        books: null,
                        myBooks: null
                    }
                });
            }
        };

        initialise();
    }, []);

    return (
        <BooksContext.Provider
            value={{
                ...state,
                buyBook,
                updateBook,
                deleteBook,
                createBook,
                searchBooks
            }}
        >
            {children}
        </BooksContext.Provider>
    );
};

export default BooksContext;
