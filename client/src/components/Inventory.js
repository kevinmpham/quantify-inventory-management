import { useState, useContext, useEffect } from "react"
import InventoryItem from "./InventoryItem";
import { useQuery, useMutation, useQueryClient } from "react-query"
import AuthContext from "../context/AuthContext";
import axiosApi from "../api/axiosApi"
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Inventory = () => {
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const [newCategory, setNewCategory] = useState('')
  const { auth, config } = useContext(AuthContext);
  const [filter, setFilter] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  const queryClient = useQueryClient();

  const getInventory = async () => {
    const response = await axiosApi.get("/inventory", config);
    return response.data;
  }

  const {
    isLoading,
    isError,
    error,
    data: inventory
  } = useQuery('inventory', getInventory)

  const createItem = async (inventory) => {
    return await axiosApi.post("/inventory", inventory, config)
  }

  const createItemMutation = useMutation(createItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    createItemMutation.mutate({ item: newItem, quantity: newQuantity, category: newCategory, user: auth.username });
    setNewItem('');
    setNewQuantity(0);
    setNewCategory('');
  }



  //form to bring up modal to create new item
  const addItemForm = (
    <>
      <div className="text-center">
        <button type="button" className="btn btn-lg" data-bs-toggle="modal" data-bs-target="#add-form">
          <FontAwesomeIcon icon={faSquarePlus} />
        </button>
      </div>

      <div className="modal fade" id="add-form" tabIndex="-1" aria-labelledby="add-item-header" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="add-item-header">Add Item</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="add-item" className="col-form-label">Item:</label>
                  <input type="text" className="form-control" id="add-item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                </div>
                <div className="row">
                  <div className="mb-3 col-3">
                    <label htmlFor="add-quantity" className="col-form-label">Quantity:</label>
                    <input type="number" className="form-control" id="add-quantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
                  </div>
                  <div className="mb-3 col-8">
                    <label htmlFor="add-category" className="col-form-label">Category:</label>
                    <input type="text" className="form-control" id="add-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  //useffect to filter inventory by category
  useEffect(() => {
    if (inventory) {
      const newInventory = inventory.filter(newItem => (newItem.category === filter));
      setFilteredInventory(newInventory);
    }
  }, [filter]);

  //finds all unique categories in inventory
  useEffect(() => {
    if (inventory) {
      const allCategories = inventory.map(newItem => newItem.category);
      let unique = [...new Set(allCategories)];
      setUniqueCategories(unique);
      if (filter === '') {
        const newInventory = [...inventory];
        setFilteredInventory(newInventory);
      } else {
        const newInventory = inventory.filter(newItem => (newItem.category === filter));
        setFilteredInventory(newInventory);
      }
    }
  }, [inventory])


  //content for all items
  let content;
  if (isLoading) {
    <p>Loading...</p>
  } else if (isError) {
    <p>{error}...</p>
  } else {
    content = (
      <ul className="list-group">
        <li className="list-group-item">
          <div className='row'>
            <div className="col-2">
              <span className="font-weight-bold">Quantity</span>
            </div>
            <div className="col-7">
              <span className="font-weight-bold">Item</span>
            </div>
            <div className="dropdown col-3">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filter By
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setFilter('')}>All Items</button></li>
                {uniqueCategories.map(cat => {
                  return (<li key={cat}><button className="dropdown-item" onClick={() => setFilter(cat)}>{cat}</button></li>)
                })}
              </ul>
            </div>
          </div>
        </li>
        {(filter === "") && inventory.map(inventoryItem => <InventoryItem key={inventoryItem._id} inventoryItem={inventoryItem} />)}
        {(filter !== "") && filteredInventory.map(inventoryItem => <InventoryItem key={inventoryItem._id} inventoryItem={inventoryItem} />)}
      </ul>
    )
  }

  return (
    <div className="container">
      <h2 className="text-center p-3">My Inventory</h2>
      {addItemForm}
      {content}

    </div>
  )
}

export default Inventory