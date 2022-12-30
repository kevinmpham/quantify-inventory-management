import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home'
import Login from './components/Login'
import Inventory from './components/Inventory'
import EditInventoryForm from './components/EditInventoryForm';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='inventory' element={<Inventory />} />
          <Route path='inventory/edit' element={<EditInventoryForm />} />
        </Route>
      </Routes >
    </div>
  );
}

export default App;
