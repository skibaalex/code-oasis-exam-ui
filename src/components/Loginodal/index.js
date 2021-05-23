import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import AuthContext from '../../context/Auth'


const LoginModal = () => {
    const { login, showLogin, toggleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState()


    const handleLogin = async () => {
        const err = await login({ username, password })
        if (err) return setErr(err)
        handleClose()
    }

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setErr('')
        toggleLogin()
    }

    return (
        <Dialog open={showLogin} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>User login: user user</Typography>
                    <Typography>Admin login: admin admin</Typography>
                </DialogContentText>
                {err && <Typography color="red" variant="caption">{err}</Typography>}
                <Box pt={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                </Box>
                <Box py={2}>
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="text"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogin} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginModal;