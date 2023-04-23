import { axiosInstance } from "./base";

export const getProfile = () => {
  return axiosInstance.get('/profile')
}

export const getNoteList = () => {
  return axiosInstance.get('/notes')
}

export const getNote = (id) => {
  return axiosInstance.get(`/notes/${id}`)
}

export const getBlogList = () => {
  return axiosInstance.get('/blogs')
}

export const getBlog = (id) => {
  return axiosInstance.get(`/blogs/${id}`)
}

export const getProjectList = () => {
  return axiosInstance.get('/projects')
}

export const getVisitCount = () => {
  return axiosInstance.get('/visitor')
}

export const updateVisitCount = (data) => {
  return axiosInstance.put('/visitor', {data})
}


export const getTechList = () => {
  return axiosInstance.get('/teches')
}