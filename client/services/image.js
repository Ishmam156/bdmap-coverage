import axios from 'axios'
const baseUrl = '/api/imageupload'

const uploadImage = async (url, file) => {
    await axios.put(url, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const getUrl = async () => {
    const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedDSMapUser')
    )
    const Authorization = `bearer ${loggedUserJSON.token}`

    const response = await axios
        .get(baseUrl, {
            headers: { Authorization },
        })
        .catch((error) => {
            alert('You need to be logged in')
            console.log(error.message)
        })

    return response.data
}

export default { uploadImage, getUrl }
