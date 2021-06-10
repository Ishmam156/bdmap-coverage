import axios from 'axios'
const baseUrl = '/api/districts'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const updateOne = async (id) => {
    const response = await axios.put(`${baseUrl}/${id}`)
    return response.data
}

export default { getAll, updateOne }
