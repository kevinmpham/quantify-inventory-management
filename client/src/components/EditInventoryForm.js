import React from 'react'
import { useLocation } from 'react-router-dom'

const EditInventoryForm = () => {
  const location = useLocation()
  const item = location.state.inventoryItem;

  return (
    <div>
      {item.item}
    </div>
  )
}

export default EditInventoryForm