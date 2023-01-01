import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home'
import Login from './components/Login'
import Inventory from './components/Inventory'
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />

          <Route element={<RequireAuth />} >
            <Route path='inventory' element={<Inventory />} />
          </Route>
        </Route>
      </Routes >
    </div >
  );
}

export default App;
