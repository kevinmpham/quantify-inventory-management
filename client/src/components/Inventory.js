import { useState } from "react"
import { useContext } from "react";
import InventoryContext from "../context/InventoryContext";
import InventoryItem from "./InventoryItem";


const Inventory = () => {
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const { inventory, createItemMutation, isLoading, isError, error } = useContext(InventoryContext);
  console.log(inventory);


  const handleSubmit = (e) => {
    e.preventDefault();
    createItemMutation.mutate({ item: newItem, quantity: newQuantity });
    setNewItem('');
    setNewQuantity(0);
  }

  const newItemForm = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-item">Enter New Item</label>
      <input type="text" id="new-item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <label htmlFor="new-quantity">Enter Quantity</label>
      <input type="number" id="new-quantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
      <button>Submit</button>
    </form>
  )

  let content;
  if (isLoading) {
    <p>Loading...</p>
  } else if (isError) {
    <p>Error...</p>
  } else {
    content = (
      <ul>
        {inventory.map(inventoryItem => {
          return <InventoryItem key={inventoryItem._id} inventoryItem={inventoryItem} />
        })}
      </ul>
    )
  }


  return (
    <div>
      {newItemForm}
      {content}
    </div>
  )
}

export default Inventory