import React, { useState, useContext } from 'react'
import { DSMapContext } from '../DSMapContext'
import { useHistory } from 'react-router-dom'

import Loading from 'Components/Loading'

import loginService from '../../services/login'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

// Handle user login
const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [loggingStatus, setLoggingStatus] = useState(false)
    const [, setUser, ,] = useContext(DSMapContext)

    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoggingStatus(true)
        try {
            const user = await loginService.login({
                name,
                password,
            })

            setName('')
            setPassword('')
            setUser(user)
            window.localStorage.setItem('loggedDSMapUser', JSON.stringify(user))
            setLoggingStatus(false)
            history.push('/')
        } catch (exception) {
            setLoggingStatus(false)
            setMessage(true)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return (
        <>
            {loggingStatus && <Loading />}
            {!loggingStatus && (
                <Grid container spacing={2}>
                    <Grid item xs={2} />
                    <Grid
                        item
                        container
                        xs={8}
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <form onSubmit={handleLogin}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    error={message ? true : false}
                                    id="outlined-basic"
                                    label="Username"
                                    helperText={message ? 'incorrect name' : ''}
                                    value={name}
                                    onChange={({ target }) =>
                                        setName(target.value)
                                    }
                                />
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="standard-password-input"
                                    error={message ? true : false}
                                    label="Password"
                                    type="password"
                                    helperText={
                                        message ? 'incorrect password' : ''
                                    }
                                    value={password}
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
                                />
                            </Grid>
                            <br />
                            <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Log In
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            )}
        </>
    )
}

export default Login
