import axios from "axios"

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')
    config.headers.token = token
    config.headers.refreshToken = refreshToken
    config.headers.authorization = `Bearer ${token}`
    return config
}, function (error) {
    return Promise.reject(error);
});

export const fetchAdminUsers = async () => {
    const { data } = await axios.get(`https://localhost:7294/api/User`)
    return data
}

export const postAdminCreateUser = async (values) => {
    const { data } = await axios.post(`https://localhost:7294/api/Auth/CreateUser`, { ...values, role: "User" })
    return data
}

export const deleteUsers = async (id) => {
    const { data } = await axios.delete(`https://localhost:7294/api/User?id=${id}`)
    return data
}

export const updateUsers = async (values) => {
    const { data } = await axios.put(`https://localhost:7294/api/User`, { ...values, role: "User" })
    return data
}

export const fetchMe = async () => {
    const { data } = await axios.get(`https://localhost:7294/api/Auth/AuthMe`)
    return data
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(`https://localhost:7294/api/Auth/login`, input)
    return data
}

export const postAdminCreateLesson = async (values) => {
    const { data } = await axios.post(`https://localhost:7294/api/Lessons/add`, values)
    return data
}

export const fetchAdminLessons = async () => {
    const {data} = await axios.get(`https://localhost:7294/api/Lessons/getallwithdetails`)
    return data
}

export const fetchLectuterLesson = async (id) => {
    const {data} = await axios.get(`https://localhost:7294/api/Lessons/getallwithdetailsbyid?id=${id}`)
    return data
}

export const deleteLesson = async (record) => {
    const {data} = await axios.delete(`https://localhost:7294/api/Lessons/delete?lessonId=${record}`)
    return data
}

export const getPeriods = async () => {
    const {data} = await axios.get(`https://localhost:7294/api/Periods/getall`)
    return data
}
export const getAddLecturers = async () => {
    const {data} = await axios.get(`https://localhost:7294/api/Lecturers/getall`)
    return data
}

export const getSemesters = async () => {
    const {data} = await axios.get(`https://localhost:7294/api/Periods/getall`)
    return data
}

export const deleteSemester = async (record) => {
    const {data} = await axios.delete(`https://localhost:7294/api/Periods/delete?id=${record.id}`)
    return data
}

export const postSemester = async (record) => {
    const {data} = await axios.post(`https://localhost:7294/api/Periods/add`,record)
    return data
}