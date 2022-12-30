import axios from "axios";

const inventoryApi = axios.create({
  baseURL: "http://localhost:3500"
})

export const getInventory = async () => {
  const response = await inventoryApi.get("/inventory");
  return response.data;
}

export const createItem = async (inventory) => {
  console.log(inventory)
  return await inventoryApi.post("/inventory", inventory)
}

export const updateItem = async (inventory) => {
  return await inventoryApi.patch("/inventory", inventory)
}

export const deleteItem = async ({ id }) => {
  return await inventoryApi.delete("/inventory", { data: { id } });
}