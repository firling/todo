var { v4 } = require('uuid');
var axios = require('axios');

const add = async (text) => {
    const res = await axios.post('http://127.0.0.1:3333/add', {text})
    return res.data.todo
}

const remove = async (id) => {
    const res = await axios.post('http://127.0.0.1:3333/remove', {id})
    return res.data
}

const changeColumn = () => {
    console.log("changeColumn")
}

const changePosition = () => {
    console.log("changePosition")
}

const get = async () => {
    const res = await axios.get('http://127.0.0.1:3333/')
    return res.data
}

module.exports = {
    add, remove, changeColumn, changePosition, get
}