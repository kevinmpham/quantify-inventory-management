import './App.css';
import { Routes, Route } from 'react-router-dom'
import { InventoryProvider } from './context/InventoryContext';
import Layout from './components/Layout';
import Home from './components/Home'
import Login from './components/Login'
import Inventory from './components/Inventory'
import EditInventoryForm from './components/EditInventoryForm';

function App() {
  return (
    <div className="App">
      <InventoryProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='inventory/edit' element={<EditInventoryForm />} />
          </Route>
        </Routes >
      </InventoryProvider>
    </div>
  );
}

export default App;
