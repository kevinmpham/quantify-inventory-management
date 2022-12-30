import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom';
import InventoryContext from "../context/InventoryContext";
import { useMutation, useQueryClient } from "react-query"
import { deleteItem } from "../api/inventoryApi"


const InventoryItem = ({ inventoryItem }) => {

  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  return (
    <li>{inventoryItem.item}, {inventoryItem.quantity}
      <button><Link to="edit" state={{ inventoryItem }}>Edit</Link></button>
      <button onClick={() => deleteItemMutation.mutate({ id: inventoryItem._id })}>Delete</button>
    </li>
  )
}

export default InventoryItem