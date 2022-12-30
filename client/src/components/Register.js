import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/usersApi";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createUser({ username, password })
      //navigate("/library")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section>
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

export default Register