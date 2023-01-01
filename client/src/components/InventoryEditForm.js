/* import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from "react-query"
import axiosApi from '../api/axiosApi'
import useAuth from '../hooks/useAuth'



const EditInventoryForm = () => {
  const location = useLocation()
  const inventoryItem = location.state.inventoryItem;
  const { config } = useAuth();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState(inventoryItem.item);
  const [newQuantity, setNewQuantity] = useState(inventoryItem.quantity);


  const queryClient = useQueryClient();

  const updateItem = async (inventory) => {
    return await axiosApi.patch("/inventory", inventory, config)
  }

  const updateItemMutation = useMutation(updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })



  const handleSubmit = (e) => {
    e.preventDefault();
    const newInventoryItem = inventoryItem;
    newInventoryItem.item = newItem;
    newInventoryItem.quantity = newQuantity;
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

export default EditInventoryForm */