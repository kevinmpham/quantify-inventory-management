import { useState } from "react"
import useAuth from "../hooks/useAuth";
import usersApi from "../api/usersApi"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await usersApi.post("/auth/login",
        JSON.stringify({ user: username, pwd: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      const accessToken = result?.data?.accessToken
      const newUsername = result?.data?.username;
      setAuth({ username: newUsername, accessToken })
      navigate("/inventory")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} required></input>
        <label htmlFor='password'>Password: </label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Login