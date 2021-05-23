import React, { createContext, useEffect, useReducer } from 'react'
import api, { setToken } from '../api'

const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    showLogin: false,
    user: null
};


const AuthContext = createContext({
    ...initialAuthState,
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    toggleLogin: () => { }
})

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALISE': {
            const { isAuthenticated, user } = action.payload;
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                showLogin: false,
                user
            };
        }
        case 'LOGIN': {
            const { user } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        }
        case 'REGISTER': {
            const { user } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case 'UPDATE_USER': {
            const { user } = action.payload
            return {
                ...state,
                user
            }
        }
        case 'TOGGLE_LOGIN': {
            return {
                ...state,
                showLogin: !state.showLogin
            }
        }
        default: {
            throw new Error('Action type was not found.')
        }

    }
}



export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, { initialAuthState })


    const login = async ({ username, password }) => {
        try {
            const response = await api.post('/auth/login', { username, password })
            const { token, user } = response.data;
            setToken(token);
            dispatch({
                type: 'LOGIN',
                payload: {
                    user
                }
            });
        } catch (err) {
            console.log(err.response.data.message)
            return err.response.data.message
        }

    };

    const logout = () => {
        setToken(null);
        dispatch({ type: 'LOGOUT' });
    };

    const register = async ({ username, password }) => {
        const response = await api.post('/api/account/register', {
            username,
            password
        });
        const { token } = response.data;
        setToken(token)
        const { user } = await getUser()
        dispatch({
            type: 'REGISTER',
            payload: {
                user
            }
        });
    };

    const toggleLogin = () => {
        dispatch({
            type: 'TOGGLE_LOGIN'
        })
    }


    useEffect(() => {
        const initialise = async () => {
            try {
                const token = window.localStorage.getItem('auth-token');
                if (token) {
                    setToken(token);

                    const response = await api.get('/auth/user');
                    const user = response.data;

                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialise();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                toggleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


const getUser = async () => {
    try {
        const user = (await api.get('/auth/user')).data
        console.log(user)
        return user
    } catch (err) {
        console.log(err)
    }
}

