import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'http://localhost:2345/students';

export const getStudents = async (name) => {
    name = name || '';
    return await axios.get(`${usersUrl}/${name}`)
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}`, user)
    .then((res)=>{
        console.log(res)
    })
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}