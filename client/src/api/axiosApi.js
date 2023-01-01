import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3500"
})

export const createUser = async (user) => {
  return await axiosApi.post("/users", user)
}


export default axiosApi