var axios = require('axios');

var url = 'http://127.0.0.1:3333'

const add = async (text) => {
    const res = await axios.post(`${url}/add`, {text})
    return res.data.todo
}

const remove = async (id) => {
    const res = await axios.post(`${url}/remove`, {id})
    return res.data
}

const changeColumn = async (id, col) => {
    const res = await axios.post(`${url}/changeColumn`, {id, col})
    return res.data
}

const changePosition = async (columns) => {
    const res = await axios.post(`${url}/changePosition`, {ids: columns})
    return res.data
}

const get = async () => {
    const res = await axios.get(`${url}/`)
    return res.data
}

module.exports = {
    add, remove, changeColumn, changePosition, get
}