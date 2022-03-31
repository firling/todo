var axios = require('axios');

var url = process.env.REACT_APP_BASE_SERV_URL

export const add = async (text) => {
    const res = await axios.post(`${url}/add`, {text})
    return res.data.todo
}

export const remove = async (id) => {
    const res = await axios.post(`${url}/remove`, {id})
    return res.data
}

export const changeColumn = async (id, col) => {
    const res = await axios.post(`${url}/changeColumn`, {id, col})
    return res.data
}

export const changePosition = async (columns) => {
    const res = await axios.post(`${url}/changePosition`, {ids: columns})
    return res.data
}

export const get = async () => {
    const res = await axios.get(`${url}/`)
    return res.data
}