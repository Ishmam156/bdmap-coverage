import axios from 'axios'
const baseUrl = '/api/visit'

const addVisit = async (details) => {
    const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedDSMapUser')
    )
    const Authorization = `bearer ${loggedUserJSON.token}`

    const response = await axios
        .post(baseUrl, details, {
            headers: { Authorization },
        })
        .catch((error) => {
            alert('You need to be logged in')
        })

    return response.data
}

const getAll = async (setUser) => {
    const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedDSMapUser')
    )
    const Authorization = `bearer ${loggedUserJSON.token}`
    const response = await axios
        .get(baseUrl, {
            headers: { Authorization },
        })
        .catch((error) => {
            alert('Your session has expired')
            window.localStorage.removeItem('loggedDSMapUser')
            setUser(null)
        })

    if (response) {
        return response.data
    }

    return null
}

export default { addVisit, getAll }
