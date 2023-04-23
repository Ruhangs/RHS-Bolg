import axios from "axios";

export const baseUrl = 'http://47.115.201.17:1337/api';

// axios.defaults.baseURL = 'http://47.115.201.17:1337/api'

// export const getProfile = async () => {
//   const profile = await axios.get('/profile').then((res) => {
//     console.log(res)
//     return res
//   })
//   return profile
// }

const axiosInstance = axios.create ({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err,"网络错误");
  }
);

export {
  axiosInstance
};