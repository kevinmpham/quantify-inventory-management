import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useMutation, useQueryClient } from "react-query"
import { updateItem } from "../api/inventoryApi"



const EditInventoryForm = () => {
  const location = useLocation()
  const inventoryItem = location.state.inventoryItem;

  const queryClient = useQueryClient();

  const updateItemMutation = useMutation(updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  const navigate = useNavigate();
  const [newItem, setNewItem] = useState(inventoryItem.item);
  const [newQuantity, setNewQuantity] = useState(inventoryItem.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInventoryItem = inventoryItem;
    newInventoryItem.item = newItem;
    newInventoryItem.quantity = newQuantity;
    console.log(newInventoryItem)
    updateItemMutation.mutate(newInventoryItem);
    navigate('/inventory');
  }

  return (
    <div>
      <h1>Edit {inventoryItem.item}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="edit-item">Item:</label>
        <input type="text" id="edit-item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />

        <label htmlFor="edit-quantity">Enter Quantity</label>
        <input type="number" id="edit-quantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
        <button>Submit</button>
      </form>

    </div >
  )
}

export default EditInventoryForm