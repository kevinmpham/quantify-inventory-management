import { useState } from "react"
import useAuth from "../hooks/useAuth";
import axiosApi from "../api/axiosApi"
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosApi.post("/auth/login",
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
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5 p-3 auth-box">
            <h2 className="text-center">Login</h2>
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
              <button type="submit" className="btn btn-dark w-100">Login</button>
            </form>
            <p className="text-center">Need account? <span className="fst-italic text-primary"><Link to="/register">Register Here</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login