import React, { useContext } from 'react'
import { DSMapContext } from '../DSMapContext'
import { useHistory } from 'react-router-dom'

// Handle user logout and doesn't render a new view, just takes back to home
const LogOut = () => {
    const [, setUser, ,] = useContext(DSMapContext)
    const history = useHistory()
    window.localStorage.removeItem('loggedDSMapUser')
    setUser(null)
    history.push('/')
    return <div></div>
}

export default LogOut
