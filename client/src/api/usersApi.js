import axios from "axios";

const usersApi = axios.create({
  baseURL: "http://localhost:3500"
})

export const createUser = async (user) => {
  return await usersApi.post("/users", user)
}

export const updateItem = async (user) => {
  return await usersApi.patch("/users", user)
}
