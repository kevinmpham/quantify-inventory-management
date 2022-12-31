import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import usersApi from "../api/usersApi"
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const result = await usersApi.post("/auth/logout");
      console.log('hello')
      setAuth({});
      console.log(auth)
      navigate("/")
    } catch (err) {
      console.log("hello")
      console.log(err);
    }
  }

  return (
    <>
      <header>
        <button><Link to="/register">register</Link></button>
        <button><Link to="/login">login</Link></button>
        <form onSubmit={handleSubmit} style={{ display: "inline" }} >
          <button type="submit">Logout</button>
        </form>
        <button><Link to="/inventory">inventory</Link></button>
      </header>
      <Outlet />
    </>
  )
}

export default Layout