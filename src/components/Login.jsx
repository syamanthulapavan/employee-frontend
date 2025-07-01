// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
     e.preventDefault(); // ✅ prevent form reload
    try {
   if (username || password) {
      const res = await axios.post('https://localhost:5001/api/Auth/Login', {
        username,
        password
      });
      console.log(res);
      if(res.data.message=="Login successful"){
         navigate('/dashboard');
      }
      else{
        alert(res.data.message);
      }
    }
    } catch (err) {
      alert('Login failed');
    }
  };
  return (
    <>
     <div className="login-select">
      <div className="login-mdv">
        <div className="login-sbdv">
          <div className="login-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
            <form className="form-inputs">
              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="text" id='UserId' placeholder="Enter Email ID" value={username} className="form-control form-control-lg" required onChange={(e) => setUsername(e.target.value)} />
                <label className="form-label bi bi-envelope-at-fill" htmlFor="UserId">
                  Email ID
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                    <input type="password" id='Password' placeholder="Password" required  className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="Password">
                  Password
                </label>
              </div>

              {/* Remember Me + Forgot */}
              <div className="form-options">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="form1Example3"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button  type="submit" onClick={handleLogin} className="btn-submit">
                Sign in
              </button>
              <div className="divider">
                <p>OR</p>
               </div>
              <button className="btn-social facebook">
                <i className="fab fa-facebook-f"></i> Continue with Facebook
              </button>
              <button className="btn-social twitter">
                <i className="fab fa-twitter"></i> Continue with Twitter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;