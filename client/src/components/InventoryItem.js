import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom';
import InventoryContext from "../context/InventoryContext";


const InventoryItem = ({ inventoryItem }) => {
  const { deleteItemMutation } = useContext(InventoryContext);

  return (
    <li>{inventoryItem.item}, {inventoryItem.quantity}
      <button><Link to="edit" state={{ inventoryItem }}>Edit</Link></button>
      <button onClick={() => deleteItemMutation.mutate({ id: inventoryItem._id })}>Delete</button>
    </li>
  )
}

export default InventoryItem