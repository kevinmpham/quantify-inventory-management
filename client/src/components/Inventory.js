import { useState, useContext } from "react"
import InventoryItem from "./InventoryItem";
import { useQuery, useMutation, useQueryClient } from "react-query"
import { createItem, inventoryApi } from "../api/inventoryApi"
import AuthContext from "../context/AuthContext";


const Inventory = () => {
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const { auth } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const getInventory = async () => {
    const response = await inventoryApi.get(
      "/inventory",
      {
        headers: {
          authorization: `Bearer ${auth.accessToken}`
        }
      }
    );
    return response.data;
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createItemMutation.mutate({ item: newItem, quantity: newQuantity, user: auth.username });
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
    <p>{error}...</p>
  } else {
    let filteredInventory = [];
    filteredInventory = inventory.filter(invenItem => invenItem.user === auth.username);
    content = (
      <ul>
        {filteredInventory.map(inventoryItem => {
          return <InventoryItem key={inventoryItem._id} inventoryItem={inventoryItem} />
        })}
      </ul>
    )
  }

  return (
    <section>
      <h1>Inventory</h1>
      {newItemForm}
      {content}
    </section>
  )
}

export default Inventory