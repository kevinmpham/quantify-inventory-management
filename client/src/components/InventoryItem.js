import React from 'react'
import { useMutation, useQueryClient } from "react-query"
import useAuth from '../hooks/useAuth';
import axiosApi from '../api/axiosApi';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const InventoryItem = ({ inventoryItem }) => {
  const { auth, config } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState(inventoryItem.item);
  const [newQuantity, setNewQuantity] = useState(inventoryItem.quantity);
  const [newCategory, setNewCategory] = useState(inventoryItem.category);

  //delete item logic
  const deleteItem = async ({ id }) => {
    return await axiosApi.delete(
      "/inventory",
      {
        headers: { authorization: `Bearer ${auth.accessToken}` },
        data: { id }
      }
    );
  }

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("inventory");
    }
  })

  //update item logic
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
    newInventoryItem.category = newCategory;
    updateItemMutation.mutate(newInventoryItem);
    navigate('/inventory');
  }

  //form to bring up modal to create update item
  const editItemForm = (
    <>
      <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#edit-form-${inventoryItem._id}`}>
        <FontAwesomeIcon icon={faPen} />
      </button>

      <div className="modal fade" id={`edit-form-${inventoryItem._id}`} tabIndex="-1" aria-labelledby={`edit-item-header-${inventoryItem._id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`edit-item-header-${inventoryItem._id}`}>Edit Item</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor={`edit-name-${inventoryItem._id}`} className="col-form-label">Item:</label>
                  <input type="text" className="form-control" id={`edit-name-${inventoryItem._id}`} value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                </div>
                <div className="row">
                  <div className="mb-3 col-3">
                    <label htmlFor={`edit-quantity-${inventoryItem._id}`} className="col-form-label">Quantity:</label>
                    <input type="number" className="form-control" id={`edit-quantity-${inventoryItem._id}`} value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
                  </div>
                  <div className="mb-3 col-8">
                    <label htmlFor={`edit-category-${inventoryItem._id}`} className="col-form-label">Category:</label>
                    <input type="text" className="form-control" id={`edit-category-${inventoryItem._id}`} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Edit Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )



  return (
    <li className="list-group-item">
      <div className='row'>
        <div className="col-2">
          {inventoryItem.quantity}
        </div>
        <div className="col-8">
          {inventoryItem.item}
        </div>
        <div className="col-2">

          {editItemForm}
          <button onClick={() => deleteItemMutation.mutate({ id: inventoryItem._id })}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </li>
  )
}

export default InventoryItem