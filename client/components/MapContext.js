import React, { useState, useEffect, createContext } from 'react'
import districtService from '../services/district'
import usersService from '../services/users'
import visitService from '../services/visit'
export const MapContext = createContext()

// Create context to act as global states for entire application
export const MapProvider = (props) => {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [districts, setDistricts] = useState([])
    const [visit, setVisit] = useState(null)

    // Use effect calls to get information from API at mount
    useEffect(() => {
        districtService.getAll().then((data) => setDistricts(data))
    }, [])

    useEffect(() => {
        usersService.getAll().then((data) => setUsers(data))
    }, [])

    useEffect(() => {
        if (user) {
            visitService.getAll(setUser).then((data) => {
                if (data) {
                    setVisit(data)
                }
            })
        }
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedDSMapUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    // Provide visit details if only user logged in
    let visitCount = []
    if (user && visit) {
        visit.forEach((item) => {
            let filterVisitors = item.visitors.map((visitor) => visitor.name)
            if (filterVisitors.includes(user.name)) {
                visitCount.push(item)
            }
        })
    }

    return (
        <MapContext.Provider
            value={[
                user,
                setUser,
                districts,
                setDistricts,
                users,
                setUsers,
                visit,
                setVisit,
                visitCount,
            ]}
        >
            {props.children}
        </MapContext.Provider>
    )
}
