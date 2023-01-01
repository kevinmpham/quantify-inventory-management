import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/axiosApi";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createUser({ username, password })
      setUsername('');
      setPassword('');
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5 p-3 auth-box">
            <h2 className="text-center"> Register </h2>
            <form onSubmit={handleSubmit} className="card-body p-lg-5">
              <div className='row mb-3 justify-content-center'>

                <input type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className='row mb-3 justify-content-center'>
                <input type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">Register</button>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Register