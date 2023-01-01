import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import axiosApi from "../api/axiosApi"
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const { auth, setAuth } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await axiosApi.post("/auth/logout");
      setAuth({});
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <nav className="navbar navbar-expand bg-dark" data-bs-theme="dark">
      <div className="container">
        <span className="navbar-brand">Quantify</span>
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><span className="nav-link"><Link to="/">Home</Link></span></li>
          <li className="nav-item"><span className="nav-link"><Link to="/inventory">Inventory</Link></span></li>
        </ul>
        <div className="auth-buttons">
          {!auth.username && <button className="btn btn-outline-light"><Link to="/register">Register</Link></button>}
          {!auth.username && <button className="btn btn-outline-light"><Link to="/login">Login</Link></button>}
          {auth.username && <span className="navbar-brand">Welcome! {auth.username.toUpperCase()}</span>}
          {auth.username && (<form onSubmit={handleSubmit} style={{ display: "inline" }} >
            <button type="submit" className="btn btn-outline-light">Logout</button>
          </form>)}
        </div>
      </div>

    </nav >
  )
}

export default Header