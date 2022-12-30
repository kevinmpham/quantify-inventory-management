import { createContext, useState, useEffect } from "react";
import { getInventory, createItem, updateItem, deleteItem } from "../api/inventoryApi"
import { useQuery, useMutation, useQueryClient } from "react-query"

const InventoryContext = createContext({});

export const InventoryProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: inventory
  } = useQuery('inventory', getInventory)

  const createItemMutation = useMutation(createItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  const updateItemMutation = useMutation(updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  return (
    <InventoryContext.Provider value={{
      inventory, isLoading, isError, error,
      createItemMutation, updateItemMutation, deleteItemMutation
    }}>
      {children}
    </InventoryContext.Provider>

  )
}

export default InventoryContext